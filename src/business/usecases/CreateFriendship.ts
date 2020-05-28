import { Friendship } from "../entity/Friendship";
import { FriendshipGateway } from "../gateway/FriendshipGateway";
import { TokenGateway } from "../gateway/TokenGateway";
import { UserGateway } from "../gateway/UserGateway";

export class CreateFriendshipUC {
  constructor(
    private friendshiDB: FriendshipGateway,
    private userGateway: UserGateway,
    private tokenManager: TokenGateway
  ) { }

  private async validateInput(input: CreateFriendshipUCInput): Promise<any> {
    if (!input.receiverId) {
      throw new Error("Preencha todos os campos");
    }
    if (await this.userGateway.getUserId(input.receiverId) === undefined) {
      throw new Error("Usuário não encontrado")
    }
    return this.tokenManager.retrieveDataFromToken(input.token)
  }

  private  checkFriendship(relation: Friendship | undefined): void {
    if (relation){
      throw new Error("Amizade já existe")
    }
  }


  public async execute(input: CreateFriendshipUCInput): Promise<CreateFriendshipUCOutput> {
    const senderId = await this.validateInput(input)

    const friendship = new Friendship(
      senderId.id,
      input.receiverId,
    )

    const result: Friendship | undefined = await this.friendshipGateway.checkFriendship(friendship)
    this.checkFriendship(result)

    await this.friendshiDB.createFriendship(friendship)

    return {
      message: "Amizade criada com sucesso"
    }
  }

}

interface CreateFriendshipUCInput {
  receiverId: string,
  token: string
}

interface CreateFriendshipUCOutput {
  message: string
}