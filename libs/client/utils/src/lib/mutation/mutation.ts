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
  debounceTime,
  exhaustMap,
  from,
  shareReplay,
  tap,
} from 'rxjs';
import { nextOrErrorTap } from '../operators/next-or-error-tap.operator';
import { MutationMethod } from './mutation-method.type';

export class Mutation<Input extends unknown[], Result> {
  private readonly destroyRef = inject(DestroyRef);

  constructor(private readonly mutationMethod: MutationMethod<Input, Result>) {
    this.destroyRef.onDestroy(() => this.destroy());
  }

  private currentRun$: ReplaySubject<Result> | null = null;
  public readonly performRequested$ = new Subject<Input>();
  public readonly isPerforming$ = new BehaviorSubject<boolean>(false);
  public readonly error$ = new ReplaySubject<unknown>(1);
  public readonly result$: Observable<Result> = combineLatest({
    input: this.performRequested$,
  }).pipe(
    debounceTime(0),
    nextOrErrorTap(() => this.isPerforming$.next(true)),
    exhaustMap(({ input }) =>
      from(this.mutationMethod(...input)).pipe(
        tap({
          next: (result) => {
            this.currentRun$?.next(result);
            this.currentRun$?.complete();
          },
          error: (error) => this.currentRun$?.error(error),
        }),
        nextOrErrorTap(() => (this.currentRun$ = null)),
        nextOrErrorTap(() => this.isPerforming$.next(false)),
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
   * @returns an observable that emits the result of the **CURRENT** mutation run.
   * If the mutation is already running, it will emit the result of the current run.
   */
  public perform(...input: Input): Observable<Result> {
    if (this.#isDestroyed) {
      throw new Error('Mutation is destroyed');
    }

    if (this.currentRun$) {
      console.warn(
        'A mutation is already running. The result of the current run will be emitted.'
      );
      return this.currentRun$.asObservable();
    }

    this.currentRun$ = new ReplaySubject<Result>(1);
    this.performRequested$.next(input);

    return this.currentRun$.asObservable();
  }

  public readonly isPerforming: Signal<boolean> = toSignal(this.isPerforming$, {
    requireSync: true,
  });
  public readonly result: Signal<Result | null> = toSignal(this.result$, {
    initialValue: null,
  });
  public readonly error: Signal<unknown | null> = toSignal(this.error$, {
    initialValue: null,
  });

  public destroy(): void {
    if (this.#isDestroyed) {
      return;
    }

    this.performRequested$.complete();
    this.isPerforming$.complete();
    this.error$.complete();
    this.#isDestroyed = true;
  }
}
