import { catchError, Observable } from 'rxjs';

/**
 * Catch error and tap method, then rethrow error
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function catchErrorRethrow<T>(tapMethod: (error: any) => unknown) {
  return (source: Observable<T>): Observable<T> =>
    source.pipe(
      catchError((error) => {
        tapMethod(error);

        throw error;
      }),
    );
}
