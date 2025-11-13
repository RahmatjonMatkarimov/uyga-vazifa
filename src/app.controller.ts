import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }
  @Get()
  get_all_product() {
    return this.appService.get_all_product();
  }

  @Get()
  get_one_product(@Param("id") id: number) {
    return this.appService.get_one_product(id);
  }

  @Post()
  post_product(@Body() data: any) {
    return this.appService.post_product(data);
  }

  @Put()
  put_product(@Body() data: any, @Param("id") id: number) {
    return this.appService.put_product(data, id);
  }

  @Delete()
  remove_product(@Param("id") id: number) {
    return this.appService.remove_product(id);
  }
}
