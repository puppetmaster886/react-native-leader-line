/**
 * Combined Demo Component
 * 
 * Main component that contains all react-native-leader-line demos
 * with tab navigation between different examples.
 */

import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';

import BasicDemo from './BasicDemo';
import AdvancedDemo from './AdvancedDemo';
import ImperativeDemo from './ImperativeDemo';
import PlaygroundDemo from './PlaygroundDemo';
import RealWorldDemo from './RealWorldDemo';

const CombinedDemo = () => {
  const [activeTab, setActiveTab] = useState('basic');

  const tabs = [
    { id: 'basic', label: '🚀 Basic', component: BasicDemo },
    { id: 'advanced', label: '⭐ Advanced', component: AdvancedDemo },
    { id: 'imperative', label: '🔧 Imperative', component: ImperativeDemo },
    { id: 'playground', label: '🎮 Playground', component: PlaygroundDemo },
    { id: 'realworld', label: '🌍 Real World', component: RealWorldDemo },
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || BasicDemo;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>React Native Leader Line</Text>
        <Text style={styles.subtitle}>Complete Demo Collection</Text>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tab,
              activeTab === tab.id && styles.activeTab
            ]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Text style={[
              styles.tabText,
              activeTab === tab.id && styles.activeTabText
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content Area */}
      <View style={styles.content}>
        <ActiveComponent />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6c757d',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: '#007AFF',
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6c757d',
    textAlign: 'center',
  },
  activeTabText: {
    color: '#007AFF',
  },
  content: {
    flex: 1,
  },
});

export default CombinedDemo;