import request from "supertest";
import server from "../../src/index.js";
import { prisma } from "../../src/db.js";

describe("Category API", () => {
  let createdId;

  test("POST /categories → crea categoría", async () => {
    const res = await request(server)
      .post("/categories")
      .send({ name: "Electronics" });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Electronics");

    createdId = res.body.id;
  });

  test("GET /categories → lista categorías", async () => {
    const res = await request(server).get("/categories");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test("PUT /categories/:id → actualiza categoría", async () => {
    const res = await request(server)
      .put(`/categories/${createdId}`)
      .send({ name: "Updated Category" });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Updated Category");
  });

  test("DELETE /categories/:id → elimina categoría", async () => {
    const res = await request(server).delete(`/categories/${createdId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Deleted");
  });

  afterAll(async () => {
    if (server && server.close) server.close();
    await prisma.$disconnect();
  });
});