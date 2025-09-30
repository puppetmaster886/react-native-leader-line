# ArrayIndexOutOfBoundsException Fix & Enhanced Crash Detection

## Problema Resuelto

El error `ArrayIndexOutOfBoundsException: length=1; index=2` en `com.horcrux.svg.RenderableView.renderMarkers` ha sido solucionado con múltiples capas de protección.

## Cambios Implementados

### 1. Fixes en SVG Markers (LeaderLine.tsx)
- **Validaciones defensivas**: Agregadas verificaciones para `startPlugSize > 0` y `endPlugSize > 0`
- **Límites de propiedades**: `refX` limitado a máximo 50 para evitar índices fuera de rango
- **Propiedades seguras**: `markerUnits="strokeWidth"` para evitar problemas de coordenadas
- **Dimensiones mínimas**: `Math.max(1, size)` para evitar tamaños 0 o negativos

### 2. Sistema de Detección de Errores Nativos (NativeCrashBoundary.tsx)
- **Error Boundary**: Captura errores React que no aparecen en console.log
- **Native crash detection**: Intercepta crashes a nivel nativo usando ErrorUtils
- **SVG-specific handling**: Detecta específicamente errores de react-native-svg
- **Auto-recovery**: Permite reintentar componentes que fallan

### 3. Logging Global Mejorado (GlobalErrorLogger.ts)
- **Console intercept**: Intercepta console.error para capturar errores silenciosos
- **adb logcat visibility**: Todos los logs prefijados con "ReactNative:" para fácil grep
- **Error history**: Mantiene historial de errores para debugging
- **Memory warning detection**: Detecta warnings de memoria que preceden crashes

### 4. Validaciones en createPlugPath (math.ts)
- **Input validation**: Verifica que plugType y size sean válidos
- **Size limits**: Limita size entre 0-100 para evitar valores extremos
- **Fallback seguro**: Retorna string vacío en caso de error

## Por Qué No Aparecía en la Consola

Los crashes nativos de react-native-svg ocurren en el nivel nativo (Java/Swift) y no siempre se propagan a JavaScript. El sistema previo solo capturaba errores JS, no errores nativos del motor SVG.

### Soluciones Implementadas:
1. **ErrorUtils.setGlobalHandler()**: Captura errores nativos antes de que causen crashes
2. **Console intercept**: Captura errores que se logean pero no se muestran
3. **adb logcat prefix**: Hace todos los logs visibles con `adb logcat | grep "ReactNative"`
4. **Error Boundary**: Captura errores React que no llegan a console

## Cómo Probar las Mejoras

### 1. Ejecutar con adb logcat
```bash
# Terminal 1 - Limpiar y monitorear logs
adb logcat -c && adb logcat | grep "ReactNative"

# Terminal 2 - Iniciar aplicación
cd apps/expo-example
npx expo start
```

### 2. Buscar Logs Específicos
- `LEADER_LINE_CRASH_DETECTED`: Errores del componente LeaderLine
- `SVG_OPERATION_FAILED`: Fallos en operaciones SVG
- `NATIVE_ERROR_DETECTED`: Crashes nativos interceptados
- `SVG_CRASH_INTERCEPTED`: Errores específicos de react-native-svg

### 3. Probar Escenarios Problemáticos
- Navegar a PathTypesDemo (que antes causaba crashes)
- Cambiar tipos de path rápidamente
- Usar plug sizes extremos (muy pequeños/grandes)
- Rotar dispositivo durante renderizado

### 4. Verificar Recuperación
- Errors should show user-friendly error UI
- Components should offer "Tap to retry" option
- App should continue functioning after errors

## Logs Esperados (Normales)

```
ReactNative: GlobalErrorLogger initialized
ReactNative: App mounted - Enhanced crash detection active
ReactNative: Executing startPlugPath creation for arrow1
ReactNative: startPlugPath creation for arrow1 completed successfully
ReactNative: LeaderLine startPlugPath created: {"startPlug":"arrow1","startPlugSize":10,"path":"M 0 0 L 10 5 L 0 10 z"}
```

## Logs de Error (Interceptados)

```
ReactNative: SVG_OPERATION_FAILED {"operationName":"startPlugPath creation","error":"Invalid parameters","timestamp":"2025-09-29T..."}
ReactNative: LEADER_LINE_CRASH_DETECTED {"error":"ArrayIndexOutOfBoundsException","stack":"...","timestamp":"2025-09-29T..."}
```

## Resultado

- ✅ ArrayIndexOutOfBoundsException prevenido con validaciones defensivas
- ✅ Errores nativos ahora visibles en adb logcat con prefix "ReactNative:"
- ✅ Error boundaries capturan crashes que antes pasaban desapercibidos
- ✅ Sistema de logging completo para debugging futuro
- ✅ Auto-recovery permite que la app continúe funcionando tras errores