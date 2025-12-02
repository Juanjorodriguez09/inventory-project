import * as ProductService from "../services/product.service.js";

export async function getAll(req, res) {
  try {
    const data = await ProductService.getAll();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error getting products" });
  }
}

export async function getById(req, res) {
  try {
    const data = await ProductService.getById(req.params.id);
    if (!data) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error getting product" });
  }
}

export async function create(req, res) {
  try {
    const data = await ProductService.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating product" });
  }
}

export async function update(req, res) {
  try {
    const data = await ProductService.update(req.params.id, req.body);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating product" });
  }
}

export async function remove(req, res) {
  try {
    const data = await ProductService.remove(req.params.id);
    res.json({ message: "Deleted", data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting product" });
  }
}
