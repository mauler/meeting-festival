import SimpleAdapter from './adapters';
import { WalletsDB } from './wallet';

const readlineSync = require('readline-sync');
const request = require('request');
const Table = require('cli-table');


function printWallets(walletsdb) {
  const table = new Table({ head: ['UID', 'Name', 'Funds'] });
  walletsdb.list().forEach(wallet => table.push([wallet.uid, wallet.name, wallet.funds]));
  console.log(table.toString());
}

function askWalletUID(walletsdb) {
  let wallet;
  do {
    const uid = readlineSync.question('Choose Wallet by UID: ');
    wallet = walletsdb.get(uid);
  } while (!wallet);

  const table = new Table();
  Object.entries(wallet).forEach(entry => table.push(entry));
  console.log(table.toString());

  return wallet;
}

export default function startShell() {
  console.log('Retrieving Wallets');

  request.get(
    'http://localhost:3000/wallets',
    (error, response, body) => {
      const walletsdb = new WalletsDB(new SimpleAdapter());
      walletsdb.loadJSON(body);

      printWallets(walletsdb);

      const wallet = askWalletUID(walletsdb);
      console.debug(wallet);
    },
  );

  console.log('Commands:');
}

// // Wait for user's response.
// const userName = readlineSync.question('May I have your name? ');
// console.log('Hi ' + userName + '!');

// // Handle the secret text (e.g. password).
// const favFood = readlineSync.question('What is your favorite food? ', {
//   hideEchoBack: true, // The typed text on screen is hidden by `*` (default).
// });
// console.log('Oh, ' + userName + ' loves ' + favFood + '!');
