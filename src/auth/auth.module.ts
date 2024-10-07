
// модуль аутентификации  user-а, то есть проверка на email и password
import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
// стратегия валидации
import { LocalStrategy } from './strategies/local.strategy'; // базовая стратегия (валидность)
import { JwtStrategy } from './strategies/jwt.strategy'; // стратегия для JWT токена (проверка на сходство токена: в браузере и в БД)
import { JwtModule } from '@nestjs/jwt'; 
import { ConfigService } from '@nestjs/config'; // чтобы взять ключ из .env
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ 
    UserModule, 
    PassportModule,
// JWT подключение и настройка (ключ, срок действия токена)
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '30d' }, // 30 дней в системе (авторизация)
      }),   
    }),

  ], // чтобы могли получать данные user (для валидности, проверки)
  
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy ],
})
export class AuthModule {}
