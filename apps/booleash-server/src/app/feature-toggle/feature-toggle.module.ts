import { GraphqlPubSubModule } from '@booleash/graphql-pub-sub';
import { RedisModule } from '@booleash/redis';
import { Module } from '@nestjs/common';
import { FeatureToggleRepository } from './feature-toggle.repository';
import { FeatureToggleResolver } from './feature-toggle.resolver';
import { FeatureToggleService } from './feature-toggle.service';

@Module({
  imports: [RedisModule],
  providers: [
    GraphqlPubSubModule,
    FeatureToggleRepository,
    FeatureToggleService,
    FeatureToggleResolver,
  ],
  exports: [FeatureToggleService],
})
export class FeatureToggleModule {}
