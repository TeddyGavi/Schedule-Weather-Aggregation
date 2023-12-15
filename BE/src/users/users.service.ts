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
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
