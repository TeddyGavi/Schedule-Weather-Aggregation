import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import SignInUserDto from 'src/users/dto/sign-in-user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  @ApiOperation({ description: 'Sign in an existing user' })
  signIn(@Body() signInUser: SignInUserDto) {
    return this.authService.signIn(signInUser.email, signInUser.password);
  }
}
