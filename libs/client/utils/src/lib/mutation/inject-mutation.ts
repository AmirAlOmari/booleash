import { assertInInjectionContext } from '@angular/core';
import { Mutation } from './mutation';
import { MutationMethod } from './mutation-method.type';

export function injectMutation<Input extends any[], Result>(
  mutationMethod: MutationMethod<Input, Result>,
): Mutation<Input, Result> {
  assertInInjectionContext(injectMutation);
  const mutation = new Mutation(mutationMethod);

  return mutation;
}
