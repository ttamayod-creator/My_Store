require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const prisma = require("./lib/prisma");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.json({
    message: "My_Store API funcionando correctamente",
  });
});

app.get("/api/test-db", async (req, res) => {
  try {
    const categories = await prisma.category.findMany();

    res.json({
      connected: true,
      categories,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      connected: false,
      message: "Error conectando con PostgreSQL",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});