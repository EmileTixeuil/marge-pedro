-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MatierePremiere" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT NOT NULL DEFAULT 'N/A',
    "type" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "prixUnitaire" REAL NOT NULL,
    "unite" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_MatierePremiere" ("createdAt", "id", "prixUnitaire", "reference", "type", "unite") SELECT "createdAt", "id", "prixUnitaire", "reference", "type", "unite" FROM "MatierePremiere";
DROP TABLE "MatierePremiere";
ALTER TABLE "new_MatierePremiere" RENAME TO "MatierePremiere";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
