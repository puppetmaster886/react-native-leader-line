#!/bin/bash

# Pre-deployment Check Script
set -e

echo "🔍 Pre-deployment checks..."

# Verificar que todos los archivos necesarios existen
echo "✅ Checking required files..."
files=(
    "yarn.lock"
    "package.json"
    "apps/expo-example/package.json"
    "packages/react-native-leader-line/package.json"
    ".github/workflows/deploy.yml"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "  ✓ $file exists"
    else
        echo "  ❌ $file missing"
        exit 1
    fi
done

# Verificar que el build de la librería funciona
echo ""
echo "🔨 Testing library build..."
cd packages/react-native-leader-line
yarn build
cd ../..

# Verificar que el export de Expo funciona
echo ""
echo "🌐 Testing Expo web export..."
cd apps/expo-example
npx expo export -p web --clear
cd ../..

# Verificar que los archivos de salida existen
echo ""
echo "📁 Checking output files..."
required_files=(
    "apps/expo-example/dist/index.html"
    "apps/expo-example/dist/_expo"
)

for file in "${required_files[@]}"; do
    if [ -e "$file" ]; then
        echo "  ✓ $file exists"
    else
        echo "  ❌ $file missing"
        exit 1
    fi
done

echo ""
echo "🎉 All checks passed! Ready for deployment."
echo "💾 Commit your changes and push to trigger GitHub Pages deployment."