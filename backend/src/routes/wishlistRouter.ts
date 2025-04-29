import { Router } from "express";
import * as wishlistController from "../controllers/wishlistController";
import { verifyToken } from "../middlewares/login-required";

const wishlistRouter = Router();

wishlistRouter.post("/:movie_id", verifyToken, wishlistController.addWishlist);
wishlistRouter.delete(
  "/:movie_id",
  verifyToken,
  wishlistController.removeWishlist,
);
wishlistRouter.get("/:movie_id", verifyToken, wishlistController.getWishlist);

export default wishlistRouter;
