import { assertInInjectionContext } from '@angular/core';
import { ObservableInput, from, of } from 'rxjs';
import { FetchMethod } from './fetch-method.type';
import { Query } from './query';

export interface InjectQuery {
  <Value>(fetchMethod: FetchMethod<Value, void>): Query<Value>;

  withInput: {
    <Value, Input>(
      input$: ObservableInput<Input>,
      fetchMethod: FetchMethod<Value, Input>
    ): Query<Value, Input>;
  };
}

function injectQueryFunction<Value, Input = void>(
  fetchMethod: FetchMethod<Value, Input>
): Query<Value, Input> {
  assertInInjectionContext(injectQueryFunction);

  return new Query(of(void 0 as Input), fetchMethod);
}

function injectQueryWithInputFunction<Value, Input = void>(
  input$: ObservableInput<Input>,
  fetchMethod: FetchMethod<Value, Input>
): Query<Value, Input> {
  assertInInjectionContext(injectQueryWithInputFunction);

  return new Query(from(input$), fetchMethod);
}

export const injectQuery: InjectQuery = Object.assign(injectQueryFunction, {
  withInput: injectQueryWithInputFunction,
});
