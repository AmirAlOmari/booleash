import { Inject } from '@nestjs/common';
import { REDIS_CLIENT } from './redis-client.token';

export const InjectRedisClient = () => Inject(REDIS_CLIENT);
