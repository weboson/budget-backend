import { TransactionService } from './../transaction/transaction.service';
import { Transaction } from './../transaction/entities/transaction.entity';
import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm'; // TypeORM для интеграции БД
import { Category } from './entities/category.entity'; // схема (таблица) для БД

@Module({
  imports: [TypeOrmModule.forFeature([Category, Transaction])], // подключили TypeOrm модуль с таблицей - для интеграции с БД
  controllers: [CategoryController],
  providers: [CategoryService, TransactionService]
})
export class CategoryModule {}
