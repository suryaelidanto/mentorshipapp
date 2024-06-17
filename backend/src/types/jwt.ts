export type ClerkJWTPayload = {
  exp: number; // expiration time in Unix timestamp
  iat: number; // issued at time in Unix timestamp
  iss: string; // issuer URL
  nbf: number; // not before time in Unix timestamp
  sid: string; // session ID
  sub: string; // user ID
};
