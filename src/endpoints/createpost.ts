import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from '../services/TokenManager'
import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { PostsDatabase } from "../data/PostsDatabase";
import moment from 'moment';


export const createPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = req.headers.authorization as string;

    const postData = {
      picurl: req.body.picurl,
      description: req.body.description,
      type: req.body.type
    }

    if(postData.type !== "normal" || postData.type !== "evento"){
        throw new Error("Tipo de post invalido.")
    }

    const postDate: string = moment().format("YYYY-MM-DD");

    const tokenManager = new TokenManager();
    const tokenData = tokenManager.retrieveDataFromToken(token);

    const idGenerator: any = new IdGenerator();
    const id: string = idGenerator.generateId();

    const newPostsDatabase = new PostsDatabase();
    await newPostsDatabase.newPost(id, postData.picurl, postData.description, postDate, tokenData.id, postData.type);

    res.status(200).send({
      sucess: "Post criado com sucesso."
    })

  } catch (err) {
    res.status(402).send({
      messager: err.message
    })
  }
}