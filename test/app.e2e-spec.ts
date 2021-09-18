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
    const expectedResponse = {
      auto: 'regular',
      disability: 'ineligible',
      home: 'economic',
      life: 'regular',
    };

    return request(app.getHttpServer())
      .post('/risk/profile')
      .expect(201)
      .expect(expectedResponse);
  });
});
