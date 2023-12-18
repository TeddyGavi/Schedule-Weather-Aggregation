import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
@ApiTags('Users')
@ApiCookieAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/new')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('/all')
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/profile')
  findOne(@Req() req) {
    const { user_id } = req.user;
    return this.usersService.findOne(user_id);
  }

  @Patch('/update')
  update(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    const { user_id } = req.user;
    return this.usersService.update(user_id, updateUserDto);
  }

  @Delete('/delete')
  remove(@Req() req) {
    return this.usersService.remove(req.user.user_id);
  }
}
