import { BaseDatabase } from "./BaseDatabase";
import { Friendship } from "../business/entity/Friendship";
import { FriendshipGateway } from "../business/gateway/FriendshipGateway";

export class FriendsDatabase extends BaseDatabase implements FriendshipGateway {
  public static TABLE_NAME = "friends";

  private toModel(dbModel?:any): Friendship | undefined {
    return dbModel && new Friendship(
      dbModel.SenderId,
      dbModel.ReceiverId
    )
  }

  public async createFriendship(relation: Friendship): Promise<void> {
    await this.setConnection()
      .insert({
        friendsender_id: relation.getSenderId(),
        friendreceiver_id: relation.getReceiverId()
      })
      .into(FriendsDatabase.TABLE_NAME);
  }

  public async checkFriendship(relation: Friendship): Promise<Friendship | undefined> {
    const result = await this.setConnection()
      .select("*")
      .from(FriendsDatabase.TABLE_NAME)
      .where({
        friendsender_id: relation.getSenderId(),
        friendreceiver_id: relation.getReceiverId(),
      })
      .orWhere({
        friendsender_id: relation.getReceiverId(),
        friendreceiver_id: relation.getSenderId(),
      });

      return this.toModel(result[0])
  }

  public async deleteFriendship(relation: Friendship): Promise<void> {
    await this.setConnection()(FriendsDatabase.TABLE_NAME)
    .delete()
    .where({
      friendsender_id: relation.getSenderId(),
      friendreceiver_id: relation.getReceiverId(),
    })
    .orWhere({
      friendsender_id: relation.getReceiverId(),
      friendreceiver_id: relation.getSenderId(),
    });
  }
}
