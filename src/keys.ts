import {ec} from 'elliptic';

export default class Keys {
  private static instance: Keys;
  public privateKey: string;
  public publicKey: string;

  private constructor() {
    const keys = this.generateKeys();
    this.privateKey = keys[0];
    this.publicKey = keys[1];
  }

  public static getInstance(): Keys {
    if (!Keys.instance) {
      Keys.instance = new Keys();
    }
    return Keys.instance;
  }

  private generateKeys(): Array<string> {
    const context = new ec('secp256k1');

    const key = context.genKeyPair();

    return [key.getPrivate('hex'), key.getPublic('hex')];
  }
}
