import bcrypt from 'bcrypt';
import { Signup, Login } from "../types/auth";
import { generateToken } from "../utils/jwt";
import prisma from '../config/prisma';

// 이메일로 사용자 조회
export const findUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      user_id: true, 
      password: true,
      is_member: true,
      is_deleted: true,
    },
  });
  if (!user) return null;

  return {
    user_id: user.user_id,
    password: user.password,
    is_member: user.is_member,
    is_deleted: user.is_deleted,
  };
};

// 비밀번호 해싱
export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

// 사용자 생성
export const createUser = async (input: Signup, hashedPassword: string) => {
  const user = await prisma.user.create({
    data: {
      email: input.email,
      password: hashedPassword,
      is_member: input.is_member,
      is_deleted: input.is_deleted,
    },
    select: {
      user_id: true,
    },
  });
  return { user_id: user.user_id };
};
// 회원가입 로직
export const signup = async (input: Signup) => {
  const { email, password, is_member = false, is_deleted = true } = input;

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error('이미 가입된 이메일입니다.');
  }

  const hashedPassword = await hashPassword(password);

  // 사용자 생성 시 기본값을 포함한 입력 사용
  const newUser = await createUser({ email, password, is_member, is_deleted }, hashedPassword);

  return { user_Id: newUser.user_id };
};

// 비밀번호 검증
export const validatePassword = async (plainPassword: string, hashedPassword: string) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

// 로그인 로직
export const login = async (input: Login) => {
  const { email, password } = input;

  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error('유효하지 않은 이메일 또는 비밀번호');
  }

  if (user.is_deleted === false) {
    throw new Error('탈퇴한 회원입니다.');
  }

  const isPasswordValid = await validatePassword(password, user.password);
  if (!isPasswordValid) {
    throw new Error('유효하지 않은 이메일 또는 비밀번호');
  }

  const token = generateToken({
    user_id: user.user_id,
    email,
    is_member: user.is_member,
    is_deleted: user.is_deleted,
  });

  return { token };
};


//회원탈퇴
export const withdrawUser = async (userId: number) => {
  const result = await prisma.user.updateMany({
    where: { user_id: userId },
    data: { is_deleted: true },
  });

  if (result.count === 0) {
    throw new Error('유저를 찾을 수 없습니다.');
  }
};