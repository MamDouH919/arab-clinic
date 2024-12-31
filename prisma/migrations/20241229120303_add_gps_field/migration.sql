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
    "Latitude" TEXT NOT NULL DEFAULT '',
    "Longitude" TEXT NOT NULL DEFAULT '',
    "imagePath" TEXT NOT NULL,
    "imageName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Branches" ("createdAt", "gps", "id", "imageName", "imagePath", "location", "locationAr", "mobile", "name", "nameAr", "updatedAt", "whatsApp") SELECT "createdAt", "gps", "id", "imageName", "imagePath", "location", "locationAr", "mobile", "name", "nameAr", "updatedAt", "whatsApp" FROM "Branches";
DROP TABLE "Branches";
ALTER TABLE "new_Branches" RENAME TO "Branches";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
