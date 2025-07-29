# Plan de Proyecto: Refactorización y Mejora de react-native-leader-line

Este documento describe el plan paso a paso para refactorizar la librería, solucionar los problemas existentes y establecer una base sólida para el futuro, siguiendo las mejores prácticas de la industria.

## Timeline Estimado
- **Fase 0**: 1 día
- **Fase 1**: 2-3 días  
- **Fase 2**: 2 días
- **Fase 3**: 2-3 días
- **Fase 4**: 1 día
- **Fase 5**: 1 día
- **Total**: 9-11 días

## Fase 0: Preparación y Análisis

### Paso 0.1: Backup y Estado Actual

**Objetivo:** Documentar el estado actual y crear un punto de restauración.

**Tareas:**

1. **Backup completo:**
   * Crear un tag git: `git tag pre-refactor-backup`
   * Crear una rama de respaldo: `git checkout -b backup/pre-monorepo`
   * Documentar el commit hash actual

2. **Documentar estado actual:**
   * Tests: 226 pasando / 253 fallando (total: 479)
   * Build TypeScript: Fallando con errores de tipos
   * ESLint: 271 warnings/errors
   * Cobertura actual: Por determinar

3. **Lista de dependencias objetivo:**
   ```json
   {
     "devDependencies": {
       "@types/react": "18.2.0",
       "@types/react-native": "0.70.0",
       "react": "18.2.0",
       "react-test-renderer": "18.2.0",
       "@react-native/babel-preset": "latest",
       "@testing-library/react-native": "12.3.0"
     },
     "peerDependencies": {
       "react": ">=16.8.0",
       "react-native": ">=0.64.0",
       "react-native-svg": ">=13.0.0"
     }
   }
   ```

**Criterio de Éxito:** 
- Backup creado y verificado
- Estado actual documentado con métricas específicas
- Lista de dependencias revisada y aprobada

## Fase 1: Estabilización y Reestructuración

### Paso 1: Reestructuración a Monorepo

**Objetivo:** Migrar la estructura actual a un monorepo usando `yarn workspaces` para separar la librería de las aplicaciones de ejemplo.

**Tareas:**

1. **Investigación (State of the Art):**
   * **Google Query:** `github react-native-reanimated yarn workspaces`, `github react-native-gesture-handler monorepo structure`.
   * **Análisis:** Estudiar cómo `react-native-reanimated` y `react-native-gesture-handler` estructuran su `package.json` raíz, sus directorios `packages/` y `apps/`, y cómo definen los workspaces.

2. **Ejecución:**
   * Crear un `package.json` en la raíz del proyecto:
     ```json
     {
       "name": "react-native-leader-line-monorepo",
       "private": true,
       "workspaces": [
         "packages/*",
         "apps/*"
       ],
       "scripts": {
         "bootstrap": "yarn install",
         "test": "yarn workspace react-native-leader-line test",
         "build": "yarn workspace react-native-leader-line build",
         "lint": "yarn workspaces run lint"
       }
     }
     ```
   * Crear los directorios `packages` y `apps`.
   * Mover todo el contenido actual de la librería (src, package.json, etc.) a un nuevo directorio: `packages/react-native-leader-line`.

3. **Verificación:**
   * Ejecutar `yarn install` en el directorio raíz.
   * **Criterio de Éxito:** 
     - El comando completa sin errores
     - Yarn reporta: "✨ Done in X.XXs" 
     - Se crea `node_modules` en la raíz con enlaces simbólicos

### Paso 2: Reparación del Build y Tests Unitarios

**Objetivo:** Arreglar el build de TypeScript y estabilizar el entorno de Jest para que los tests puedan ejecutarse.

**Tareas:**

1. **Investigación (State of the Art):**
   * **Google Query:** `github software mansion jest.config.js`, `react native library jest setup mock`.
   * **Análisis:** Revisar la configuración de Jest (`jest.config.js`, `jest.setup.js`) en los repositorios de Software Mansion.

2. **Resolución de TypeScript (dentro de `packages/react-native-leader-line`):**
   * **Actualizar versiones en package.json:**
     ```json
     "@types/react": "18.2.0",
     "@types/react-native": "0.70.0"
     ```
   * **Agregar en tsconfig.json temporalmente:**
     ```json
     {
       "compilerOptions": {
         "skipLibCheck": true
       }
     }
     ```
   * **Solución para error "bigint":** Asegurar que @types/react-native no tenga su propia versión de @types/react

3. **Configuración de Jest:**
   * **Crear jest.config.js:**
     ```javascript
     module.exports = {
       preset: 'react-native',
       setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
       transformIgnorePatterns: [
         'node_modules/(?!(react-native|@react-native|react-native-svg)/)'
       ],
       moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
       testMatch: ['**/__tests__/**/*.(ts|tsx|js|jsx)', '**/*.(test|spec).(ts|tsx|js|jsx)']
     };
     ```

4. **Estructura de Mocks:**
   * Crear directorio `__mocks__/` con:
     - `react-native.js` - Mock completo de componentes RN
     - `react-native-svg.js` - Mock de componentes SVG
     - `react-test-renderer.js` - Mock para evitar errores de .root

5. **Configuración de Babel:**
   * **Crear babel.config.js:**
     ```javascript
     module.exports = {
       presets: ['module:@react-native/babel-preset'],
       plugins: ['@babel/plugin-transform-runtime']
     };
     ```

6. **Verificación:**
   * Desde `packages/react-native-leader-line`, ejecutar `yarn build`.
   * **Criterio de Éxito (Build):** 
     - 0 errores de TypeScript
     - Genera carpeta `lib/` con archivos .js y .d.ts
   * Ejecutar `yarn test`.
   * **Criterio de Éxito (Test):** 
     - Jest ejecuta los 479 tests (aunque fallen)
     - No hay crashes del test runner
     - Reporte muestra X passing, Y failing

## Fase 2: Entorno de Ejemplos y Pruebas Visuales

### Paso 3: Creación de la App de Ejemplo (Expo)

**Objetivo:** Crear una aplicación de Expo que sirva como entorno de desarrollo rápido y para pruebas visuales.

**Tareas:**

1. **Investigación (State of the Art):**
   * **Google Query:** `expo app local package yarn workspace`, `github react-native-maps example app`.
   * **Análisis:** Investigar cómo otras librerías configuran sus apps de ejemplo para consumir la librería local.

2. **Ejecución:**
   * Dentro del directorio `apps/`, ejecutar:
     ```bash
     npx create-expo-app expo-example --template blank-typescript
     ```
   * En `apps/expo-example/package.json`, añadir:
     ```json
     {
       "dependencies": {
         "react-native-leader-line": "*",
         "react-native-svg": "13.14.0"
       }
     }
     ```
   * Crear un componente básico en `apps/expo-example/App.tsx`.

3. **Verificación:**
   * Ejecutar `yarn install` en la raíz del monorepo.
   * Navegar a `apps/expo-example` y ejecutar `npx expo start`.
   * **Criterio de Éxito:** 
     - App compila sin errores
     - Se visualiza en Expo Go
     - LeaderLine renderiza correctamente

### Paso 4: Migración de Ejemplos y Pruebas Visuales

**Objetivo:** Mover los demos existentes a la app de Expo y crear un entorno de pruebas visuales.

**Tareas:**

1. **Investigación (State of the Art):**
   * **Google Query:** `react navigation stack example`, `best react native component playground`.
   * **Análisis:** Ver cómo las librerías de componentes estructuran sus apps de ejemplo.

2. **Ejecución:**
   * Implementar navegación con `@react-navigation/native-stack`.
   * Migrar casos de uso:
     - BasicDemo
     - PathTypes (straight, arc, fluid, magnet, grid)
     - Animations
     - Socket positions
     - Labels
     - Multiple lines
   * Crear una pantalla índice con lista de ejemplos.

3. **Verificación:**
   * Ejecutar la app de Expo en dispositivos iOS y Android.
   * **Criterio de Éxito:** 
     - Todos los ejemplos funcionan sin crashes
     - Renderizado correcto en ambas plataformas
     - Performance fluida (60 FPS)

### Paso 4.5: Creación de App React Native Pura

**Objetivo:** Verificar que la librería funciona sin Expo.

**Tareas:**

1. **Ejecución:**
   * En `apps/`, crear app React Native CLI:
     ```bash
     npx react-native init BareExample --template react-native-template-typescript
     ```
   * Configurar para usar la librería local
   * Implementar ejemplo básico

2. **Verificación:**
   * **Criterio de Éxito:**
     - Build exitoso en iOS: `npx react-native run-ios`
     - Build exitoso en Android: `npx react-native run-android`
     - LeaderLine funciona sin Expo

## Fase 3: Finalización y Mantenimiento

### Paso 5: Corrección de Tests Unitarios

**Objetivo:** Arreglar todos los tests unitarios que fallan.

**Tareas:**

1. **Ejecución:**
   * Dentro de `packages/react-native-leader-line`, ejecutar `yarn test --watch`.
   * Categorizar los 253 tests fallidos por tipo de error
   * Abordar cada categoría sistemáticamente:
     - Errores de mocking
     - Errores de tipos
     - Errores de lógica
   * Usar la app de Expo como referencia visual.

2. **Verificación:**
   * Ejecutar `yarn test --coverage`.
   * **Criterio de Éxito:** 
     - 479/479 tests pasando (100%)
     - Cobertura: ≥80% en branches, functions, lines, statements
     - 0 warnings en la consola

### Paso 6: Documentación y Limpieza

**Objetivo:** Actualizar la documentación para reflejar la nueva estructura y eliminar archivos obsoletos.

**Tareas:**

1. **Ejecución:**
   * **README.md raíz:**
     - Estructura del monorepo
     - Comandos principales
     - Guía de contribución
   * **packages/react-native-leader-line/README.md:**
     - Instalación: `npm install react-native-leader-line`
     - API completa con ejemplos
     - Nota: "Esta librería NO requiere Expo"
   * **apps/expo-example/README.md:**
     - Cómo ejecutar: `yarn && npx expo start`
     - Lista de ejemplos disponibles
   * **Limpieza:**
     - Eliminar archivos demo del root
     - Eliminar configuraciones obsoletas
     - Actualizar .gitignore

2. **Verificación:**
   * **Criterio de Éxito:** 
     - Documentación clara y completa
     - 0 archivos obsoletos
     - Estructura limpia y organizada

### Paso 7: Configuración de CI/CD

**Objetivo:** Automatizar la verificación de la calidad del código.

**Tareas:**

1. **Investigación (State of the Art):**
   * **Google Query:** `github actions monorepo yarn workspaces`, `github actions expo cli`.
   * **Análisis:** Estudiar workflows de repositorios de referencia.

2. **Ejecución (.github/workflows/ci.yml):**
   ```yaml
   name: CI
   on: [push, pull_request]
   jobs:
     lint:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
         - run: yarn install --frozen-lockfile
         - run: yarn lint
     
     test:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
         - run: yarn install --frozen-lockfile
         - run: yarn test --coverage
         - uses: codecov/codecov-action@v3
     
     build:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
         - run: yarn install --frozen-lockfile
         - run: yarn build
   ```

3. **Verificación:**
   * **Criterio de Éxito:** 
     - Todos los jobs pasan en verde
     - Tiempo total < 10 minutos
     - Badge de CI en README

## Fase 4: Testing E2E y Performance

### Paso 8: Configuración de Tests E2E

**Objetivo:** Implementar tests de integración automatizados.

**Tareas:**

1. **Configuración de Detox/Maestro:**
   * Instalar y configurar en `apps/bare-example`
   * Escribir tests para casos críticos:
     - Renderizado inicial
     - Actualización dinámica
     - Animaciones
     - Múltiples líneas

2. **Tests de Performance:**
   * Medir FPS con 10, 50, 100 líneas
   * Tiempo de renderizado inicial
   * Uso de memoria

3. **Verificación:**
   * **Criterio de Éxito:**
     - Tests E2E pasando en CI
     - Performance: 60 FPS con 50 líneas
     - Memoria: < 50MB con 100 líneas

## Fase 5: Publicación y Mantenimiento

### Paso 9: Preparación para Publicación

**Objetivo:** Preparar la librería para publicación en npm.

**Tareas:**

1. **Versionado y Changelog:**
   * Implementar semantic-release
   * Generar CHANGELOG.md automático
   * Configurar conventional commits

2. **Proceso de Publicación:**
   * Script `npm run release`
   * Verificación pre-publish
   * Publicación automática desde CI

3. **Verificación:**
   * **Criterio de Éxito:**
     - Publicación exitosa en npm
     - Instalación funciona: `npm i react-native-leader-line`
     - Documentación en npmjs.com correcta

## Estrategia de Rollback

### Puntos de Checkpoint:
1. **Post-Fase 0:** Tag `checkpoint-1-analysis`
2. **Post-Fase 1:** Tag `checkpoint-2-monorepo`
3. **Post-Fase 2:** Tag `checkpoint-3-examples`
4. **Post-Fase 3:** Tag `checkpoint-4-tests-passing`

### Proceso de Reversión:
```bash
# En caso de fallo crítico
git checkout backup/pre-monorepo
git checkout -b recovery/attempt-2
# Aplicar solo los cambios exitosos
```

## Métricas de Éxito Final
- ✅ 479/479 tests pasando
- ✅ 0 errores de TypeScript
- ✅ 0 warnings de ESLint
- ✅ Cobertura > 80%
- ✅ Build exitoso en iOS y Android
- ✅ Ejemplos funcionando en Expo y React Native CLI
- ✅ CI/CD completamente verde
- ✅ Publicado en npm
- ✅ Documentación completa y actualizada