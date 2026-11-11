# dgarz design

Component Design System (CDS) corporativo, omnicanal y agnóstico. Su misión es unificar diseño y desarrollo mediante componentes universales, accesibles y de alto rendimiento. El paquete principal es **`dgarz-design`**.

**[Entrar a la documentación →](http://192.168.100.6:4321/getting-started/intro)**. La entrada del catálogo es `/getting-started/intro`.

## Estado de la migración

La primera etapa incorpora un Core con **Stencil.js y TypeScript**, CSS estándar encapsulado en Shadow DOM, tokens `--dgarz-*`, los componentes `dgarz-button` y `dgarz-input`, pruebas con Vitest y Testing Library, e historias de Storybook.

El CSS/JavaScript de la versión 1 sigue disponible como implementación heredada. Los adaptadores de React 19, Vue 3.5 y Angular 20.3 ya se generan desde Stencil en paquetes separados. Los demás componentes y la integración SSR/DSD con hidratación se incorporarán en etapas posteriores; Next.js aún requiere validación específica. Esta etapa no declara compatibilidad SSR integral ni certificación WCAG.

## Uso del nuevo Core

```bash
npm install dgarz-design
```

Este ejemplo corresponde al código de esta rama; hasta su publicación npm puede seguir entregando la versión anterior.

```js
import 'dgarz-design/tokens';
import 'dgarz-design/core'; // registra los Custom Elements disponibles
```

```html
<dgarz-button>Continuar</dgarz-button>
<dgarz-button variant="secondary">Cancelar</dgarz-button>
<dgarz-button loading>Guardando</dgarz-button>
<dgarz-button disabled>No disponible</dgarz-button>

<dgarz-input label="Correo" type="email" placeholder="nombre@empresa.com"></dgarz-input>
```

En el botón, el slot contiene la etiqueta visible y accesible. `disabled` y `loading` son atributos booleanos: elimina el atributo para desactivarlo. Stencil interpreta `disabled="false"` como falso; para portabilidad usa la presencia o ausencia del atributo. El botón es de acción (`type="button"`), sin envío de formularios en esta etapa. Emite `dgarz-click` al activarse, con propagación y `composed: true` para atravesar el Shadow DOM.

`dgarz-input` usa un control nativo en Shadow DOM. Prefiere `label` para el nombre accesible. Emite `dgarz-input` y `dgarz-change` con el valor en `detail`. La asociación automática a formularios nativos (FACE) queda para una etapa posterior.

```js
document.querySelector('dgarz-button').addEventListener('dgarz-click', () => {
  console.log('Continuar');
});
```

## Adaptadores generados

| Ecosistema | Paquete | Evento |
| --- | --- | --- |
| React 19 | `dgarz-design-react` | `onDgarzClick` |
| Vue 3.5 | `dgarz-design-vue` | `@dgarz-click` |
| Angular 20.3 | `dgarz-design-angular` | `(dgarz-click)` |

El Core se publica en `dgarz-design/core` desde la 1.2.0 (la raíz del paquete sigue siendo el JS clásico); los adaptadores siguen sin publicar. El Core no incorpora los frameworks a su runtime. La guía está en [Frameworks](http://192.168.100.6:4321/getting-started/frameworks), accesible desde [la entrada de documentación](http://192.168.100.6:4321/getting-started/intro).

Desde la raíz: `npm run build` genera y compila Core y wrappers; `npm run verify:wrappers` instala sus tarballs en un consumidor limpio y verifica tipos, plantillas Angular y comportamiento en Chromium. Instala previamente el navegador de Playwright. La instalación del consumidor puede necesitar la red; `DGARZ_OFFLINE=1` exige una caché completa. Las carpetas temporales se conservan si hay un fallo.

## Identidad

```css
:root {
  --dgarz-color-primary: #0b0b0c;
  --dgarz-color-on-primary: #ffffff;
  --dgarz-spacing-md: 1rem;
}
```

Los tokens son CSS Custom Properties heredables. El tema oscuro se activa con `data-theme="dark"` en un contenedor. Shadow DOM encapsula selectores; el contenido de slots y las propiedades heredables participan deliberadamente en la integración visual.

## Compatibilidad con la versión 1

El punto de entrada raíz pasa al Core de Web Components (ESM), un cambio incompatible que requiere una versión mayor antes de publicar. El comportamiento anterior se importa explícitamente:

```js
import dgarz from 'dgarz-design/legacy';
import 'dgarz-design/full';
dgarz.toast('Hola');
```

Los subpaths `/css`, `/full`, `/app`, `/js`, `/esm` y `/icons`, y los archivos CDN anteriores se conservan. Los tokens `--dg-*` pertenecen al sistema heredado y no son alias de `--dgarz-*`. Los nuevos componentes no requieren el reset ni las hojas globales heredadas.

En la API CSS heredada, cada variante incluye ahora la base: `<button class="dg-btn-primary dg-btn-sm">Guardar</button>`. `dg-btn` por sí solo crea el botón primario de tamaño mediano; tamaños, ancho y efectos siguen siendo modificadores. El marcado anterior con `dg-btn` más variante sigue siendo compatible. Para una acción de menor énfasis usa `dg-btn-subtle`: fondo gris claro y texto negro en tema claro, colores adaptados en oscuro. Funciona sin `dg-btn` y admite `dg-btn-sm`/`dg-btn-lg`. Para borde semántico usa `dg-btn-subtle-primary`, `dg-btn-subtle-success`, `dg-btn-subtle-warning`, `dg-btn-subtle-danger` o `dg-btn-subtle-info`.


## Desarrollo del monorepositorio

Requisitos: Node.js >=22.12 y npm >=10.

```bash
npm install
npm run build          # Core Stencil + distribución heredada
npm test               # Vitest + Testing Library
npm run typecheck      # TypeScript del Core
npm run storybook      # catálogo interactivo, puerto 6006
npm run build:storybook
npm run verify:package # paquete instalado, tipos y Chromium
npm run verify:hydrate # SSR con DSD + hidratación en Chromium
npm run verify:astro-hydrate # build de docs + DSD de /getting-started/core
npm run verify:next-hydrate  # consumidor Next.js App Router + DSD
npm run dev:core       # observación del Core Stencil
npm run dev:docs       # documentación Astro de la versión heredada
npm run build:docs
```

SSR del piloto (solo servidor; no importar en el navegador):

```js
import { renderToString } from 'dgarz-design/hydrate';

const { html } = await renderToString('<dgarz-button>Continuar</dgarz-button>', {
  fullDocument: false,
  serializeShadowRoot: 'declarative-shadow-dom',
});
```

Para observar el SCSS heredado: `npm run dev:legacy --workspace=core`.
La documentación Astro existente describe principalmente la versión 1; Storybook es el catálogo del nuevo Core.

Consulta [ARCHITECTURE.md](./ARCHITECTURE.md) y [CONTRIBUTING.md](./CONTRIBUTING.md).

El avance por fases, la bitácora y los pendientes para retomar el trabajo están en [MIGRATION_STATUS.md](./MIGRATION_STATUS.md).

## Licencia

[MIT](./LICENSE).

## Verificar el paquete distribuible

Instala Chromium una vez con `npx playwright install chromium --only-shell`. Después ejecuta `npm run verify:package`: toma una copia aislada del Core, compara dos builds de producción, genera e instala un tarball en un consumidor temporal y comprueba exports, tipos y comportamiento en Chromium. No publica en npm ni modifica la salida local de desarrollo. Requiere poder iniciar un servidor local y un navegador.

La verificación elimina sus carpetas temporales al aprobar; si falla conserva la ruta de evidencia. Usa `DGARZ_KEEP_PACKAGE_CHECK=1` para conservarlas también al aprobar. Si defines `PLAYWRIGHT_BROWSERS_PATH` durante la instalación del navegador, usa la misma variable al ejecutar el verificador.
