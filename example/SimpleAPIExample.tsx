import React, { useRef } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { LeaderLine } from '../src/components/LeaderLine';

export default function SimpleAPIExample() {
  const startRef = useRef(null);
  const endRef = useRef(null);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Simple Leader Line Example</Text>
      <Text style={styles.subtitle}>Basic functional component usage</Text>

      <View style={styles.demoArea}>
        {/* Source element */}
        <View ref={startRef} style={[styles.box, styles.startBox]}>
          <Text style={styles.boxText}>Start</Text>
        </View>

        {/* Target element */}
        <View ref={endRef} style={[styles.box, styles.endBox]}>
          <Text style={styles.boxText}>End</Text>
        </View>

        {/* Simple Leader Line */}
        <LeaderLine
          start={{ element: startRef }}
          end={{ element: endRef }}
          color="#3498db"
          strokeWidth={3}
          startSocket="right"
          endSocket="left"
          endPlug="arrow1"
          startLabel="Origin"
          endLabel="Destination"
        />

        {/* Curved line with different styling */}
        <LeaderLine
          start={{ element: startRef }}
          end={{ element: endRef }}
          color="#e74c3c"
          strokeWidth={2}
          path="arc"
          curvature={0.3}
          startSocket="bottom"
          endSocket="top"
          endPlug="arrow2"
          dash={{ pattern: "5,5", animation: true }}
          outline={{ enabled: true, color: "white", size: 1 }}
          middleLabel="Curved Path"
        />
      </View>

      <View style={styles.codeExample}>
        <Text style={styles.codeTitle}>Usage Example:</Text>
        <Text style={styles.code}>{`<LeaderLine
  start={{ element: startRef }}
  end={{ element: endRef }}
  color="#3498db"
  strokeWidth={3}
  startSocket="right"
  endSocket="left"
  endPlug="arrow1"
  startLabel="Origin"
  endLabel="Destination"
/>`}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#2c3e50',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#7f8c8d',
    fontStyle: 'italic',
  },
  demoArea: {
    height: 300,
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 20,
    position: 'relative',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  box: {
    position: 'absolute',
    width: 100,
    height: 60,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  startBox: {
    top: 50,
    left: 30,
    backgroundColor: '#3498db',
  },
  endBox: {
    top: 150,
    right: 30,
    backgroundColor: '#e74c3c',
  },
  boxText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  codeExample: {
    backgroundColor: '#2c3e50',
    padding: 16,
    borderRadius: 8,
  },
  codeTitle: {
    color: '#ecf0f1',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  code: {
    color: '#f39c12',
    fontFamily: 'monospace',
    fontSize: 12,
    lineHeight: 16,
  },
});