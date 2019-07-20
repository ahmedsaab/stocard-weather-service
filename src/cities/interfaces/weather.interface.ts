export interface Weather {
  type: string;
  type_description: string;
  sunrise: Date;
  sunset: Date;
  temp: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  clouds_percent: number;
  wind_speed: number;
}
