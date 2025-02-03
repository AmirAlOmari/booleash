import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FeatureToggleEntity } from './feature-toggle.entity';
import { FeatureToggleObjectType } from './feature-toggle.object-type';
import { FeatureToggleService } from './feature-toggle.service';
import { UpsertFeatureToggleInputType } from './upsert-feature-toggle.input-type';

@Resolver(() => FeatureToggleObjectType)
export class FeatureToggleResolver {
  constructor(private readonly featureToggleService: FeatureToggleService) {}

  @Query(() => [FeatureToggleObjectType])
  public async getAllFeatureToggles(): Promise<FeatureToggleEntity[]> {
    return await this.featureToggleService.getAll();
  }

  @Mutation(() => FeatureToggleObjectType)
  public async upsertFeatureToggle(
    @Args('payload') payload: UpsertFeatureToggleInputType
  ): Promise<FeatureToggleEntity> {
    return await this.featureToggleService.upsert(payload);
  }
}
