import { HashManager } from "../../business/services/HashManager";
import { UserDatabase } from "../../data/UserDatabase";
import { TokenManager } from "../../business/services/TokenManager";
import { Request, Response } from "express";
import { LoginUC } from "../../business/usecases/Login";

export const login = async (req: Request, res: Response) => {
  try {
    const uc = new LoginUC(
      new UserDatabase(),
      new HashManager(),
      new TokenManager()
    )

    const result = await uc.execute({
      email: req.body.email,
      password: req.body.password
    })

    res.status(200).send(result);

  } catch (err) {
    res.status(402).send({
      message: err.message,
    });
  }
};