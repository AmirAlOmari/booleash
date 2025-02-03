import { Provider } from '@nestjs/common';
import { REDIS_CLIENT_OPTIONS } from './redis-client-options.token';
import { RedisClientOptions } from './redis-client-options.type';

export function createRedisClientOptionsProvider(
  options: RedisClientOptions = {}
): Provider {
  return {
    provide: REDIS_CLIENT_OPTIONS,
    useValue: options,
  };
}
