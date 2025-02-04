import { assertInInjectionContext } from '@angular/core';
import { ApolloQueryResult, OperationVariables } from '@apollo/client/core';
import * as Apollo from 'apollo-angular';
import { ObservableInput, from, map, of } from 'rxjs';
import { FetchMethod } from './fetch-method.type';
import { Query } from './query';

type ExactlyEmptyObject = {
  [key: string]: never;
};

export interface InjectQueryFromGQL {
  <Value, ApolloQuery extends Apollo.Query<Value, ExactlyEmptyObject>>(
    gqlQuery: Pick<ApolloQuery, 'watch'>
  ): Query<Value>;

  withInput: {
    <
      Value,
      Input extends OperationVariables,
      ApolloQuery extends Apollo.Query<Value, Input>
    >(
      input$: ObservableInput<Input>,
      gqlQuery: Pick<ApolloQuery, 'watch'>
    ): Query<Value, Input>;
  };
}

export interface InjectQuery {
  <Value>(fetchMethod: FetchMethod<Value, void>): Query<Value>;

  withInput: {
    <Value, Input>(
      input$: ObservableInput<Input>,
      fetchMethod: FetchMethod<Value, Input>
    ): Query<Value, Input>;
  };

  fromGQL: InjectQueryFromGQL;
}

function injectQueryFunction<Value>(
  fetchMethod: FetchMethod<Value>
): Query<Value> {
  assertInInjectionContext(injectQueryFunction);

  return new Query(of(void 0 as void), fetchMethod);
}

function injectQueryWithInputFunction<Value, Input = void>(
  input$: ObservableInput<Input>,
  fetchMethod: FetchMethod<Value, Input>
): Query<Value, Input> {
  assertInInjectionContext(injectQueryWithInputFunction);

  return new Query(from(input$), fetchMethod);
}

function mapApolloQueryResult<Value>(result: ApolloQueryResult<Value>): Value {
  if (result.error) {
    throw result.error;
  }

  return result.data;
}

function injectQueryFromGQLFunction<Value>(
  gqlQuery: Pick<Apollo.Query<Value, ExactlyEmptyObject>, 'watch'>
): Query<Value> {
  assertInInjectionContext(injectQueryFromGQLFunction);

  let queryRef: Apollo.QueryRef<Value, ExactlyEmptyObject> | null = null;

  return new Query(of(void 0 as void), () => {
    if (!queryRef) {
      queryRef = gqlQuery.watch();

      return queryRef.valueChanges.pipe(map(mapApolloQueryResult));
    }

    return queryRef.refetch().then(mapApolloQueryResult);
  });
}

function injectQueryFromGQLWithInputFunction<
  Value,
  Input extends OperationVariables
>(
  input$: ObservableInput<Input>,
  gqlQuery: Pick<Apollo.Query<Value, Input>, 'watch'>
): Query<Value, Input> {
  assertInInjectionContext(injectQueryFromGQLWithInputFunction);

  let queryRef = gqlQuery.watch();

  return new Query(from(input$), (input) => {
    if (!queryRef) {
      queryRef = gqlQuery.watch(input);

      return queryRef.valueChanges.pipe(map(mapApolloQueryResult));
    }

    return queryRef.refetch(input).then(mapApolloQueryResult);
  });
}

export const injectQuery: InjectQuery = Object.assign(injectQueryFunction, {
  withInput: injectQueryWithInputFunction,
  fromGQL: Object.assign(injectQueryFromGQLFunction, {
    withInput: injectQueryFromGQLWithInputFunction,
  }),
});
