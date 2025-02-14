import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type FeatureToggleObjectType = {
  __typename?: 'FeatureToggleObjectType';
  isControlled: Scalars['Boolean']['output'];
  isEnabled: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  upsertFeatureToggle: FeatureToggleObjectType;
};

export type MutationUpsertFeatureToggleArgs = {
  payload: UpsertFeatureToggleInputType;
};

export type Query = {
  __typename?: 'Query';
  getAllFeatureToggles: Array<FeatureToggleObjectType>;
};

export type Subscription = {
  __typename?: 'Subscription';
  featureToggleUpserted: FeatureToggleObjectType;
};

export type UpsertFeatureToggleInputType = {
  isControlled?: InputMaybe<Scalars['Boolean']['input']>;
  isEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type GetAllFeatureTogglesQueryVariables = Exact<{
  [key: string]: never;
}>;

export type GetAllFeatureTogglesQuery = {
  __typename?: 'Query';
  getAllFeatureToggles: Array<{
    __typename?: 'FeatureToggleObjectType';
    isControlled: boolean;
    isEnabled: boolean;
    name: string;
  }>;
};

export type SubscribeFeatureToggleUpsertedSubscriptionVariables = Exact<{
  [key: string]: never;
}>;

export type SubscribeFeatureToggleUpsertedSubscription = {
  __typename?: 'Subscription';
  featureToggleUpserted: {
    __typename?: 'FeatureToggleObjectType';
    isControlled: boolean;
    isEnabled: boolean;
    name: string;
  };
};

export type UpsertFeatureToggleMutationVariables = Exact<{
  payload: UpsertFeatureToggleInputType;
}>;

export type UpsertFeatureToggleMutation = {
  __typename?: 'Mutation';
  upsertFeatureToggle: {
    __typename?: 'FeatureToggleObjectType';
    isControlled: boolean;
    isEnabled: boolean;
    name: string;
  };
};

export const GetAllFeatureTogglesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetAllFeatureToggles' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getAllFeatureToggles' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'isControlled' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'isEnabled' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetAllFeatureTogglesQuery,
  GetAllFeatureTogglesQueryVariables
>;
export const SubscribeFeatureToggleUpsertedDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'subscription',
      name: { kind: 'Name', value: 'SubscribeFeatureToggleUpserted' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'featureToggleUpserted' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'isControlled' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'isEnabled' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SubscribeFeatureToggleUpsertedSubscription,
  SubscribeFeatureToggleUpsertedSubscriptionVariables
>;
export const UpsertFeatureToggleDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpsertFeatureToggle' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'payload' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'UpsertFeatureToggleInputType' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'upsertFeatureToggle' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'payload' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'payload' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'isControlled' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'isEnabled' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpsertFeatureToggleMutation,
  UpsertFeatureToggleMutationVariables
>;

@Injectable({
  providedIn: 'root',
})
export class GetAllFeatureTogglesGQL extends Apollo.Query<
  GetAllFeatureTogglesQuery,
  GetAllFeatureTogglesQueryVariables
> {
  document = GetAllFeatureTogglesDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}

@Injectable({
  providedIn: 'root',
})
export class SubscribeFeatureToggleUpsertedGQL extends Apollo.Subscription<
  SubscribeFeatureToggleUpsertedSubscription,
  SubscribeFeatureToggleUpsertedSubscriptionVariables
> {
  document = SubscribeFeatureToggleUpsertedDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}

@Injectable({
  providedIn: 'root',
})
export class UpsertFeatureToggleGQL extends Apollo.Mutation<
  UpsertFeatureToggleMutation,
  UpsertFeatureToggleMutationVariables
> {
  document = UpsertFeatureToggleDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
