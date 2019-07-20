import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '../config/config.service';
import { City } from './interfaces/city.interface';
import { Weather } from './interfaces/weather.interface';
import { Repository } from 'typeorm';
import { CityEntity } from './entities/city.entity';

@Injectable()
export class CitiesService {
  apiUrl;
  apiKey;

  constructor(
    @Inject('CITY_REPOSITORY')
    private readonly cityRepository: Repository<CityEntity>,
    private readonly configService: ConfigService,
  ) {
    this.apiUrl = this.configService.weatherApiRoot;
    this.apiKey = this.configService.weatherApiKey;
  }

  static handleApiError(error) {
    if (
      (error.isAxiosError && error.response.status === 404) ||
      error.name === 'EntityNotFound'
    ) {
      throw new NotFoundException({
        code: 'NotFoundError',
        message: 'not found',
      });
    }
    throw error;
  }

  async getDetails(id: number): Promise<City> {
    try {
      return await this.cityRepository.findOneOrFail(id);
    } catch (error) {
      CitiesService.handleApiError(error);
    }
  }

  async getWeather(id: number): Promise<Weather> {
    try {
      const resp = await axios.get(
        `${this.apiUrl}/weather?id=${id}&APPID=${this.apiKey}&units=metric`,
      );
      const { data } = resp;

      return {
        type: data.weather[0].main,
        type_description: data.weather[0].description,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
        temp: data.main.temp,
        temp_min: data.main.temp_min,
        temp_max: data.main.temp_max,
        pressure: data.main.preasure,
        humidity: data.main.humidity,
        clouds_percent: data.clouds.all,
        wind_speed: data.wind.speed,
      };
    } catch (error) {
      CitiesService.handleApiError(error);
    }
  }

  async getCitiesAround(lat: number, lng: number, range: number): Promise<City[]> {
    return await this.cityRepository.query(`
      SELECT * FROM (
          SELECT *, (
              (
                  (
                      acos(
                          sin(($1*pi()/180)) *
                          sin((lat*pi()/180)) +
                          cos(($1*pi()/180)) *
                          cos((lat*pi()/180)) *
                          cos((($2  - lng)*pi()/180))
                      )
                  ) * 180 / pi()
              ) * 60 * 1.1515 * 1.609344
          ) as distance FROM cities
      ) t
      WHERE distance <= $3
    `, [lat, lng, range],
    );
  }
}
