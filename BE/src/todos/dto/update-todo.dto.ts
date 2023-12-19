import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';
import { IsBoolean, IsDate, IsString } from 'class-validator';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @IsDate()
  completed_at?: Date;
  @IsBoolean()
  completed?: boolean;
  @IsString()
  task?: string;
}
