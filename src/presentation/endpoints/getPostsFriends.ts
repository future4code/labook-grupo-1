import { TokenManager } from "../../business/services/TokenManager";
import { Request, Response } from "express";
import { PostsDatabase } from "../../data/PostsDatabase";
import { GetPostFeedUC } from "../../business/usecases/GetPostFeed";

export const getPostsFriends = async (req: Request, res: Response): Promise<void> => {
  try {
    const uc = new GetPostFeedUC(
      new PostsDatabase(),
      new TokenManager()
    )

    const result = await uc.execute(req.headers.authorization as string)

    res.status(200).send(result);
  } catch (err) {
    res.status(402).send({
      messager: err.message,
    });
  }
};
