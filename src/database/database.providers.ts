import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => await createConnection({
      type: 'postgres',
      host: 'weather-db',
      port: 5432,
      username: 'root',
      password: 'toor',
      database: 'postgres',
      entities: [
        __dirname + '/../**/*.entity{.ts,.js}',
      ],
    }),
  },
];
