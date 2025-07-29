import React, { useRef } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { LeaderLine } from 'react-native-leader-line';

export default function EffectsDemo() {
  const ref1Start = useRef<View>(null);
  const ref1End = useRef<View>(null);
  const ref2Start = useRef<View>(null);
  const ref2End = useRef<View>(null);
  const ref3Start = useRef<View>(null);
  const ref3End = useRef<View>(null);
  const ref4Start = useRef<View>(null);
  const ref4End = useRef<View>(null);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.description}>
        <Text style={styles.descriptionText}>
          Visual effects like outlines, shadows, and different plug types.
        </Text>
      </View>

      {/* Example 1: Outline Effect */}
      <View style={styles.demoSection}>
        <Text style={styles.sectionTitle}>Outline Effect</Text>
        <View style={styles.demo}>
          <View ref={ref1Start} style={[styles.box, styles.blueBox, { top: 50, left: 40 }]}>
            <Text style={styles.boxText}>A</Text>
          </View>
          <View ref={ref1End} style={[styles.box, styles.redBox, { top: 50, right: 40 }]}>
            <Text style={styles.boxText}>B</Text>
          </View>
          <LeaderLine
            start={{ element: ref1Start }}
            end={{ element: ref1End }}
            color="#3498db"
            strokeWidth={4}
            outline={{
              enabled: true,
              color: 'white',
              width: 2,
            }}
          />
        </View>
      </View>

      {/* Example 2: Drop Shadow */}
      <View style={styles.demoSection}>
        <Text style={styles.sectionTitle}>Drop Shadow</Text>
        <View style={styles.demo}>
          <View ref={ref2Start} style={[styles.box, styles.greenBox, { top: 30, left: 30 }]}>
            <Text style={styles.boxText}>Start</Text>
          </View>
          <View ref={ref2End} style={[styles.box, styles.purpleBox, { bottom: 30, right: 30 }]}>
            <Text style={styles.boxText}>End</Text>
          </View>
          <LeaderLine
            start={{ element: ref2Start }}
            end={{ element: ref2End }}
            color="#2ecc71"
            strokeWidth={3}
            path="arc"
            dropShadow={{
              dx: 2,
              dy: 4,
              blur: 8,
              color: 'rgba(0, 0, 0, 0.3)',
            }}
          />
        </View>
      </View>

      {/* Example 3: Different Plug Types */}
      <View style={styles.demoSection}>
        <Text style={styles.sectionTitle}>Plug Types</Text>
        <View style={styles.demo}>
          <View ref={ref3Start} style={[styles.box, styles.orangeBox, { top: 20, left: 40 }]}>
            <Text style={styles.boxText}>Disc</Text>
          </View>
          <View ref={ref3End} style={[styles.box, styles.tealBox, { bottom: 20, right: 40 }]}>
            <Text style={styles.boxText}>Arrow</Text>
          </View>
          <LeaderLine
            start={{ element: ref3Start }}
            end={{ element: ref3End }}
            color="#e67e22"
            strokeWidth={3}
            startPlug="disc"
            endPlug="arrow2"
            startPlugColor="#e74c3c"
            endPlugColor="#3498db"
          />
        </View>
      </View>

      {/* Example 4: Combined Effects */}
      <View style={styles.demoSection}>
        <Text style={styles.sectionTitle}>Combined Effects</Text>
        <View style={styles.demo}>
          <View ref={ref4Start} style={[styles.box, styles.darkBox, { top: 50, left: 50 }]}>
            <Text style={styles.boxText}>All</Text>
          </View>
          <View ref={ref4End} style={[styles.box, styles.pinkBox, { bottom: 50, right: 50 }]}>
            <Text style={styles.boxText}>Effects</Text>
          </View>
          <LeaderLine
            start={{ element: ref4Start }}
            end={{ element: ref4End }}
            color="#9b59b6"
            strokeWidth={5}
            path="fluid"
            startPlug="square"
            endPlug="arrow3"
            outline={{
              enabled: true,
              color: '#ecf0f1',
              width: 2,
            }}
            dropShadow={{
              dx: 3,
              dy: 3,
              blur: 10,
              color: 'rgba(155, 89, 182, 0.5)',
            }}
            dash={{
              enabled: true,
              pattern: [10, 5],
            }}
          />
        </View>
      </View>

      <View style={styles.info}>
        <Text style={styles.infoTitle}>Available Effects:</Text>
        <Text style={styles.infoText}>• Outline: White or colored border around line</Text>
        <Text style={styles.infoText}>• Drop Shadow: Realistic shadow effect</Text>
        <Text style={styles.infoText}>• Plug Types: disc, square, arrow1, arrow2, arrow3</Text>
        <Text style={styles.infoText}>• Dash Pattern: Dashed lines with custom patterns</Text>
        <Text style={styles.infoText}>• Gradient: Linear gradient colors (experimental)</Text>
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
  demoSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginLeft: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  demo: {
    height: 180,
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
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  blueBox: {
    backgroundColor: '#3498db',
  },
  redBox: {
    backgroundColor: '#e74c3c',
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
  tealBox: {
    backgroundColor: '#1abc9c',
  },
  darkBox: {
    backgroundColor: '#34495e',
  },
  pinkBox: {
    backgroundColor: '#ff6b9d',
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
});