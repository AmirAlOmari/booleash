import { Inject } from '@nestjs/common';
import { GRAPHQL_PUB_SUB } from './graphql-pub-sub.token';

export const InjectGraphqlPubSub = () => Inject(GRAPHQL_PUB_SUB);
