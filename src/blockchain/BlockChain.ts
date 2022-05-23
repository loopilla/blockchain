import Block from './Block';
import Transaction from './Transaction';

export default class BlockChain {
  public chain: Array<Block> = [];
  public pendingTransactions: Array<Transaction> = [];
  public miningReward = 100;

  constructor(data: Transaction, private difficulty = 2) {
    this.chain = [this.createGenezisBlock(data)];
  }

  private createGenezisBlock(data: Transaction): Block {
    return new Block(Date.now(), [data], '0');
  }

  public minePendingTransaction(miningRewareAddress: string) {
    const block = new Block(Date.now(), this.pendingTransactions);
    block.mine(this.difficulty);

    console.log('Block succesfully mined!');

    this.chain.push(block);

    this.pendingTransactions = [
      new Transaction('', miningRewareAddress, this.miningReward),
    ];
  }

  getBalanceOfAddress(address: string) {
    return this.chain.reduce((amount: number, block: Block) => {
      return block.transactions.reduce(
        (blockAmount: number, transaction: Transaction) => {
          if (transaction.fromAddress === address) {
            blockAmount -= transaction.amount;
          }

          if (transaction.toAddress === address) {
            blockAmount += transaction.amount;
          }
          return blockAmount;
        },
        0
      );
    }, 0);
  }

  public createTransaction(transaction: Transaction): void {
    this.pendingTransactions.push(transaction);
  }

  public getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  public addBlock(block: Block): void {
    block.previousHash = this.getLatestBlock().hash;
    block.mine(this.difficulty);
    this.chain.push(block);
  }

  public isChainValid(): boolean {
    return this.chain.every(
      (currentBlock: Block, index: number, wholeChain: Array<Block>) => {
        if (index === 0) {
          return true;
        }
        const previousBlock = wholeChain[index - 1];

        if (currentBlock.hash !== currentBlock.calculateHash()) {
          return false;
        }

        if (currentBlock.previousHash !== previousBlock.hash) {
          return false;
        }
        return true;
      }
    );
  }
}
