import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const examples = [
  {
    title: 'Basic Connection',
    description: 'Simple line connection between two elements',
    screen: 'BasicDemo' as const,
    color: '#3498db',
  },
  {
    title: 'Path Types',
    description: 'Different path algorithms: straight, arc, fluid, magnet, grid',
    screen: 'PathTypesDemo' as const,
    color: '#e74c3c',
  },
  {
    title: 'Animations',
    description: 'Animated lines and transitions',
    screen: 'AnimationsDemo' as const,
    color: '#2ecc71',
  },
  {
    title: 'Socket Positions',
    description: 'Connection points: auto, center, top, right, bottom, left',
    screen: 'SocketPositionsDemo' as const,
    color: '#f39c12',
  },
  {
    title: 'Labels',
    description: 'Start, middle, and end labels with styling',
    screen: 'LabelsDemo' as const,
    color: '#9b59b6',
  },
  {
    title: 'Multiple Lines',
    description: 'Managing multiple connections efficiently',
    screen: 'MultipleLinesDemo' as const,
    color: '#1abc9c',
  },
  {
    title: 'Imperative API',
    description: 'Dynamic line creation using hooks',
    screen: 'ImperativeApiDemo' as const,
    color: '#34495e',
  },
  {
    title: 'Effects & Styling',
    description: 'Outlines, shadows, and visual effects',
    screen: 'EffectsDemo' as const,
    color: '#e67e22',
  },
];

export default function HomeScreen({ navigation }: Props) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>React Native Leader Line</Text>
        <Text style={styles.subtitle}>
          A powerful library for drawing arrow lines and connectors
        </Text>
      </View>

      <View style={styles.examplesList}>
        {examples.map((example, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.exampleCard, { borderLeftColor: example.color }]}
            onPress={() => navigation.navigate(example.screen)}
            activeOpacity={0.8}
          >
            <View style={styles.cardContent}>
              <Text style={styles.exampleTitle}>{example.title}</Text>
              <Text style={styles.exampleDescription}>{example.description}</Text>
            </View>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Tap any example to see it in action
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  examplesList: {
    padding: 16,
  },
  exampleCard: {
    backgroundColor: 'white',
    marginBottom: 12,
    borderRadius: 10,
    borderLeftWidth: 4,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flex: 1,
    padding: 16,
  },
  exampleTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  exampleDescription: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  arrow: {
    fontSize: 24,
    color: '#bdc3c7',
    paddingRight: 16,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#95a5a6',
    fontStyle: 'italic',
  },
});