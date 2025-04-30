import { Router } from "express";
import * as wishlistController from "../controllers/wishlistController";
import { verifyToken } from "../middlewares/login-required";

const wishlistRouter = Router();
//위시리스트 전체 조회
wishlistRouter.get("/", verifyToken, wishlistController.getWishlist);

//위시리스트 등록
wishlistRouter.post("/:movie_id", verifyToken, wishlistController.addWishlist);

//위시리스트 삭제
wishlistRouter.delete(
  "/:movie_id",
  verifyToken,
  wishlistController.removeWishlist,
);

wishlistRouter.get("/", verifyToken, wishlistController.getWishlist);

export default wishlistRouter;
