# dgarz-design-react

Adaptadores generados desde el Core Stencil de `dgarz-design`. Versión local `2.0.0-alpha.0`, aún sin publicar. Objetivo validado: React 19; Next.js se utiliza como componente de cliente en esta etapa.

```tsx
'use client';
import { DgarzButton } from 'dgarz-design-react';
import 'dgarz-design/tokens';

export function Actions() {
  return <DgarzButton disabled={false} loading={false} onDgarzClick={() => console.log('Guardar')}>Guardar</DgarzButton>;
}
```

Generación: `npm run build:components --workspace=core` desde la raíz. Compilación: `npm run build:wrappers`. No editar `src/generated`.

El runtime oficial del adaptador utiliza `@lit/react` como puente de propiedades/eventos. El Core sigue implementado en Stencil; React no es una dependencia del paquete principal. SSR, DSD y Next.js App Router con hidratación se validarán en la fase 5.
