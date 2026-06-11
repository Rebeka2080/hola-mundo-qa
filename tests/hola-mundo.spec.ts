import { test, expect } from '@playwright/test';

test.describe('Pruebas de Login en SauceDemo', () => {

  // Este bloque se ejecuta antes de cada prueba (test)
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  });

  test('Login exitoso con credenciales válidas', async ({ page }) => {
    // 1. Llenamos el campo de usuario
    await page.locator('[data-test="username"]').fill('standard_user');

    // 2. Llenamos el campo de contraseña
    await page.locator('[data-test="password"]').fill('secret_sauce');

    // 3. Hacemos clic en el botón de iniciar sesión
    await page.locator('[data-test="login-button"]').click();

    // 4. Verificaciones (Aserciones)
    // Verificamos que la URL cambió a la página de inventario
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    // Verificamos que el título de la página muestre "Products"
    const tituloProductos = page.locator('.title');
    await expect(tituloProductos).toHaveText('Products');
  });

  test('Login incorrecto con contraseña inválida', async ({ page }) => {
    // 1. Llenamos el campo de usuario (podemos usar uno válido o inválido)
    await page.locator('[data-test="username"]').fill('standard_user');

    // 2. Llenamos el campo de contraseña con un valor INCORRECTO
    await page.locator('[data-test="password"]').fill('contraseña_incorrecta');

    // 3. Hacemos clic en el botón de iniciar sesión
    await page.locator('[data-test="login-button"]').click();

    // 4. Verificaciones (Aserciones)
    // Verificamos que aparezca el mensaje de error
    const mensajeError = page.locator('[data-test="error"]');
    await expect(mensajeError).toBeVisible();

    // Verificamos que el texto del error sea el correcto para este escenario
    await expect(mensajeError).toContainText('Epic sadface: Username and password do not match any user in this service');
  });

});
