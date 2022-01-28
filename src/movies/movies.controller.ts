import { CreateMovieDto } from './dtos/createMovie.dto';
import { MovieEntity } from './entities/movie.entity';
import { MoviesService } from './movies.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UpdateDto } from './dtos/updateMovie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(): MovieEntity[] {
    return this.moviesService.main();
  }

  @Get('search')
  searchByTitle(@Query('title') title: string): MovieEntity[] {
    return this.moviesService.searchByTitle(title);
  }

  @Get(':id')
  getId(@Param('id') id: number) {
    return this.moviesService.searchById(id);
  }

  @Post()
  create(@Body() movie: CreateMovieDto): MovieEntity {
    return this.moviesService.createMovie(movie);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.moviesService.delete(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: UpdateDto): MovieEntity {
    return this.moviesService.update(id, body);
  }
}
