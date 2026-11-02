# dgarz-design-angular

Adaptadores standalone generados desde el Core Stencil de `dgarz-design`. Versión local `2.0.0-alpha.0`, aún sin publicar. Objetivo: Angular 20.3 y RxJS 7.8. La compilación usa ng-packagr y declaraciones parciales de Angular.

```ts
import { Component } from '@angular/core';
import { DgarzButton } from 'dgarz-design-angular';

@Component({
  selector: 'app-actions',
  standalone: true,
  imports: [DgarzButton],
  template: '<dgarz-button [disabled]="false" [loading]="false" (dgarz-click)="save()">Guardar</dgarz-button>',
})
export class Actions {
  save() { console.log('Guardar'); }
}
```

Carga `dgarz-design/tokens` en los estilos globales del consumidor. Usa bindings booleanos explícitos `[disabled]` y `[loading]`; no se promete coerción de atributos con el generador fijado en 1.1.0. No se necesita `CUSTOM_ELEMENTS_SCHEMA` al importar el adaptador.

Generación: `npm run build:components --workspace=core` desde la raíz. Compilación: `npm run build:wrappers`. No editar `src/generated`. La versión del generador está fijada por el comportamiento de los eventos; verificar consumidores antes de actualizarla. SSR e hidratación siguen pendientes.
