import { AppRegistry } from 'react-native';
import CompleteFunctionalExample from './CompleteFunctionalExample';

// Para usar como app standalone
AppRegistry.registerComponent('LeaderLineDemo', () => CompleteFunctionalExample);

// También exportamos el componente para uso en otras apps
export { CompleteFunctionalExample };
export default CompleteFunctionalExample;