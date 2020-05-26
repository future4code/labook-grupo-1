import { User } from "../entity/User";

export interface UserGateway {
  createUser(user: User): Promise<void>

  getUserEmail(email:string): Promise<User | undefined> 

  getUserId(id:string): Promise<User>

}