/**
 * @fileoverview Imperative API Example App
 * @description Demonstrates leader-line compatible imperative API usage
 */

import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';

import { 
  useImperativeLeaderLine,
  useLeaderLineCompatibility,
  LeaderLineImperative,
  createImperativeLeaderLine,
  ImperativeLeaderLineOptions
} from 'react-native-leader-line';

const COLORS = {
  primary: '#007AFF',
  secondary: '#FF9500',
  success: '#34C759',
  danger: '#FF3B30',
  background: '#F2F2F7',
  surface: '#FFFFFF',
  text: '#000000',
  textSecondary: '#6D6D70',
} as const;

/**
 * Component demonstrating imperative API usage
 */
const ImperativeAPIExample: React.FC = () => {
  const [activeLines, setActiveLines] = useState<string[]>([]);
  
  // Hook-based imperative API
  const { createLine, removeLine, removeAllLines, LeaderLineContainer } = useImperativeLeaderLine();
  
  // Leader-line compatibility API
  const { LeaderLine: CompatibleLeaderLine } = useLeaderLineCompatibility();
  
  // Refs for connection points
  const startRef1 = useRef(null);
  const endRef1 = useRef(null);
  const startRef2 = useRef(null);
  const endRef2 = useRef(null);
  const startRef3 = useRef(null);
  const endRef3 = useRef(null);

  // Store line instances for management
  const [lineInstances, setLineInstances] = useState<Map<string, LeaderLineImperative>>(new Map());

  /**
   * Create a line using hook-based API
   */
  const createHookLine = () => {
    try {
      const line = createLine(startRef1, endRef1, {
        color: COLORS.primary,
        size: 3,
        endPlug: 'arrow1',
        path: 'straight'
      });

      const lineId = `hook-line-${Date.now()}`;
      setLineInstances(prev => new Map(prev).set(lineId, line));
      setActiveLines(prev => [...prev, lineId]);

      // Demonstrate imperative methods
      setTimeout(() => {
        line.setOptions({ color: COLORS.success, size: 5 });
      }, 1000);

      setTimeout(() => {
        line.setOptions({ path: 'arc', curvature: 0.3 });
      }, 2000);

    } catch (error) {
      Alert.alert('Error', 'Failed to create hook-based line');
      console.error('Hook line error:', error);
    }
  };

  /**
   * Create a line using compatibility API (like original leader-line)
   */
  const createCompatibilityLine = () => {
    try {
      // This mimics the original leader-line API
      const line = new CompatibleLeaderLine(startRef2, endRef2, {
        color: COLORS.secondary,
        size: 4,
        endPlug: 'arrow2',
        path: 'arc',
        curvature: 0.2
      });

      const lineId = `compat-line-${Date.now()}`;
      setLineInstances(prev => new Map(prev).set(lineId, line as any));
      setActiveLines(prev => [...prev, lineId]);

      // Show imperative capabilities
      setTimeout(() => line.hide(), 1500);
      setTimeout(() => line.show(), 2500);
      setTimeout(() => line.setOptions({ 
        color: COLORS.danger, 
        endPlug: 'disc' 
      }), 3500);

    } catch (error) {
      Alert.alert('Error', 'Failed to create compatibility line');
      console.error('Compatibility line error:', error);
    }
  };

  /**
   * Create a line using factory function
   */
  const createFactoryLine = () => {
    try {
      const line = createImperativeLeaderLine(
        startRef3, 
        endRef3, 
        {
          color: COLORS.success,
          size: 2,
          endPlug: 'square',
          path: 'fluid',
          dash: { pattern: '8,4', animation: true }
        }
      );

      const lineId = `factory-line-${Date.now()}`;
      setLineInstances(prev => new Map(prev).set(lineId, line));
      setActiveLines(prev => [...prev, lineId]);

      // Animate line properties
      let colorIndex = 0;
      const colors = [COLORS.success, COLORS.primary, COLORS.secondary, COLORS.danger];
      
      const animateColors = () => {
        colorIndex = (colorIndex + 1) % colors.length;
        line.setOptions({ color: colors[colorIndex] });
        
        if (line.isShown()) {
          setTimeout(animateColors, 800);
        }
      };
      
      setTimeout(animateColors, 500);

    } catch (error) {
      Alert.alert('Error', 'Failed to create factory line');
      console.error('Factory line error:', error);
    }
  };

  /**
   * Remove a specific line
   */
  const removeSpecificLine = (lineId: string) => {
    const line = lineInstances.get(lineId);
    if (line) {
      line.remove();
      setLineInstances(prev => {
        const newMap = new Map(prev);
        newMap.delete(lineId);
        return newMap;
      });
      setActiveLines(prev => prev.filter(id => id !== lineId));
    }
  };

  /**
   * Remove all lines
   */
  const clearAllLines = () => {
    lineInstances.forEach(line => line.remove());
    removeAllLines();
    setLineInstances(new Map());
    setActiveLines([]);
  };

  /**
   * Show line information
   */
  const showLineInfo = () => {
    const info = Array.from(lineInstances.entries()).map(([id, line]) => {
      const options = line.getOptions();
      return `${id}: ${options.color} (${line.isShown() ? 'visible' : 'hidden'})`;
    }).join('\n');

    Alert.alert(
      'Active Lines',
      info || 'No active lines',
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Imperative API Demo</Text>
          <Text style={styles.subtitle}>
            Demonstrates leader-line compatible imperative API
          </Text>
        </View>

        {/* Connection Points */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Connection Points</Text>
          
          <View style={styles.connectionRow}>
            <View ref={startRef1} style={[styles.connectionPoint, { backgroundColor: COLORS.primary }]}>
              <Text style={styles.pointText}>Start 1</Text>
            </View>
            <View ref={endRef1} style={[styles.connectionPoint, { backgroundColor: COLORS.primary }]}>
              <Text style={styles.pointText}>End 1</Text>
            </View>
          </View>

          <View style={styles.connectionRow}>
            <View ref={startRef2} style={[styles.connectionPoint, { backgroundColor: COLORS.secondary }]}>
              <Text style={styles.pointText}>Start 2</Text>
            </View>
            <View ref={endRef2} style={[styles.connectionPoint, { backgroundColor: COLORS.secondary }]}>
              <Text style={styles.pointText}>End 2</Text>
            </View>
          </View>

          <View style={styles.connectionRow}>
            <View ref={startRef3} style={[styles.connectionPoint, { backgroundColor: COLORS.success }]}>
              <Text style={styles.pointText}>Start 3</Text>
            </View>
            <View ref={endRef3} style={[styles.connectionPoint, { backgroundColor: COLORS.success }]}>
              <Text style={styles.pointText}>End 3</Text>
            </View>
          </View>
        </View>

        {/* Controls */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Imperative Controls</Text>
          
          <TouchableOpacity style={[styles.button, { backgroundColor: COLORS.primary }]} onPress={createHookLine}>
            <Text style={styles.buttonText}>Create Hook Line</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, { backgroundColor: COLORS.secondary }]} onPress={createCompatibilityLine}>
            <Text style={styles.buttonText}>Create Compatibility Line</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, { backgroundColor: COLORS.success }]} onPress={createFactoryLine}>
            <Text style={styles.buttonText}>Create Factory Line</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, { backgroundColor: COLORS.textSecondary }]} onPress={showLineInfo}>
            <Text style={styles.buttonText}>Show Line Info</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, { backgroundColor: COLORS.danger }]} onPress={clearAllLines}>
            <Text style={styles.buttonText}>Clear All Lines</Text>
          </TouchableOpacity>
        </View>

        {/* Active Lines List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Active Lines ({activeLines.length})</Text>
          {activeLines.map(lineId => (
            <View key={lineId} style={styles.lineItem}>
              <Text style={styles.lineText}>{lineId}</Text>
              <TouchableOpacity 
                style={styles.removeButton}
                onPress={() => removeSpecificLine(lineId)}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
          {activeLines.length === 0 && (
            <Text style={styles.emptyText}>No active lines</Text>
          )}
        </View>

        {/* API Examples */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>API Examples</Text>
          <View style={styles.codeBlock}>
            <Text style={styles.codeText}>
{`// Hook-based API
const { createLine } = useImperativeLeaderLine();
const line = createLine(startRef, endRef, options);

// Compatibility API (like original leader-line)
const { LeaderLine } = useLeaderLineCompatibility();
const line = new LeaderLine(startRef, endRef, options);

// Factory function
const line = createImperativeLeaderLine(start, end, options);

// Imperative methods
line.show();
line.hide();
line.setOptions({ color: 'red' });
line.remove();`}
            </Text>
          </View>
        </View>

      </ScrollView>

      {/* Leader Line Container - renders all lines */}
      <LeaderLineContainer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  section: {
    margin: 15,
    padding: 15,
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 15,
  },
  connectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  connectionPoint: {
    width: 100,
    height: 60,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  pointText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 12,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  lineItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F8F8F8',
    borderRadius: 6,
    marginBottom: 5,
  },
  lineText: {
    flex: 1,
    fontSize: 12,
    color: COLORS.text,
    fontFamily: 'Courier',
  },
  removeButton: {
    backgroundColor: COLORS.danger,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  removeButtonText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    color: COLORS.textSecondary,
    fontStyle: 'italic',
  },
  codeBlock: {
    backgroundColor: '#F8F8F8',
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  codeText: {
    fontFamily: 'Courier',
    fontSize: 12,
    color: COLORS.text,
    lineHeight: 18,
  },
});

export default ImperativeAPIExample;