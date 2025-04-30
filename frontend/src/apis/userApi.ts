import api from "./axios";
import { SignupRequest, LoginRequest } from "../types/user";

//회원가입 api
export const signup = (signupData: SignupRequest) => {
  return api.post("/users/signup", signupData); //쿠키 자동 포함
};

// 로그인 API
export const login = (loginData: LoginRequest) => {
  return api.post("/users/login", loginData);
};
