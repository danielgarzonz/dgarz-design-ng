# Documentación de dgarz design

La entrada principal es **[Introducción](http://192.168.100.6:4321/getting-started/intro)**, en la ruta `/getting-started/intro`.

Desde la raíz del monorepositorio:

```bash
npm install
npm run build
npm run dev:docs
```

Astro escucha en todas las interfaces (`0.0.0.0`) en el puerto `4321`. El puerto es estricto: si está ocupado, falla en lugar de cambiar la dirección del catálogo. La dirección `192.168.100.6` corresponde al equipo de desarrollo en la red local; el servidor debe estar ejecutándose para acceder desde otros dispositivos.

Los enlaces internos usan `/getting-started/intro`, por lo que también funcionan en localhost o en el dominio de despliegue. La portada `/` se conserva; sus accesos a documentación y el botón «Empezar» llevan a la introducción. Dentro del catálogo, el logo y «Inicio» regresan a esa misma entrada.

```bash
npm run build:docs
npm run preview --workspace=docs
```

El catálogo Astro aún describe principalmente la implementación heredada. El avance de la migración a Stencil y sus pendientes están en [MIGRATION_STATUS.md](../MIGRATION_STATUS.md). Storybook sigue siendo el catálogo de desarrollo del nuevo Core; no sustituye esta entrada de documentación.

## Regla de contenido en headers curvos

En un encabezado con esquinas curvas, el borde visible del último icono debe alinearse con la tangente interior donde empieza la curva. El límite es el trazo visible, no el borde del botón. El inset móvil es `--pub-nav-radius` (55px) con áreas seguras. Los botones miden 30×36px con icono de 12px; la compensación de −9px alinea el trazo con la tangente y deja que la zona pulsable se extienda dentro del header. El modal completo usa el mismo criterio con radio e inset de 48px. Aplicar la misma alineación con el menú abierto. La variante de escritorio sin curvas usa la alineación del shell.

El límite también se aplica al extremo izquierdo: el trazo visible inicial de la marca se alinea con la tangente izquierda. La compensación de Newsreader se limita a `.pub-nav .pub-brand` en móvil; no afecta al footer ni al escritorio. Revisarla si cambia la tipografía.
