#!/bin/bash

# Test Deploy Script - Simula el workflow de GitHub Actions
set -e  # Para que falle si cualquier comando falla

echo "🚀 Testing deployment workflow locally..."

# Limpiar builds anteriores
echo "🧹 Cleaning previous builds..."
rm -rf apps/expo-example/dist
rm -rf packages/react-native-leader-line/lib

# Simular los pasos del workflow
echo "📦 Installing root dependencies..."
yarn install

echo "🔨 Building library..."
yarn workspace react-native-leader-line build

echo "📱 Installing expo-example dependencies..."
cd apps/expo-example
yarn install

echo "🌐 Exporting Expo web app..."
npx expo export -p web

echo "🔧 Fixing asset paths for GitHub Pages..."
# Use different sed syntax for macOS vs Linux
if [[ "$OSTYPE" == "darwin"* ]]; then
  # macOS
  sed -i '' 's|href="/|href="/react-native-leader-line/|g' dist/index.html
  sed -i '' 's|src="/_expo|src="/react-native-leader-line/_expo|g' dist/index.html
else
  # Linux
  sed -i 's|href="/|href="/react-native-leader-line/|g' dist/index.html
  sed -i 's|src="/_expo|src="/react-native-leader-line/_expo|g' dist/index.html
fi

echo "✅ Build completed successfully!"
echo "📁 Output directory: $(pwd)/dist"
echo "📋 Files generated:"
ls -la dist/

# Opcional: servir localmente para testear
echo ""
echo "💡 To test locally, run:"
echo "   cd apps/expo-example/dist"
echo "   npx serve ."
echo "   Then open http://localhost:3000"