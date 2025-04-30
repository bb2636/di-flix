import api from "./axios";
import { SignupRequest, LoginRequest } from "../types/user";

// 회원가입 API
export const signup = (signupData: SignupRequest) => {
  return api.post("/users/signup", signupData); // 쿠키 자동 포함
};

// 로그인 API
export const login = (loginData: LoginRequest) => {
  return api.post("/users/login", loginData); // 쿠키 자동 포함
};

// 로그아웃 API
export const logout = () => {
  return api.post("/users/logout"); // 서버에서 쿠키 삭제
};

// 회원탈퇴 API
export const withdrawUser = () => {
  return api.delete("/users/withdraw"); // 유저 탈퇴 처리
};

// 위시리스트 조회 (마이페이지용)
export const getWishlist = () => {
  return api.get("/wishlist");
};
