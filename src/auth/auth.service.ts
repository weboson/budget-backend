// логика валидации
import { UserService } from './../user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as argon2 from "argon2"; // https://www.npmjs.com/package/argon2 - хэширование password
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/types/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    ) {}

  //  валидация на совпадения полей
  async validateUser(email: string, password: string) {
    const user = await this.userService.findOne(email); // используем метод findOne из userService, чтобы найти пользователя ПО ТАКОМУ 'email'
    // валидируем password с помощью argon2, который также расшифровывает (хэш) password
    const passwordIsMatch = await argon2.verify(user.password, password); // user-а которого нашли по 'email', мы также проверим схожесть password с тем который вводиться (аргумент)


    if (user && passwordIsMatch) { // если user по 'email' найден и пароли совпадают
      return user
    }
    throw new UnauthorizedException('User or password are incorrect'); // иначе ошибка с сообщением
  }


  // метод для формирования и отправки клиенту JWToken
  async login(user: IUser) { // IUser {id: string, email: string}
    // const payload = { id: user.id, email: user.email };
    const {id, email} = user;
    return {
      id, 
      email, 
      // jwtService должен быть подключен в server\src\auth\auth.module.ts
      token: this.jwtService.sign({ id: user.id, email: user.email }), // и возращается клиенту сформированный токен из всех данных (id, email)
    };
  }
}
