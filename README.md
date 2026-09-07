# Transparencia Radical

Simulador de costos de vivienda con React, TypeScript, TanStack Start, Tailwind CSS y Radix UI.

## Desarrollo

Requiere Node.js 22.13 o superior y npm. La versión recomendada está indicada en `.nvmrc`.

```sh
npm ci
npm run dev
```

## Comprobaciones

```sh
npm run check
npm run build
```

El comando check verifica TypeScript, ESLint (sin warnings) y formato. Usa npm run format para aplicar el formato.

Con Microsoft Edge instalado, ejecuta `npm run test:e2e` después de compilar. Las pruebas abren un navegador sin ventana y verifican el simulador, las notificaciones, la accesibilidad, el ancho móvil y la página 404.

## Servidor de Node.js

```sh
npm run build
npm start
```

La carpeta .output contiene el servidor y los recursos compilados.

## Estructura

- src/routes: rutas y documento principal.
- src/components: simulador, resultados, agenda y accesibilidad.
- src/components/ui: componentes reutilizables.
- src/lib/simulation.ts: cálculos de ejemplo.
- public: recursos estáticos.

## Alcance del prototipo

Los importes y la calificación por DNI son datos de ejemplo. No hay conexión con SUNARP ni con entidades financieras. La agenda guarda la selección en memoria y no envía recordatorios. Sustituye el número de ejemplo de WhatsApp antes de publicar. El kiosco utiliza servicios externos de mapas y QR.
