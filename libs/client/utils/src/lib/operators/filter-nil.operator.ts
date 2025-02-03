import { isNotNil, Nil, NotNil } from '@booleash/shared-utils';
import { filter, Observable } from 'rxjs';

export function filterNil<T>() {
  return (source: Observable<T | Nil>) =>
    source.pipe(filter((value): value is NotNil<T> => isNotNil(value)));
}
