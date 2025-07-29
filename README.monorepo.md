# React Native Leader Line - Monorepo

Este repositorio utiliza una estructura de monorepo con Yarn Workspaces para gestionar la librería y las aplicaciones de ejemplo.

## Estructura del Proyecto

```
react-native-leader-line/
├── packages/
│   └── react-native-leader-line/    # Librería principal
├── apps/
│   └── (futuras aplicaciones de ejemplo)
└── docs/                            # Documentación del proyecto
```

## Comandos Disponibles

Desde la raíz del proyecto:

```bash
# Instalar dependencias
yarn install

# Build de la librería
yarn build

# Ejecutar tests
yarn test
yarn test:watch
yarn test:coverage

# Linting
yarn lint
yarn lint:fix
```

## Desarrollo

Para trabajar en la librería:

```bash
cd packages/react-native-leader-line
# Hacer cambios...
yarn build  # O desde la raíz: yarn build
```

## Estado Actual

- ✅ Monorepo configurado
- ✅ Build funcionando
- ⚠️ Tests: 226 pasando / 253 fallando
- ⚠️ ESLint: 271 warnings/errors

## Próximos Pasos

1. Crear aplicación de ejemplo con Expo
2. Arreglar todos los tests fallidos
3. Resolver warnings de ESLint
4. Configurar CI/CD con GitHub Actions