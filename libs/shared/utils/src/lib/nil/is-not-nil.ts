import { Nil } from './nil.type';
import { NotNil } from './not-nil.type';

export function isNotNil<T>(value: T | Nil): value is NotNil<T> {
  return value !== null && value !== undefined;
}
