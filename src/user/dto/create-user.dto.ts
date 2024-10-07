// ожидаемый тип данных (user должен ввести именно такие поля "email", "password")
// пакет для валидации (входящих данных в БД)
import { IsEmail, MinLength } from "class-validator"

export class CreateUserDto {
// валидация на Email
    @IsEmail() 
    email: string
    
// валидация на минимальное количество символов в строке
    @MinLength(6, { message: 'Password must be more then 6 symbols' }) // Пароль должен быть больше 6 символов
    password: string
}
