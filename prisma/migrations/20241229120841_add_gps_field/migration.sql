/*
  Warnings:

  - You are about to alter the column `latitude` on the `Branches` table. The data in that column could be lost. The data in that column will be cast from `String` to `Float`.
  - You are about to alter the column `longitude` on the `Branches` table. The data in that column could be lost. The data in that column will be cast from `String` to `Float`.

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
    "latitude" REAL NOT NULL DEFAULT 0,
    "longitude" REAL NOT NULL DEFAULT 0,
    "imagePath" TEXT NOT NULL,
    "imageName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Branches" ("createdAt", "gps", "id", "imageName", "imagePath", "latitude", "location", "locationAr", "longitude", "mobile", "name", "nameAr", "updatedAt", "whatsApp") SELECT "createdAt", "gps", "id", "imageName", "imagePath", "latitude", "location", "locationAr", "longitude", "mobile", "name", "nameAr", "updatedAt", "whatsApp" FROM "Branches";
DROP TABLE "Branches";
ALTER TABLE "new_Branches" RENAME TO "Branches";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
