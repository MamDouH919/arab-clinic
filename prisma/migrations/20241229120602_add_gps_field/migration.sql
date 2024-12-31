/*
  Warnings:

  - You are about to drop the column `Latitude` on the `Branches` table. All the data in the column will be lost.
  - You are about to drop the column `Longitude` on the `Branches` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Branches" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "nameAr" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "locationAr" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "whatsApp" TEXT NOT NULL,
    "gps" TEXT NOT NULL DEFAULT '',
    "latitude" TEXT NOT NULL DEFAULT '',
    "longitude" TEXT NOT NULL DEFAULT '',
    "imagePath" TEXT NOT NULL,
    "imageName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Branches" ("createdAt", "gps", "id", "imageName", "imagePath", "location", "locationAr", "mobile", "name", "nameAr", "updatedAt", "whatsApp") SELECT "createdAt", "gps", "id", "imageName", "imagePath", "location", "locationAr", "mobile", "name", "nameAr", "updatedAt", "whatsApp" FROM "Branches";
DROP TABLE "Branches";
ALTER TABLE "new_Branches" RENAME TO "Branches";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
