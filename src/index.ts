import Transaction from './blockchain/Transaction';
import BlockChain from './blockchain/BlockChain';
import {ec} from 'elliptic';
import Keys from './keys';

const difficulty = 3;

// Generate random private and publlic keys in a singleton
const keys = Keys.getInstance();

const context = new ec('secp256k1');

const myKey: ec.KeyPair = context.keyFromPrivate(keys.privateKey);
const myWalletAddress = myKey.getPublic('hex');

// Test BlockChain Phase 1
const chain = new BlockChain(difficulty);

const tx1 = new Transaction(myWalletAddress, 'toAddress', 10);
tx1.signTransaction(myKey);
chain.addTransaction(tx1);

console.log('\n Starting the miner..');
chain.minePendingTransaction(myWalletAddress);

console.log(`\nBalance of loop: ${chain.getBalanceOfAddress(myWalletAddress)}`);
