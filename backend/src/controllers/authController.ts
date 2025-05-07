import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/authrequest";
import {
  signup,
  login as serviceLogin,
  withdrawUser,
  isEmailDuplicate,
} from "../services/auth.service";
import prisma from "../config/prisma";

// 회원가입
export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await signup({
      email,
      password,
      is_member: false,
      is_deleted: false,
    });
    res.status(201).json({ message: "회원가입 성공", ...result });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.";
    console.error(err);

    if (message === "이미 가입된 이메일입니다.") {
      res.status(400).json({ message });
    } else {
      res.status(500).json({ message: "서버 오류" });
    }
  }
};

// 로그인
export const login = async (req: Request, res: Response) => {
  try {
    const token = await serviceLogin(req.body);
    //토큰 쿠키로 받기
    res
      .cookie("token", token.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 1000, // 1시간
      })
      .status(200)
      .json({ message: "로그인 성공", ...token });
    return;
  } catch (err) {
    const message = err instanceof Error ? err.message : "서버 오류";
    console.error(err);

    if (
      ["유효하지 않은 이메일 또는 비밀번호", "탈퇴한 회원입니다."].includes(
        message,
      )
    ) {
      res.status(400).json({ message });
    } else {
      res.status(500).json({ message: "서버 오류" });
    }
  }
};

//로그아웃
export const logout = (req: Request, res: Response) => {
  // 쿠키에 토큰이 저장되어 있다면 삭제
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // HTTPS 환경에서만 쿠키 전송
    sameSite: "lax",
  });

  res.status(200).json({ message: "로그아웃 되었습니다." });
};

//회원탈퇴
export const withdraw = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.user_id;

  if (!userId) {
    res.status(401).json({ message: "인증이 필요합니다." });
    return;
  }

  try {
    await withdrawUser(userId); // ✅ 서비스 함수 호출
    res.clearCookie("token"); // ✅ 쿠키 삭제
    res.status(200).json({ message: "탈퇴 성공" });
  } catch (err) {
    console.error("회원탈퇴 실패", err);
    res.status(404).json({ message: "유저를 찾을 수 없습니다." });
  }
};

//토큰 유효 검사
export const me = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: { user_id: req.user?.user_id },
      select: { email: true, is_member: true }, //필요한 정보만 선택
    });

    if (!user) {
      res.status(404).json({ error: "사용자를 찾을 수 없습니다." });
      return;
    }

    res.status(200).json({ user });
  } catch {
    res.status(500).json({ error: "내 정보 조회 실패" });
  }
};

//회원가입 시 이메일 중복 체크
export const checkEmailDuplicate = async (req: Request, res: Response) => {
  const { email } = req.query;

  if (typeof email !== "string") {
    res.status(400).json({ message: "잘못된 요청입니다" });
    return;
  }

  try {
    const duplicate = await isEmailDuplicate(email);
    res.status(200).json({ duplicate });
  } catch (err) {
    console.log("이메일 중복 확인 실패", err);
    res.status(500).json({ message: "서버 오류" });
  }
};
