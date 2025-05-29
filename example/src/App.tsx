import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { CurvedLinesScreen } from './screens/CurvedLinesScreen';
import { DemoScreen } from './screens/DemoScreen';
import { InteractiveScreen } from './screens/InteractiveScreen';

type Screen = 'demo' | 'interactive' | 'curved';

export const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('demo');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'demo':
        return <DemoScreen />;
      case 'interactive':
        return <InteractiveScreen />;
      case 'curved':
        return <CurvedLinesScreen />;
      default:
        return <DemoScreen />;
    }
  };

  return (
    <View style={styles.container}>
      {/* Navigation Header */}
      <SafeAreaView style={styles.header}>
        <Text style={styles.headerTitle}>Leader Line Examples</Text>
        <View style={styles.navigation}>
          <TouchableOpacity
            style={[
              styles.navButton,
              currentScreen === 'demo' && styles.activeNavButton,
            ]}
            onPress={() => setCurrentScreen('demo')}
          >
            <Text
              style={[
                styles.navButtonText,
                currentScreen === 'demo' && styles.activeNavButtonText,
              ]}
            >
              Basic Demo
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.navButton,
              currentScreen === 'interactive' && styles.activeNavButton,
            ]}
            onPress={() => setCurrentScreen('interactive')}
          >
            <Text
              style={[
                styles.navButtonText,
                currentScreen === 'interactive' && styles.activeNavButtonText,
              ]}
            >
              Interactive
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.navButton,
              currentScreen === 'curved' && styles.activeNavButton,
            ]}
            onPress={() => setCurrentScreen('curved')}
          >
            <Text
              style={[
                styles.navButtonText,
                currentScreen === 'curved' && styles.activeNavButtonText,
              ]}
            >
              Curved Lines
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Screen Content */}
      <View style={styles.content}>
        {renderScreen()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#343a40',
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  navButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'white',
  },
  activeNavButton: {
    backgroundColor: 'white',
  },
  navButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  activeNavButtonText: {
    color: '#343a40',
  },
  content: {
    flex: 1,
  },
});