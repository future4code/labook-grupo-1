import { DisLikePost } from "../entity/DisLikePost";
import { DisLikePostGateway } from "../gateway/DisLikePostGateway";
import { TokenGateway } from "../gateway/TokenGateway";

export class LikePostUC {
  constructor(
    private disLikePostDB: DisLikePostGateway,
    private tokenManager: TokenGateway
  ){}

  private validateInput(input: LikePostUCInput): void {
    if (!input.postId || !input.token) {
      throw new Error("Preencha todos os campos");
    }
  }

  private retrieveUserId(token: string): any {
    return this.tokenManager.retrieveDataFromToken(token)
  }

  private async checkAlreadyLikePost(input: DisLikePost): Promise<void>{
    if(await this.disLikePostDB.checkLikePost(input)){
      throw new Error('Você já curtiu esse post')
    }
  }

  public async execute(input: LikePostUCInput): Promise<LikePostUCOutput> {
    this.validateInput(input)
    const userData = this.retrieveUserId(input.token)

    const like = new DisLikePost(
      input.postId,
      userData.id
    )

    await this.checkAlreadyLikePost(like)
    await this.disLikePostDB.likePost(like)

    return {
      message: 'Post curtido'
    }
  }
}

interface LikePostUCInput {
  token: string,
  postId: string,
}

interface LikePostUCOutput {
  message: string
}