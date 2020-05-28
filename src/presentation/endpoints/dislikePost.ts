import { Request, Response } from "express";
import { DislikePostUC } from "../../business/usecases/DislikePost";
import { DisLikePostDatabase } from "../../data/DisLikePostDatabase";
import { TokenManager } from "../../business/services/TokenManager";

export const dislikePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const uc = new DislikePostUC(
      new DisLikePostDatabase(),
      new TokenManager()
    )

    const result = await uc.execute({
      token: req.headers.authorization as string,
      postId: req.params.postId
    })

    res.status(200).send(result);

  } catch (err) {
    res.status(402).send({
      messager: err.message,
    });
  }
}