import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, enteredPassword: string) {
    const user = await this.usersService.findOneByEmail(email);

    if (user.password !== enteredPassword) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email };

    return {
      jwt_token: await this.jwtService.signAsync(payload),
    };
  }
}
