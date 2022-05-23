import {SHA256} from 'crypto-js';
import {ec} from 'elliptic';

export default class Transaction {
  public signature: string | null = null;

  constructor(
    public fromAddress: string | null,
    public toAddress: string,
    public amount: number
  ) {}

  public calculateHash(): string {
    return SHA256(`
      ${this.fromAddress}
      ${this.toAddress}
      ${this.amount}
    `).toString();
  }

  public signTransaction(signingKey: ec.KeyPair) {
    if (signingKey.getPublic('hex') !== this.fromAddress) {
      throw Error('You cannot sign transaction for other wallets!');
    }
    const hashTransaction = this.calculateHash();
    const signature = signingKey.sign(hashTransaction, 'base64');
    this.signature = signature.toDER('hex');
  }

  public isValid(): boolean {
    if (!this.fromAddress) {
      return true;
    }

    if (!this.signature || !this.signature.length) {
      throw Error('No signature in this transaction!');
    }

    const context = new ec('secp256k1');
    const publicKey = context.keyFromPublic(this.fromAddress, 'hex');

    return publicKey.verify(this.calculateHash(), this.signature);
  }
}
