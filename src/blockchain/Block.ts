import {SHA256} from 'crypto-js';
import Transaction from './Transaction';

export default class Block {
  public hash: string;
  public nonce = 0;

  constructor(
    private timestamp: number = Date.now(),
    public transactions: Array<Transaction>,
    public previousHash?: string
  ) {
    this.hash = this.calculateHash();
  }

  public calculateHash(): string {
    return SHA256(`
      ${this.previousHash}
      ${this.timestamp}
      ${JSON.stringify(this.transactions)}
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

  hasValidTransactions(): boolean {
    return this.transactions.every((transaction: Transaction) => {
      return transaction.isValid();
    });
  }
}
