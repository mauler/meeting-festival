import DB from './database';

export default class Product {
  constructor(uid, price) {
    this.uid = uid;
    this.price = price;
  }
}

export function sumProducts(products) {
  return products.reduce((total, product) => total + product.price, 0);
}

export class ProductsDB extends DB {
  // eslint-disable-next-line class-methods-use-this
  makeRecord(row) {
    return new Product(row.uid, row.price);
  }
}
