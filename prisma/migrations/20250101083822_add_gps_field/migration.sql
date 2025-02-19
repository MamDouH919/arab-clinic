-- CreateTable
CREATE TABLE "Schedules" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "imagePath" TEXT,
    "imageName" TEXT,
    "branchId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Schedules_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branches" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
