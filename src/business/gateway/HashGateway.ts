export interface HashGateway{
  generateHash(password: string): Promise<string>
  compareHash(password: string, hash: string): Promise<boolean>
}