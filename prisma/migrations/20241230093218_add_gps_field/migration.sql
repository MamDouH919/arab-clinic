/*
  Warnings:

  - You are about to drop the column `image` on the `Doctors` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Doctors" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "imagePath" TEXT,
    "imageName" TEXT,
    "nameAr" TEXT NOT NULL,
    "expertise" TEXT NOT NULL,
    "expertiseAr" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "branchesId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Doctors_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Services" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Doctors_branchesId_fkey" FOREIGN KEY ("branchesId") REFERENCES "Branches" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Doctors" ("branchesId", "createdAt", "expertise", "expertiseAr", "id", "name", "nameAr", "serviceId", "updatedAt") SELECT "branchesId", "createdAt", "expertise", "expertiseAr", "id", "name", "nameAr", "serviceId", "updatedAt" FROM "Doctors";
DROP TABLE "Doctors";
ALTER TABLE "new_Doctors" RENAME TO "Doctors";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
