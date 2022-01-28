import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [MoviesService], //바로 요기
  controllers: [MoviesController],
})
export class MoviesModule {}
