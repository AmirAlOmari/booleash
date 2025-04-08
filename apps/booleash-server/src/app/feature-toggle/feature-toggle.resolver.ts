import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import {
  GraphqlPubSub,
  GraphqlPubSubAsyncIterableIterator,
  InjectGraphqlPubSub,
} from '@tablit/graphql-pub-sub';
import { FeatureToggleObjectType } from './feature-toggle.object-type';
import { FeatureToggleService } from './feature-toggle.service';
import { UpsertFeatureToggleInputType } from './upsert-feature-toggle.input-type';

@Resolver(() => FeatureToggleObjectType)
export class FeatureToggleResolver {
  constructor(
    private readonly featureToggleService: FeatureToggleService,
    @InjectGraphqlPubSub()
    private readonly graphqlPubSub: GraphqlPubSub
  ) {}

  @Query(() => [FeatureToggleObjectType])
  public async getAllFeatureToggles(): Promise<FeatureToggleObjectType[]> {
    return await this.featureToggleService.getAll();
  }

  @Mutation(() => FeatureToggleObjectType)
  public async upsertFeatureToggle(
    @Args('payload') payload: UpsertFeatureToggleInputType
  ): Promise<FeatureToggleObjectType> {
    return await this.featureToggleService.upsert(payload);
  }

  @Subscription(() => FeatureToggleObjectType)
  public featureToggleUpserted(): GraphqlPubSubAsyncIterableIterator<FeatureToggleObjectType> {
    return this.graphqlPubSub.asyncIterableIterator('featureToggleUpserted');
  }
}
