import express from "express";
import * as wishlistController from "../controllers/wishlistController";
import { verifyToken } from "../middlewares/login-required";

const router = express.Router();

router.use(verifyToken);
router.get("/", wishlistController.getWishlist);
router.post("/:movie_id", wishlistController.addWishlist);
router.delete("/:movie_id", wishlistController.removeWishlist);
router.get("/check/:movie_id", wishlistController.checkWishlist);

export default router;
