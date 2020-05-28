import { DisLikePost } from "../entity/DisLikePost";
import { DisLikePostGateway } from "../gateway/DisLikePostGateway";
import { TokenGateway } from "../gateway/TokenGateway";

export class DislikePostUC {
  constructor(
    private disLikePostDB: DisLikePostGateway,
    private tokenManager: TokenGateway
  ){}

  private validateInput(input: DislikePostUCInput): void {
    if (!input.postId || !input.token) {
      throw new Error("Preencha todos os campos");
    }
  }

  private retrieveUserId(token: string): any {
    return this.tokenManager.retrieveDataFromToken(token)
  }

  private async checkAlreadyLikePost(input: DisLikePost): Promise<void>{
    if(!await this.disLikePostDB.checkLikePost(input)){
      throw new Error('Você nem curtiu esse post')
    }
  }

  public async execute(input: DislikePostUCInput): Promise<DislikePostUCOutput> {
    this.validateInput(input)
    const userData = this.retrieveUserId(input.token)

    const dislike = new DisLikePost(
      input.postId,
      userData.id
    )

    await this.checkAlreadyLikePost(dislike)
    await this.disLikePostDB.dislikePost(dislike)

    return {
      message: 'Post descurtido'
    }
  }
}

interface DislikePostUCInput {
  token: string,
  postId: string,
}

interface DislikePostUCOutput {
  message: string
}