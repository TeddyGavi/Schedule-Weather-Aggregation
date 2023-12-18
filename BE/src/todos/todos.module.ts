import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todos } from './entities/todo.entity';
import { Users } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Todos, Users])],
  controllers: [TodosController],
  providers: [TodosService, UsersService],
  exports: [TodosService],
})
export class TodosModule {}
