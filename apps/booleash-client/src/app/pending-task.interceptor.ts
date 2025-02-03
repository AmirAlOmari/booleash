import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject, PendingTasks } from '@angular/core';
import { finalize, Observable } from 'rxjs';

// I love both zoneless and SSR, but the threesome
// is somewhat tricky. Angular running on the server
// in zoneless mode has to be aware of the pending
// tasks to prevent premature serialization.
// Otherwise, the async tasks are executed,
// yet not reflected in the output.
export function pendingTaskInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const pendingTasks = inject(PendingTasks);
  const pendingTask = pendingTasks.add();

  return next(req).pipe(
    finalize(() => {
      pendingTask();
    })
  );
}
