import { ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@ObjectType()
export class MovieEntity {
  @IsNumber()
  id: number;

  @IsString({ message: 'title must be string' })
  title: string;
}
