import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Users } from 'src/users/entities/user.entity';
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
    return await this.createPayloadWithToken(user);
  }

  async register(newUser: CreateUserDto) {
    const { email } = newUser;
    const isEmailTaken = await this.usersService.isEmailTaken(email);

    if (isEmailTaken) {
      throw new ConflictException('Email is already taken');
    }
    const user = await this.usersService.create(newUser);

    return await this.createPayloadWithToken(user);
  }

  async createPayloadWithToken(user: Users) {
    const payload = { sub: user.id, email: user.email };

    return {
      jwt_token: await this.jwtService.signAsync(payload),
    };
  }
}
