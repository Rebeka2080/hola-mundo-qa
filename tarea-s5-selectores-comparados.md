# Tarea S5 — Selectores comparados

## Desafío 1: Link "Login" del menú de navegación

- **HTML del elemento**:
  ```html
  <a class="rounded-lg px-3 py-2 text-sm font-medium transition-colors bg-primary/10 text-primary"
     data-testid="nav-login"
     aria-describedby="navhint-login"
     href="/login">Entrar al laboratorio</a>
  ```

- **Mi propuesta (Fase 1)**: `page.getByTestId('nav-login')`

- **Lo que propuso Claude (Fase 2)**:
  1. `page.getByRole('link', { name: 'Entrar al laboratorio' })` — rol semántico + texto visible, exactamente lo que ve el usuario real.
  2. `page.getByTestId('nav-login')` — atributo puesto a propósito para testing, estable mientras el dev no lo renombre.
  3. `page.locator('a[href="/login"]')` — frágil: la ruta puede cambiar si reorganizan las URLs de la app.

- **¿Qué propuso Claude que NO se me había ocurrido?**: No sabía que de las etiquetas de apertura y cierre (`<a>...</a>`) se podía extraer un selector de Playwright. Entendí que el tag define el rol (`link`) y el texto visible entre las etiquetas define el `name`.

- **Mi elección final + por qué (Fase 3)**: `page.getByRole('link', { name: 'Entrar al laboratorio' })` — es el primer selector de la jerarquía de locators que aplica a este elemento, y no depende de atributos que el dev podría cambiar sin avisar.

---

## Desafío 2: Caja de "credenciales demo"

- **HTML del elemento**:
  ```html
  <div class="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4"
       data-testid="demo-credentials">
    <p class="mb-2 text-xs font-bold uppercase tracking-wide text-primary">Cuenta de prueba</p>
    <div class="space-y-1 text-sm text-muted-foreground">
      <p>Email: <code>ana.garcia@ejemplo.com</code></p>
      <p>Password: <code>Segura2026!</code></p>
    </div>
    <p class="mt-2 text-xs text-muted-foreground">O regístrate primero y usa la misma contraseña.</p>
  </div>
  ```

- **Mi propuesta (Fase 1)**: `page.getByText('Cuenta de prueba')`

- **Lo que propuso Claude (Fase 2)**:
  1. `page.getByText('Cuenta de prueba')` — texto visible estable, primer semántico aplicable según la jerarquía.
  2. `page.getByTestId('demo-credentials')` — `data-testid` puesto a propósito para testing, muy estable.
  3. `page.locator('[data-testid="demo-credentials"]')` — funcionalmente idéntico al #2 pero vía CSS, menos expresivo.

- **¿Qué propuso Claude que NO se me había ocurrido?**: —

- **Mi elección final + por qué (Fase 3)**: `page.getByText('Cuenta de prueba')` — según la jerarquía de locators, `getByText` va antes que `getByTestId`, y el texto "Cuenta de prueba" es suficientemente estable como para confiar en él.

---

## Desafío 3: Mensaje "Has iniciado sesión correctamente."

- **HTML del elemento**:
  ```html
  <p class="mb-6 text-muted-foreground">Has iniciado sesión correctamente.</p>
  ```

- **Mi propuesta (Fase 1)**: `page.getByText('Has iniciado sesión correctamente.')`

- **Lo que propuso Claude (Fase 2)**:
  1. `page.getByText('Has iniciado sesión correctamente.')` — primer semántico aplicable, usa texto visible real.
  2. `page.locator('p').filter({ hasText: 'Has iniciado sesión correctamente.' })` — más específico que el anterior, acota la búsqueda al tag `<p>`.
  3. `page.locator('.text-muted-foreground')` — frágil: clase de estilo puro que se rompe si cambia el diseño.

- **¿Qué propuso Claude que NO se me había ocurrido?**: Propuso dos localizadores más que yo no habría tenido en cuenta porque pensé que solo había una forma de agarrar ese elemento: `page.locator('p').filter({ hasText: 'Has iniciado sesión correctamente.' })` y `page.locator('.text-muted-foreground')`.

- **Mi elección final + por qué (Fase 3)**: `page.getByText('Has iniciado sesión correctamente.')` — coincidí con la propuesta #1 de Claude. Está primero en la jerarquía de los selectores disponibles para este elemento y usa texto visible que refleja exactamente lo que ve el usuario tras el login.
