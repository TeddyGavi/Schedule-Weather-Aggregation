import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private UserRepository: Repository<Users>,
  ) {}

  async seedUsers(count: number) {
    if ((await this.countUsers()) > 0) return;
    const users = Array.from({ length: count }, () => {
      const user = new Users();
      user.firstName = faker.person.firstName();
      user.lastName = faker.person.lastName();
      user.email = faker.internet.email();
      user.password = '123';
      return user;
    });
    return this.UserRepository.save(users);
  }

  async countUsers(): Promise<number> {
    return await this.UserRepository.count();
  }
  create(createUserDto: CreateUserDto) {
    const user = this.UserRepository.create(createUserDto);
    return this.UserRepository.save(user);
  }

  findAll() {
    return this.UserRepository.find();
  }

  async findOne(id: string) {
    return await this.UserRepository.findOneBy({ id: id });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (user) {
      user.firstName = updateUserDto.firstName;
      user.lastName = updateUserDto.lastName;
      return await this.UserRepository.save(user);
    }
    return { user: 'Not Found' };
  }

  async remove(id: string) {
    const isRemoved = await this.UserRepository.delete({ id: id });
    return isRemoved.affected > 0
      ? { user: `User ${id} removed` }
      : { user: 'Not Found' };
  }
}
