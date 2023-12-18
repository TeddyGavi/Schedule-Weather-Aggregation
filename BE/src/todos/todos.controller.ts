import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  Request,
  Req,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import {
  ApiCookieAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Todos')
@ApiCookieAuth()
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Req() req, @Body() createTodoDto: CreateTodoDto) {
    console.log('hi from todos post', req.user, createTodoDto);
    createTodoDto.user_id = req.user.user_id;
    return this.todosService.create(createTodoDto);
  }

  @Get()
  @ApiOperation({ description: 'Finds all todos in DB' })
  findAll() {
    return this.todosService.findAll();
  }

  @Get('/user')
  @ApiOperation({ description: 'Finds all Todos by user id' })
  findTodosByUserId(@Req() req) {
    return this.todosService.findTodosbyUser(req.user.user_id);
  }

  @Get('/not')
  @ApiOperation({ description: 'finds all others todos' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'perPage', required: false, type: Number })
  findTodosByOthers(
    @Req() req,
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('perPage', new ParseIntPipe({ optional: true })) perPage?: number,
  ) {
    const { user_id } = req.user;
    return this.todosService.findOtherUsersTodos(user_id, page, perPage);
  }

  @Get('/one')
  findOne(@Req() req) {
    return this.todosService.findOne(req.user.user_id);
  }

  @Patch('/update/:id')
  update(
    @Param('id') id: string,
    @Req() req,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    return this.todosService.update(id, updateTodoDto);
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.todosService.remove(id);
  }
}
