import express from "express";
import {
  register,
  login,
  logout,
  withdraw,
  me,
  checkEmailDuplicate,
} from "../controllers/authController";
import { verifyToken } from "../middlewares/login-required";

const authrouter = express.Router();

authrouter.post("/signup", register);
authrouter.post("/login", login);
authrouter.post("/logout", logout);
authrouter.delete("/withdraw", verifyToken, withdraw);
authrouter.get("/me", verifyToken, me);
authrouter.get("/check-email", checkEmailDuplicate);
export default authrouter;
