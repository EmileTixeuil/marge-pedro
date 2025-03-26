-- CreateTable
CREATE TABLE "MatierePremiere" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "prixUnitaire" REAL NOT NULL,
    "unite" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
