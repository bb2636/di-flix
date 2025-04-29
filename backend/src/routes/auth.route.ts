import express from "express";
import {
  register,
  login,
  logout,
  withdraw,
} from "../controllers/authController";
import { verifyToken } from "../middlewares/login-required";

const authrouter = express.Router();

authrouter.post("/users/signup", register);
authrouter.post("/users/login", login);
authrouter.post("/users/logout", logout);
authrouter.post("/users/withdraw", verifyToken, withdraw);

export default authrouter;
