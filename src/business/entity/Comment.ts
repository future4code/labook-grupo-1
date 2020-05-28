export class Comment {
  constructor(
    private id:string,
    private userCreatorId: string,
    private content: string,
    private postId: string
  ){}
  

  public getId(): string {
    return this.id
  }
  public getUserCreatorId():string {
    return this.userCreatorId
  }
  public getContent(): string{
    return this.content
  }
  public getPostId():string{
    return this.postId
  }
}