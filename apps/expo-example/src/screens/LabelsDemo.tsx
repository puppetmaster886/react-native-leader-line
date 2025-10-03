import React, { useRef } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { LeaderLine } from "react-native-leader-line";

export default function LabelsDemo() {
  const ref1Start = useRef<View>(null);
  const ref1End = useRef<View>(null);
  const ref2Start = useRef<View>(null);
  const ref2End = useRef<View>(null);
  const ref3Start = useRef<View>(null);
  const ref3End = useRef<View>(null);
  const demoRef1 = useRef<View>(null);
  const demoRef2 = useRef<View>(null);
  const demoRef3 = useRef<View>(null);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.description}>
        <Text style={styles.descriptionText}>
          Add labels to your connections at the start, middle, or end positions.
        </Text>
      </View>

      {/* Example 1: All labels */}
      <View style={styles.demoSection}>
        <Text style={styles.sectionTitle}>All Labels</Text>
        <View ref={demoRef1} style={styles.demo}>
          <View
            ref={ref1Start}
            style={[styles.box, styles.blueBox, { top: 30, left: 30 }]}
          >
            <Text style={styles.boxText}>A</Text>
          </View>
          <View
            ref={ref1End}
            style={[styles.box, styles.redBox, { top: 30, right: 30 }]}
          >
            <Text style={styles.boxText}>B</Text>
          </View>
          <LeaderLine
            start={{ element: ref1Start }}
            end={{ element: ref1End }}
            startLabel="Source"
            middleLabel="Connection"
            endLabel="Target"
            color="#3498db"
            strokeWidth={2}
            containerRef={demoRef1}
          />
        </View>
      </View>

      {/* Example 2: Styled labels */}
      <View style={styles.demoSection}>
        <Text style={styles.sectionTitle}>Styled Labels</Text>
        <View ref={demoRef2} style={styles.demo}>
          <View
            ref={ref2Start}
            style={[styles.box, styles.greenBox, { top: 50, left: 40 }]}
          >
            <Text style={styles.boxText}>Start</Text>
          </View>
          <View
            ref={ref2End}
            style={[styles.box, styles.purpleBox, { top: 50, right: 40 }]}
          >
            <Text style={styles.boxText}>End</Text>
          </View>
          <LeaderLine
            start={{ element: ref2Start }}
            end={{ element: ref2End }}
            middleLabel={{
              text: "Data Flow",
              backgroundColor: "#2ecc71",
              color: "white",
              padding: 8,
              borderRadius: 4,
              fontSize: 14,
            }}
            path="arc"
            color="#2ecc71"
            strokeWidth={3}
            containerRef={demoRef2}
          />
        </View>
      </View>

      {/* Example 3: Complex labels */}
      <View style={styles.demoSection}>
        <Text style={styles.sectionTitle}>Complex Example</Text>
        <View ref={demoRef3} style={styles.demo}>
          <View
            ref={ref3Start}
            style={[styles.box, styles.orangeBox, { top: 20, left: 50 }]}
          >
            <Text style={styles.boxText}>API</Text>
          </View>
          <View
            ref={ref3End}
            style={[styles.box, styles.tealBox, { top: 20, right: 50 }]}
          >
            <Text style={styles.boxText}>DB</Text>
          </View>
          <LeaderLine
            start={{ element: ref3Start }}
            end={{ element: ref3End }}
            startLabel="Request"
            endLabel="Response"
            path="fluid"
            color="#e67e22"
            strokeWidth={2}
            startPlug="disc"
            endPlug="arrow2"
            containerRef={demoRef3}
          />
        </View>
      </View>

      <View style={styles.info}>
        <Text style={styles.infoTitle}>Label Options:</Text>
        <Text style={styles.infoText}>
          • startLabel: Label at the beginning
        </Text>
        <Text style={styles.infoText}>• middleLabel: Label at the center</Text>
        <Text style={styles.infoText}>• endLabel: Label at the end</Text>
        <Text style={styles.infoText}>• labelStyle: Custom styling object</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  description: {
    padding: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  descriptionText: {
    fontSize: 16,
    color: "#555",
    lineHeight: 22,
  },
  demoSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2c3e50",
    marginLeft: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  demo: {
    height: 200,
    backgroundColor: "white",
    marginHorizontal: 16,
    borderRadius: 10,
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  box: {
    position: "absolute",
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  blueBox: {
    backgroundColor: "#3498db",
  },
  redBox: {
    backgroundColor: "#e74c3c",
  },
  greenBox: {
    backgroundColor: "#2ecc71",
  },
  purpleBox: {
    backgroundColor: "#9b59b6",
  },
  orangeBox: {
    backgroundColor: "#f39c12",
  },
  tealBox: {
    backgroundColor: "#1abc9c",
  },
  boxText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  info: {
    margin: 16,
    padding: 16,
    backgroundColor: "white",
    borderRadius: 8,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    color: "#2c3e50",
  },
  infoText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 6,
    lineHeight: 20,
  },
});
