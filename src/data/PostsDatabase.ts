import { BaseDatabase } from "./BaseDatabase";
import * as moment from "moment";
import { Post, PostType } from "../business/entity/Post";
import { PostGateway } from "../business/gateway/PostGateway";
import { FriendsDatabase } from "./FriendsDatabase";
import { UserDatabase } from "./UserDatabase";

export class PostsDatabase extends BaseDatabase implements PostGateway {
  static TABLE_NAME = "Posts";

  private toModel(dbModel?: any[]): Post[] {
    let postArray: Post[] = []
    return dbModel ?
      postArray = dbModel.map((post: any) => (
        new Post(
          post.id,
          post.picurl,
          post.description,
          post.user_id,
          post.type,
          moment.unix(post.create_date / 1000).format("DD/MM/YYYY")
        )
      )) :
      postArray
  }

  public async createPost(post: Post): Promise<void> {
    await this.setConnection()
      .insert({
        id: post.getId(),
        picurl: post.getPicURL(),
        description: post.getDescription(),
        create_date: post.getCreatedAt(),
        user_id: post.getUserCreatorId(),
        type: post.getType()
      })
      .into(PostsDatabase.TABLE_NAME);
  }

  public async getFeed(userId: string): Promise<Post[]> {
    const result = await this.setConnection().raw(`
    SELECT * FROM ${PostsDatabase.TABLE_NAME} p
    JOIN ${FriendsDatabase.TABLE_NAME} f ON p.user_id = f.friendsender_id OR p.user_id = f.friendreceiver_id
    WHERE (f.friendsender_id = "${userId}" OR f.friendreceiver_id = "${userId}") AND p.user_id <> "${userId}"
    ORDER BY p.create_date DESC`);

    return this.toModel(result[0])
  }

  public async getFeedByType(userId: string, postType: PostType): Promise<Post[]> {
    const result = await this.setConnection().raw(`
    SELECT * FROM ${PostsDatabase.TABLE_NAME} p
    JOIN ${FriendsDatabase.TABLE_NAME} f ON p.user_id = f.friendsender_id OR p.user_id = f.friendreceiver_id
    WHERE (f.friendsender_id = "${userId}" OR f.friendreceiver_id = "${userId}") AND p.user_id <> "${userId}" 
    AND p.type = "${postType}"
    ORDER BY p.create_date DESC`);

    return this.toModel(result[0])
  }

  public async getPostById(postId: string): Promise<Post[]>{
    const result = await this.setConnection().raw(`
    SELECT * FROM ${PostsDatabase.TABLE_NAME}
    WHERE id = "${postId}" 
    `);

    return this.toModel(result[0])
  }
}

