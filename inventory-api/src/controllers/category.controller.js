import * as CategoryService from "../services/category.service.js";

export async function getAll(req, res) {
  try {
    const data = await CategoryService.getAll();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error getting categories" });
  }
}

export async function create(req, res) {
  try {
    const data = await CategoryService.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating category" });
  }
}

export async function update(req, res) {
  try {
    const data = await CategoryService.update(req.params.id, req.body);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating category" });
  }
}

export async function remove(req, res) {
  try {
    const data = await CategoryService.remove(req.params.id);
    res.json({ message: "Deleted", data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting category" });
  }
}
