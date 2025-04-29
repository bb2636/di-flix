import { Response } from "express";
import { AuthRequest } from "../middlewares/authrequest"; // 인증된 사용자 타입
import prisma from "../config/prisma"; // Prisma 클라이언트

// 🎯 컨텐츠 상세 조회 (멤버십 체크 포함)
export const getContentDetail = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.user_id;
  const movieId = parseInt(req.params.movie_id, 10);

  if (!userId) {
    res.status(401).json({ message: "로그인이 필요합니다." });
    return;
  }

  const user = await prisma.user.findUnique({
    where: { user_id: userId },
  });

  if (!user) {
    res.status(404).json({ message: "유저를 찾을 수 없습니다." });
    return;
  }

  if (!user.is_member) {
    res.status(403).json({ message: "멤버십 가입이 필요합니다." });
    return;
  }

  const content = await prisma.content.findUnique({
    where: { movie_id: movieId },
  });

  if (!content) {
    res.status(404).json({ message: "컨텐츠를 찾을 수 없습니다." });
    return;
  }

  res.status(200).json({ content });
};
