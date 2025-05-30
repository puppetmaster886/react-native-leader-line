# Test Reports Guide

## Overview

Esta librería está configurada para generar reportes HTML completos tanto para los resultados de los tests como para el coverage de código.

## Scripts Disponibles

### Reportes Básicos

```bash
# Ejecutar tests con coverage HTML
npm run test:coverage:html

# Generar reporte completo (tests + coverage)
npm run test:report

# Generar y abrir reportes automáticamente
npm run test:report:open
```

### Ubicación de los Reportes

- **Test Results**: `./test-reports/jest-report.html`
- **Coverage Report**: `./coverage/index.html`

## Contenido de los Reportes

### 1. Reporte de Tests (`jest-report.html`)

- ✅ Resumen de todos los test suites
- ✅ Detalles de tests pasados/fallidos
- ✅ Tiempo de ejecución
- ✅ Mensajes de error detallados
- ✅ Filtros interactivos
- ✅ Navegación por suites

### 2. Reporte de Coverage (`index.html`)

- 📊 Porcentaje de cobertura por archivo
- 📊 Métricas de líneas, funciones, branches y statements
- 📊 Visualización interactiva del código
- 📊 Archivos no cubiertos
- 📊 Hotspots de código sin testear

## Configuración Personalizada

### Jest HTML Reporters

```json
{
  "reporters": [
    "default",
    [
      "jest-html-reporters",
      {
        "publicPath": "./test-reports",
        "filename": "jest-report.html",
        "pageTitle": "React Native Leader Line - Test Results",
        "expand": true,
        "includeFailureMsg": true,
        "includeSuiteFailure": true
      }
    ]
  ]
}
```

### Coverage Reporters

```json
{
  "coverageReporters": [
    "html", // Reporte HTML interactivo
    "text", // Resumen en consola
    "lcov", // Para herramientas CI/CD
    "clover" // Para integraciones XML
  ]
}
```

## Uso en Development

### Desarrollo Continuo

```bash
# Watch mode con coverage
npm run test:watch

# Generar reportes después de cambios
npm run test:report
```

### CI/CD

```bash
# Para pipelines de CI
npm run test:ci
```

## Análisis de Resultados

### Interpretando el Coverage

- **Verde (>80%)**: Excelente cobertura
- **Amarillo (60-80%)**: Cobertura aceptable
- **Rojo (<60%)**: Necesita más tests

### Tests Fallidos

- Revisa el reporte HTML para detalles específicos
- Los errores incluyen stack traces completos
- Filtros disponibles por suite o status

## Integración con IDEs

### VS Code

- Extensión "Coverage Gutters" para visualizar coverage
- Extensión "Jest" para ejecutar tests individuales

### WebStorm/IntelliJ

- Soporte nativo para reportes de Jest
- Integración con coverage HTML

## Troubleshooting

### Problemas Comunes

```bash
# Si no se generan reportes
rm -rf coverage/ test-reports/
npm run test:report

# Si hay problemas de permisos
chmod +x node_modules/.bin/jest
```

### Debugging

```bash
# Tests en modo verbose
npm test -- --verbose

# Tests específicos
npm test -- --testNamePattern="LeaderLine"
```
