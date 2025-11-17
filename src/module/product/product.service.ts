import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product) private productModele: typeof Product) { }
  async create(createProductDto: CreateProductDto) {
    const { title, prise, description } = createProductDto
    return await this.productModele.create({ title, prise, description });
  }

  async findAll() {
    const products = await this.productModele.findAll()
    return products;
  }

  async findOne(id: number) {
    const product = await this.productModele.findByPk(+id)

    if (!product) {
      throw new NotFoundException("prodoct not found")
    }

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(+id)
    product.update(updateProductDto)
    return { message: 'updated product' };
  }

  async remove(id: number) {
    const product = await this.productModele.findOne({ where: { id } })

    if (!product) {
      throw new NotFoundException("prodoct not found")
    }

    await this.productModele.destroy({ where: { id } })
    return { message: "product deleted" };
  }
}
