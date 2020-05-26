import { v4 } from 'uuid'
import { IdGeneratorGateway } from '../gateway/IdGenerator'

export class IdManager implements IdGeneratorGateway {
  public generateId(): string {
    return v4()
  }
}