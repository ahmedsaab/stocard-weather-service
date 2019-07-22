import { Controller, Get, Param, Query } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { City } from './interfaces/city.interface';
import { Weather } from './interfaces/weather.interface';
import { CityLocation } from './dto/query/city.location';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get(':id')
  async viewCity(
    @Param('id') id: number,
  ): Promise<City> {
    return this.citiesService.getDetails(id);
  }

  @Get(':id/weather')
  async viewCityWeather(
    @Param('id') id: number,
  ): Promise<Weather> {
    return this.citiesService.getWeather(id);
  }

  @Get()
  async viewNearBy(
    @Query() query: CityLocation,
  ): Promise<City[]> {
    return this.citiesService.getCitiesAround(query.lat, query.lng, 10);
  }
}
