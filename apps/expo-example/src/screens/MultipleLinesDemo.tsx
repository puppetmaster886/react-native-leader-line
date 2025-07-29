import React, { useRef } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { LeaderLine } from 'react-native-leader-line';

export default function MultipleLinesDemo() {
  // Central node
  const centerRef = useRef<View>(null);
  
  // Surrounding nodes
  const topRef = useRef<View>(null);
  const rightRef = useRef<View>(null);
  const bottomRef = useRef<View>(null);
  const leftRef = useRef<View>(null);
  const topRightRef = useRef<View>(null);
  const bottomRightRef = useRef<View>(null);
  const bottomLeftRef = useRef<View>(null);
  const topLeftRef = useRef<View>(null);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.description}>
        <Text style={styles.descriptionText}>
          Multiple connections from a central node to surrounding elements.
        </Text>
      </View>

      <View style={styles.demo}>
        {/* Central Node */}
        <View ref={centerRef} style={[styles.node, styles.centerNode]}>
          <Text style={styles.nodeText}>HUB</Text>
        </View>

        {/* Surrounding Nodes */}
        <View ref={topRef} style={[styles.node, styles.surroundingNode, { top: 30, left: '50%', marginLeft: -25 }]}>
          <Text style={styles.nodeText}>1</Text>
        </View>
        <View ref={rightRef} style={[styles.node, styles.surroundingNode, { top: '50%', right: 30, marginTop: -25 }]}>
          <Text style={styles.nodeText}>2</Text>
        </View>
        <View ref={bottomRef} style={[styles.node, styles.surroundingNode, { bottom: 30, left: '50%', marginLeft: -25 }]}>
          <Text style={styles.nodeText}>3</Text>
        </View>
        <View ref={leftRef} style={[styles.node, styles.surroundingNode, { top: '50%', left: 30, marginTop: -25 }]}>
          <Text style={styles.nodeText}>4</Text>
        </View>
        <View ref={topRightRef} style={[styles.node, styles.surroundingNode, { top: 60, right: 60 }]}>
          <Text style={styles.nodeText}>5</Text>
        </View>
        <View ref={bottomRightRef} style={[styles.node, styles.surroundingNode, { bottom: 60, right: 60 }]}>
          <Text style={styles.nodeText}>6</Text>
        </View>
        <View ref={bottomLeftRef} style={[styles.node, styles.surroundingNode, { bottom: 60, left: 60 }]}>
          <Text style={styles.nodeText}>7</Text>
        </View>
        <View ref={topLeftRef} style={[styles.node, styles.surroundingNode, { top: 60, left: 60 }]}>
          <Text style={styles.nodeText}>8</Text>
        </View>

        {/* Connections */}
        <LeaderLine start={{ element: centerRef }} end={{ element: topRef }} color="#e74c3c" strokeWidth={2} path="straight" />
        <LeaderLine start={{ element: centerRef }} end={{ element: rightRef }} color="#3498db" strokeWidth={2} path="straight" />
        <LeaderLine start={{ element: centerRef }} end={{ element: bottomRef }} color="#2ecc71" strokeWidth={2} path="straight" />
        <LeaderLine start={{ element: centerRef }} end={{ element: leftRef }} color="#f39c12" strokeWidth={2} path="straight" />
        <LeaderLine start={{ element: centerRef }} end={{ element: topRightRef }} color="#9b59b6" strokeWidth={2} path="arc" />
        <LeaderLine start={{ element: centerRef }} end={{ element: bottomRightRef }} color="#1abc9c" strokeWidth={2} path="arc" />
        <LeaderLine start={{ element: centerRef }} end={{ element: bottomLeftRef }} color="#34495e" strokeWidth={2} path="arc" />
        <LeaderLine start={{ element: centerRef }} end={{ element: topLeftRef }} color="#e67e22" strokeWidth={2} path="arc" />
      </View>

      <View style={styles.performanceSection}>
        <Text style={styles.performanceTitle}>Performance Notes:</Text>
        <Text style={styles.performanceText}>
          • Each LeaderLine is a separate component
        </Text>
        <Text style={styles.performanceText}>
          • Lines update independently when elements move
        </Text>
        <Text style={styles.performanceText}>
          • Use the Manager pattern for better performance with many lines
        </Text>
      </View>

      <View style={styles.codeSnippet}>
        <Text style={styles.codeTitle}>Pattern for Multiple Lines:</Text>
        <Text style={styles.code}>{`// Define refs for all nodes
const centerRef = useRef<View>(null);
const node1Ref = useRef<View>(null);
// ... more refs

// Create multiple LeaderLine components
<LeaderLine 
  start={{ element: centerRef }} 
  end={{ element: node1Ref }} 
/>
// ... more lines`}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  description: {
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  descriptionText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
  },
  demo: {
    height: 400,
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 10,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  node: {
    position: 'absolute',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  centerNode: {
    backgroundColor: '#2c3e50',
    width: 70,
    height: 70,
    borderRadius: 35,
    top: '50%',
    left: '50%',
    marginTop: -35,
    marginLeft: -35,
  },
  surroundingNode: {
    backgroundColor: '#7f8c8d',
  },
  nodeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  performanceSection: {
    margin: 16,
    padding: 16,
    backgroundColor: '#fff3cd',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ffeaa7',
  },
  performanceTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#856404',
  },
  performanceText: {
    fontSize: 14,
    color: '#856404',
    marginBottom: 4,
    lineHeight: 20,
  },
  codeSnippet: {
    margin: 16,
    padding: 16,
    backgroundColor: '#2c3e50',
    borderRadius: 8,
  },
  codeTitle: {
    color: '#ecf0f1',
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '600',
  },
  code: {
    color: '#ecf0f1',
    fontSize: 12,
    fontFamily: 'monospace',
    lineHeight: 18,
  },
});