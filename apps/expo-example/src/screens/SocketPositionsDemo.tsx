import React, { useRef } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { LeaderLine } from 'react-native-leader-line';

const socketPositions = ['auto', 'center', 'top', 'right', 'bottom', 'left'] as const;

export default function SocketPositionsDemo() {
  const centerBoxRef = useRef<View>(null);
  const refs = socketPositions.reduce((acc, pos) => {
    acc[pos] = useRef<View>(null);
    return acc;
  }, {} as Record<string, React.RefObject<View>>);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.description}>
        <Text style={styles.descriptionText}>
          Socket positions determine where the line connects to an element.
        </Text>
      </View>

      <View style={styles.demo}>
        {/* Central Box */}
        <View ref={centerBoxRef} style={styles.centerBox}>
          <Text style={styles.centerText}>Target</Text>
        </View>

        {/* Socket position examples */}
        <View ref={refs.auto} style={[styles.box, { top: 30, left: 30 }]}>
          <Text style={styles.boxText}>Auto</Text>
        </View>
        <LeaderLine
          start={{ element: refs.auto }}
          end={{ element: centerBoxRef, socket: 'auto' }}
          color="#3498db"
          strokeWidth={2}
          endLabel="auto"
        />

        <View ref={refs.top} style={[styles.box, { top: 30, right: 30 }]}>
          <Text style={styles.boxText}>Top</Text>
        </View>
        <LeaderLine
          start={{ element: refs.top }}
          end={{ element: centerBoxRef, socket: 'top' }}
          color="#e74c3c"
          strokeWidth={2}
          endLabel="top"
        />

        <View ref={refs.right} style={[styles.box, { bottom: 130, right: 20 }]}>
          <Text style={styles.boxText}>Right</Text>
        </View>
        <LeaderLine
          start={{ element: refs.right }}
          end={{ element: centerBoxRef, socket: 'right' }}
          color="#2ecc71"
          strokeWidth={2}
          endLabel="right"
        />

        <View ref={refs.bottom} style={[styles.box, { bottom: 30, right: 30 }]}>
          <Text style={styles.boxText}>Bottom</Text>
        </View>
        <LeaderLine
          start={{ element: refs.bottom }}
          end={{ element: centerBoxRef, socket: 'bottom' }}
          color="#f39c12"
          strokeWidth={2}
          endLabel="bottom"
        />

        <View ref={refs.left} style={[styles.box, { bottom: 130, left: 20 }]}>
          <Text style={styles.boxText}>Left</Text>
        </View>
        <LeaderLine
          start={{ element: refs.left }}
          end={{ element: centerBoxRef, socket: 'left' }}
          color="#9b59b6"
          strokeWidth={2}
          endLabel="left"
        />

        <View ref={refs.center} style={[styles.box, { bottom: 30, left: 30 }]}>
          <Text style={styles.boxText}>Center</Text>
        </View>
        <LeaderLine
          start={{ element: refs.center }}
          end={{ element: centerBoxRef, socket: 'center' }}
          color="#1abc9c"
          strokeWidth={2}
          endLabel="center"
        />
      </View>

      <View style={styles.info}>
        <Text style={styles.infoTitle}>Socket Positions:</Text>
        <Text style={styles.infoText}>• auto: Automatically finds best connection point</Text>
        <Text style={styles.infoText}>• center: Connects to element center</Text>
        <Text style={styles.infoText}>• top/right/bottom/left: Connects to specific side</Text>
        <Text style={styles.infoText}>• Can be set for both start and end</Text>
      </View>

      <View style={styles.codeSnippet}>
        <Text style={styles.codeTitle}>Example Usage:</Text>
        <Text style={styles.code}>{`<LeaderLine
  start={{ 
    element: startRef,
    socket: 'right' 
  }}
  end={{ 
    element: endRef,
    socket: 'left' 
  }}
/>`}</Text>
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
  centerBox: {
    position: 'absolute',
    width: 100,
    height: 100,
    backgroundColor: '#2c3e50',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    top: '50%',
    left: '50%',
    marginTop: -50,
    marginLeft: -50,
  },
  centerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  box: {
    position: 'absolute',
    width: 60,
    height: 40,
    backgroundColor: '#7f8c8d',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  boxText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  info: {
    margin: 16,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#2c3e50',
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 6,
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