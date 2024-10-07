import { AuthorGuard } from './../guard/author.guard'; // проверка на авторство (может ли текущий user полученить/удалить/обновить определенную category или transaction)
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes, UseGuards, Req, Query } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

// http://localhost:3000/api/transaction
@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @UsePipes(new ValidationPipe()) // валидация
  @UseGuards(JwtAuthGuard) // проверка на авторизацию пользователя
  create(@Body() createTransactionDto: CreateTransactionDto, @Req() req) {
    return this.transactionService.create(createTransactionDto, +req.user.id);
  }

  //! Для суммирования дохода или расхода: expense' | 'income';
  @Get(':type/find') // type - это переменная == 'expense' или  'income'
  @UseGuards(JwtAuthGuard) // проверка на авторизацию пользователя
  findAllByType(@Req() req, @Param('type') type: string) {
    return this.transactionService.findAllByType(+req.user.id, type)
  }
  
  // Pagination - важно, чтобы был в начале (после @Post)
  //url/transactions/pagination?page=1&limit=3
  @Get('pagination') // отдельный роут (url)
  @UseGuards(JwtAuthGuard) // проверка на авторизацию пользователя
  // метод
  findAllWithPagination(@Req() req, @Query('page') page: number, @Query('limit') limit: number) {
    // id из JwtAuthGuard (auth.service.ts), который, если пользователь авторизован, то передает ему и id, email 
    return this.transactionService.findAllWithPagination(+req.user.id, +page, +limit) // http://localhost:3000/api/transactions/__pagination?page=1&limit=1__
  }


  @Get()
  @UseGuards(JwtAuthGuard) // проверка на авторизацию пользователя
  findAll( @Req() req) {
    return this.transactionService.findAll(+req.user.id);
  }

  // :type для проверки на авторство
  @Get(':type/:id') //url/transactions or categories/'transaction' or 'category'/id
  @UseGuards(JwtAuthGuard, AuthorGuard) // проверка на авторизацию и авторство пользователя
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(+id);
  }

  @Patch(':type/:id')
  @UseGuards(JwtAuthGuard, AuthorGuard) // проверка на авторизацию и авторство пользователя
  update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionService.update(+id, updateTransactionDto);
  }

  @Delete(':type/:id')
  @UseGuards(JwtAuthGuard, AuthorGuard) // проверка на авторизацию и авторство пользователя
  remove(@Param('id') id: string) {
    return this.transactionService.remove(+id);
  }

}
