# Tarea S4 — Análisis de selectores

## Archivo analizado: `hola-mundo.spec.ts
| # | Selector | Tipo | Estabilidad (1-5) | Propuesta mejor |
|---|---|---|---|---|
| 1 | `[data-test="username"]` | Atributo personalizado | 4 | `page.getByLabel('Username')` (5) |
| 2 | `[data-test="password"]` | Atributo personalizado | 4 | `page.getByLabel('Password')` (5) |
| 3 | `[data-test="login-button"]` | Atributo personalizado | 4 | `page.getByRole('button', { name: 'Login' })` (5) |
| 4 | `.title` | Clase CSS | 2 | `page.getByRole('heading', { name: 'Products' })` (5) |
| 5 | `[data-test="error"]` | Atributo personalizado | 4 | — ninguna, ya es estable |

## Criterio de estabilidad

| Puntuación | Tipo de selector |
|---|---|
| 5 | `getByRole`, `getByLabel`, `getByText` — semántico, refleja lo que ve el usuario |
| 4 | `getByTestId`, atributo `data-test` / `data-testid` — estable, puesto a propósito para testing |
| 3 | Atributo nativo (`type`, `name`, `autocomplete`) — puede cambiar sin pensar en los tests |
| 2 | Clase CSS (`.btn-primary`, `.title`) — se rompe con cambios de diseño |
| 1 | Posición (`nth-child`) — se rompe si cambia el orden del DOM |

## 🚩 Selector frágil detectado

`page.locator('.title')` — clase CSS de estilo puro.
Si el dev renombra la clase o cambia el componente, el test se rompe sin aviso.
**Propuesta:** `page.getByRole('heading', { name: 'Products' })`

