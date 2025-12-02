import request from "supertest";
import app from "../../src/index.js";

describe("Product API", () => {
  let categoryId;
  let productId;

  beforeAll(async () => {
    const cat = await request(app)
      .post("/categories")
      .send({ name: "TestCat" });

    categoryId = cat.body.id;
  });

  test("POST /products → crea producto", async () => {
    const res = await request(app)
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
    const res = await request(app).get("/products");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test("GET /products/:id → producto individual", async () => {
    const res = await request(app).get(`/products/${productId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(productId);
  });

  test("PUT /products/:id → actualizar producto", async () => {
    const res = await request(app)
      .put(`/products/${productId}`)
      .send({ price: 2000 });

    expect(res.statusCode).toBe(200);
    expect(res.body.price).toBe(2000);
  });

  test("DELETE /products/:id → elimina producto", async () => {
    const res = await request(app).delete(`/products/${productId}`);
    expect(res.statusCode).toBe(200);
  });
});
