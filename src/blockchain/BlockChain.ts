import Block from './Block';

export default class BlockChain<T> {
  public chain: Array<Block<T>> = [];

  constructor(data: T) {
    this.chain = [this.createGenezisBlock(data)];
  }

  private createGenezisBlock(data: T): Block<T> {
    return new Block<T>(0, Date.now(), data, '0');
  }

  public getLatestBlock(): Block<T> {
    return this.chain[this.chain.length - 1];
  }

  public addBlock(block: Block<T>): void {
    block.previousHash = this.getLatestBlock().hash;
    block.hash = block.calculateHash();
    this.chain.push(block);
  }

  public isChainValid(): boolean {
    return this.chain.every(
      (currentBlock: Block<T>, index: number, wholeChain: Array<Block<T>>) => {
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
