import { NotFoundException } from '@nestjs/common';
import { MovieEntity } from './entities/movie.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { exec } from 'child_process';
describe('MovieSevice', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);

    service.createMovie({ title: 'a' });
  });

  it('should be function', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should reeturn an array', () => {
      const result = service.main();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should movie', () => {
      const newMovie = service.createMovie({ title: 'a' });
      expect(newMovie).toBeInstanceOf(Object);

      const [findone] = service.searchById(newMovie.id);
      expect(findone).toBeInstanceOf(Object);
      expect(findone.id).toBe(newMovie.id);
    });

    it('shoould thorw 404 error', () => {
      try {
        service.searchByTitle('a');
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
        expect(err.status).toBe(404);
      }
    });
  });

  describe('delete', () => {
    it('should return movie', () => {
      const movies = service.main();
      service.delete(movies[0].id);
      const afterMovies = service.main();
      expect(afterMovies.length).toBeLessThan(movies.length);
    });

    it('should throw 404 error', () => {
      try {
        const r = service.delete(123123);
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
      }
    });

    it('should length', () => {
      const movies = service.main();

      expect(movies.length).toBe(1);
    });

    describe('update', () => {
      it('should update', () => {
        const movies = service.main();
        const updated = service.update(movies[0].id, { title: 'ab' });
        expect(updated.title).toBe('ab');
      });

      it('should return throw error', () => {
        try {
          service.update(1, { title: 'abc' });
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });
    });
    describe('title', () => {
      it('should return movie', () => {
        const r = service.searchByTitle('a');
        expect(r[0]).toStrictEqual({ title: 'a', id: r[0].id });
      });
      it('should throw notfound error', () => {
        try {
          const r = service.searchByTitle('asdfa');
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });
    });
  });
});
