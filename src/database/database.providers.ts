import { createConnection } from 'typeorm';
import { ConfigService } from '../config/config.service';

export const databaseProviders = [
  {
    inject: [ConfigService],
    provide: 'DATABASE_CONNECTION',
    useFactory: async (configService: ConfigService) =>
      await createConnection({
        type: 'postgres',
        host: configService.dbHost,
        port: configService.dbPort,
        username: configService.dbUser,
        password: configService.dbPassword,
        database: configService.dbName,
        entities: [
          __dirname + '/../**/*.entity{.ts,.js}',
        ],
      }),
  },
];
