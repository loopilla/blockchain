export default class Transaction {
  constructor(
    public fromAddress: string,
    public toAddress: string,
    public amount: number
  ) {}
}
