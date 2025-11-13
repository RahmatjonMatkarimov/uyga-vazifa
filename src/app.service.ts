import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private products: any = []
  get_all_product() {
    return this.products;
  }

  get_one_product(id: number) {
    const foundedProduct = this.products.find(item => item.id === +id)
    if (!foundedProduct) {
      throw new BadRequestException("mahsulot topilmadi")
    }
    return foundedProduct;
  }

  post_product(data: any) {
    const { id, title } = data

    if (!id || !title) {
      throw new BadRequestException("id va title topilmadi")
    }

    this.products.push({ id, title })

    return 'mahsulot yaratildi';
  }

  put_product(data: any, id: number) {
    const foundedProduct = this.products.findIndex(item => item.id === +id)

    if (foundedProduct === -1) {
      throw new BadRequestException("mahsulot topilmadi")
    }

    this.products[foundedProduct] = data
    return 'mahsulot yangilandi';
  }

  remove_product(id: number) {
    const foundedProduct = this.products.findIndex(item => item.id === +id)

    if (foundedProduct === -1) {
      throw new BadRequestException("mahsulot topilmadi")
    }

    this.products.splise(foundedProduct, 1)
    return "mahsulot o'chirildi";
  }
}
