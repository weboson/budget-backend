// заполнение данными таблицу в БД
import { User } from './../../user/entities/user.entity';
import { Category } from './../../category/entities/category.entity';
import { IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';
// ожидаемые входящие поля, для создания транзакции
export class CreateTransactionDto {
    @IsNotEmpty() // не пустой
    title: string;
    
    @IsNotEmpty()
    @IsNumber()
    amount: number; // количество валюты (доход/расход), например 1200 за март

    @IsString()
    @MinLength(6) // не меньше 6 символов
    type: 'expense' | 'income'; // тип может быть либо расход, либо доход
    
    @IsNotEmpty()
    category: Category;

    @IsOptional() // так как поле не вводиться пользователем, а передается аргументом  @Req в server\src\transaction\transaction.controller.ts
    //@IsNotEmpty()
    user: User
}
