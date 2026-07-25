import { Controller, Get, Param } from '@nestjs/common';
import { UnitService } from './unit.service';

@Controller('units')
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Get()
  findAll() {
    return this.unitService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.unitService.findOne(id);
  }
}
