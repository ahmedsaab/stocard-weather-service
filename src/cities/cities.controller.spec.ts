import { CitiesController } from './cities.controller';
import { CitiesService } from './cities.service';

describe('CitiesController', () => {
  let citiesController: CitiesController;
  let citiesService: CitiesService;

  beforeEach(() => {
    // @ts-ignore
    citiesService = new CitiesService({}, {});
    citiesController = new CitiesController(citiesService);
  });

  describe('viewCity', () => {
    it('should return the city data', async () => {
      const result = {
        id: 1,
        name: 'test-city',
        lat: 123,
        lng: 456,
      };
      jest.spyOn(citiesService, 'getDetails').mockResolvedValue(Promise.resolve(result));

      expect(await citiesController.viewCity(result.id)).toBe(result);
    });
  });

  describe('viewCityWeather', () => {
    it('should return the weather of the city', async () => {
      const result = {
        type: 'Clear',
        type_description: 'clear sky',
        sunrise: new Date('1970-01-19T02:21:11.654Z'),
        sunset: new Date('1970-01-19T02:22:11.837Z'),
        temp: 22.4,
        temp_min: 22,
        temp_max: 23,
        humidity: 53,
        clouds_percent: 0,
        wind_speed: 5,
        pressure: 1016,
      };
      jest.spyOn(citiesService, 'getWeather').mockResolvedValue(Promise.resolve(result));

      expect(await citiesController.viewCityWeather(123)).toBe(result);
    });
  });

  describe('viewNearBy', () => {
    it('should return the close by cities', async () => {
      const cities = [
        {
          id: 1,
          name: 'test-city',
          lat: 123,
          lng: 456,
        },
        {
          id: 2,
          name: 'test-city-2',
          lat: 124,
          lng: 457,
        },
      ];
      jest.spyOn(citiesService, 'getCitiesAround').mockResolvedValue(Promise.resolve(cities));

      expect(await citiesController.viewNearBy({
        lat: 123,
        lng: 456,
      })).toEqual(cities);
    });
  });
});
