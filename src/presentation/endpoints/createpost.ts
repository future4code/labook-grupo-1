import { Request, Response } from "express";
import { IdManager } from "../../business/services/IdManager";
import { TokenManager } from "../../business/services/TokenManager";
import { PostsDatabase } from "../../data/PostsDatabase";
import { CreatePostUC } from "../../business/usecases/CreatePost";

export const createPost = async (req: Request, res: Response): Promise<void> => {
  try {
   const uc = new CreatePostUC(
     new PostsDatabase(),
     new IdManager(),
     new TokenManager(),
   )

   const result = await uc.execute({
    picURL: req.body.picURL,
    description: req.body.description,
    userCreatorToken: req.headers.authorization as string,
    type: req.body.type
   })

    res.status(200).send(result);
  } catch (err) {
    res.status(402).send({
      messager: err.message,
    });
  }
};

