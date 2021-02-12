export interface JwtResponse {
    authorizationNonce: string,
    clientId: string,
    clientIdIssuedAt: string,
    clientSecret: string,
    clientSecretExpiresAt: number,
    id: number,
    tokenEndpointAuthMethod:string,
    user: number
}
