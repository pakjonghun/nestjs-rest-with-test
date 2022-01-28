import { CreateMovieDto } from './dtos/createMovie.dto';
import { MovieEntity } from './entities/movie.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateDto } from './dtos/updateMovie.dto';

@Injectable()
export class MoviesService {
  private movie: MovieEntity[] = [];

  main(): MovieEntity[] {
    return this.movie;
  }

  searchByTitle(title: string): MovieEntity[] {
    const result = this.movie.filter((i) => i.title === title);
    if (!result.length) throw new NotFoundException();
    return result;
  }

  createMovie(data: CreateMovieDto): MovieEntity {
    const id = Math.random() * 5000;
    const newData = { ...data, id };
    this.movie.push(newData);
    return newData;
  }
  searchById(id: number): MovieEntity[] {
    console.log(typeof id);
    const result = this.movie.filter((i) => i.id === id);
    if (!result.length) throw new NotFoundException();
    return result;
  }

  update(id: number, body: UpdateDto): MovieEntity {
    const [target] = this.searchById(id);
    if (!target) throw new NotFoundException();
    target.title = body.title;
    return target;
  }

  delete(id: number) {
    const [target] = this.searchById(id);
    this.movie = this.movie.filter((i) => i.id !== id);
    return target;
  }
}
