import { User } from './entities/user.entity'; // схема таблицы
import { TypeOrmModule } from '@nestjs/typeorm'; // TypeORM для работы с БД
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // подключили схему таблицы БД
    TypeOrmModule.forFeature([User]), // аналог forRoot (в главном модуле), но уже в дополнительном модуле


    // JWToken - передаем при создании новго user 
    // JWT подключение и настройка (ключ, срок действия токена)
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '30d' }, // 30 дней в системе (авторизация)
      }),   
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // мы экспортировали в глобалку, что импортировать в auth.module.ts
})
export class UserModule {}
