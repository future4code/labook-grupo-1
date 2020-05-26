import { BaseDatabase } from "./BaseDatabase";
import { FriendsDatabase } from "./FriendsDatabase";
import * as moment from "moment";

export class UserDatabase extends BaseDatabase {
  private static TABLE_NAME = "User";

  public async createUser(
    id: string,
    name: string,
    email: string,
    password: string
  ): Promise<void> {
    await this.setConnection()
      .insert({
        id,
        name,
        email,
        password,
      })
      .into(UserDatabase.TABLE_NAME);
  }

  public async getUserEmail(email: string): Promise<any> {
    const result = await this.setConnection()
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ email });

    return result[0];
  }

  public async getUserId(id: string): Promise<any> {
    const result = await this.setConnection()
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ id });

    return result[0];
  }
}
