/*
  Warnings:

  - The `genre_ids` column on the `Content` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "Content" DROP CONSTRAINT "Content_genre_ids_fkey";

-- AlterTable
ALTER TABLE "Content" DROP COLUMN "genre_ids",
ADD COLUMN     "genre_ids" INTEGER[];

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_genre_ids_fkey" FOREIGN KEY ("genre_ids") REFERENCES "Genre"("genre_ids") ON DELETE SET NULL ON UPDATE CASCADE;
