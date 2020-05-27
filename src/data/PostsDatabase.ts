import { BaseDatabase } from "./BaseDatabase";
import * as moment from "moment";
import { Post } from "../business/entity/Post";
import { PostGateway } from "../business/gateway/PostGateway";
import { FriendsDatabase } from "./FriendsDatabase";
import { UserDatabase } from "./UserDatabase";

export class PostsDatabase extends BaseDatabase implements PostGateway {
  static TABLE_NAME = "Posts";

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

  public async getFeed(id: string): Promise<Post[]> {
    const result = await this.setConnection().raw(`
    SELECT * FROM ${PostsDatabase.TABLE_NAME} p
    JOIN ${UserDatabase.TABLE_NAME} u ON u.id = p.user_id
    JOIN ${FriendsDatabase.TABLE_NAME} f ON p.user_id = f.friendsender_id OR p.user_id = f.friendreceiver_id
    WHERE (f.friendsender_id = "${id}" OR f.friendreceiver_id = "${id}") AND p.user_id <> "${id}"
    ORDER BY p.create_date DESC`);

    
    return result[0].map((post: any) => (
      
      new Post(
        post.id,
        post.picurl,
        post.description,
        post.user_id,
        post.type,
        moment.unix(post.create_date / 1000).format("DD/MM/YYYY")
      )
    ));
  }

  public async getFeedByType(type: string): Promise<any> {
    const result = await this.setConnection()
      .select("*")
      .from(PostsDatabase.TABLE_NAME)
      .where({ type })
      .orderBy("create_date", "desc");
    return result.map((post) => {
      return {
        id: post.id,
        picurl: post.picurl,
        description: post.description,
        createdAt: moment.unix(post.create_date / 1000).format("DD/MM/YY"),
        userId: post.user_id,
        type: post.type,
      };
    });
  }
}
