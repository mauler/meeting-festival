export default class Transaction {
  constructor(wallet, cart) {
    this.wallet = wallet;
    this.cart = cart;
  }
}

export class Queue {
  constructor(transactions = []) {
    this.transactions = transactions;
  }

  beginTransaction(transaction) {
    transaction.wallet.deductFunds(transaction.cart.getTotalSum());
    this.push(transaction);
  }

  endTransaction() {
    this.shift();
  }

  rollbackTransaction(transaction) {
    transaction.wallet.addFunds(transaction.cart.getTotalSum());
    this.shift();
  }

  clear() {
    this.transactions = [];
  }

  push(transaction) {
    this.transactions.push(transaction);
  }

  shift() {
    this.transactions.shift();
  }

  peekFront() {
    return this.transactions[0];
  }

  peekBack() {
    return this.transactions[this.transactions.length - 1];
  }

  isEmpty() {
    return !this.transactions.length;
  }
}
