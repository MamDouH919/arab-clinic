/*
  Warnings:

  - Added the required column `locationAr` to the `Branches` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameAr` to the `Branches` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Branches" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "nameAr" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "locationAr" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "whatsApp" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Branches" ("createdAt", "id", "location", "mobile", "name", "updatedAt", "whatsApp") SELECT "createdAt", "id", "location", "mobile", "name", "updatedAt", "whatsApp" FROM "Branches";
DROP TABLE "Branches";
ALTER TABLE "new_Branches" RENAME TO "Branches";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
