const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "../..");

const config = getDefaultConfig(projectRoot);

// 1. Watch all files within the monorepo
config.watchFolders = [workspaceRoot];

// 2. Let Metro know where to resolve packages
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules"),
];

// 3. Add extra node modules path for the library
config.resolver.extraNodeModules = {
  "react-native-leader-line": path.resolve(
    workspaceRoot,
    "packages/react-native-leader-line"
  ),
};

// Configure public path for GitHub Pages
if (process.env.NODE_ENV === 'production') {
  config.resolver.platforms = ['web', ...config.resolver.platforms];
}

module.exports = config;
