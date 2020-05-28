import { TokenGateway } from "../gateway/TokenGateway";
import { User } from "../entity/User";
import { UserGateway } from "../gateway/UserGateway";
import { HashGateway } from "../gateway/HashGateway";

export class LoginUC {
  constructor(
    private userDB: UserGateway,
    private hashManager: HashGateway,
    private tokenManager: TokenGateway
  ) { }

  private validateInput(input: LoginUCInput): void {
    if (!input.email || !input.password) {
      throw new Error("Preencha todos os campos");
    }
  }

  private verifyUser(input: User | undefined): void {
    if (!input) {
      throw new Error("Usuário não encontrado");
    }
  }

  private async checkHash(password: string, hash: string): Promise<boolean> {
    return await this.hashManager.compareHash(password, hash)
  }

  public async execute(input: LoginUCInput): Promise<LoginUCOutput> {
    this.validateInput(input)
    
    const user: User | undefined = await this.userDB.getUserEmail(input.email)
    this.verifyUser(user)
    
    this.checkHash(input.password, user!.getHash())

    return {
      token: this.tokenManager.generateToken({id: user!.getId()})
    } 
  }
}

interface LoginUCInput {
  email: string,
  password: string
}

interface LoginUCOutput {
  token: string
}