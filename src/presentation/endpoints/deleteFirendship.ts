import { TokenManager } from "../../business/services/TokenManager";
import { Request, Response } from "express";
import { FriendsDatabase } from "../../data/FriendsDatabase";
import { UserDatabase } from "../../data/UserDatabase";
import { DeleteFriendshipUC } from "../../business/usecases/DeleteFriendship";

export const deleteFriendship = async (req: Request, res: Response): Promise<void> => {
  try {
    const uc = new DeleteFriendshipUC(
      new FriendsDatabase(),
      new UserDatabase(),
      new TokenManager()
    )

    const result = await uc.execute({
      token: req.headers.authorization as string,
      receiverId: req.body.friendReceiverId
    })

    res.status(200).send(result);
  } catch (err) {
    res.status(402).send({
      messager: err.message,
    });
  }
};