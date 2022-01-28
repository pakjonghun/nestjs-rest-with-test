import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        forbidNonWhitelisted: true,
      }),
    );
    await app.init();
  });

  describe('movies', () => {
    it('/ (GET)', () => {
      return request(app.getHttpServer()).get('/movies').expect(200).expect([]);
    });

    it('post', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({ title: 'a' })
        .expect(201);
    });

    it('delete', () => {
      return request(app.getHttpServer()).delete('/movies').expect(404);
    });
  });

  it('get', () => {
    return request(app.getHttpServer())
      .get('/movies/search?title=a')
      .expect(200);
  });

  it('get', () => {
    return request(app.getHttpServer()).get('/movies/111').expect(404);
  });

  it('delete', () => {
    return request(app.getHttpServer()).delete('/movies/111').expect(404);
  });

  it('update', () => {
    return request(app.getHttpServer())
      .put('/movies/111')
      .send({ title: 'as' })
      .expect(404);
  });

  it('update', () => {
    return request(app.getHttpServer())
      .put('/movies/111')
      .send({ abc: 'as' })
      .expect(400);
  });
});
