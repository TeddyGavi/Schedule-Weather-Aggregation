import { Injectable, OnModuleInit } from '@nestjs/common';
import { TodosService } from 'src/todos/todos.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    private readonly UserService: UsersService,
    private readonly TodoService: TodosService,
  ) {}

  async onModuleInit() {
    console.log('seeding...');
    await this.seedDb();
  }

  async seedDb() {
    await this.UserService.seedUsers(5);
    const users = await this.UserService.findAll();
    await this.TodoService.seedTodos(100, users);
  }
}
