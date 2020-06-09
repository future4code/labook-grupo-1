export class Comment {
  constructor(
    private id: string,
    private comment: string,
    private userId: string,
    private postId: string
  ) {}

  public getId(): string {
    return this.id;
  }

  public getComment(): string {
    return this.comment;
  }

  public getUserId(): string {
    return this.userId;
  }

  public getPostId(): string {
    return this.postId;
  }
}
