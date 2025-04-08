import { isNotNil, Nil } from '@tablit/shared-utils';
import { filter, Observable } from 'rxjs';

export function filterNotNil<T>() {
  return (source: Observable<T | Nil>) =>
    source.pipe(filter((value): value is Nil => !isNotNil(value)));
}
