import { BaseDatabase } from "./BaseDatabase";
import { CommentGateway } from "../business/gateway/CommentGateway";
import { Comment } from "../business/entity/Comment";

export class CommentDatabase extends BaseDatabase implements CommentGateway{
  static TABLE_NAME = "Comments";

  public async createComment(comment: Comment): Promise<void> {
    await this.setConnection()
    .insert({
      id: comment.getId(),
      comment: comment.getContent(),
      user_id: comment.getUserCreatorId(),
      post_id: comment.getPostId()
    })
    .into(CommentDatabase.TABLE_NAME)
  }

}