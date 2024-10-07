import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthorGuard } from 'src/guard/author.guard';

// http://localhost:3000/api/category
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post() // отпаврить новые данные (создание категории и сохранение в БД)
  // охранник Guard - проверка JWToken текущего пользователя (залогинен ли?)
  @UseGuards(JwtAuthGuard) // получим через @Req - объект user и соответственно user.id
  @UsePipes(new ValidationPipe()) // валидация от Nest 
  create(@Body() createCategoryDto: CreateCategoryDto, @Req() req) {
    return this.categoryService.create(createCategoryDto, +req.user.id);
  }

  @Get() // получить все категории (текущего пользователя)
  @UseGuards(JwtAuthGuard) // проверим текущего пользователя на токен, и получим его user.id
  findAll(@Req() req) {
    return this.categoryService.findAll(+req.user.id); // поиск в cateries по полю user_id: текущий user
  }

  @Get(':type/:id') // получить одну категорию
  @UseGuards(JwtAuthGuard, AuthorGuard)
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':type/:id') // обновление
  @UseGuards(JwtAuthGuard, AuthorGuard) // так же проверка на авторизацию
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':type/:id')
  @UseGuards(JwtAuthGuard, AuthorGuard) // так же проверка на авторизацию, чтобы иметь права на удаление
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
