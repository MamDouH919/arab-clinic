/*
  Warnings:

  - Made the column `imageName` on table `Schedules` required. This step will fail if there are existing NULL values in that column.
  - Made the column `imagePath` on table `Schedules` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Schedules" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "imagePath" TEXT NOT NULL,
    "imageName" TEXT NOT NULL,
    "branchId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Schedules_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branches" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Schedules" ("branchId", "createdAt", "id", "imageName", "imagePath", "updatedAt") SELECT "branchId", "createdAt", "id", "imageName", "imagePath", "updatedAt" FROM "Schedules";
DROP TABLE "Schedules";
ALTER TABLE "new_Schedules" RENAME TO "Schedules";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
