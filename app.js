import startShell from './shell';

const express = require('express');
const faker = require('faker');

const app = express();
const port = 3000;

const wallets = [];

function populateWallets(index, total) {
  faker.seed(index);
  for (let i = 0; i < total; i += 1) {
    wallets.push({
      funds: faker.random.number(20),
      name: faker.name.findName(),
      uid: i + index,
    });
  }
}

app.get('/wallets', (req, res) => {
  res.json(wallets);
});

app.get('/', (req, res) => {
  res.json('Hello World!');
});

app.listen(
  port,
  () => {
    console.log(`Example app listening on port ${port}!`);

    populateWallets(1, 5);

    startShell();
  },
);
