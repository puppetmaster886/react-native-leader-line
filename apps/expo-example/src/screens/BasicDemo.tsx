import React, { useRef } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { LeaderLine } from "react-native-leader-line";

export default function BasicDemo() {
  const containerRef = useRef<ScrollView>(null);
  const demoRef1 = useRef<View>(null);
  const demoRef2 = useRef<View>(null);
  const demoRef3 = useRef<View>(null);
  const demoRef4 = useRef<View>(null);
  const startRef1 = useRef<View>(null);
  const endRef1 = useRef<View>(null);
  const startRef2 = useRef<View>(null);
  const endRef2 = useRef<View>(null);
  const startRef3 = useRef<View>(null);
  const endRef3 = useRef<View>(null);

  return (
    <ScrollView style={styles.container} ref={containerRef}>
      <View style={styles.description}>
        <Text style={styles.descriptionText}>
          Basic connections between elements with different configurations and
          styles.
        </Text>
      </View>

      {/* Example 1: Simple Connection */}
      <View style={styles.exampleContainer}>
        <Text style={styles.exampleTitle}>1. Simple Connection</Text>
        <View ref={demoRef1} style={styles.demo}>
          <View
            ref={startRef1}
            style={[styles.box, styles.blueBox, { top: 50, left: 50 }]}
          >
            <Text style={styles.boxText}>Start</Text>
          </View>

          <View
            ref={endRef1}
            style={[styles.box, styles.redBox, { top: 50, right: 50 }]}
          >
            <Text style={styles.boxText}>End</Text>
          </View>

          <LeaderLine
            start={{ element: startRef1 }}
            end={{ element: endRef1 }}
            color="#34980b"
            strokeWidth={3}
            containerRef={demoRef1}
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

      {/* Example 2: Custom Arrow Style */}
      <View style={styles.exampleContainer}>
        <Text style={styles.exampleTitle}>2. Custom Arrow Style</Text>
        <View ref={demoRef2} style={styles.demo}>
          <View
            ref={startRef2}
            style={[styles.box, styles.tealBox, { top: 50, left: 50 }]}
          >
            <Text style={styles.boxText}>From</Text>
          </View>
          <View
            ref={endRef2}
            style={[styles.box, styles.yellowBox, { top: 50, right: 50 }]}
          >
            <Text style={styles.boxText}>To</Text>
          </View>
          <LeaderLine
            start={{ element: startRef2 }}
            end={{ element: endRef2 }}
            color="#9b59b6"
            strokeWidth={5}
            endPlug="arrow2"
            containerRef={demoRef2}
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

      {/* Example 3: Element to Point Connection */}
      <View style={styles.exampleContainer}>
        <Text style={styles.exampleTitle}>3. Element to Point Connection</Text>
        <View ref={demoRef3} style={styles.demo}>
          <View
            ref={startRef3}
            style={[styles.box, styles.purpleBox, { top: 100, left: 50 }]}
          >
            <Text style={styles.boxText}>Box</Text>
          </View>

          <LeaderLine
            start={{ element: startRef3 }}
            end={{ point: { x: 250, y: 150 } }}
            color="#9b00b6"
            strokeWidth={4}
            startPlug="disc"
            endPlug="arrow1"
            containerRef={demoRef3}
          />

          <View
            style={[
              styles.pointMarker,
              {
                position: "absolute",
                left: 240,
                top: 140,
              },
            ]}
          >
            <Text style={styles.pointText}>Point</Text>
          </View>
        </View>
        <View style={styles.codeSnippet}>
          <Text style={styles.code}>{`<LeaderLine
  start={{ element: boxRef }}
  end={{ point: { x: 250, y: 150 } }}
  color="#9b59b6"
  strokeWidth={4}
  startPlug="disc"
  endPlug="arrow1"
/>`}</Text>
        </View>
      </View>

      {/* Example 4: Point to Point Connection */}
      <View style={styles.exampleContainer}>
        <Text style={styles.exampleTitle}>4. Point to Point Connection</Text>
        <View ref={demoRef4} style={[styles.demo, { height: 150 }]}>
          <LeaderLine
            start={{ point: { x: 80, y: 75 } }}
            end={{ point: { x: 260, y: 75 } }}
            color="#1abc9c"
            strokeWidth={3}
            startPlug="arrow3"
            endPlug="behind"
            containerRef={demoRef4}
          />

          <View
            style={[
              styles.pointMarker,
              { position: "absolute", left: 70, top: 65 },
            ]}
          >
            <Text style={styles.pointText}>Start</Text>
          </View>

          <View
            style={[
              styles.pointMarker,
              { position: "absolute", left: 250, top: 65 },
            ]}
          >
            <Text style={styles.pointText}>End</Text>
          </View>
        </View>
        <View style={styles.codeSnippet}>
          <Text style={styles.code}>{`<LeaderLine
  start={{ point: { x: 80, y: 75 } }}
  end={{ point: { x: 260, y: 75 } }}
  color="#1abc9c"
  strokeWidth={3}
  startPlug="arrow3"
  endPlug="behind"
/>`}</Text>
        </View>
      </View>

      <View style={styles.tips}>
        <Text style={styles.tipsTitle}>Tips:</Text>
        <Text style={styles.tipText}>
          • Use element refs for dynamic connections that follow layout changes
        </Text>
        <Text style={styles.tipText}>
          • Use points for fixed positions that don't change
        </Text>
        <Text style={styles.tipText}>
          • Combine different plug types (disc, arrow1, arrow2, arrow3, behind)
          for variety
        </Text>
        <Text style={styles.tipText}>
          • Adjust strokeWidth to emphasize important connections
        </Text>
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
  exampleContainer: {
    marginVertical: 8,
  },
  exampleTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2c3e50",
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  demo: {
    height: 250,
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
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  blueBox: {
    backgroundColor: "#3498db",
  },
  redBox: {
    backgroundColor: "#e74c3c",
  },
  greenBox: {
    backgroundColor: "#27ae60",
  },
  purpleBox: {
    backgroundColor: "#9b59b6",
  },
  orangeBox: {
    backgroundColor: "#e67e22",
  },
  tealBox: {
    backgroundColor: "#1abc9c",
  },
  yellowBox: {
    backgroundColor: "#f39c12",
  },
  boxText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  pointMarker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#e74c3c",
    justifyContent: "center",
    alignItems: "center",
  },
  pointText: {
    fontSize: 10,
    color: "white",
    fontWeight: "bold",
    marginTop: 25,
  },
  codeSnippet: {
    marginHorizontal: 16,
    marginTop: 10,
    padding: 12,
    backgroundColor: "#2c3e50",
    borderRadius: 8,
  },
  code: {
    color: "#ecf0f1",
    fontSize: 12,
    fontFamily: "monospace",
    lineHeight: 18,
  },
  tips: {
    margin: 16,
    padding: 16,
    backgroundColor: "#ecf0f1",
    borderRadius: 8,
    marginBottom: 32,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: "#34495e",
    marginVertical: 2,
  },
});
