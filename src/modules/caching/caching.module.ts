/*
https://docs.nestjs.com/modules
*/

import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-ioredis';
import { Module } from '@nestjs/common';
import { ShipmentCacheController } from './shipment/shipment-cache.controller';
import { ShipmentCacheService } from './shipment/shipment-cache.service';
import { AppConfigModule } from 'src/config/config.module';

@Module({
  imports: [
    AppConfigModule,
    CacheModule.registerAsync({
      useFactory: async () => ({
        store: await redisStore({
          socket: {
            host: process.env.REDIS_HOST || 'localhost',
            port: Number(process.env.REDIS_PORT) || 6379,
          },
        }),
        ttl: Number(process.env.REDIS_TTL) || 1800, // TTL 30 นาที
      }),
    }),
  ],
  controllers: [ShipmentCacheController],
  providers: [ShipmentCacheService],
})
export class CachingModule {}
