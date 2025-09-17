import React, { useRef } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { LeaderLine } from 'react-native-leader-line';

export default function BasicDemo() {
  const startRef1 = useRef<View>(null);
  const endRef1 = useRef<View>(null);
  const startRef2 = useRef<View>(null);
  const endRef2 = useRef<View>(null);
  const startRef3 = useRef<View>(null);
  const endRef3 = useRef<View>(null);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.description}>
        <Text style={styles.descriptionText}>
          Basic connections between elements with different configurations.
        </Text>
      </View>

      {/* Example 1: Default Connection */}
      <View style={styles.exampleContainer}>
        <Text style={styles.exampleTitle}>1. Default Connection</Text>
        <View style={styles.demo}>
          <View ref={startRef1} style={[styles.box, styles.blueBox, { top: 50, left: 50 }]}>
            <Text style={styles.boxText}>Start</Text>
          </View>
          <View ref={endRef1} style={[styles.box, styles.redBox, { bottom: 50, right: 50 }]}>
            <Text style={styles.boxText}>End</Text>
          </View>
          <LeaderLine
            start={{ element: startRef1 }}
            end={{ element: endRef1 }}
            color="#3498db"
            strokeWidth={3}
          />
        </View>
        <View style={styles.codeSnippet}>
          <Text style={styles.code}>{`<LeaderLine
  start={{ element: startRef }}
  end={{ element: endRef }}
  color="#3498db"
  strokeWidth={3}
/>`}</Text>
        </View>
      </View>

      {/* Example 2: Different Colors and Width */}
      <View style={styles.exampleContainer}>
        <Text style={styles.exampleTitle}>2. Custom Color & Width</Text>
        <View style={styles.demo}>
          <View ref={startRef2} style={[styles.box, styles.greenBox, { top: 50, left: 50 }]}>
            <Text style={styles.boxText}>A</Text>
          </View>
          <View ref={endRef2} style={[styles.box, styles.purpleBox, { bottom: 50, right: 50 }]}>
            <Text style={styles.boxText}>B</Text>
          </View>
          <LeaderLine
            start={{ element: startRef2 }}
            end={{ element: endRef2 }}
            color="#9b59b6"
            strokeWidth={5}
            endPlug="arrow2"
          />
        </View>
        <View style={styles.codeSnippet}>
          <Text style={styles.code}>{`<LeaderLine
  start={{ element: startRef }}
  end={{ element: endRef }}
  color="#9b59b6"
  strokeWidth={5}
  endPlug="arrow2"
/>`}</Text>
        </View>
      </View>

      {/* Example 3: Point-based Connection */}
      <View style={styles.exampleContainer}>
        <Text style={styles.exampleTitle}>3. Point-based Connection</Text>
        <View style={styles.demo}>
          <View ref={startRef3} style={[styles.box, styles.orangeBox, { top: 100, left: 50 }]}>
            <Text style={styles.boxText}>Box</Text>
          </View>
          <LeaderLine
            start={{ element: startRef3 }}
            end={{ point: { x: 250, y: 150 } }}
            color="#e67e22"
            strokeWidth={4}
            startPlug="disc"
            endPlug="arrow3"
          />
          <View style={[styles.pointMarker, { position: 'absolute', left: 240, top: 140 }]}>
            <Text style={styles.pointText}>Point</Text>
          </View>
        </View>
        <View style={styles.codeSnippet}>
          <Text style={styles.code}>{`<LeaderLine
  start={{ element: boxRef }}
  end={{ point: { x: 250, y: 150 } }}
  color="#e67e22"
  strokeWidth={4}
  startPlug="disc"
  endPlug="arrow3"
/>`}</Text>
        </View>
      </View>

      {/* Example 4: Horizontal Connection */}
      <View style={styles.exampleContainer}>
        <Text style={styles.exampleTitle}>4. Horizontal Connection</Text>
        <View style={[styles.demo, { height: 150 }]}>
          <View style={[styles.box, styles.tealBox, { top: 35, left: 30 }]}>
            <Text style={styles.boxText}>Left</Text>
          </View>
          <View ref={endRef3} style={[styles.box, styles.yellowBox, { top: 35, right: 30 }]}>
            <Text style={styles.boxText}>Right</Text>
          </View>
          <LeaderLine
            start={{ point: { x: 110, y: 75 } }}
            end={{ point: { x: 230, y: 75 } }}
            color="#1abc9c"
            strokeWidth={3}
            startPlug="behind"
            endPlug="arrow1"
          />
        </View>
        <View style={styles.codeSnippet}>
          <Text style={styles.code}>{`<LeaderLine
  start={{ point: { x: 110, y: 75 } }}
  end={{ point: { x: 230, y: 75 } }}
  color="#1abc9c"
  strokeWidth={3}
  startPlug="behind"
  endPlug="arrow1"
/>`}</Text>
        </View>
      </View>

      <View style={styles.tips}>
        <Text style={styles.tipsTitle}>Tips:</Text>
        <Text style={styles.tipText}>• Use element refs for dynamic connections</Text>
        <Text style={styles.tipText}>• Use points for fixed positions</Text>
        <Text style={styles.tipText}>• Combine different plug types for variety</Text>
        <Text style={styles.tipText}>• Adjust strokeWidth for emphasis</Text>
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
  exampleContainer: {
    marginVertical: 8,
  },
  exampleTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  demo: {
    height: 250,
    backgroundColor: 'white',
    marginHorizontal: 16,
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
  blueBox: {
    backgroundColor: '#3498db',
  },
  redBox: {
    backgroundColor: '#e74c3c',
  },
  greenBox: {
    backgroundColor: '#27ae60',
  },
  purpleBox: {
    backgroundColor: '#9b59b6',
  },
  orangeBox: {
    backgroundColor: '#e67e22',
  },
  tealBox: {
    backgroundColor: '#1abc9c',
  },
  yellowBox: {
    backgroundColor: '#f39c12',
  },
  boxText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  pointMarker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#e74c3c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointText: {
    fontSize: 10,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 25,
  },
  codeSnippet: {
    marginHorizontal: 16,
    marginTop: 10,
    padding: 12,
    backgroundColor: '#2c3e50',
    borderRadius: 8,
  },
  code: {
    color: '#ecf0f1',
    fontSize: 12,
    fontFamily: 'monospace',
    lineHeight: 18,
  },
  tips: {
    margin: 16,
    padding: 16,
    backgroundColor: '#ecf0f1',
    borderRadius: 8,
    marginBottom: 32,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#34495e',
    marginVertical: 2,
  },
});