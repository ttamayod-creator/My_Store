require("dotenv/config");

const { PrismaPg } = require("@prisma/adapter-pg");
const { PrismaClient } = require("@prisma/client");

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("🌱 Iniciando seed...");

  // Crear categorías
  const hombre = await prisma.category.upsert({
    where: {
      name: "Hombre",
    },
    update: {},
    create: {
      name: "Hombre",
    },
  });

  const mujer = await prisma.category.upsert({
    where: {
      name: "Mujer",
    },
    update: {},
    create: {
      name: "Mujer",
    },
  });

  const unisex = await prisma.category.upsert({
    where: {
      name: "Unisex",
    },
    update: {},
    create: {
      name: "Unisex",
    },
  });

  // Crear productos
  await prisma.product.createMany({
    data: [
      {
        name: "212 VIP Men",
        brand: "Carolina Herrera",
        description: "Perfume masculino de la línea 212 VIP.",
        price: 350000,
        presentation: "100 ml",
        imageUrl: null,
        stock: 10,
        isActive: true,
        categoryId: hombre.id,
      },
      {
        name: "212 Women",
        brand: "Carolina Herrera",
        description: "Fragancia femenina de la línea 212.",
        price: 380000,
        presentation: "80 ml",
        imageUrl: null,
        stock: 5,
        isActive: true,
        categoryId: mujer.id,
      },
      {
        name: "Bleu de Chanel",
        brand: "Chanel",
        description: "Fragancia masculina de la colección Bleu de Chanel.",
        price: 500000,
        presentation: "100 ml",
        imageUrl: null,
        stock: 0,
        isActive: true,
        categoryId: hombre.id,
      },
      {
        name: "CK One",
        brand: "Calvin Klein",
        description: "Fragancia de carácter unisex.",
        price: 280000,
        presentation: "100 ml",
        imageUrl: null,
        stock: 8,
        isActive: true,
        categoryId: unisex.id,
      },
    ],
  });

  console.log("✅ Seed completado correctamente.");
}

main()
  .catch((error) => {
    console.error("❌ Error ejecutando seed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });