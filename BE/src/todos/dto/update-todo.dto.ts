import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';
import { IsBoolean, IsDate } from 'class-validator';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @IsDate()
  completed_at: Date;
  @IsBoolean()
  completed: boolean;
}
