import { Injectable } from '@nestjs/common';
import { InjectRedisClient, RedisClient } from '@tablit/redis';
import { factory, isNotNil, stripNulls } from '@tablit/shared-utils';
import { FeatureToggleEntity } from './feature-toggle.entity';

@Injectable()
export class FeatureToggleRepository {
  constructor(
    @InjectRedisClient()
    private readonly redisClient: RedisClient,
  ) {}

  public async upsert(
    partial: Pick<FeatureToggleEntity, 'name'> & Partial<FeatureToggleEntity>,
  ): Promise<FeatureToggleEntity> {
    const existing = await this.get(partial.name);
    const entity = {
      ...(existing ?? factory(FeatureToggleEntity)),
      ...stripNulls(partial),
    };

    await this.redisClient.set(
      this.createKey(partial.name),
      JSON.stringify(entity),
    );

    return entity;
  }

  public async get(name: string): Promise<FeatureToggleEntity | null> {
    const featureToggle = await this.redisClient.get(this.createKey(name));

    if (!featureToggle) {
      return null;
    }

    return JSON.parse(featureToggle);
  }

  public async getAll(): Promise<FeatureToggleEntity[]> {
    const keys = await this.redisClient.keys('*');

    if (!keys.length) {
      return [];
    }

    const featureToggles = await this.redisClient.mGet(keys);

    return featureToggles
      .filter(isNotNil)
      .map((featureToggle) => JSON.parse(featureToggle));
  }

  private createKey(name: string): string {
    return `feature-toggle:${name}`;
  }
}
