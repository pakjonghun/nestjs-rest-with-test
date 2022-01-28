import { CreateMovieDto } from './createMovie.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateDto extends PartialType(CreateMovieDto) {}
