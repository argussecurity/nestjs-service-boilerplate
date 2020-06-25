import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CarsModule } from 'rest-api/modules/cars.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetricsModule } from 'rest-api/modules/metrics.module';

describe('CarsController (integration)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        MetricsModule,
        TypeOrmModule.forRoot(),
        CarsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/cars (GET)', () => {
    return request(app.getHttpServer())
      .get('/cars')
      .expect(200);
  });
});
