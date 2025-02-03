import { Provider } from '@nestjs/common';
import { createClient } from 'redis';
import { REDIS_CLIENT_OPTIONS } from './redis-client-options.token';
import { RedisClientOptions } from './redis-client-options.type';
import { REDIS_CLIENT } from './redis-client.token';

export function createRedisClientProvider(): Provider {
  return {
    provide: REDIS_CLIENT,
    inject: [REDIS_CLIENT_OPTIONS],
    useFactory: (options: RedisClientOptions) => createClient(options),
  };
}
