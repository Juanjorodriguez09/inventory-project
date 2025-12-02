import * as CategoryService from "../../src/services/category.service.js";

test("CategoryService should have required functions", () => {
  expect(typeof CategoryService.getAll).toBe("function");
  expect(typeof CategoryService.create).toBe("function");
  expect(typeof CategoryService.update).toBe("function");
  expect(typeof CategoryService.remove).toBe("function");
});
