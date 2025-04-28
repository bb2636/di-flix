import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: {
    user_id: number;
    email?: string;
    is_member?: boolean;
    is_deleted?: boolean;
  };
}