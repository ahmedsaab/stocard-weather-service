import { Controller, Get, Param } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { City } from './interfaces/city.interface';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get(':id')
  async viewCity(
    @Param('id') id: number,
  ): Promise<City> {
    return this.citiesService.get(id);
  }
}
