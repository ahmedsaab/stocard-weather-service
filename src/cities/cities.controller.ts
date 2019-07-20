import { Controller, Get, Param, Query } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { City } from './interfaces/city.interface';
import { Weather } from './interfaces/weather.interface';

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
    @Query('lat') lat: number,
    @Query('lng') lng: number,
  ): Promise<City[]> {
    return this.citiesService.getCitiesAround(lat, lng, 10);
  }
}
