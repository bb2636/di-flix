import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

interface TokenPayload {
    userId: number;
    email: string;
    is_member: boolean;
  }
  
  export const generateToken = (payload: TokenPayload): string => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
  };

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};