import { Injectable } from '@nestjs/common';
import { GraphqlPubSub, InjectGraphqlPubSub } from '@tablit/graphql-pub-sub';
import { FeatureToggleEntity } from './feature-toggle.entity';
import { FeatureToggleRepository } from './feature-toggle.repository';

@Injectable()
export class FeatureToggleService {
  constructor(
    private readonly featureToggleRepository: FeatureToggleRepository,
    @InjectGraphqlPubSub()
    private readonly graphqlPubSub: GraphqlPubSub
  ) {}

  public async upsert(
    partial: Pick<FeatureToggleEntity, 'name'> & Partial<FeatureToggleEntity>
  ): Promise<FeatureToggleEntity> {
    const entity = await this.featureToggleRepository.upsert(partial);
    this.graphqlPubSub.publish('featureToggleUpserted', {
      featureToggleUpserted: entity,
    });

    return entity;
  }

  public async getAll(): Promise<FeatureToggleEntity[]> {
    return await this.featureToggleRepository.getAll();
  }
}
