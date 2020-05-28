export class DisLikePost{
  constructor(
    private postId: string,
    private userId: string,
  ){}

  public getUserId(): string{
    return this.userId
  }

  public getPostId(): string{
    return this.postId
  }
}