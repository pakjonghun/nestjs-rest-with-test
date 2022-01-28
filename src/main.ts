import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function a() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //그냥통과 거름
      forbidNonWhitelisted: true, //오류를 띄움
      transform: true, //아이디 같은 number 로 바껴야 되는것들 자동 형변환 해줌
    }),
  );
  await app.listen(3000);
}
a();
