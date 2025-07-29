/**
 * React Native Leader Line - Basic Demo
 *
 * This component demonstrates the basic usage of react-native-leader-line
 * with simple examples to get you started quickly.
 *
 * Features shown:
 * - Basic line connections
 * - Different colors and stroke widths
 * - Socket positioning
 * - Simple styling
 */

import React, { useRef } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";

import { LeaderLine } from "react-native-leader-line";

const BasicDemo = () => {
  // Get screen dimensions
  const { width, height } = Dimensions.get("window");

  const point1 = { point: { x: 0, y: 0 } };
  const point2 = { point: { x: width, y: height } };

  // Create refs for the elements we want to connect
  const startRef1 = useRef(null);
  const endRef1 = useRef(null);
  const startRef2 = useRef(null);
  const endRef2 = useRef(null);
  const startRef3 = useRef(null);
  const endRef3 = useRef(null);

  // Create ref for the container to handle proper coordinate calculation
  const containerRef = useRef(null);

  return (
    <ScrollView
      ref={containerRef}
      style={styles.scrollView}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>🎯 Basic Examples</Text>
        <Text style={styles.description}>
          Connect UI elements with beautiful arrow lines
        </Text>
      </View>

      {/* Example 1: Simple Connection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Simple Connection</Text>
        <Text style={styles.sectionDescription}>
          Basic line connecting two elements
        </Text>

        <View style={styles.demoContainer}>
          <View ref={startRef1} style={[styles.box, styles.startBox]}>
            <Text style={styles.boxText}>Start</Text>
          </View>

          <View ref={endRef1} style={[styles.box, styles.endBox]}>
            <Text style={styles.boxText}>End</Text>
          </View>

          {/* Basic LeaderLine */}
          <LeaderLine
            start={{ element: startRef1 }}
            end={{ element: endRef1 }}
            containerRef={containerRef}
            color="#FF00ff"
            strokeWidth={2}
            endPlug="arrow1"
            testID="element-to-element-line"
            label={"Element to Element"}
          />
          <LeaderLine
            start={{ element: startRef1 }}
            end={point2}
            containerRef={containerRef}
            color="#0000ff"
            strokeWidth={2}
            endPlug="arrow1"
            testID="element-to-point-line"
            label={"Element to Point"}
          />
          <LeaderLine
            start={point1}
            end={{ element: endRef1 }}
            containerRef={containerRef}
            color="#00FF00"
            strokeWidth={10}
            path="straight"
            testID="point-to-element-line"
            label={"Point to Element"}
          />
          <LeaderLine
            start={point1}
            end={point2}
            color="#FF0000"
            strokeWidth={10}
            path="straight"
            testID="test-diagonal-line"
            label={"Vertical Center Line"}
          />
        </View>

        <View style={styles.codeBlock}>
          <Text style={styles.codeText}>
            {`<LeaderLine
  start={{ element: startRef }}
  end={{ element: endRef }}
  color="#0F7A5F"
  strokeWidth={2}
  endPlug="arrow1"
/>`}
          </Text>
        </View>
      </View>

      {/* Example 2: Styled Connection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. Styled Connection</Text>
        <Text style={styles.sectionDescription}>
          Thicker line with different color and rounded plugs
        </Text>

        <View style={styles.demoContainer}>
          <View ref={startRef2} style={[styles.box, styles.successBox]}>
            <Text style={styles.boxText}>From</Text>
          </View>

          <View ref={endRef2} style={[styles.box, styles.warningBox]}>
            <Text style={styles.boxText}>To</Text>
          </View>

          {/* Styled LeaderLine */}
          {/* <LeaderLine
            start={{ element: startRef2 }}
            end={{ element: endRef2 }}
            color="#FF95f0"
            strokeWidth={4}
            endPlug="disc"
            startPlug="disc"
          /> */}
        </View>

        <View style={styles.codeBlock}>
          <Text style={styles.codeText}>
            {`<LeaderLine
  start={{ element: startRef }}
  end={{ element: endRef }}
  color="#FF95f0"
  strokeWidth={4}
  endPlug="disc"
  startPlug="disc"
/>`}
          </Text>
        </View>
      </View>

      {/* Example 3: Socket Positioning */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. Socket Positioning</Text>
        <Text style={styles.sectionDescription}>
          Control where the line connects to elements
        </Text>

        <View style={styles.demoContainer}>
          <View ref={startRef3} style={[styles.box, styles.primaryBox]}>
            <Text style={styles.boxText}>Top</Text>
          </View>

          <View ref={endRef3} style={[styles.box, styles.dangerBox]}>
            <Text style={styles.boxText}>Bottom</Text>
          </View>

          {/* Socket positioned LeaderLine */}
          {/* <LeaderLine
            start={{ element: startRef3 }}
            end={{ element: endRef3 }}
            startSocket="top"
            endSocket="bottom"
            color="#34C759"
            strokeWidth={3}
            endPlug="arrow2"
          /> */}
        </View>

        <View style={styles.codeBlock}>
          <Text style={styles.codeText}>
            {`<LeaderLine
  start={{ element: startRef }}
  end={{ element: endRef }}
  startSocket="top"
  endSocket="bottom"
  color="#34C759"
  strokeWidth={3}
  endPlug="arrow2"
/>`}
          </Text>
        </View>
      </View>

      {/* Usage Instructions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📝 How to Use</Text>

        <View style={styles.stepContainer}>
          <View style={styles.step}>
            <Text style={styles.stepNumber}>1</Text>
            <Text style={styles.stepText}>Install the package:</Text>
          </View>
          <View style={styles.codeBlock}>
            <Text style={styles.codeText}>
              npm install react-native-leader-line react-native-svg
            </Text>
          </View>
        </View>

        <View style={styles.stepContainer}>
          <View style={styles.step}>
            <Text style={styles.stepNumber}>2</Text>
            <Text style={styles.stepText}>Import and use:</Text>
          </View>
          <View style={styles.codeBlock}>
            <Text style={styles.codeText}>
              {`import { LeaderLine } from 'react-native-leader-line';

const MyComponent = () => {
  const startRef = useRef(null);
  const endRef = useRef(null);
  
  return (
    <View>
      <View ref={startRef} />
      <View ref={endRef} />
      <LeaderLine
        start={{ element: startRef }}
        end={{ element: endRef }}
        color="blue"
        strokeWidth={2}
        endPlug="arrow1"
      />
    </View>
  );
};`}
            </Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          🚀 Ready to add leader lines to your React Native app?
        </Text>
        <Text style={styles.footerSubtext}>
          Check out more examples and advanced features!
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#212529",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#6c757d",
    textAlign: "center",
  },
  section: {
    margin: 16,
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#212529",
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: "#6c757d",
    marginBottom: 16,
  },
  demoContainer: {
    height: 120,
    marginVertical: 16,
    position: "relative",
  },
  box: {
    position: "absolute",
    width: 80,
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  startBox: {
    backgroundColor: "#007AFF",
    top: 10,
    left: 20,
  },
  endBox: {
    backgroundColor: "#007AFF",
    top: 60,
    right: 20,
  },
  successBox: {
    backgroundColor: "#34C759",
    top: 10,
    left: 20,
  },
  warningBox: {
    backgroundColor: "#FF9500",
    top: 60,
    right: 20,
  },
  primaryBox: {
    backgroundColor: "#AF52DE",
    top: 10,
    left: 20,
  },
  dangerBox: {
    backgroundColor: "#FF3B30",
    top: 60,
    right: 20,
  },
  boxText: {
    color: "white",
    fontWeight: "600",
    fontSize: 12,
  },
  codeBlock: {
    backgroundColor: "#f8f9fa",
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#007AFF",
    marginTop: 8,
  },
  codeText: {
    fontFamily: "Courier",
    fontSize: 12,
    color: "#495057",
    lineHeight: 16,
  },
  stepContainer: {
    marginBottom: 16,
  },
  step: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  stepNumber: {
    backgroundColor: "#007AFF",
    color: "white",
    width: 24,
    height: 24,
    borderRadius: 12,
    textAlign: "center",
    lineHeight: 24,
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 12,
  },
  stepText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#212529",
  },
  footer: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#ffffff",
    margin: 16,
    borderRadius: 12,
  },
  footerText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#212529",
    textAlign: "center",
    marginBottom: 8,
  },
  footerSubtext: {
    fontSize: 14,
    color: "#6c757d",
    textAlign: "center",
  },
});

export default BasicDemo;
