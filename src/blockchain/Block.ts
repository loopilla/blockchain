import {SHA256} from 'crypto-js';

export default class Block<T> {
  public hash: string;

  constructor(
    private index: number = 0,
    private timestamp: number = Date.now(),
    public data: T,
    public previousHash?: string
  ) {
    this.hash = this.calculateHash();
  }

  public calculateHash(): string {
    return SHA256(`
      ${this.index}
      ${this.previousHash}
      ${this.timestamp}
      ${JSON.stringify(this.data)}
    `).toString();
  }
}
