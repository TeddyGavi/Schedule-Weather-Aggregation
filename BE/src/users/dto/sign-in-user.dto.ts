import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export default class SignInUserDto {
  @ApiProperty({ example: 'Percival27@gmail.com' })
  @IsEmail()
  email: string;
  @ApiProperty({ example: '123' })
  @IsString()
  password: string;
}
