export class Post {
  constructor(
    private id:string,
    private picURL: string,
    private description: string,
    private userCreatorId: string,
    private type: PostType,
    private createdAt: number | string
  ){}
  

  public getId(): string {
    return this.id
  }
  public getPicURL():string {
    return this.picURL
  }
  public getDescription(): string{
    return this.description
  }
  public getUserCreatorId():string{
    return this.userCreatorId
  }
  public getType():string{
    return this.type
  }
  public getCreatedAt():number | string{
    return this.createdAt
  }
}

export enum PostType {
  NORMAL = "normal",
  EVENTO = 'eveno'
}