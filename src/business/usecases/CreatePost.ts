import { PostType, Post } from "../entity/Post";
import { IdGeneratorGateway } from "../gateway/IdGenerator";
import { TokenGateway } from "../gateway/TokenGateway";
import { PostGateway } from "../gateway/PostGateway";
import * as moment from 'moment'

export class CreatePostUC {
  constructor(
    private postDB: PostGateway,
    private idGenerator: IdGeneratorGateway,
    private tokenManager: TokenGateway
  ) { }

  private validateInput(input: CreatePostUCInput): void {
    if (!input.description || !input.userCreatorToken || !input.type || !input.picURL) {
      throw new Error("Preencha todos os campos");
    }
  }

  private retrieveUserId(token: string): any {
    return this.tokenManager.retrieveDataFromToken(token)
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

  public async execute(input: CreatePostUCInput): Promise<CreatePostUCOutput> {
    this.validateInput(input)
    const userData = this.retrieveUserId(input.userCreatorToken)

    const post = new Post(
      this.idGenerator.generateId(),
      input.picURL,
      input.description,
      userData.id,
      this.mapStringToPostType(input.type),
      moment.now()
    )

    await this.postDB.createPost(post)

    return {
      message: 'Post criado com sucesso'
    }
  }
}

interface CreatePostUCInput {
  picURL: string,
  description: string,
  userCreatorToken: string,
  type: string,
}

interface CreatePostUCOutput {
  message: string
}