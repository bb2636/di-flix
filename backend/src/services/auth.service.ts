import { pool } from '../utils/db';
import bcrypt from 'bcrypt';
import { Signup, Login } from "../types/auth";
import { generateToken } from "../utils/jwt";


export const signup = async (input: Signup) => {
  const { email, password } = input;
  const client = await pool.connect();

  try {
    const existingUser = await client.query('SELECT user_id FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      throw new Error('이미 가입된 이메일입니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await client.query(
      `INSERT INTO users (email, password, is_member, is_deleted) VALUES ($1, $2, false, true) RETURNING id`,
      [email, hashedPassword]
    );

    return { user_Id: result.rows[0].user_id };
  } finally {
    client.release();
  }
};

export const login = async (input: Login) => {
  const { email, password } = input;
  const client = await pool.connect();

  try {
    const userResult = await client.query(
      'SELECT user_id, password, is_member, is_deleted FROM users WHERE email = $1',
      [email]
    );

    if (userResult.rowCount === 0) {
      throw new Error('유효하지 않은 이메일 또는 비밀번호');
    }

    const user = userResult.rows[0];
    if (user.is_deleted === false) {
      throw new Error('탈퇴한 회원입니다.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('유효하지 않은 이메일 또는 비밀번호');
    }

    const token = generateToken({
      user_Id: user.user_id,
      email,
      is_member: user.is_member,
      is_deleted: user.is_deleted,
    });

    return { token };
  } finally {
    client.release();
  }
};
