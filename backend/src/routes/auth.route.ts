import express from "express";
import {
  register,
  login,
  logout,
  withdraw,
} from "../controllers/authController";
import { verifyToken } from "../middlewares/login-required";

const authrouter = express.Router();

authrouter.post("/signup", register);
authrouter.post("/login", login);
authrouter.post("/logout", logout);
authrouter.post("/withdraw", verifyToken, withdraw);

export default authrouter;
