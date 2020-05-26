import { Request, Response } from "express";
import { CreateUserUC } from "../../business/usecases/CreateUser";
import { UserDatabase } from "../../data/UserDatabase";
import { IdManager } from "../../business/services/IdManager";
import { HashManager } from "../../business/services/HashManager";
import { TokenManager } from "../../business/services/TokenManager";


export const signup = async (req: Request, res: Response) => {
  try {
    const uc = new CreateUserUC(
      new UserDatabase(),
      new IdManager(),
      new HashManager(),
      new TokenManager()
    )

    const result =  await uc.execute({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })

    res.status(200).send(result);
  } catch (err) {
    res.status(402).send({
      messager: err.message,
    });
  }
};
