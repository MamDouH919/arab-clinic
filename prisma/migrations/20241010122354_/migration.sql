/*
  Warnings:

  - You are about to drop the column `coverImg` on the `Services` table. All the data in the column will be lost.
  - You are about to drop the column `icon` on the `Services` table. All the data in the column will be lost.
  - You are about to drop the column `imgOne` on the `Services` table. All the data in the column will be lost.
  - You are about to drop the column `imgThree` on the `Services` table. All the data in the column will be lost.
  - You are about to drop the column `imgTwo` on the `Services` table. All the data in the column will be lost.
  - Added the required column `coverImgName` to the `Services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coverImgPath` to the `Services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `iconName` to the `Services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `iconPath` to the `Services` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "ServicesImages" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "imageName" TEXT NOT NULL,
    "imagePath" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    CONSTRAINT "ServicesImages_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Services" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Services" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "titleAr" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "descriptionAr" TEXT NOT NULL,
    "iconName" TEXT NOT NULL,
    "coverImgPath" TEXT NOT NULL,
    "iconPath" TEXT NOT NULL,
    "coverImgName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Services" ("createdAt", "description", "descriptionAr", "id", "title", "titleAr", "updatedAt") SELECT "createdAt", "description", "descriptionAr", "id", "title", "titleAr", "updatedAt" FROM "Services";
DROP TABLE "Services";
ALTER TABLE "new_Services" RENAME TO "Services";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
