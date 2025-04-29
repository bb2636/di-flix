import { Response, NextFunction } from "express";
import { verify } from "../utils/jwt";
import { AuthRequest } from "./authrequest";

export const verifyToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "토큰이 없습니다." });
    return;
  }
  try {
    const decoded = verify<{
      user_id: number;
      email?: string;
      is_member?: boolean;
      is_deleted?: boolean;
    }>(token);

    // 토큰 내 is_deleted 값 확인 (탈퇴한 회원이면 접근 차단)
    if (decoded.is_deleted === false) {
      res.status(403).json({ error: "탈퇴한 회원입니다." });
      return;
    }

    req.user = {
      user_id: decoded.user_id,
      email: decoded.email,
      is_member: decoded.is_member,
      is_deleted: decoded.is_deleted,
    };

    next();
  } catch {
    res.status(401).json({ error: "유효하지 않은 토큰입니다." });
  }
};
