import { Provider } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { GRAPHQL_PUB_SUB } from './graphql-pub-sub.token';

export function createGraphqlPubSubProvider(): Provider<PubSub> {
  return {
    provide: GRAPHQL_PUB_SUB,
    useValue: new PubSub(),
  };
}
