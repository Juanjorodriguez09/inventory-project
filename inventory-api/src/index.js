import express from "express";
import cors from "cors";
import { prisma } from "./db.js";
import productRoutes from "./routes/product.routes.js";
import categoryRoutes from "./routes/category.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);

const PORT = process.env.PORT || 3000;

let server;

// Si NO estamos en test, levantar servidor normalmente
if (process.env.NODE_ENV !== "test") {
  server = app.listen(PORT, () => {
    console.log(`API running on port ${PORT}`);
  });
}

// Exportar app y server para pruebas
export { app, server };
export default app;