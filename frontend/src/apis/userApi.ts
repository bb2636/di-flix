import axios from "axios";
import { SignupRequest, LoginRequest } from "../types/user";

//회원가입 api
export const signup = (signupData: SignupRequest) => {
  return axios.post("/users/signup", signupData);
};

// 로그인 API
export const login = (loginData: LoginRequest) => {
  return axios.post("/users/login", loginData);
};
