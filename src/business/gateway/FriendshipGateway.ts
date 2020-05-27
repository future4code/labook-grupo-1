import { Friendship } from '../entity/Friendship'

export interface FriendshipGateway{
  createFriendship(relation: Friendship): Promise<void>

  checkFriendship(relation: Friendship): Promise<any>

  deleteFriendship(relation: Friendship): Promise<void>
}