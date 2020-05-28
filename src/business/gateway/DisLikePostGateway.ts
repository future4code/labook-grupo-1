import { DisLikePost } from "../entity/DisLikePost";

export interface DisLikePostGateway {
  likePost(input: DisLikePost): Promise<void>

  dislikePost(input: DisLikePost): Promise<void>

  checkLikePost(input: DisLikePost): Promise<DisLikePost | undefined>
}