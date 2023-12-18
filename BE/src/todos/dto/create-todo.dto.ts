import { IsBoolean, IsDate, IsString } from 'class-validator';
import { Users } from 'src/users/entities/user.entity';

export class CreateTodoDto {
  @IsString()
  task: string;
  @IsBoolean()
  completed?: boolean;
  @IsDate()
  created_at?: Date;
  @IsString()
  userId: string;
}
