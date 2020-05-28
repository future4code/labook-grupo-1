import { TokenGateway } from "../gateway/TokenGateway"
import { PostGateway } from "../gateway/PostGateway"
import { Post } from "../entity/Post"

export class GetPostFeedUC {
  constructor(
    private postDB: PostGateway,
    private tokenManager: TokenGateway
  ){}

  private validateInput(userToken: string): void {
    if(!userToken){
      throw new Error ('Usuário não encontrado, fazer login novamente')
    }
  }

  private retrieveUserId(token: string): any {
    return this.tokenManager.retrieveDataFromToken(token)
  }

  public async execute(userToken: string) : Promise<Post[]>{
    this.validateInput(userToken)
    const userData = this.retrieveUserId(userToken)
    
    return await this.postDB.getFeed(userData.id)
  }
}