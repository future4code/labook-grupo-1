import { UserGateway } from '../gateway/UserGateway'
import { IdGeneratorGateway } from '../gateway/IdGenerator';
import { User } from '../entity/User';
import { HashGateway } from '../gateway/HashGateway';
import { TokenGateway } from '../gateway/TokenGateway';

export class CreateUserUC {
  constructor(
    private userDB: UserGateway,
    private idGenerator: IdGeneratorGateway,
    private hashManager: HashGateway,
    private tokenManager: TokenGateway
  ) { }

  private id: string = this.idGenerator.generateId()

  private validateInput(input: CreateUserUCInput): void {
    if (!input.email || !input.name || !input.password) {
      throw new Error("Preencha todos os campos");
    }
  }

  public async execute(input: CreateUserUCInput): Promise<CreateUserUCOutput> {
    this.validateInput(input)

    const user = new User(
      this.id,
      await this.hashManager.generateHash(input.password),
      input.email,
      input.name
    )

    await this.userDB.createUser(user)

    return {
      token: this.tokenManager.generateToken({ id: this.id })
    }
  }
}

interface CreateUserUCInput {
  name: string,
  email: string,
  password: string
}

interface CreateUserUCOutput {
  token: string
}