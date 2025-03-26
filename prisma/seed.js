// prisma/seed.js
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  // Insertion de matières premières fictives sans skipDuplicates
  await prisma.matierePremiere.createMany({
    data: [
      { nom: "Métal de Base", type: "Métal", reference: "MET-001", prixUnitaire: 50, unite: "kg" },
      { nom: "Alliage Spécial", type: "Alliage", reference: "ALL-002", prixUnitaire: 75, unite: "kg" },
      { nom: "Acier Inoxydable", type: "Acier", reference: "ACE-003", prixUnitaire: 65, unite: "kg" }
    ]
  })

  console.log("Seed réalisé avec succès !");
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
