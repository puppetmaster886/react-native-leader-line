import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import TestApp from './TestApp';

export default function App() {
  
  useEffect(() => {
    return () => {
    };
  }, []);

  try {
    return <AppNavigator />;
  } catch (error) {
    console.error('❌ App.tsx: Error rendering app:', error);
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error loading app</Text>
        <Text style={styles.errorDetails}>{error?.toString()}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8d7da',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#721c24',
    marginBottom: 10,
  },
  errorDetails: {
    fontSize: 14,
    color: '#721c24',
    textAlign: 'center',
  },
});