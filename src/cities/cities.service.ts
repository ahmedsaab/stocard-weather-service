import { Get, Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '../config/config.service';
import { City } from './interfaces/city.interface';

@Injectable()
export class CitiesService {
  apiUrl;
  apiKey;

  constructor(private readonly configService: ConfigService) {
    this.apiUrl = this.configService.weatherApiRoot;
    this.apiKey = this.configService.weatherApiKey;
  }

  async get(id: number): Promise<City> {
    return axios.get(
      `${this.apiUrl}/forecast?id=${id}&APPID=${this.apiKey}`,
    ).then(resp =>
      resp.data,
    );
  }
}
