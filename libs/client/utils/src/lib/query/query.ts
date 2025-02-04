import { DestroyRef, Signal, inject } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import {
  BehaviorSubject,
  EMPTY,
  Observable,
  ReplaySubject,
  Subject,
  catchError,
  combineLatest,
  from,
  shareReplay,
  switchAll,
  switchMap,
  tap,
} from 'rxjs';
import { nextOrErrorTap } from '../operators/next-or-error-tap.operator';
import { FetchMethod } from './fetch-method.type';

export class Query<Value, Input = void> {
  private readonly destroyRef = inject(DestroyRef);

  private readonly input$ = new Subject<Observable<Input>>();

  constructor(
    givenInput$: Observable<Input>,
    private readonly fetchMethod: FetchMethod<Value, Input>
  ) {
    this.input$.next(givenInput$);
    this.refresh$.next();
    this.destroyRef.onDestroy(() => this.destroy());
  }

  private currentRun$: ReplaySubject<Value> | null = null;
  public readonly refresh$ = new ReplaySubject<void>(1);
  public readonly isLoading$ = new BehaviorSubject<boolean>(false);
  public readonly error$ = new ReplaySubject<unknown>(1);
  public readonly data$: Observable<Value> = combineLatest({
    input: this.input$.pipe(switchAll()),
    refresh: this.refresh$,
  }).pipe(
    // TODO(amir): there was the following line, no idea why 🤷
    // debounceTime(0),
    tap(() => this.isLoading$.next(true)),
    switchMap(({ input }) =>
      from(this.fetchMethod(input)).pipe(
        tap({
          next: (result) => {
            this.currentRun$?.next(result);
            this.currentRun$?.complete();
          },
          error: (error) => this.currentRun$?.error(error),
        }),
        nextOrErrorTap(() => (this.currentRun$ = null)),
        nextOrErrorTap(() => this.isLoading$.next(false)),
        catchError((error) => {
          this.error$.next(error);

          return EMPTY;
        })
      )
    ),
    shareReplay(1),
    takeUntilDestroyed(this.destroyRef)
  );
  #isDestroyed = false;
  get isDestroyed(): boolean {
    return this.#isDestroyed;
  }

  /**
   * @returns an observable that emits the result of the **CURRENT** query run.
   * If the query is already running, it will emit the result of the current run.
   */
  public refresh(): Observable<Value> {
    if (this.#isDestroyed) {
      throw new Error('Query is destroyed');
    }

    if (!this.currentRun$) {
      this.currentRun$ = new ReplaySubject<Value>(1);
    }

    this.refresh$.next();

    return this.currentRun$.asObservable();
  }

  public readonly isLoading: Signal<boolean> = toSignal(this.isLoading$, {
    requireSync: true,
  });
  public readonly data: Signal<Value | null> = toSignal(this.data$, {
    initialValue: null,
  });
  public readonly error: Signal<unknown | null> = toSignal(this.error$, {
    initialValue: null,
  });

  public destroy(): void {
    if (this.#isDestroyed) {
      return;
    }

    this.input$.complete();
    this.refresh$.complete();
    this.isLoading$.complete();
    this.error$.complete();
    this.#isDestroyed = true;
  }
}
