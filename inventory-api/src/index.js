import express from "express";
import cors from "cors";
import categoryRoutes from "./routes/category.routes.js";
import productRoutes from "./routes/product.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log("API running on port " + PORT);
});

export default server;