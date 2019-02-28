import Cart from './cart';
import { ProductsDB } from './product';
import SimpleAdapter from './adapters';
import Transaction, { Queue } from './transaction';
import { WalletsDB } from './wallet';
import postTransaction from './service';


test('tests main flow', () => {
  // Wallets sample
  const wallets = new WalletsDB(new SimpleAdapter());

  wallets.loadJSON(JSON.stringify([
    { uid: 666, name: 'Paulo', funds: 15 },
    { uid: 55, name: 'Roberto', funds: 15 },
  ]));

  // Products sample
  const products = new ProductsDB(new SimpleAdapter());

  products.loadJSON(JSON.stringify([
    { uid: 1001, name: 'Beer', price: 5 },
    { uid: 1002, name: 'Vodka', price: 10 },
  ]));

  // Queue sending transaction to the server
  const queue = new Queue();

  // User reads the Wristband using Tablet RFID reader
  const wallet = wallets.get(666);

  // Creates a new Cart using Wallet funds
  const cart = new Cart(wallet.funds);

  // Retrieve products for future usage
  const beer = products.get(1001);

  const vodka = products.get(1002);

  // User taps beer, add to the cart
  console.assert(cart.addProduct(beer));

  // User taps vodka add to the cart
  console.assert(cart.addProduct(vodka));

  // User taps vodka add to the cart, no funds available, it fails
  console.assert(!cart.addProduct(vodka));

  // Retrieve Total to be displayed on the interface
  console.assert(cart.getTotalSum() === (beer.price + vodka.price));

  // Declares wallet transaction
  const transaction = new Transaction(wallet, cart);

  // Adds the transaction to the queue and begins it, funds are deducted from the Wallet
  queue.beginTransaction(transaction);

  // OFC the Queue is not empty anymore
  console.assert(!queue.isEmpty());

  // Posts transaction, synchronous for testing (Actually does nothing)
  postTransaction(queue, (q) => {
    q.endTransaction();
  });
});
