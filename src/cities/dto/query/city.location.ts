import { IsDefined } from 'class-validator';

export class CityLocation {
  @IsDefined()
  lat: number;

  @IsDefined()
  lng: number;
}
