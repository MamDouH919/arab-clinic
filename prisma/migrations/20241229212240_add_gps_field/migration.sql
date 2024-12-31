-- CreateTable
CREATE TABLE "Doctors" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "nameAr" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "branchesId" TEXT,
    CONSTRAINT "Doctors_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Services" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Doctors_branchesId_fkey" FOREIGN KEY ("branchesId") REFERENCES "Branches" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
