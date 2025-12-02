import { test, expect } from "@playwright/test";

test("flujo completo: crear categoría, crear producto y verlo en el listado", async ({
  page,
}) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Categorías" }).click();

  const categoryName = `Cat E2E ${Date.now()}`;

  await page
    .getByPlaceholder("Ej. Lácteos, Bebidas, Tecnología")
    .fill(categoryName);

  await page.getByRole("button", { name: "+ Crear categoría" }).click();

  await expect(page.getByText(categoryName)).toBeVisible();

  await page.getByRole("button", { name: "Productos" }).click();

  const productName = `Prod E2E ${Date.now()}`;

  await page.getByPlaceholder("Ej: Café molido 500g").fill(productName);
  await page
    .getByPlaceholder("Descripción breve del producto (opcional)")
    .fill("Producto creado en prueba E2E");

  await page.getByPlaceholder("Ej: 2.000.000").fill("150000");
  await page.getByLabel("Stock").fill("3");

  await page.getByLabel("Categoría").selectOption({ label: categoryName });

  // 8. Crear producto
  await page.getByRole("button", { name: "+ Crear producto" }).click();

  await expect(page.getByText(productName)).toBeVisible();
});