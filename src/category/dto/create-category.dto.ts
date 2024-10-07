// ожидаемый тип данных для Categories - какие поля (столбцы) ожидаются при вводе новой категории User-ом

// пакет для валидации (входящих данных в БД)
import { IsNotEmpty, IsOptional } from "class-validator";
import { User } from "src/user/entities/user.entity";


export class CreateCategoryDto {
    @IsNotEmpty() // поле обязательное для заполнения (не пустое)
    title: string

    @IsOptional() // не обязательное поле
    user?: User // типа User

}
