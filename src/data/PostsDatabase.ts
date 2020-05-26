import { BaseDatabase } from "./BaseDatabase";
import * as moment from "moment";

export class PostsDatabase extends BaseDatabase {
  static TABLE_NAME = "Posts";

  public async newPost(
    id: string,
    picurl: string,
    description: string,
    createDate: number,
    userId: string,
    type: string
  ): Promise<void> {
    await this.setConnection()
      .insert({
        id,
        picurl,
        description,
        create_date: createDate,
        user_id: userId,
        type,
      })
      .into(PostsDatabase.TABLE_NAME);
  }

  public async getFeed(id: string): Promise<any> {
    const result = await this.setConnection().raw(`
    SELECT * minus f.friendsender_id FROM Posts p
    JOIN friends f ON f.friendreceiver_id = p.user_id
    WHERE f.friendsender_id = "${id}" 
    ORDER BY p.create_date DESC`);

    return result[0].map((post: any) => {
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

  public async getFeedType(type: string): Promise<any> {
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
