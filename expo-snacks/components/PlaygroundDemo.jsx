/**
 * React Native Leader Line - Interactive Playground
 * 
 * This component provides an interactive playground for experimenting with
 * react-native-leader-line in real-time. Adjust settings and see results instantly.
 * 
 * Features:
 * - Real-time property adjustment
 * - Visual property editor
 * - Preset configurations
 * - Code generation
 */

import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';

import { LeaderLine } from 'react-native-leader-line';

const PlaygroundDemo = () => {
  const [config, setConfig] = useState({
    color: '#007AFF',
    strokeWidth: 2,
    path: 'straight',
    endPlug: 'arrow1',
    startPlug: 'none',
    showOutline: false,
    showDash: false,
  });

  const startRef = useRef(null);
  const endRef = useRef(null);

  const colors = ['#007AFF', '#34C759', '#FF3B30', '#FF9500', '#AF52DE', '#5AC8FA'];
  const plugTypes = ['none', 'arrow1', 'arrow2', 'arrow3', 'disc', 'square'];
  const pathTypes = ['straight', 'arc', 'fluid'];
  const strokeWidths = [1, 2, 3, 4, 5, 6];

  const updateConfig = (key, value) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const generateCode = () => {
    const props = [];
    props.push(`start={{ element: startRef }}`);
    props.push(`end={{ element: endRef }}`);
    props.push(`color="${config.color}"`);
    props.push(`strokeWidth={${config.strokeWidth}}`);
    if (config.path !== 'straight') props.push(`path="${config.path}"`);
    if (config.endPlug !== 'none') props.push(`endPlug="${config.endPlug}"`);
    if (config.startPlug !== 'none') props.push(`startPlug="${config.startPlug}"`);
    if (config.showOutline) props.push(`outline={{ enabled: true, color: "white", size: 2 }}`);
    if (config.showDash) props.push(`dash={{ pattern: "8,4" }}`);

    return `<LeaderLine\n  ${props.join('\n  ')}\n/>`;
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>🎮 Interactive Playground</Text>
        <Text style={styles.subtitle}>Experiment with real-time updates</Text>
      </View>

      {/* Live Preview */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Live Preview</Text>
        
        <View style={styles.demoContainer}>
          <View ref={startRef} style={[styles.node, styles.startNode]}>
            <Text style={styles.nodeText}>Start</Text>
          </View>
          <View ref={endRef} style={[styles.node, styles.endNode]}>
            <Text style={styles.nodeText}>End</Text>
          </View>
          
          <LeaderLine
            start={{ element: startRef }}
            end={{ element: endRef }}
            color={config.color}
            strokeWidth={config.strokeWidth}
            path={config.path}
            endPlug={config.endPlug}
            startPlug={config.startPlug}
            outline={config.showOutline ? { enabled: true, color: "white", size: 2 } : undefined}
            dash={config.showDash ? { pattern: "8,4" } : undefined}
          />
        </View>
      </View>

      {/* Controls */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⚙️ Controls</Text>
        
        {/* Color Selection */}
        <View style={styles.controlGroup}>
          <Text style={styles.controlLabel}>Color</Text>
          <View style={styles.colorGrid}>
            {colors.map((color) => (
              <TouchableOpacity
                key={color}
                style={[
                  styles.colorSwatch,
                  { backgroundColor: color },
                  config.color === color && styles.selectedSwatch
                ]}
                onPress={() => updateConfig('color', color)}
              />
            ))}
          </View>
        </View>

        {/* Stroke Width */}
        <View style={styles.controlGroup}>
          <Text style={styles.controlLabel}>Stroke Width: {config.strokeWidth}</Text>
          <View style={styles.optionGrid}>
            {strokeWidths.map((width) => (
              <TouchableOpacity
                key={width}
                style={[
                  styles.optionButton,
                  config.strokeWidth === width && styles.selectedOption
                ]}
                onPress={() => updateConfig('strokeWidth', width)}
              >
                <Text style={styles.optionText}>{width}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Path Type */}
        <View style={styles.controlGroup}>
          <Text style={styles.controlLabel}>Path Type</Text>
          <View style={styles.optionGrid}>
            {pathTypes.map((path) => (
              <TouchableOpacity
                key={path}
                style={[
                  styles.optionButton,
                  config.path === path && styles.selectedOption
                ]}
                onPress={() => updateConfig('path', path)}
              >
                <Text style={styles.optionText}>{path}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* End Plug */}
        <View style={styles.controlGroup}>
          <Text style={styles.controlLabel}>End Plug</Text>
          <View style={styles.optionGrid}>
            {plugTypes.map((plug) => (
              <TouchableOpacity
                key={plug}
                style={[
                  styles.optionButton,
                  config.endPlug === plug && styles.selectedOption
                ]}
                onPress={() => updateConfig('endPlug', plug)}
              >
                <Text style={styles.optionText}>{plug}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Toggles */}
        <View style={styles.controlGroup}>
          <View style={styles.toggleRow}>
            <Text style={styles.controlLabel}>Outline</Text>
            <Switch
              value={config.showOutline}
              onValueChange={(value) => updateConfig('showOutline', value)}
            />
          </View>
          <View style={styles.toggleRow}>
            <Text style={styles.controlLabel}>Dash Pattern</Text>
            <Switch
              value={config.showDash}
              onValueChange={(value) => updateConfig('showDash', value)}
            />
          </View>
        </View>
      </View>

      {/* Generated Code */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📋 Generated Code</Text>
        <View style={styles.codeBlock}>
          <Text style={styles.codeText}>{generateCode()}</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          🎮 Experiment and discover new combinations!
        </Text>
        <Text style={styles.footerSubtext}>
          Copy the generated code to use in your app
        </Text>
      </View>
    </ScrollView>
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
  section: {
    margin: 16,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 16,
  },
  demoContainer: {
    height: 120,
    position: 'relative',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 16,
  },
  node: {
    position: 'absolute',
    width: 80,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startNode: {
    backgroundColor: '#007AFF',
    top: 10,
    left: 20,
  },
  endNode: {
    backgroundColor: '#34C759',
    top: 60,
    right: 20,
  },
  nodeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  controlGroup: {
    marginBottom: 20,
  },
  controlLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 8,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  colorSwatch: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedSwatch: {
    borderColor: '#212529',
    borderWidth: 3,
  },
  optionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  selectedOption: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  optionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#212529',
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  codeBlock: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  codeText: {
    fontFamily: 'Courier',
    fontSize: 11,
    color: '#495057',
    lineHeight: 14,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    margin: 16,
    borderRadius: 12,
  },
  footerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    textAlign: 'center',
    marginBottom: 8,
  },
  footerSubtext: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
  },
});

export default PlaygroundDemo;