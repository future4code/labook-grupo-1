import { TokenManager } from "../../business/services/TokenManager";
import { Request, Response } from "express";
import { PostsDatabase } from "../../data/PostsDatabase";
import { GetPostFeedByTypeUC } from "../../business/usecases/GetPostFeedByType";

export const getPostsFeedByType = async (req: Request, res: Response): Promise<void> => {
  try {
    const uc = new GetPostFeedByTypeUC(
      new PostsDatabase(),
      new TokenManager()
    )

    const result = await uc.execute(req.headers.authorization as string, req.params.type)

    res.status(200).send(result);
  } catch (err) {
    res.status(402).send({
      messager: err.message,
    });
  }
};
