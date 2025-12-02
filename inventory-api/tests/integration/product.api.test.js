import request from "supertest";
import server from "../../src/index.js";
import { prisma } from "../../src/db.js";

describe("Product API", () => {
  let categoryId;
  let productId;

  beforeAll(async () => {
    const cat = await request(server)
      .post("/categories")
      .send({ name: "TestCat" });

    categoryId = cat.body.id;
  });

  test("POST /products → crea producto", async () => {
    const res = await request(server)
      .post("/products")
      .send({
        name: "Laptop",
        description: "Gaming laptop",
        price: 1500,
        stock: 10,
        categoryId,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Laptop");

    productId = res.body.id;
  });

  test("GET /products → lista productos", async () => {
    const res = await request(server).get("/products");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test("GET /products/:id → producto individual", async () => {
    const res = await request(server).get(`/products/${productId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(productId);
  });

  test("PUT /products/:id → actualizar producto", async () => {
    const res = await request(server)
      .put(`/products/${productId}`)
      .send({ price: 2000 });

    expect(res.statusCode).toBe(200);
    expect(res.body.price).toBe(2000);
  });

  test("DELETE /products/:id → elimina producto", async () => {
    const res = await request(server).delete(`/products/${productId}`);
    expect(res.statusCode).toBe(200);
  });

  afterAll(async () => {
    if (server && server.close) server.close();
    await prisma.$disconnect();
  });
});