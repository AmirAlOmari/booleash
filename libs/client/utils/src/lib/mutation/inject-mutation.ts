/* eslint-disable @typescript-eslint/no-explicit-any */
import { assertInInjectionContext } from '@angular/core';
import { OperationVariables } from '@apollo/client/core';
import { ApolloError } from '@apollo/client/errors';
import * as Apollo from 'apollo-angular';
import { map } from 'rxjs';
import { filterNil } from '../operators';
import { Mutation } from './mutation';
import { MutationMethod } from './mutation-method.type';

export interface InjectMutationFromGQL {
  <
    Input extends OperationVariables,
    Value,
    ApolloMutation extends Apollo.Mutation<Value, Input>
  >(
    gqlMutation: Pick<ApolloMutation, 'mutate'>
  ): Mutation<[Input], Value>;
}

export interface InjectMutation {
  <Input extends any[], Result>(
    mutationMethod: MutationMethod<Input, Result>
  ): Mutation<Input, Result>;

  fromGQL: InjectMutationFromGQL;
}

function injectMutationFunction<Input extends any[], Result>(
  mutationMethod: MutationMethod<Input, Result>
): Mutation<Input, Result> {
  assertInInjectionContext(injectMutationFunction);
  const mutation = new Mutation(mutationMethod);

  return mutation;
}

function mapApolloQueryResult<Value>(
  result: Apollo.MutationResult<Value>
): Value | null {
  if (result.errors) {
    throw new ApolloError({ graphQLErrors: result.errors });
  }

  if (result.data) {
    return result.data;
  }

  return null;
}

function injectMutationFromGQLFunction<Input extends OperationVariables, Value>(
  gqlMutation: Pick<Apollo.Mutation<Value, Input>, 'mutate'>
): Mutation<[Input], Value> {
  assertInInjectionContext(injectMutationFromGQLFunction);
  const mutation = new Mutation<[Input], Value>((payload) =>
    gqlMutation.mutate(payload).pipe(map(mapApolloQueryResult), filterNil())
  );

  return mutation;
}

export const injectMutation: InjectMutation = Object.assign(
  injectMutationFunction,
  {
    fromGQL: injectMutationFromGQLFunction,
  }
);
