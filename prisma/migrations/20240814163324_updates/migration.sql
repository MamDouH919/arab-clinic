/*
  Warnings:

  - You are about to drop the column `name` on the `highlights` table. All the data in the column will be lost.
  - Added the required column `nameAr` to the `highlights` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameEn` to the `highlights` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_highlights" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nameEn" TEXT NOT NULL,
    "nameAr" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_highlights" ("createdAt", "id", "number", "updatedAt") SELECT "createdAt", "id", "number", "updatedAt" FROM "highlights";
DROP TABLE "highlights";
ALTER TABLE "new_highlights" RENAME TO "highlights";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
