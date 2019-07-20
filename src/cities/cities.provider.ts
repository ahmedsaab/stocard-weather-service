import { Connection } from 'typeorm';
import { CityEntity } from './entities/city.entity';

export const cityProviders = [
  {
    provide: 'CITY_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(CityEntity),
    inject: ['DATABASE_CONNECTION'],
  },
];
