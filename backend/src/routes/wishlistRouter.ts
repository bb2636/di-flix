import { Router } from "express";
import * as wishlistController from "../controllers/wishlistController";
import { verifyToken } from "../middlewares/login-required";

const wishlistRouter = Router();

wishlistRouter.post(
  "/wishlist/:movie_id",
  verifyToken,
  wishlistController.addWishlist,
);
wishlistRouter.delete(
  "/wishlist/:movie_id",
  verifyToken,
  wishlistController.removeWishlist,
);
wishlistRouter.get("/wishlist", verifyToken, wishlistController.getWishlist);

export default wishlistRouter;
