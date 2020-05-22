import { BaseDatabase } from "./BaseDatabase";
import moment from 'moment';

export class PostsDatabase extends BaseDatabase {

  static TABLE_NAME = "Posts";


  public async newPost(id: string, picurl: string, description: string, createDate: string, userId: string, type: string): Promise<void> {
    await this.setConnection()
      .insert({
        id,
        picurl,
        description,
        create_date: createDate,
        user_id: userId,
        type
      })
      .into(PostsDatabase.TABLE_NAME)
  }

//   public async getFeed(): Promise<any> {
//     const result = await this.setConnection()
//     .select("*")
//     .from(`${PostsDatabase.TABLE_NAME}`)
//     .leftJoin(`User`, "Recipe.user_id", `User.id`)
//     return result.map(recipe=>{return{
//       id: recipe.id,
//       title: recipe.title,
//       description: recipe.description,
//       createdAt: moment(recipe.create_date).format("DD/MM/YYYY"),
//       userId: recipe.user_id,
//       userName: recipe.name
//     }})
//   }
}