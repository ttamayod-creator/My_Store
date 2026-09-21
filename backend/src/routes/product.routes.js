const express = require("express");
const prisma = require("../lib/prisma");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        isActive: true,
      },
      include: {
        category: true,
      },
    });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error al obtener los productos",
    });
  }
});
router.get("/search", async (req, res) => {
  try {
    const { q } = req.query;

    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        OR: [
          {
            name: {
              contains: q,
              mode: "insensitive",
            },
          },
          {
            brand: {
              contains: q,
              mode: "insensitive",
            },
          },
        ],
      },
      include: {
        category: true,
      },
    });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error al buscar productos",
    });
  }
});
router.get("/category/:categoryId", async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        categoryId: Number(req.params.categoryId),
      },
      include: {
        category: true,
      },
    });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error al filtrar productos por categoría",
    });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        category: true,
      },
    });

    if (!product) {
      return res.status(404).json({
        error: "Producto no encontrado",
      });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error al obtener el producto",
    });
  }
});
module.exports = router;