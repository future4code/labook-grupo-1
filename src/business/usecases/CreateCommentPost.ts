import { CommentGateway } from "../gateway/CommentGateway";
import { PostGateway } from "../gateway/PostGateway";
import { TokenGateway } from "../gateway/TokenGateway";
import { IdGeneratorGateway } from "../gateway/IdGenerator";
import { Comment } from "../entity/Comment";

export class CreateCommentPostUC {
  constructor(
    private commentDB: CommentGateway,
    private idGenerator: IdGeneratorGateway,
    private tokenManager: TokenGateway,
    private postDB: PostGateway
  ) { }

  private validateInput(input: CommentPostUCInput): void {
    if (!input.token || !input.postId || !input.content) {
      throw new Error("Preencha todos os campos");
    }
  }

  private retrieveUserId(token: string): any {
    return this.tokenManager.retrieveDataFromToken(token)
  }

  private async checkPostExist(postId: string): Promise<void> {
    if ((await this.postDB.getPostById(postId)).length > 0) {
      throw new Error("Post não encontrado");
    }
  }

  public async execute(input: CommentPostUCInput): Promise<void> {
    this.validateInput(input)
    const userData = this.retrieveUserId(input.token)

    this.checkPostExist(input.postId)

    const comment = new Comment(
      this.idGenerator.generateId(),
      userData.id,
      input.content,
      input.postId
    )

    await this.commentDB.createComment(comment)
  }
}

interface CommentPostUCInput {
  token: string,
  postId: string,
  content: string
}