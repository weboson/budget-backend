import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); // http://localhost:3000/api
  app.enableCors(); // “CORS” (Cross-Origin Resource Sharing - совместное использование ресурсов между источниками)
  await app.listen(3000);
}
bootstrap();
