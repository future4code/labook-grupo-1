export class User {
  constructor(
    private id:string,
    private password: string,
    private email: string,
    private name: string
  ){}
  

  public getId(): string {
    return this.id
  }
  public getHash():string {
    return this.password
  }
  public getEmail(): string{
    return this.email
  }
  public getName():string{
    return this.name
  }
}