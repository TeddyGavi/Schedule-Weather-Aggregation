import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Users } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, enteredPassword: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    const passwordsMatch = await bcrypt.compare(enteredPassword, user.password);
    if (!passwordsMatch) {
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
    const payload = { user_id: user.id };

    return await this.jwtService.signAsync(payload);
  }

  async logout() {
    return 'hi from service';
  }
}
