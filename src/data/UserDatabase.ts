import { BaseDatabase } from "./BaseDatabase";
import { FriendsDatabase } from "./FriendsDatabase";
import * as moment from "moment";
import { UserGateway } from "../business/gateway/UserGateway";
import { User } from "../business/entity/User";

export class UserDatabase extends BaseDatabase implements UserGateway {
  private static TABLE_NAME = "User";

  public async createUser(
    user: User
  ): Promise<void> {
    await this.setConnection()
      .insert({
        id: user.getId(),
        name: user.getName(),
        email: user.getEmail(),
        password: user.getHash()
      })
      .into(UserDatabase.TABLE_NAME);
  }

  private toModel (dbmodel?: any): User| undefined {
    return dbmodel && new User(
      dbmodel.id, 
      dbmodel.password, 
      dbmodel.email, 
      dbmodel.name) 
  }

  public async getUserEmail(email: string): Promise<User | undefined>  {
    const result = await this.setConnection()
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ email });

     return this.toModel(result[0]);
  }

  public async getUserId(id: string): Promise<User> {
    const result = await this.setConnection()
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ id });

    return result[0];
  }
}
