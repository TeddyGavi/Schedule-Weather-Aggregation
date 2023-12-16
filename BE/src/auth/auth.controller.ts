import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import SignInUserDto from 'src/users/dto/sign-in-user.dto';
import { Public } from 'src/setMetaData';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  @ApiOperation({ description: 'Sign in an existing user' })
  signIn(@Body() signInUser: SignInUserDto) {
    return this.authService.signIn(signInUser.email, signInUser.password);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
}
