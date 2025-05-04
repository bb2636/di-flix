import prisma from "../config/prisma";

// 위시리스트 추가
export const addWishlist = async (userId: number, movieId: number) => {
  await prisma.content.upsert({
    where: { movie_id: movieId },
    update: {},
    create: {
      movie_id: movieId,
      title: "", // TMDB와 연동되므로 일단 빈 값
    },
  });

  const existing = await prisma.wishlist.findFirst({
    where: { user_id: userId, movie_id: movieId },
  });
  if (existing) throw new Error("이미 찜한 콘텐츠입니다.");

  await prisma.wishlist.create({
    data: { user_id: userId, movie_id: movieId },
  });
};

// 위시리스트 삭제
export const removeWishlist = async (userId: number, movieId: number) => {
  const deleted = await prisma.wishlist.deleteMany({
    where: { user_id: userId, movie_id: movieId },
  });
  if (deleted.count === 0) throw new Error("삭제할 항목이 없습니다.");
};

// 위시리스트 조회 (ID 목록만 반환)
export const getWishlistIds = async (userId: number): Promise<number[]> => {
  const wishlist = await prisma.wishlist.findMany({
    where: { user_id: userId },
    select: { movie_id: true },
  });
  return wishlist
    .map((item) => item.movie_id)
    .filter((id): id is number => id !== null);
};

// ✅ 찜 여부 확인 서비스
export const checkWishlist = async (
  userId: number,
  movieId: number,
): Promise<boolean> => {
  const existing = await prisma.wishlist.findFirst({
    where: { user_id: userId, movie_id: movieId },
  });

  return !!existing;
};
