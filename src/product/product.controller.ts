import { Controller, Get, Post, Body, Param, Delete, HttpCode, Put, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { RolesGuard } from 'src/common/guard/roles.guard';
import { Roles } from 'src/common/decorator/roles.decarotor';
import { Role } from 'src/shared/constants/role.enum';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @HttpCode(201)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.User, Role.SuperAdmin)
  @HttpCode(200)
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.User, Role.SuperAdmin)
  @HttpCode(200)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @HttpCode(201)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @HttpCode(201)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
