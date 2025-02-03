import { Observable } from 'rxjs';

export type MutationMethod<Input extends any[], Result> = (
  ...input: Input
) => Observable<Result>;
