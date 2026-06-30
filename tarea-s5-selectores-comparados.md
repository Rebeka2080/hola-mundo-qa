# Tarea S5 — Selectores comparados

Elemento analizado

```html
<input id="email" placeholder="ana@ejemplo.com" class="w-full rounded-lg border border-input-border bg-background px-4 py-2.5 text-sm transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20" data-testid="login-email" type="email" value="">
```

Es el input de email del formulario de login.

---

## Paso 1 — Mi propuesta (antes de ver la de la IA)

| # | Selector CSS | Equivalente Playwright |
|---|---|---|
| 1 | `[placeholder="ana@ejemplo.com"]` | `page.getByPlaceholder('ana@ejemplo.com')` |
| 2 | `[data-testid="login-email"]` | `page.getByTestId('login-email')` |
| 3 | `input[type="email"]` | `page.locator('input[type="email"]')` |

---

## Paso 2 — Propuesta de Claude

| # | Selector Playwright | Justificación |
|---|---|---|
| 1 | `page.getByPlaceholder('ana@ejemplo.com')` | Semántico (sigue la prioridad de locators), pero depende de un texto que puede cambiar con i18n o copy. |
| 2 | `page.getByTestId('login-email')` | Atributo puesto a propósito para testing, no depende de copy ni de estilos. |
| 3 | `page.locator('input[type="email"]\[data-testid="login-email"\]')` | Funciona, pero es redundante: combina tipo + testid sin necesidad. |

---

## Paso 3 — Comparación

Coincidimos en 2 de 3: `placeholder` y `data-testid` aparecen en ambas listas, en el mismo orden de prioridad.

La diferencia está en el tercer puesto:

- **Yo propuse:** `input[type="email"]`
- **Claude propuso:** la combinación `type + data-testid`

**Por qué esto importa:** `type="email"` es estable frente a cambios de estilo o de copy (no es una clase ni un texto), pero **no garantiza unicidad**. Si el formulario tuviera, por ejemplo, un campo de "confirmar email", `input[type="email"]` matchearía 2 elementos y el test rompería. Por eso, aunque es un atributo "seguro" en cuanto a que no cambia solo, **no es seguro en cuanto a que agarre 1 solo elemento** — y la consigna pide selectores estables Y únicos.

La propuesta de Claude resuelve ese problema combinando `type` con `data-testid`, pero termina siendo redundante: si ya tenés `data-testid`, no necesitás sumarle el `type`.

**Conclusión de la comparación:** mi propuesta #3 era razonable como atributo "no frágil", pero le faltaba el chequeo de unicidad en contexto real de página. Ningún selector de los dos sets usa algo realmente frágil (no hay ids random, ni clases de estilo, ni `nth-child`).

---

## Validación de unicidad

Antes de decidir, se valida en la Console del navegador (sintaxis CSS, no Playwright):

```js
$$('[data-testid="login-email"]').length   // → 1
$$('[placeholder="ana@ejemplo.com"]').length   // → 1
$$('input[type="email"]').length   // → depende de la página, podría dar más de 1
```

---

## Decisión final

Elijo **`page.getByTestId('login-email')`**.

Motivo: es el único de los candidatos (los míos + los de Claude) que es estable frente a cambios de estilo, copy e i18n, **y** garantiza unicidad por diseño, ya que el atributo fue puesto a propósito por el equipo de dev para testing.

---

## Observación para S5

> Aprendí que "estable" y "único" son dos chequeos distintos: un atributo puede no romperse nunca (como `type="email"`) y aun así no servir como selector si hay más de un elemento con ese mismo atributo en la página. El `data-testid` cubre ambos criterios a la vez, por eso queda primero en la prioridad real de uso.
