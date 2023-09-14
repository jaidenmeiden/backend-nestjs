import { Injectable } from '@nestjs/common';
import { Product } from './../entities/product.entity';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Nice!',
      price: 111,
      image: '',
      stock: 11,
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'Good!',
      price: 222,
      image: '',
      stock: 22,
    },
    {
      id: 3,
      name: 'Product 3',
      description: 'Excellent!',
      price: 333,
      image: '',
      stock: 33,
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    return this.products.find((item) => item.id === id);
  }

  create(payload: any) {
    const newProduct = {
      id: this.products.length + 1,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }
}