import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "your_secret_key";

interface TokenPayload {
    user_Id: number;
    email: string;
    is_member: boolean;
    is_deleted: boolean;
  }
  
export const generateToken = (payload: TokenPayload): string => {
    return jwt.sign(payload, secret, { expiresIn: '1h' });
  };

export const verify = <TPayload extends object>(token: string): TPayload => {
  return jwt.verify(token, secret) as TPayload;
};