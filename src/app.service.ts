import { Injectable } from '@nestjs/common';


let dir = __dirname
@Injectable()
export class AppService {
  getHello(): string {
    return dir; // просто проверил путь: D:\Practic-JavaScript-2(laptop)\Fullstack-Nest-React\server\dist
  }
}
