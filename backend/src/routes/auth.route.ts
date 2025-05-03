import express from "express";
import {
  register,
  login,
  logout,
  withdraw,
  me,
} from "../controllers/authController";
import { verifyToken } from "../middlewares/login-required";

const authrouter = express.Router();

authrouter.post("/signup", register);
authrouter.post("/login", login);
authrouter.post("/logout", logout);
authrouter.delete("/withdraw", verifyToken, withdraw);
authrouter.get("/me", verifyToken, me);
export default authrouter;
