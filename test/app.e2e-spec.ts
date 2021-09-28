import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/risk/profile (POST)', () => {
    const requestBody = {
      age: 25,
      dependents: 0,
      house: {
        ownership_status: 'owned',
      },
      income: 250000,
      marital_status: 'single',
      risk_questions: [0, 0, 0],
    };

    const expectedResponse = {
      auto: 'ineligible',
      disability: 'economic',
      home: 'economic',
      life: 'economic',
      renters: 'ineligible',
    };

    return request(app.getHttpServer())
      .post('/risk/profile')
      .send(requestBody)
      .expect(201)
      .expect(expectedResponse);
  });
});
