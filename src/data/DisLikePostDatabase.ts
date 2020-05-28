import { BaseDatabase } from "./BaseDatabase";
import { DisLikePostGateway } from "../business/gateway/DisLikePostGateway";
import { DisLikePost } from "../business/entity/DisLikePost";

export class DisLikePostDatabase extends BaseDatabase implements DisLikePostGateway {
  static TABLE_NAME = "PostLikeRelation"

  private toModel(dbModel?: any): DisLikePost | undefined {
    return dbModel && new DisLikePost(
      dbModel.post_id,
      dbModel.user_id
    )
  }
  
  public async likePost(input: DisLikePost): Promise<void> {
    await this.setConnection()
    .insert({
      post_id: input.getPostId(),
      user_id: input.getUserId()
    })
    .into(DisLikePostDatabase.TABLE_NAME)
  }
  public async dislikePost(input: DisLikePost): Promise<void> {
    await this.setConnection()(DisLikePostDatabase.TABLE_NAME)
    .delete()
    .where({
      post_id: input.getPostId(),
      user_id: input.getUserId()
    })
  }
  
  public async checkLikePost(input: DisLikePost): Promise<DisLikePost | undefined> {
     const result = await this.setConnection()
    .select('*')
    .from(DisLikePostDatabase.TABLE_NAME)
    .where({
      post_id: input.getPostId(),
      user_id: input.getUserId()
    })

    return this.toModel(result[0])
  }
}