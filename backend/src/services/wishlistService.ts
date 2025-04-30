import prisma from "../config/prisma";

// ✅ 찜 추가
export const addWishlist = async (userId: number, movieId: number) => {
  // 영화 존재 확인
  const movie = await prisma.content.findUnique({
    where: { movie_id: movieId },
  });
  if (!movie) throw new Error("해당 영화를 찾을 수 없습니다.");

  // 중복 확인
  const existing = await prisma.wishlist.findFirst({
    where: { user_id: userId, movie_id: movieId },
  });
  if (existing) throw new Error("이미 찜한 콘텐츠입니다.");

  // 추가
  await prisma.wishlist.create({
    data: {
      user_id: userId,
      movie_id: movieId,
    },
  });
};

// ✅ 찜 삭제
export const removeWishlist = async (userId: number, movieId: number) => {
  const deleted = await prisma.wishlist.deleteMany({
    where: {
      user_id: userId,
      movie_id: movieId,
    },
  });

  if (deleted.count === 0) {
    throw new Error("삭제할 찜 항목이 없습니다.");
  }
};

// ✅ 찜 목록 조회
export const getWishlist = async (userId: number) => {
  const user = await prisma.user.findUnique({ where: { user_id: userId } });
  if (!user) throw new Error("유저 정보를 찾을 수 없습니다.");

  return prisma.wishlist.findMany({
    where: { user_id: userId },
    include: {
      movie: true,
    },
  });
};
