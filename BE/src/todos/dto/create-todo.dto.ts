import { IsBoolean, IsDate, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  task: string;
  @IsBoolean()
  completed: boolean;
  @IsDate()
  created_at: Date;
}
