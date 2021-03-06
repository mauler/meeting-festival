import DB from './database';

export default class Wallet {
  constructor(uid, name, funds) {
    this.uid = uid;
    this.name = name;
    this.funds = funds;
  }

  addFunds(amount) {
    this.funds += amount;
  }

  deductFunds(amount) {
    this.funds -= amount;
  }
}

export class WalletsDB extends DB {
  // eslint-disable-next-line class-methods-use-this
  makeRecord(row) {
    return new Wallet(row.uid, row.name, row.funds);
  }
}
