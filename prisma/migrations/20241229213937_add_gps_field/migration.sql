/*
  Warnings:

  - Added the required column `updatedAt` to the `Doctors` table without a default value. This is not possible if the table is not empty.
  - Made the column `branchesId` on table `Doctors` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Doctors" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "nameAr" TEXT NOT NULL,
    "expertise" TEXT NOT NULL,
    "ExpertiseAr" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "branchesId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Doctors_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Services" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Doctors_branchesId_fkey" FOREIGN KEY ("branchesId") REFERENCES "Branches" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Doctors" ("ExpertiseAr", "branchesId", "expertise", "id", "name", "nameAr", "serviceId") SELECT "ExpertiseAr", "branchesId", "expertise", "id", "name", "nameAr", "serviceId" FROM "Doctors";
DROP TABLE "Doctors";
ALTER TABLE "new_Doctors" RENAME TO "Doctors";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
