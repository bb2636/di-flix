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

//로그인 여부 확인
export const getMyInfo = () => {
  return api.get("/users/me");
};

// 찜 추가
export const addWishlist = (movieId: number) => {
  return api.post(`/wishlist/${movieId}`);
};

// 찜 삭제
export const removeWishlist = (movieId: number) => {
  return api.delete(`/wishlist/${movieId}`);
};

// 찜 목록 조회
export const getWishlist = () => {
  return api.get("/wishlist/");
};

//찜 여부 체크
export const checkWishlist = (movieId: number) => {
  return api.get(`/wishlist/check/${movieId}`);
};
//이메일 중복 체크
export const checkEmailDuplicate = async (email: string): Promise<boolean> => {
  const res = await api.get(`/users/check-email`, {
    params: { email },
  });
  return res.data.duplicate; // 백엔드에서 { duplicate: true/false } 반환
};
