/*
  Warnings:

  - Added the required column `ExpertiseAr` to the `Doctors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expertise` to the `Doctors` table without a default value. This is not possible if the table is not empty.

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
    "branchesId" TEXT,
    CONSTRAINT "Doctors_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Services" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Doctors_branchesId_fkey" FOREIGN KEY ("branchesId") REFERENCES "Branches" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Doctors" ("branchesId", "id", "name", "nameAr", "serviceId") SELECT "branchesId", "id", "name", "nameAr", "serviceId" FROM "Doctors";
DROP TABLE "Doctors";
ALTER TABLE "new_Doctors" RENAME TO "Doctors";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
