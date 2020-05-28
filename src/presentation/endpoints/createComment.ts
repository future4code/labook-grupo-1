import { Request, Response } from "express";
import { CreateCommentPostUC } from "../../business/usecases/CreateCommentPost";
import { CommentDatabase } from "../../data/CommentDatabase";
import { IdManager } from "../../business/services/IdManager";
import { TokenManager } from "../../business/services/TokenManager";
import { PostsDatabase } from "../../data/PostsDatabase";

export const createComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const uc = new CreateCommentPostUC(
      new CommentDatabase(),
      new IdManager(),
      new TokenManager(),
      new PostsDatabase()
    )

    await uc.execute({
      token: req.headers.authorization as string,
      postId: req.params.postId,
      content: req.body.comment
    })
    res.status(200).send({message: "Comment send"});
  } catch (err) {
    res.status(400).send({
      messager: err.message,
    });
  }
}