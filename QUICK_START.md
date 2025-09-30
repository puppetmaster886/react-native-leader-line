# 🚀 Quick Start - Testing react-native-leader-line

## 🔄 Development Mode (Recommended)

Para desarrollo activo con auto-watch:

### 1. Auto-Watch Development

```bash
# Terminal 1: Auto-build en cambios
yarn dev:lib

# Terminal 2: App de ejemplo
yarn dev:example

# O ambos juntos:
yarn dev:all
```

### 2. Debug Tools

- Usa el botón 🐛 en el header de cualquier demo
- Habilita toggles según necesites:
  - **SVG Background**: Área de renderizado SVG
  - **Container Background**: Límites del contenedor
  - **Visual Markers**: Puntos de conexión
  - **Console Logging**: Logs detallados

### 3. Flujo de Desarrollo

1. Haz cambios en `packages/react-native-leader-line/src/`
2. El auto-watch compilará automáticamente
3. Metro recargará la app de ejemplo
4. Usa debug tools para verificar cambios

---

## 📦 Production Link Mode

### 1. Build y Link (EN ESTA LIBRERÍA)

```bash
# En el directorio react-native-leader-line
npm run build    # ← IMPORTANTE: Build antes del link
npm link
```

### 2. En tu App React Native

```bash
# Instalar dependencia requerida
npm install react-native-svg

# Link local de la librería
npm link react-native-leader-line

# Solo iOS
cd ios && pod install
```

### 3. Usar en tu App

```tsx
// App.tsx
import React from "react";
import { SafeAreaView } from "react-native";
import { CompleteDemo } from "react-native-leader-line/CompleteDemo";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CompleteDemo />
    </SafeAreaView>
  );
}
```

## 🎯 Componentes de Prueba Disponibles

### Para Empezar

```tsx
import { BasicTestComponent } from "react-native-leader-line/BasicTestComponent";
```

### Para Testing Avanzado

```tsx
import { AdvancedFeaturesTest } from "react-native-leader-line/AdvancedFeaturesTest";
import { ManagerPatternTest } from "react-native-leader-line/ManagerPatternTest";
import { PerformanceTest } from "react-native-leader-line/PerformanceTest";
```

### Demo Completo

```tsx
// Opción 1 (Recomendado): Default import
import CompleteDemo from "react-native-leader-line/CompleteDemo";

// Opción 2: Named import (puede dar error de tipos en algunas versiones)
import { CompleteDemo } from "react-native-leader-line/CompleteDemo";
```

## ⚠️ Si Algo Sale Mal

**Build falla?**

```bash
# Limpiar y rebuild
rm -rf lib/
npm run build
```

**Link no funciona?**

```bash
# Re-link
npm unlink react-native-leader-line
npm link react-native-leader-line
```

**Error de tipos React (JSX component)?**

```tsx
// Solución rápida: Usa default import
import CompleteDemo from "react-native-leader-line/CompleteDemo";
```

**Solución permanente**: Si tienes en tu package.json:

```json
"resolutions": {
  "@types/react": "^17"  // ← Cambiar a "^18"
}
```

Ver: `REACT_TYPES_FIX.md` y `COMPATIBILITY_ANALYSIS.md` para más detalles

**Líneas no aparecen?**

- Verifica que react-native-svg esté instalado
- En iOS: `cd ios && pod install`
- Reinicia Metro: `npx react-native start --reset-cache`

## ✅ Qué Verificar

1. **BasicTestComponent**: Líneas básicas funcionan
2. **AdvancedFeaturesTest**: Todos los efectos y animaciones
3. **ManagerPatternTest**: Creación dinámica funciona
4. **PerformanceTest**: FPS > 30 con múltiples líneas

¡Listo para probar! 🎉
