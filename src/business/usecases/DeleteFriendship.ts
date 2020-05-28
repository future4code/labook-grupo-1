import { FriendshipGateway } from "../gateway/FriendshipGateway";
import { UserGateway } from "../gateway/UserGateway";
import { TokenGateway } from "../gateway/TokenGateway";
import { Friendship } from "../entity/Friendship";

export class DeleteFriendshipUC {
  constructor(
    private friendshiDB: FriendshipGateway,
    private userGateway: UserGateway,
    private tokenManager: TokenGateway
  ){}

  private async validateInput(input: DeleteFriendshipUCInput): Promise<any> {
    if (!input.receiverId) {
      throw new Error("Preencha todos os campos");
    }
    if (await this.userGateway.getUserId(input.receiverId) === undefined) {
      throw new Error("Usuário não encontrado")
    }
    return this.tokenManager.retrieveDataFromToken(input.token)
  }

  private  checkFriendship(relation: Friendship | undefined): void {
    if (!relation){
      throw new Error("Amizade não existe")
    }
  }

  public async execute(input: DeleteFriendshipUCInput): Promise<DeleteFriendshipUCOutput>{
    const senderData = await this.validateInput(input)

    const friendship = new Friendship(
      senderData.id,
      input.receiverId,
    )

    const result: Friendship | undefined = await this.friendshipGateway.checkFriendship(friendship)
    this.checkFriendship(result)

    await this.friendshiDB.deleteFriendship(friendship)

    return {
      message: "Amizade deletada com sucesso"
    }
  }
}

interface DeleteFriendshipUCInput {
  receiverId: string,
  token: string
}

interface DeleteFriendshipUCOutput {
  message: string
}