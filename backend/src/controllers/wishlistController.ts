import { Response } from "express";
import * as wishlistService from "../services/wishlistService";
import { AuthRequest } from "../middlewares/authrequest";

export const addWishlist = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.user_id;
  const movieId = Number(req.params.movie_id);

  if (!userId || isNaN(movieId)) {
    res.status(400).json({ message: "잘못된 요청" });
    return;
  }

  try {
    await wishlistService.addWishlist(userId, movieId);
    res.status(201).json({ message: "찜 추가 완료" });
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};

export const removeWishlist = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.user_id;
  const movieId = Number(req.params.movie_id);

  if (!userId || isNaN(movieId)) {
    res.status(400).json({ message: "잘못된 요청" });
    return;
  }

  try {
    await wishlistService.removeWishlist(userId, movieId);
    res.status(200).json({ message: "찜 삭제 완료" });
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};

export const getWishlist = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.user_id;

  if (!userId) {
    res.status(401).json({ message: "로그인이 필요합니다." });
    return;
  }

  try {
    const wishlist = await wishlistService.getWishlist(userId);
    res.status(200).json({ wishlist });
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};
