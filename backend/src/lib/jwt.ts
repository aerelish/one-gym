import { ENV } from '#config/env.js';
import jwt, { JwtPayload, Secret, SignOptions } from 'jsonwebtoken';

const JWT_SECRET: Secret = ENV.jwtSecret;
const JWT_EXPIRES_IN = ENV.jwtExpiresIn as SignOptions['expiresIn'];

export interface TokenPayload {
	email: string;
}

/**
 * signToken takes a payload and generates a JWT token
 * @param payload - the data you want to include in the token, {email: string} in our case
 * @returns signed JWT token as a string
 *
 * Note: you can include any data you want in the payload, but make sure not to include sensitive information like passwords or user IDs. The payload is not encrypted, just base64 encoded, so anyone can decode it and see the contents. Only include non-sensitive information that you need to verify on the client side.
 *
 * For example, you could include the user's role in the token if you want to do role-based authentication on the client side.
 *
 * For now, we'll just include the email since that's all we need to verify the user's identity.
 */
export const signToken = (payload: TokenPayload): string => {
	return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

/**
 * verifyToken takes a JWT token and verifies it using the secret
 * @param token - the JWT token to verify
 * @returns the decoded payload if the token is valid and throws an error if the token is invalid or expired
 *
 * Note: the return type is JwtPayload & TokenPayload because the decoded token will include both the standard JWT claims (like iat, exp, etc.) and our custom payload (e.g. email).
 */
export const verifyToken = (token: string) => {
	return jwt.verify(token, JWT_SECRET) as JwtPayload & TokenPayload;
};
