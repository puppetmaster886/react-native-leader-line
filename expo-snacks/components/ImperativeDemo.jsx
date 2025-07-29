/**
 * React Native Leader Line - Imperative API Demo
 * 
 * This component demonstrates the imperative/programmatic API of react-native-leader-line
 * which allows dynamic creation, modification, and removal of leader lines.
 * 
 * Features shown:
 * - Dynamic line creation and removal
 * - Programmatic control over multiple lines
 * - Batch operations for performance
 * - Interactive controls for real-time updates
 */

import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';

// Import the imperative hooks and components
import { 
  useLeaderLineManager
} from 'react-native-leader-line';

const ImperativeDemo = () => {
  const [lineCount, setLineCount] = useState(0);
  
  // Use the imperative hook
  const { createLine, removeLine, updateLine, lines } = useLeaderLineManager();
  
  // Refs for different demos
  const dynamicRefs = {
    node1: useRef(null),
    node2: useRef(null),
    node3: useRef(null),
    node4: useRef(null),
  };

  const handleCreateLine = () => {
    const newId = `line-${lineCount + 1}`;
    createLine(newId, {
      start: { element: dynamicRefs.node1 },
      end: { element: dynamicRefs.node2 },
      color: '#007AFF',
      strokeWidth: 2,
      endPlug: 'arrow1'
    });
    setLineCount(lineCount + 1);
  };

  const handleRemoveLine = () => {
    if (lineCount > 0) {
      const lineId = `line-${lineCount}`;
      removeLine(lineId);
      setLineCount(lineCount - 1);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>🔧 Imperative API</Text>
        <Text style={styles.subtitle}>Dynamic line management</Text>
      </View>

      {/* Dynamic Creation Demo */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dynamic Line Creation</Text>
        <Text style={styles.sectionDescription}>
          Create and remove lines programmatically
        </Text>

        <View style={styles.demoContainer}>
          <View ref={dynamicRefs.node1} style={[styles.node, styles.blueNode]}>
            <Text style={styles.nodeText}>Node 1</Text>
          </View>
          <View ref={dynamicRefs.node2} style={[styles.node, styles.greenNode, { right: 20, top: 20 }]}>
            <Text style={styles.nodeText}>Node 2</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.createButton]}
            onPress={handleCreateLine}
          >
            <Text style={styles.buttonText}>Create Line</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.button, styles.removeButton]}
            onPress={handleRemoveLine}
            disabled={lineCount === 0}
          >
            <Text style={styles.buttonText}>Remove Line</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.lineCounter}>Lines: {lineCount}</Text>

        <View style={styles.codeBlock}>
          <Text style={styles.codeText}>
            {`const { createLine, removeLine } = useLeaderLineManager();

// Create a line
createLine('line-1', {
  start: { element: startRef },
  end: { element: endRef },
  color: '#007AFF',
  strokeWidth: 2,
  endPlug: 'arrow1'
});

// Remove a line
removeLine('line-1');`}
          </Text>
        </View>
      </View>

      {/* Batch Operations */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Batch Operations</Text>
        <Text style={styles.sectionDescription}>
          Handle multiple lines efficiently
        </Text>

        <View style={styles.demoContainer}>
          <View ref={dynamicRefs.node3} style={[styles.node, styles.purpleNode]}>
            <Text style={styles.nodeText}>Center</Text>
          </View>
          <View ref={dynamicRefs.node4} style={[styles.node, styles.orangeNode, { right: 20, top: 20 }]}>
            <Text style={styles.nodeText}>Target</Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.button, styles.batchButton]}
          onPress={() => Alert.alert('Batch Operation', 'This would create multiple lines at once')}
        >
          <Text style={styles.buttonText}>Create Multiple Lines</Text>
        </TouchableOpacity>

        <View style={styles.codeBlock}>
          <Text style={styles.codeText}>
            {`// Batch operations for performance
const batchOperations = [
  { id: 'line-1', start: ref1, end: ref2, color: 'red' },
  { id: 'line-2', start: ref2, end: ref3, color: 'blue' },
  { id: 'line-3', start: ref3, end: ref4, color: 'green' }
];

batchOperations.forEach(({ id, ...options }) => {
  createLine(id, options);
});`}
          </Text>
        </View>
      </View>

      {/* Usage Guide */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📖 Usage Guide</Text>
        
        <View style={styles.stepContainer}>
          <View style={styles.step}>
            <Text style={styles.stepNumber}>1</Text>
            <Text style={styles.stepText}>Import the hook:</Text>
          </View>
          <View style={styles.codeBlock}>
            <Text style={styles.codeText}>
              {`import { useLeaderLineManager } from 'react-native-leader-line';`}
            </Text>
          </View>
        </View>

        <View style={styles.stepContainer}>
          <View style={styles.step}>
            <Text style={styles.stepNumber}>2</Text>
            <Text style={styles.stepText}>Use the hook in your component:</Text>
          </View>
          <View style={styles.codeBlock}>
            <Text style={styles.codeText}>
              {`const { createLine, removeLine, updateLine, lines } = useLeaderLineManager();`}
            </Text>
          </View>
        </View>

        <View style={styles.stepContainer}>
          <View style={styles.step}>
            <Text style={styles.stepNumber}>3</Text>
            <Text style={styles.stepText}>Manage lines programmatically:</Text>
          </View>
          <View style={styles.codeBlock}>
            <Text style={styles.codeText}>
              {`// Create, update, and remove lines as needed
createLine('my-line', options);
updateLine('my-line', newOptions);
removeLine('my-line');`}
            </Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          🔧 Perfect for dynamic, interactive applications!
        </Text>
        <Text style={styles.footerSubtext}>
          Use the imperative API when you need full programmatic control
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
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 16,
  },
  demoContainer: {
    height: 100,
    position: 'relative',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 16,
  },
  node: {
    position: 'absolute',
    width: 60,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    top: 10,
    left: 20,
  },
  nodeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 10,
  },
  blueNode: { backgroundColor: '#007AFF' },
  greenNode: { backgroundColor: '#34C759' },
  purpleNode: { backgroundColor: '#AF52DE' },
  orangeNode: { backgroundColor: '#FF9500' },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createButton: {
    backgroundColor: '#34C759',
  },
  removeButton: {
    backgroundColor: '#FF3B30',
  },
  batchButton: {
    backgroundColor: '#AF52DE',
    alignSelf: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 12,
  },
  lineCounter: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 16,
  },
  codeBlock: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
    marginTop: 8,
  },
  codeText: {
    fontFamily: 'Courier',
    fontSize: 11,
    color: '#495057',
    lineHeight: 14,
  },
  stepContainer: {
    marginBottom: 16,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepNumber: {
    backgroundColor: '#007AFF',
    color: 'white',
    width: 24,
    height: 24,
    borderRadius: 12,
    textAlign: 'center',
    lineHeight: 24,
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 12,
  },
  stepText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212529',
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

export default ImperativeDemo;