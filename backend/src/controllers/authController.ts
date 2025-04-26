import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { Pool } from 'pg';
import { Signup, Login } from '../types/auth';
import { generateToken } from "../utils/jwt";

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: Number(process.env.DB_PORT) || 5432,
});

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

// 회원가입
export const register = async (req: Request<{}, {}, Signup>, res: Response) => {
    const { email, password } = req.body;
  
    try {
      const client = await pool.connect();
  
      // 이미 가입된 이메일인지 확인
      const existingUser = await client.query<{ id: number }>(
        'SELECT id FROM users WHERE email = $1',
        [email]
      );
  
      if (existingUser.rows.length > 0) {
        client.release();
        return res.status(400).json({ message: '이미 가입된 이메일입니다.' });
      }
  
      // 비밀번호 해싱
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // 기본값: is_member = false, is_deleted = true
      const result = await client.query(
        `INSERT INTO users (email, password, is_member, is_deleted)
         VALUES ($1, $2, $3, $4)
         RETURNING id`,
        [email, hashedPassword, false, true]
      );
  
      client.release();
  
      res.status(201).json({ message: '회원가입 성공', userId: result.rows[0].id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: '서버 오류' });
    }
  }

  // 로그인
  export const login = async (req: Request<{}, {}, Login>, res: Response) => {
    const { email, password } = req.body;
  
    try {
      const client = await pool.connect();
  
      const userResult = await client.query(
        'SELECT id, password, is_member, is_deleted FROM users WHERE email = $1',
        [email]
      );
  
      client.release();
  
      if (userResult.rowCount === 0) {
        return res.status(400).json({ message: '유효하지 않은 이메일 또는 비밀번호' });
      }
  
      const user = userResult.rows[0];
  
      if (user.is_deleted === false) {
        return res.status(400).json({ message: '탈퇴한 회원입니다.' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(400).json({ message: '유효하지 않은 이메일 또는 비밀번호' });
      }
  
      // generateToken 함수 사용
      const token = generateToken({
        userId: user.id,
        email,
        is_member: user.is_member,
      });
  
      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: '서버 오류' });
    }
  };
  