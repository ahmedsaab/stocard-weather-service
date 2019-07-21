import { Inject, Module } from '@nestjs/common';
import * as json from 'big-json';
import * as pgFormat from 'pg-format';
import * as request from 'request';
import * as zlib from 'zlib';

import { databaseProviders } from './database.providers';
import { ConfigModule } from '../config/config.module';
import { Connection } from 'typeorm';
import { ConfigService } from '../config/config.service';

const parseStream = json.createParseStream();

const queries = {
  dropTable: `
    DROP TABLE IF EXISTS cities;
  `,
  createTable: `
    CREATE TABLE cities (
     id INT NOT NULL PRIMARY KEY,
     name VARCHAR (100),
     lng FLOAT,
     lat FLOAT
    );
  `,
  insertCity: `
    INSERT INTO cities (id, name, lng, lat) VALUES %L
  `,
};

@Module({
  imports: [ConfigModule],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {
  constructor(
    @Inject('DATABASE_CONNECTION')
    private readonly connection: Connection,
    private readonly configService: ConfigService,
  ) {}

  async importData() {
    parseStream.on('data', async (pojo) => {
      try {
        const cities = [];
        for (const i in pojo) {
          if (pojo.hasOwnProperty(i)) {
            cities.push([
              pojo[i].id,
              pojo[i].name,
              pojo[i].coord.lon,
              pojo[i].coord.lat,
            ]);
          }
        }

        await this.connection.query(queries.dropTable);
        await this.connection.query(queries.createTable);
        await this.connection.query(
          pgFormat(queries.insertCity, cities),
        );

        console.log('Done populating cities');
      } catch (error) {
        console.error(error);
      }
    });

    await request.get(this.configService.citiesSourceUrl)
      .pipe(zlib.createGunzip())
      .pipe(parseStream);
  }
}
