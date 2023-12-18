import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todos } from './entities/todo.entity';
import { Not, Repository } from 'typeorm';
import { Users } from 'src/users/entities/user.entity';
import { faker } from '@faker-js/faker';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todos)
    private TodosRepository: Repository<Todos>,
  ) {}

  async seedTodos(count: number, users: Users[]) {
    if ((await this.countAll()) > 0) return;
    const todos: Todos[] = [];
    for (let i = 0; i < count; i++) {
      const randomUserIndex = Math.floor(Math.random() * users.length);
      const randomUser = users[randomUserIndex];
      const todo = new Todos();
      (todo.task = `${faker.word.sample()} ${faker.word.verb()}`),
        (todo.user = randomUser);
      todo.created_at = faker.date.recent();
      todos.push(todo);
    }
    return this.TodosRepository.save(todos);
  }
  async create(createTodoDto: CreateTodoDto) {
    const todo = this.TodosRepository.create(createTodoDto);
    console.log(todo);
    return await this.TodosRepository.save(todo);
  }

  async countAll(): Promise<number> {
    return await this.TodosRepository.count();
  }

  async findTodosbyUser(id: string) {
    const todosByUser = await this.TodosRepository.find({
      where: {
        user: { id: id },
      },
    });
    return todosByUser;
  }

  async findOtherUsersTodos(id: string, page = 1, pageSize = 10) {
    const skip = (page - 1) * pageSize;
    const todosByOthers = await this.TodosRepository.query(
      `SELECT t.*, u.firstName AS ownerFirstName
      FROM todos t
      LEFT JOIN users u ON t.userId = u.id
      WHERE t.userId != ? 
      ORDER BY t.created_at DESC 
      LIMIT ?, ?`,
      [id, skip, pageSize],
    );

    const count = await this.TodosRepository.query(
      `SELECT COUNT(*) AS totalCount
      FROM todos
      WHERE userId != ?`,
      [id],
    );
    return {
      todosByOthers,
      count: +count[0].totalCount,
      totalPages: Math.ceil(+count[0].totalCount / pageSize),
    };
  }

  async findAll() {
    return await this.TodosRepository.find();
  }

  async findOne(id: string) {
    return await this.TodosRepository.findOneBy({ id: id });
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    const todo = await this.findOne(id);
    if (!todo) return { todo: 'Not Found' };
    todo.completed = updateTodoDto.completed;
    const date = new Date();
    todo.completed_at = date;

    return await this.TodosRepository.save(todo);
  }

  async remove(id: string) {
    const isRemoved = await this.TodosRepository.delete({ id: id });
    return isRemoved.affected > 0
      ? { todo: `todo ${id} deleted` }
      : { todo: 'Not Found' };
  }
}
