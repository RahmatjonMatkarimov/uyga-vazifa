import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @EventPattern("hello1")
  getHello1(data: any) {
    return data
  }
  @EventPattern("hello2")
  getHello2(data: any) {
    return data
  }
}
