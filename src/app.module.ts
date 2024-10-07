import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
import { TransactionModule } from './transaction/transaction.module';
import { ConfigModule, ConfigService } from '@nestjs/config'; // для подключения .env (db_port, db_password...)
import { TypeOrmModule } from '@nestjs/typeorm'; // TypeORM объектно-реляционный преобразователь (ORM)


@Module({
  imports: [
    AuthModule, 
    CategoryModule, 
    TransactionModule, 
    UserModule, 
    ConfigModule.forRoot({isGlobal: true}), // подключение .env - forRoot используется для корневого модуля (то есть этого файла)
    TypeOrmModule.forRootAsync({ // TypeORM для async интерграции БД. forRootAsync потому что выше еще подключение
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres', // тип postgres, не sql
        // далее конфигурация БД из .env 
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'), // + чтобы точно было - число
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        // __dirmane - верынул 'D:\Practic-JavaScript-2(laptop)\Fullstack-Nest-React\server'
      entities: [__dirname + '/**/*.entity{.js, .ts}'], // здесь наши сущности (их файлы .entity), для универсальности закодируем регулярное выражение
        synchronize: true,
      })
    }),
  ], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
