/*
  Warnings:

  - Added the required column `image` to the `Clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameAr` to the `Clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Clients` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Clients" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "nameAr" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Clients" ("id", "name") SELECT "id", "name" FROM "Clients";
DROP TABLE "Clients";
ALTER TABLE "new_Clients" RENAME TO "Clients";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
