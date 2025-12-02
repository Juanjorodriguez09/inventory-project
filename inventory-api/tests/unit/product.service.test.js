import * as ProductService from "../../src/services/product.service.js";

test("ProductService should have required functions", () => {
  expect(typeof ProductService.getAll).toBe("function");
  expect(typeof ProductService.getById).toBe("function");
  expect(typeof ProductService.create).toBe("function");
  expect(typeof ProductService.update).toBe("function");
  expect(typeof ProductService.remove).toBe("function");
});
