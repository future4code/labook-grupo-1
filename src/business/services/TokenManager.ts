import * as jwt from "jsonwebtoken"
import { TokenGateway } from "../gateway/TokenGateway"


export class TokenManager implements TokenGateway {
  public generateToken(payload: any): string {
    return jwt.sign(
      payload,
      process.env.JWT_KEY as string,
      { expiresIn: "20min" }
    )
  }

  public retrieveDataFromToken(token: string): any {
    return jwt.verify(token, process.env.JWT_KEY as string)
  }
}

