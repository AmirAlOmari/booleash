import {
  DynamicModule,
  Global,
  Logger,
  Module,
  OnModuleDestroy,
  OnModuleInit,
  Provider,
} from '@nestjs/common';
import { InjectRedisClient } from './inject-redis-client.decorator';
import { createRedisClientOptionsProvider } from './redis-client-options.provider';
import { RedisClientOptions } from './redis-client-options.type';
import { createRedisClientProvider } from './redis-client.provider';
import { RedisClient } from './redis-client.type';

@Global()
@Module({})
export class RedisCoreModule implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RedisCoreModule.name, {
    timestamp: true,
  });

  constructor(
    @InjectRedisClient()
    private readonly redisClient: RedisClient
  ) {}

  public static forRoot(options?: RedisClientOptions): DynamicModule {
    const providers: Provider[] = [
      createRedisClientOptionsProvider(options),
      createRedisClientProvider(),
    ];

    return {
      module: RedisCoreModule,
      providers: providers,
      exports: providers,
    };
  }

  public async onModuleInit(): Promise<void> {
    try {
      this.logger.log('Connecting to Redis...');
      await this.redisClient.connect();
      this.logger.log('Connected to Redis');
    } catch (error) {
      this.logger.error('Failed to connect to redis', { error });

      throw error;
    }
  }

  public async onModuleDestroy(): Promise<void> {
    try {
      this.logger.log('Disconnecting from Redis...');
      await this.redisClient.disconnect();
      this.logger.log('Disconnected from Redis');
    } catch (error) {
      this.logger.error('Failed to disconnect from redis', { error });

      throw error;
    }
  }
}
