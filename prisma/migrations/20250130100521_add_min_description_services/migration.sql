-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Services" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "titleAr" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "descriptionAr" TEXT NOT NULL,
    "iconName" TEXT NOT NULL,
    "coverImgPath" TEXT NOT NULL,
    "iconPath" TEXT NOT NULL,
    "minDescriptionAr" TEXT NOT NULL DEFAULT '',
    "minDescription" TEXT NOT NULL DEFAULT '',
    "coverImgName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "videos" TEXT
);
INSERT INTO "new_Services" ("coverImgName", "coverImgPath", "createdAt", "description", "descriptionAr", "iconName", "iconPath", "id", "title", "titleAr", "updatedAt", "videos") SELECT "coverImgName", "coverImgPath", "createdAt", "description", "descriptionAr", "iconName", "iconPath", "id", "title", "titleAr", "updatedAt", "videos" FROM "Services";
DROP TABLE "Services";
ALTER TABLE "new_Services" RENAME TO "Services";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
