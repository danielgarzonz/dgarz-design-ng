# dgarz design

Component Design System (CDS) corporativo, omnicanal y agnóstico. Su misión es unificar diseño y desarrollo mediante componentes universales, accesibles y de alto rendimiento. El paquete principal es **`dgarz-design`**.

**[Entrar a la documentación local →](http://192.168.100.6:4321/comenzar/intro)**.

## Estado de la migración

La primera etapa incorpora un Core con **Stencil.js y TypeScript**, CSS estándar encapsulado en Shadow DOM, tokens `--dgarz-*`, el componente `dgarz-button`, pruebas con Vitest y Testing Library, e historias de Storybook.

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
```

El slot contiene la etiqueta visible y accesible. `disabled` y `loading` son atributos booleanos: elimina el atributo para desactivarlo. Stencil interpreta `disabled="false"` como falso; para portabilidad usa la presencia o ausencia del atributo. El botón es de acción (`type="button"`), sin envío de formularios en esta etapa. Emite `dgarz-click` al activarse, con propagación y `composed: true` para atravesar el Shadow DOM.

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

El Core se publica en `dgarz-design/core` desde la 1.2.0 (la raíz del paquete sigue siendo el JS clásico); los adaptadores siguen sin publicar. El Core no incorpora los frameworks a su runtime. La guía está en [Frameworks](http://192.168.100.6:4321/comenzar/frameworks), accesible desde [la entrada de documentación](http://192.168.100.6:4321/comenzar/intro).

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


## Desarrollo

Desde la raíz del monorepositorio, consulta [la guía de contribución](https://github.com/dgarzonz/dgarz-design/blob/main/CONTRIBUTING.md) y [el plan de arquitectura](https://github.com/dgarzonz/dgarz-design/blob/main/ARCHITECTURE.md).

```bash
npm install
npm run build
npm test
npm run typecheck
npm run storybook
npm run build:storybook
npm run verify:package # paquete instalado, tipos y Chromium
```

## Licencia

[MIT](./LICENSE).

Para `verify:package`, instala Chromium previamente: `npx playwright install chromium --only-shell`. La prueba usa un consumidor temporal del tarball e inicia un servidor local; no publica el paquete.
