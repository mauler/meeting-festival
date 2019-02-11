export default class Order {
  constructor(uid = null) {
    this.uid = uid;
  }

  addProduct(product) {
    console.log(this.uid);
    console.debug(product);
  }
}
