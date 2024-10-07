// расшифровка токена, с последующей проверкой на сходство (в localSorage(кэш браузера) и в БД)
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'; // чтобы взять ключ из .env
import { IUser } from 'src/types/types'; // наш тип user

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) { // чтобы получить ключ, подключили ConfigService для работы с .env 
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // JWT будет извлечен
      ignoreExpiration: false, // если JWToken истек срок действия, то запрос будет отклонен и 401 
      secretOrKey: configService.get('JWT_SECRET'), // наш секретный ключ из .env
    });
  }

  async validate(user: IUser) { // объект user
    return { id: user.id, email: user.email }; // возращение на фронт
  }
}