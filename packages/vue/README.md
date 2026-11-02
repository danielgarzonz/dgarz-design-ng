# dgarz-design-vue

Adaptadores generados desde el Core Stencil de `dgarz-design`. Versión local `2.0.0-alpha.0`, aún sin publicar. Objetivo: Vue 3.5.

```vue
<script setup lang="ts">
import { DgarzButton } from 'dgarz-design-vue';
import 'dgarz-design/tokens';
const save = () => console.log('Guardar');
</script>

<template>
  <DgarzButton :disabled="false" :loading="false" @dgarz-click="save">Guardar</DgarzButton>
</template>
```

`vue-router` es un peer requerido por los tipos públicos del runtime oficial del generador, incluso para consumidores que no usan enlaces de router. No se añade al Core agnóstico.

Generación: `npm run build:components --workspace=core` desde la raíz. Compilación: `npm run build:wrappers`. No editar `src/generated`. SSR e hidratación siguen pendientes.
