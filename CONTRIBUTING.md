# Contribuir a dgarz design

Requisitos: Node.js >=22.12 y npm >=10. Ejecuta `npm install` desde la raíz.

## Estructura

- `core/src/components/`: Core Stencil, CSS estándar en Shadow DOM, pruebas y stories por componente.
- `core/src/tokens/`: identidad pública `--dgarz-*`.
- `core/.storybook/`: catálogo del nuevo Core.
- `core/src/scss/` y `core/src/js/`: versión heredada, prefijos `dg-` y `--dg-*`.
- `core/dist/`: salida generada; no editar manualmente.
- `packages/react`, `packages/vue`, `packages/angular`: adaptadores generados y sus empaquetados.
- `tests/consumers`, `scripts/verify-wrappers.mjs`: consumidores de tarballs para tipos y navegador.
- `docs/`: documentación Astro existente.

## Desarrollo

```bash
npm run dev:core
npm run storybook
npm run dev:docs
```

Para trabajar en los estilos heredados utiliza `npm run dev:legacy --workspace=core`.

Cada componente nuevo debe usar un nombre `dgarz-*`, declararse con `@Component` de Stencil, encapsular CSS estándar y consumir tokens `--dgarz-*` con valores de respaldo. Utiliza controles HTML nativos y define una etiqueta accesible. Documenta propiedades, slots, estados y eventos. Evita acceso a APIs de navegador al importar módulos para preparar el soporte SSR.

Los eventos propios llevan prefijo `dgarz-`. Las historias `.stories.tsx` usan elementos HTML nativos, Controls y los estados disponibles; no incorporan React al Core. Incluye pruebas significativas con Vitest y Testing Library de renderizado, interacciones, eventos y estados. Las pruebas importan la salida compilada y `npm test` ejecuta antes el build de Stencil. Para observar cambios del componente junto con las pruebas, mantén `npm run dev:core` en otra terminal. Los wrappers se generan con los output targets oficiales; no edites `packages/*/src/generated`. Ejecuta `npm run build` desde la raíz para generar y compilar todos los paquetes.

## Verificación

```bash
npm run typecheck
npm test
npm run build
npm run build:storybook
npm run verify:package # paquete instalado, tipos y Chromium
npm run verify:wrappers # adaptadores instalados, tipos, plantillas y Chromium
npm run build:docs
```

Los controles básicos de semántica no equivalen a una certificación WCAG. Al ampliar componentes, agrega comprobaciones con teclado, navegadores y tecnologías de asistencia adecuadas.

Consulta [ARCHITECTURE.md](./ARCHITECTURE.md) para las etapas de migración y las limitaciones actuales. Los cambios incompatibles del punto de entrada requieren una versión mayor y no deben publicarse como una actualización 1.x.

## Licencia

Las contribuciones se distribuyen bajo [MIT](./LICENSE).
