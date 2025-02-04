import { Module } from '@nestjs/common';
import { createGraphqlPubSubProvider } from './graphql-pub-sub.provider';
import { GRAPHQL_PUB_SUB } from './graphql-pub-sub.token';

@Module({
  controllers: [],
  providers: [createGraphqlPubSubProvider()],
  exports: [GRAPHQL_PUB_SUB],
})
export class GraphqlPubSubModule {}
