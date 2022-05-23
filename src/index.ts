import Transaction from './blockchain/Transaction';
import BlockChain from './blockchain/BlockChain';

const difficulty = 3;

// Test BlockChain Phase 1
const chain = new BlockChain(new Transaction('', '', 0), difficulty);

chain.createTransaction(new Transaction('address1', 'address2', 100));
chain.createTransaction(new Transaction('address2', 'address1', 50));

console.log('\n Starting the miner..');
chain.minePendingTransaction('loop');

console.log('\n Starting the miner..');
chain.minePendingTransaction('loop');

chain.createTransaction(new Transaction('loop', 'address1', 50));

console.log('\n Starting the miner..');
chain.minePendingTransaction('loop');

console.log(`\nBalance of loop: ${chain.getBalanceOfAddress('loop')}`);
