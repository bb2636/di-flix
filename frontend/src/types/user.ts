// 회원가입 요청 타입
export interface SignupRequest {
    email: string;
    password: string;
  }

// 로그인 요청 타입
export interface LoginRequest {
    email: string;
    password: string;
  }