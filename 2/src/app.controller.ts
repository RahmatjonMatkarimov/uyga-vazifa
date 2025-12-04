import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, @Inject('MATH_SERVICE') private cliendServise: ClientProxy) { }

  @Get()
  getHello(): string {
    this.cliendServise.emit("hello1", '1')
    return this.appService.getHello();
  }
}
