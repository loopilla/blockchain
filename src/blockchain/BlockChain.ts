import Block from './Block';

export default class BlockChain<T> {
  private chain: Array<Block<T>> = [];

  constructor(data: T) {
    this.chain = [this.createGenezisBlock(data)];
  }

  private createGenezisBlock(data: T): Block<T> {
    return new Block<T>(0, Date.now(), data, '0');
  }

  public getLatestBlock(): Block<T> {
    return this.chain[this.chain.length - 1];
  }

  addBlock(block: Block<T>): void {
    block.previousHash = this.getLatestBlock().hash;
    block.hash = block.calculateHash();
    this.chain.push(block);
  }
}
