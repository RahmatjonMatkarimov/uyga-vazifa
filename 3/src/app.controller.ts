import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, @Inject('MATH_SERVICE') private cliendServise: ClientProxy) { }

  @Get()
  getHello(): string {
    this.cliendServise.emit("hello2", '2')
    return this.appService.getHello();
  }
}
