import { MovieEntity } from './../entities/movie.entity';
import { PickType } from '@nestjs/swagger';
export class CreateMovieDto extends PickType(MovieEntity, ['title']) {}
