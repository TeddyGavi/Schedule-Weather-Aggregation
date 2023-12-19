import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
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
  async signIn(@Body() signInUser: SignInUserDto, @Res() res) {
    const token = await this.authService.signIn(
      signInUser.email,
      signInUser.password,
    );
    res.cookie('jwt_token', token, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      expires: new Date(Date.now() + 3600000),
    });
    return res.json({ sucess: true });
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/register')
  async register(@Res() res, @Body() createUserDto: CreateUserDto) {
    const token = await this.authService.register(createUserDto);
    res.cookie('jwt_token', token, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      expires: new Date(Date.now() + 3600000),
    });
    return res.json({ sucess: true });
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Get('logout')
  async logout(@Res() res, @Req() req) {
    res.clearCookie('jwt_token');
    return res.json({ success: true });
  }

  @HttpCode(HttpStatus.OK)
  @Get('validate')
  async validate(@Res() res, @Req() req) {
    return res.json({ success: true });
  }
}
