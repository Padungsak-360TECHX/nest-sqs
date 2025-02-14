/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ShipmentCacheService } from './shipment-cache.service';

@Controller()
export class ShipmentCacheController {
  constructor(private readonly shipmentService: ShipmentCacheService) {}

  @Post(':id')
  async createShipment(@Param('id') shipmentId: string, @Body() data: any) {
    return this.shipmentService.createShipment(shipmentId, data);
  }

  @Get(':id')
  async getShipment(@Param('id') shipmentId: string) {
    return this.shipmentService.getShipment(shipmentId);
  }
}
