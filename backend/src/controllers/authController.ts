import { Request, Response } from 'express';
import { AuthRequest } from '../midlewares/authrequest';
import { signup, login as serviceLogin, withdrawUser } from '../services/auth.service';

// 회원가입
export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await signup({ email, password, is_member: false, is_deleted: true });
    res.status(201).json({ message: '회원가입 성공', ...result });
  } catch (err) {
    if (err instanceof Error) {
      if (err.message === '이미 가입된 이메일입니다.') {
        res.status(400).json({ message: err.message });
      } else {
        console.error(err);
        res.status(500).json({ message: '서버 오류' });
      }
    } else {
      console.error('Unexpected error:', err);
      res.status(500).json({ message: '알 수 없는 오류가 발생했습니다.' });
    }
  }
};

  // 로그인
  export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
  
    try {
      const token = await serviceLogin({ email, password });
      res.status(200).json({ token });
    } catch (err) {
      if (err instanceof Error && err.message === '유효하지 않은 이메일 또는 비밀번호') {
        res.status(400).json({ message: err.message });
      } else if (err instanceof Error && err.message === '탈퇴한 회원입니다.') {
        res.status(400).json({ message: err.message });
      } else {
        console.error(err);
        res.status(500).json({ message: '서버 오류' });
      }
    }
  };

  //로그아웃
  export const logout = (req: Request, res: Response) => {
    // 쿠키에 토큰이 저장되어 있다면 삭제
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // HTTPS 환경에서만 쿠키 전송
      sameSite: 'strict',
    });
  
    res.status(200).json({ message: '로그아웃 되었습니다.' });
  };

  //회원탈퇴
  export const withdraw = async (req: AuthRequest, res: Response) => {
    const userId = (req as any).user?.user_Id;
  
    if (!userId) {
      res.status(401).json({ message: '인증이 필요합니다.' });
      return;
    }
  
    try {
      await withdrawUser(userId);
      res.status(200).json({ message: '회원 탈퇴가 완료되었습니다.' });
    } catch (error) {
      if (error instanceof Error && error.message === '유저를 찾을 수 없습니다.') {
        res.status(404).json({ message: error.message });
      } else {
        console.error(error);
        res.status(500).json({ message: '서버 오류' });
      }
    }
  };