import { catchError, Observable, tap } from 'rxjs';

/**
 * Perform an empty `tap()` despite an error being thrown.
 */
export function nextOrErrorTap<T>(tapMethod: () => unknown) {
  return (source: Observable<T>): Observable<T> =>
    source.pipe(
      tap(() => tapMethod()),
      catchError((error) => {
        tapMethod();

        throw error;
      }),
    );
}
