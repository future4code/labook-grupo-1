import * as bcrypt from "bcryptjs"
import { HashGateway } from "../gateway/HashGateway"

export class HashManager implements HashGateway {
    public async generateHash(password: string): Promise<string> {
        const cost = Number(process.env.BCRYPT_COST)
        const salt = await bcrypt.genSalt(cost)
        const hash = await bcrypt.hash(password, salt)

        return hash
    }

    public async compareHash(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash)
    }
}