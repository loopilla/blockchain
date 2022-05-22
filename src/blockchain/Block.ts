import {SHA256} from 'crypto-js';

export default class Block<T> {
  public hash: string;
  public nonce = 0;

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
      ${this.nonce}
    `).toString();
  }

  public mine(difficulty: number) {
    const pattern = Array(difficulty + 1).join('0');
    while (this.hash.substring(0, difficulty) !== pattern) {
      this.nonce++;
      this.hash = this.calculateHash();
    }

    console.log(`Block mined: ${this.hash}`);
  }
}
