import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import * as nearByCitiesMock from './nearby-cities.json';
import * as sinon from 'sinon';
import * as assert from 'assert';

describe('AppController (e2e)', () => {
  let app;
  let server;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    sinon.stub(console, 'log');
    app = moduleFixture.createNestApplication();
    await app.init();
    server = request(app.getHttpServer());
  });

  it('/cities/:id (GET)', async () => {
    return server
      .get('/cities/529334')
      .expect(200, {
        id: 529334,
        name: 'Mar’ina Roshcha',
        lat: 55.796391,
        lng: 37.611111,
      });
  });

  it('/cities/:id/weather (GET)', async () => {
    return server
      .get('/cities/529334/weather')
      .expect(200).expect(body => {
        assert(typeof body.type === 'string');
        assert(typeof body.sunrise === 'string');
        assert(typeof body.sunset === 'string');
        assert(typeof body.temp === 'number');
        // ...
      });
  });

  it('/cities?lat=[LAT]&lng=[LNG] (GET)', async () => {
    return server
      .get('/cities?lat=55.796391&lng=37.611111')
      .expect(200, nearByCitiesMock);
  });
});
