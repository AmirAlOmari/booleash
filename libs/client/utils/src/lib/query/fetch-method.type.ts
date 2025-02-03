import { ObservableInput } from 'rxjs';

export type FetchMethod<Value, Input = void> = (
  input: Input,
) => ObservableInput<Value>;
