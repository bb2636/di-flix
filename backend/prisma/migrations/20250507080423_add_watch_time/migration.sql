/*
  Warnings:

  - A unique constraint covering the columns `[user_id,movie_id]` on the table `WatchHistory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "user_id_movie_id_unique" ON "WatchHistory"("user_id", "movie_id");
