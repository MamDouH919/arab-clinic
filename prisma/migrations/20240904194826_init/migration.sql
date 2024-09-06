/*
  Warnings:

  - You are about to drop the column `url` on the `Services` table. All the data in the column will be lost.
  - Added the required column `ImgOne` to the `Services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ImgThree` to the `Services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ImgTwo` to the `Services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coverImg` to the `Services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descriptionAr` to the `Services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titleAr` to the `Services` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Services" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "titleAr" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "descriptionAr" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "coverImg" TEXT NOT NULL,
    "ImgOne" TEXT NOT NULL,
    "ImgTwo" TEXT NOT NULL,
    "ImgThree" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Services" ("createdAt", "description", "icon", "id", "title", "updatedAt") SELECT "createdAt", "description", "icon", "id", "title", "updatedAt" FROM "Services";
DROP TABLE "Services";
ALTER TABLE "new_Services" RENAME TO "Services";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
