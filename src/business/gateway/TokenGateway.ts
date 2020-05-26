export interface TokenGateway{
  generateToken(payload: any): string
  retrieveDataFromToken(token: string): any
}