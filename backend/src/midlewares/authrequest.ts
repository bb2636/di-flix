import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: {
    user_Id: number;
    email?: string;
    is_member?: boolean;
    is_deleted?: boolean;
  };
}