import { sumProducts } from './product';

export default class Cart {
  constructor(funds) {
    this.funds = funds;
    this.products = [];
  }

  addProduct(product) {
    const total = this.getTotalSum() + product.price;
    if (total <= this.funds) {
      this.products.push(product);
      return true;
    }
    return false;
  }

  getTotalSum() {
    return sumProducts(this.products);
  }
}
