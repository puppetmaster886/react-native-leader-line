import React, { useRef } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { LeaderLine } from 'react-native-leader-line';

export default function App() {
  const startRef1 = useRef<View>(null);
  const endRef1 = useRef<View>(null);
  const startRef2 = useRef<View>(null);
  const endRef2 = useRef<View>(null);
  const startRef3 = useRef<View>(null);
  const endRef3 = useRef<View>(null);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>React Native Leader Line - Expo Example</Text>

      {/* Example 1: Arc Path */}
      <View style={styles.demoContainer}>
        <Text style={styles.sectionTitle}>Arc Path</Text>
        <View style={styles.demo}>
          <View ref={startRef1} style={[styles.box, styles.blueBox]}>
            <Text style={styles.boxText}>Start</Text>
          </View>
          <View ref={endRef1} style={[styles.box, styles.redBox, { right: 50 }]}>
            <Text style={styles.boxText}>End</Text>
          </View>
          <LeaderLine
            start={{ element: startRef1 }}
            end={{ element: endRef1 }}
            color="#3498db"
            strokeWidth={3}
            path="arc"
          />
        </View>
      </View>

      {/* Example 2: Straight Path with Labels */}
      <View style={styles.demoContainer}>
        <Text style={styles.sectionTitle}>Straight Path with Labels</Text>
        <View style={styles.demo}>
          <View ref={startRef2} style={[styles.box, styles.greenBox, { top: 20, left: 30 }]}>
            <Text style={styles.boxText}>A</Text>
          </View>
          <View ref={endRef2} style={[styles.box, styles.purpleBox, { bottom: 20, right: 30 }]}>
            <Text style={styles.boxText}>B</Text>
          </View>
          <LeaderLine
            start={{ element: startRef2 }}
            end={{ element: endRef2 }}
            color="#2ecc71"
            strokeWidth={2}
            path="straight"
            startLabel="Source"
            endLabel="Target"
            middleLabel="Connection"
          />
        </View>
      </View>

      {/* Example 3: Fixed Points */}
      <View style={styles.demoContainer}>
        <Text style={styles.sectionTitle}>Fixed Points Connection</Text>
        <View style={styles.demo}>
          <View ref={startRef3} style={[styles.box, styles.orangeBox, { top: 40, left: 40 }]}>
            <Text style={styles.boxText}>Box</Text>
          </View>
          <LeaderLine
            start={{ element: startRef3 }}
            end={{ point: { x: 250, y: 150 } }}
            color="#e74c3c"
            strokeWidth={4}
            path="fluid"
            endPlug="arrow2"
          />
          <View style={[styles.point, { top: 150, left: 250 }]} />
          <Text style={[styles.pointLabel, { top: 160, left: 230 }]}>Fixed Point</Text>
        </View>
      </View>

      <Text style={styles.footer}>
        Examples showing different path types, labels, and connection methods
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 20,
    color: '#2c3e50',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#34495e',
  },
  demoContainer: {
    marginHorizontal: 20,
    marginBottom: 40,
  },
  demo: {
    height: 200,
    backgroundColor: 'white',
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
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  blueBox: {
    backgroundColor: '#3498db',
    top: 50,
    left: 50,
  },
  redBox: {
    backgroundColor: '#e74c3c',
    bottom: 50,
  },
  greenBox: {
    backgroundColor: '#2ecc71',
  },
  purpleBox: {
    backgroundColor: '#9b59b6',
  },
  orangeBox: {
    backgroundColor: '#f39c12',
  },
  boxText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  point: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#e74c3c',
  },
  pointLabel: {
    position: 'absolute',
    fontSize: 12,
    color: '#7f8c8d',
  },
  footer: {
    textAlign: 'center',
    marginVertical: 30,
    color: '#7f8c8d',
    paddingHorizontal: 20,
  },
});