import SimpleAdapter from './adapters';
import { WalletsDB } from './wallet';

const Table = require('cli-table');

// const readlineSync = require('readline-sync');
const request = require('request');


export default function startShell() {
  console.log('Retrieving Wallets');

  request.get(
    'http://localhost:3000/wallets',
    (error, response, body) => {
      console.log('Wallets:');
      console.log(body);

      const table = new Table({ head: ['UID', 'Name', 'Funds'] });

      const wallets = JSON.parse(body);
      const walletsdb = new WalletsDB(new SimpleAdapter());

      wallets.forEach(wallet => table.push([wallet.uid, wallet.name, wallet.funds]));

      console.log(table.toString());

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
