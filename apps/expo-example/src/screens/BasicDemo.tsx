import React, { useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LeaderLine } from 'react-native-leader-line';

export default function BasicDemo() {
  const startRef = useRef<View>(null);
  const endRef = useRef<View>(null);

  return (
    <View style={styles.container}>
      <View style={styles.description}>
        <Text style={styles.descriptionText}>
          Basic connection between two elements using default settings.
        </Text>
      </View>

      <View style={styles.demo}>
        <View ref={startRef} style={[styles.box, styles.startBox]}>
          <Text style={styles.boxText}>Start</Text>
        </View>

        <View ref={endRef} style={[styles.box, styles.endBox]}>
          <Text style={styles.boxText}>End</Text>
        </View>

        <LeaderLine
          start={{ element: startRef }}
          end={{ element: endRef }}
          color="#3498db"
          strokeWidth={3}
        />
      </View>

      <View style={styles.codeSnippet}>
        <Text style={styles.codeTitle}>Code:</Text>
        <Text style={styles.code}>{`<LeaderLine
  start={{ element: startRef }}
  end={{ element: endRef }}
  color="#3498db"
  strokeWidth={3}
/>`}</Text>
      </View>
    </View>
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
    flex: 1,
    minHeight: 300,
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
  box: {
    position: 'absolute',
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  startBox: {
    backgroundColor: '#3498db',
    top: 50,
    left: 50,
  },
  endBox: {
    backgroundColor: '#e74c3c',
    bottom: 50,
    right: 50,
  },
  boxText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
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