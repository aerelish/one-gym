-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MembershipPlan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" REAL NOT NULL,
    "duration" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_MembershipPlan" ("createdAt", "description", "duration", "id", "name", "price", "updatedAt") SELECT "createdAt", "description", "duration", "id", "name", "price", "updatedAt" FROM "MembershipPlan";
DROP TABLE "MembershipPlan";
ALTER TABLE "new_MembershipPlan" RENAME TO "MembershipPlan";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
