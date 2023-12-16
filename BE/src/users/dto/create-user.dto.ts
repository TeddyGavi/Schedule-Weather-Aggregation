import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Bill' })
  @IsString()
  firstName: string;
  @ApiProperty({ example: 'Test' })
  @IsString()
  lastName: string;
  @ApiProperty({ example: 'hi@example.com' })
  @IsEmail()
  email: string;
  @ApiProperty({ example: '123' })
  @IsString()
  password: string;
}
