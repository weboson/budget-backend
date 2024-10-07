import { Controller, Get, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

// http://localhost:3000/api/user
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // добавление нового пользователя + GET => JWToken
  @Post()
  @UsePipes( new ValidationPipe()) // в middleware добавили валидацию (промежуточная задача)
//(получим тело() запишем его в createUserDto: и ожидаемый тип полей это - "CreateUserDto"). 
//В данном случаем, мы будем ожидать поля email и password 
  create(@Body() createUserDto: CreateUserDto) { 
    return this.userService.create(createUserDto); // логика используется из модуля userService
  }

}
