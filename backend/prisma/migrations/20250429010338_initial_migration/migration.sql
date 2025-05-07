-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "is_member" BOOLEAN NOT NULL DEFAULT false,
    "is_deleted" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Genre" (
    "genre_ids" INTEGER NOT NULL,
    "genre_name" TEXT NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("genre_ids")
);

-- CreateTable
CREATE TABLE "Content" (
    "movie_id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "views" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("movie_id")
);

-- CreateTable
CREATE TABLE "ContentGenre" (
    "CG_id" SERIAL NOT NULL,
    "movie_id" INTEGER NOT NULL,
    "genre_ids" INTEGER NOT NULL,

    CONSTRAINT "ContentGenre_pkey" PRIMARY KEY ("CG_id")
);

-- CreateTable
CREATE TABLE "WatchHistory" (
    "history_id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "movie_id" INTEGER,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WatchHistory_pkey" PRIMARY KEY ("history_id")
);

-- CreateTable
CREATE TABLE "Wishlist" (
    "wishlist_id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "movie_id" INTEGER,

    CONSTRAINT "Wishlist_pkey" PRIMARY KEY ("wishlist_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ContentGenre_movie_id_genre_ids_key" ON "ContentGenre"("movie_id", "genre_ids");

-- AddForeignKey
ALTER TABLE "ContentGenre" ADD CONSTRAINT "ContentGenre_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "Content"("movie_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentGenre" ADD CONSTRAINT "ContentGenre_genre_ids_fkey" FOREIGN KEY ("genre_ids") REFERENCES "Genre"("genre_ids") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchHistory" ADD CONSTRAINT "WatchHistory_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchHistory" ADD CONSTRAINT "WatchHistory_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "Content"("movie_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wishlist" ADD CONSTRAINT "Wishlist_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wishlist" ADD CONSTRAINT "Wishlist_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "Content"("movie_id") ON DELETE SET NULL ON UPDATE CASCADE;
