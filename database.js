export default class DB {
  constructor(adapter) {
    this.adapter = adapter;
  }

  get(uid) {
    return this.adapter.retrieveRecord(uid);
  }

  loadJSON(source) {
    source.forEach((row) => {
      const record = this.makeRecord(row);
      this.adapter.insertRecord(record);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  makeRecord() {
    throw new Error('You must implement this method');
  }
}
