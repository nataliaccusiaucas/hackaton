import { expect, test } from "@playwright/test";
import { PROYECTOS } from "../src/lib/proyectos";

test("el catálogo enlaza cada proyecto con su detalle y admite recargar", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.locator("#proyectos article")).toHaveCount(PROYECTOS.length);
  for (const proyecto of PROYECTOS) {
    await page.getByRole("link", { name: `Ver proyecto ${proyecto.nombre}`, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`${proyecto.ruta}$`));
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(proyecto.nombre);
    expect((await page.reload())?.status()).toBe(200);
    await expect(page.getByText(proyecto.descripcion, { exact: true })).toBeVisible();
    await expect(
      page.getByRole("main").getByText(proyecto.precioDesde, { exact: true }),
    ).toBeVisible();
    await page.getByRole("link", { name: "Volver a proyectos", exact: true }).click();
    await expect(page.locator("#proyectos")).toBeVisible();
  }
  expect(errors).toEqual([]);
});

test("simulador, agenda y accesibilidad funcionan sin errores de consola", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (["error", "warning"].includes(message.type())) errors.push(message.text());
  });
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("costo real");
  await page.getByLabel("DNI / CE", { exact: true }).fill("45872310");
  await page.getByRole("button", { name: /Simular mi Depa/ }).click();
  await expect(page.getByText(/Simulación para DNI 45872310/)).toBeVisible();
  await page.getByRole("button", { name: "Abrir opciones de accesibilidad" }).click();
  await page.getByLabel("Texto más grande", { exact: true }).click();
  await expect(page.locator("html")).toHaveClass(/a11y-grande/);
  await page.getByRole("button", { name: "Cerrar panel de accesibilidad" }).click();
  await page.getByRole("button", { name: "Confirmar visita y recibir recordatorio" }).click();
  await expect(page.locator("[data-sonner-toast]")).toContainText("Visita confirmada");
  await page.setViewportSize({ width: 390, height: 844 });
  await expect
    .poll(() =>
      page.evaluate(() =>
        [...document.querySelectorAll("body *")]
          .filter((element) => element.getBoundingClientRect().right > window.innerWidth + 1)
          .map((element) => ({
            tag: element.tagName,
            text: element.textContent?.slice(0, 70),
            class: element.className,
          })),
      ),
    )
    .toEqual([]);
  expect(errors).toEqual([]);
});

test("las rutas inexistentes devuelven 404 y permiten volver al inicio", async ({ page }) => {
  const response = await page.goto("/pagina-inexistente");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "Página no encontrada" })).toBeVisible();
  await page.getByRole("link", { name: "Ir al inicio" }).click();
  await expect(page.getByLabel("DNI / CE", { exact: true })).toBeVisible();
});
