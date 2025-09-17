import { registerRootComponent } from 'expo';
import { LogBox } from 'react-native';

console.log('🌟 index.ts: App entry point loaded');

// Show all warnings and errors
LogBox.ignoreLogs([]);

import App from './App';

console.log('🚀 index.ts: Registering root component');

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
