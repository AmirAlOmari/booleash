import { gql } from 'apollo-angular';
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

export const GetAllFeatureTogglesDocument = gql`
  query GetAllFeatureToggles {
    getAllFeatureToggles {
      isControlled
      isEnabled
      name
    }
  }
`;

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
export const UpsertFeatureToggleDocument = gql`
  mutation UpsertFeatureToggle($payload: UpsertFeatureToggleInputType!) {
    upsertFeatureToggle(payload: $payload) {
      isControlled
      isEnabled
      name
    }
  }
`;

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
