import { LikeDeslikeDatabase } from "../data/LikeDeslikeDatabase";

export class LikeDeslikeBusiness {
  public async likeDeslike(postId: string, UserId: string) {
    const likeDeslikeDataBase = new LikeDeslikeDatabase();

    let response;

    const verifyLike = await likeDeslikeDataBase.verify(postId, UserId);

    if (!verifyLike) {
      await likeDeslikeDataBase.addLike(postId, UserId);
      return (response = " added like");
    }

    if (verifyLike) {
      await likeDeslikeDataBase.removeLike(postId, UserId);
      return (response = " removed like");
    }

    return response;
  }
}
