/*
  Warnings:

  - You are about to drop the `VideosLink` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Services" ADD COLUMN "videos" TEXT;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "VideosLink";
PRAGMA foreign_keys=on;
