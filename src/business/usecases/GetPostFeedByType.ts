import { TokenGateway } from "../gateway/TokenGateway"
import { PostGateway } from "../gateway/PostGateway"
import { Post, PostType } from "../entity/Post"

export class GetPostFeedByTypeUC {
  constructor(
    private postGateway: PostGateway,
    private tokenManager: TokenGateway
  ){}

  private validateInput(userToken: string, postType: string): void {
    if(!userToken || !postType){
      throw new Error ('Enviar todos os parâmetros')
    }
  }

  private mapStringToPostType(type: string): PostType {
    switch (type) {
      case "normal":
        return PostType.NORMAL
      case "evento":
        return PostType.EVENTO
      default:
        return PostType.NORMAL
    }
  }

  private retrieveUserId(token: string): any {
    return this.tokenManager.retrieveDataFromToken(token)
  }

  public async execute(userToken: string, postType: string) : Promise<Post[]>{
    this.validateInput(userToken, postType)
    const userData = this.retrieveUserId(userToken)
    const type = this.mapStringToPostType(postType)
    return await this.postGateway.getFeedByType(userData.id, type)
  }
}