export class Friendship {
  constructor(
    private SenderId: string,
    private ReceiverId: string,
  ) { }


  public getSenderId(): string {
    return this.SenderId
  }
  public getReceiverId(): string {
    return this.ReceiverId
  }
}