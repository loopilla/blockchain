import Block from './blockchain/Block';
import BlockChain from './blockchain/BlockChain';

type Data = {
  message: string;
};

// Test BlockChain Phase 1
const chain = new BlockChain<Data>(<Data>{
  message: 'Genezis block',
});

chain.addBlock(
  new Block<Data>(1, Date.now(), {
    message: 'Firs block',
  })
);

chain.addBlock(
  new Block<Data>(2, Date.now(), {
    message: 'Second block',
  })
);

console.log(JSON.stringify(chain, null, 4));