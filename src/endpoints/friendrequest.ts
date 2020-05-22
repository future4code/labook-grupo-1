import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from '../services/TokenManager'
import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import moment from 'moment';
import { UserDatabase } from "../data/UserDatabase";
import { FriendsDatabase } from "../data/FriendsDatabase";


export const createFriendship = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = req.headers.authorization as string;

    const friendData = {
        friendReceiverId: req.body.friendReceiverId
    }

    const tokenManager = new TokenManager()
    const tokenData = tokenManager.retrieveDataFromToken(token);

    const friendRequest = new FriendsDatabase();
    const friendCheck = await friendRequest.checkFriendship(tokenData.id, friendData.friendReceiverId)
    if(friendCheck){
        throw new Error("Amizade ja existe.")
    }
    await friendRequest.createFriendship(tokenData.id, friendData.friendReceiverId)

    res.status(200).send({
      sucess: "Amizade criada com sucesso!"
    })

  } catch (err) {
    res.status(402).send({
      messager: err.message
    })
  }
}