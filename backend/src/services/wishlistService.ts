import prisma from "../config/prisma";

export const addWishlist = async (userId: number, movieId: number) => {
  await prisma.wishlist.create({
    data: {
      user_id: userId,
      movie_id: movieId,
    },
  });
};

export const removeWishlist = async (userId: number, movieId: number) => {
  await prisma.wishlist.deleteMany({
    where: {
      user_id: userId,
      movie_id: movieId,
    },
  });
};

export const getWishlist = async (userId: number) => {
  return prisma.wishlist.findMany({
    where: {
      user_id: userId,
    },
    include: {
      movie: true, // 영화 정보도 같이 조회
    },
  });
};
