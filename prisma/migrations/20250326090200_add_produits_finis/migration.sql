-- CreateTable
CREATE TABLE "ProduitFini" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT NOT NULL,
    "matieres" JSONB NOT NULL,
    "heures" REAL NOT NULL,
    "tauxHoraire" REAL NOT NULL,
    "margePourcentage" REAL NOT NULL,
    "margeBase" REAL NOT NULL,
    "tva" REAL NOT NULL,
    "prixFinal" REAL NOT NULL
);
