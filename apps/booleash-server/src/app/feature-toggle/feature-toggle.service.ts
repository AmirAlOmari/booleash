import { GraphqlPubSub, InjectGraphqlPubSub } from '@booleash/graphql-pub-sub';
import { Injectable } from '@nestjs/common';
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
    this.graphqlPubSub.publish('featureToggleUpserted', entity);

    return entity;
  }

  public async getAll(): Promise<FeatureToggleEntity[]> {
    return await this.featureToggleRepository.getAll();
  }
}
