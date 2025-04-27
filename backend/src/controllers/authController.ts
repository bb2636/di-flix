import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { Pool } from 'pg';
import { Signup, Login } from '../types/auth';
import { generateToken } from "../utils/jwt";
import { AuthRequest } from '../midlewares/authrequest';

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: Number(process.env.DB_PORT) || 5432,
});

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

// 회원가입
export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const client = await pool.connect();

  try {
    // 이미 가입된 이메일인지 확인
    const existingUser = await client.query<{ id: number }>(
      'SELECT id FROM users WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      res.status(400).json({ message: '이미 가입된 이메일입니다.' });
      return;
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    // 기본값: is_member = false, is_deleted = true(true일때 정상회원)
    const result = await client.query(
      `INSERT INTO users (email, password, is_member, is_deleted)
       VALUES ($1, $2, $3, $4)
       RETURNING id`,
      [email, hashedPassword, false, true]
    );

    res.status(201).json({ message: '회원가입 성공', userId: result.rows[0].id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 오류' });
  } finally {
    client.release();
  }
};

  // 로그인
  export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const client = await pool.connect();
  
    try {
      const userResult = await client.query(
        'SELECT id, password, is_member, is_deleted FROM users WHERE email = $1',
        [email]
      );
  
      if (userResult.rowCount === 0) {
        res.status(400).json({ message: '유효하지 않은 이메일 또는 비밀번호' });
        return;
      }
  
      const user = userResult.rows[0];
  
      if (user.is_deleted === false) {
        res.status(400).json({ message: '탈퇴한 회원입니다.' });
        return;
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        res.status(400).json({ message: '유효하지 않은 이메일 또는 비밀번호' });
        return;
      }
  
      // 토큰 생성 및 응답도 try 내부에서 처리
      const token = generateToken({
        user_Id: user.id,
        email,
        is_member: user.is_member,
        is_deleted: user.is_deleted,
      });
  
      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: '서버 오류' });
    } finally {
      client.release();
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
  
    const client = await pool.connect();
  
    try {
      // 탈퇴 처리: is_deleted 필드를 true로 변경
      const result = await client.query(
        'UPDATE users SET is_deleted = true WHERE id = $1',
        [userId]
      );
  
      if (result.rowCount === 0) {
        res.status(404).json({ message: '유저를 찾을 수 없습니다.' });
        return;
      }
  
      res.status(200).json({ message: '회원 탈퇴가 완료되었습니다.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: '서버 오류' });
    } finally {
      client.release();
    }
  };