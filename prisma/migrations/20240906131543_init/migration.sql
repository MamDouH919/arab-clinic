/*
  Warnings:

  - You are about to drop the column `ImgOne` on the `Services` table. All the data in the column will be lost.
  - You are about to drop the column `ImgThree` on the `Services` table. All the data in the column will be lost.
  - You are about to drop the column `ImgTwo` on the `Services` table. All the data in the column will be lost.
  - Added the required column `imgOne` to the `Services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imgThree` to the `Services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imgTwo` to the `Services` table without a default value. This is not possible if the table is not empty.

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
    "imgOne" TEXT NOT NULL,
    "imgTwo" TEXT NOT NULL,
    "imgThree" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Services" ("coverImg", "createdAt", "description", "descriptionAr", "icon", "id", "title", "titleAr", "updatedAt") SELECT "coverImg", "createdAt", "description", "descriptionAr", "icon", "id", "title", "titleAr", "updatedAt" FROM "Services";
DROP TABLE "Services";
ALTER TABLE "new_Services" RENAME TO "Services";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
