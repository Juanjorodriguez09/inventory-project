import request from "supertest";
import app from "../../src/index.js";

describe("Category API", () => {
  let createdId;

  test("POST /categories → crea categoría", async () => {
    const res = await request(app)
      .post("/categories")
      .send({ name: "Electronics" });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Electronics");

    createdId = res.body.id;
  });

  test("GET /categories → lista categorías", async () => {
    const res = await request(app).get("/categories");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test("PUT /categories/:id → actualiza categoría", async () => {
    const res = await request(app)
      .put(`/categories/${createdId}`)
      .send({ name: "Updated Category" });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Updated Category");
  });

  test("DELETE /categories/:id → elimina categoría", async () => {
    const res = await request(app).delete(`/categories/${createdId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Deleted");
  });
});
