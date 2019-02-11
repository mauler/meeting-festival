class Adapter {
  // eslint-disable-next-line
  insertRecord(record) {
    throw new Error('You must implement this method');
  }

  // eslint-disable-next-line
  retrieveRecord(uid) {
    throw new Error('You must implement this method');
  }
}

export default class SimpleAdapter extends Adapter {
  constructor() {
    super();
    this.db = {};
  }

  insertRecord(record) {
    this.db[record.uid] = record;
  }

  retrieveRecord(uid) {
    return this.db[uid];
  }
}
