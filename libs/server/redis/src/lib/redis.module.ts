import { DynamicModule, Module } from '@nestjs/common';
import { RedisClientOptions } from './redis-client-options.type';
import { RedisCoreModule } from './redis-core.module';

@Module({})
export class RedisModule {
  public static forRoot(options?: RedisClientOptions): DynamicModule {
    return {
      module: RedisModule,
      imports: [RedisCoreModule.forRoot(options)],
    };
  }
}
