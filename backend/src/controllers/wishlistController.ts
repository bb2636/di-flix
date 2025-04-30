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

  await wishlistService.addWishlist(userId, movieId);
  res.status(201).json({ message: "찜 추가 완료" });
};

export const removeWishlist = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.user_id;
  const movieId = Number(req.params.movie_id);

  if (!userId || isNaN(movieId)) {
    res.status(400).json({ message: "잘못된 요청" });
    return;
  }

  await wishlistService.removeWishlist(userId, movieId);
  res.status(200).json({ message: "찜 삭제 완료" });
};

export const getWishlist = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.user_id;

  if (!userId) {
    res.status(401).json({ message: "로그인 필요" });
    return;
  }

  const wishlist = await wishlistService.getWishlist(userId);
  res.status(200).json({ wishlist });
};
