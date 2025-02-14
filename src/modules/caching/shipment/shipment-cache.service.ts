/*
https://docs.nestjs.com/providers#services
*/

import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class ShipmentCacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  // Write ข้อมูลใหม่ทุก 30 นาที
  async createShipment(shipmentId: string, data: any) {
    await this.cacheManager.set(`shipment:${shipmentId}`, data, 1800);
    return { message: 'Shipment data saved successfully', data };
  }

  // อ่านข้อมูล Shipment
  async getShipment(shipmentId: string) {
    const shipment = await this.cacheManager.get(`shipment:${shipmentId}`);
    if (!shipment) {
      return { message: 'Shipment not found' };
    }
    return shipment;
  }
}
