import React, { useRef } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { LeaderLine } from "react-native-leader-line";

const socketPositions = [
  "auto",
  "center",
  "top",
  "right",
  "bottom",
  "left",
] as const;

// Component to demonstrate intelligent auto socket selection
function AutoSocketDemo({ containerRef }: { containerRef: React.RefObject<ScrollView> }) {
  const autoDemoContainerRef = useRef<View>(null);
  const centerRef = useRef<View>(null);

  // Multiple boxes positioned around the center to show auto socket selection
  const topLeftRef = useRef<View>(null);
  const topRightRef = useRef<View>(null);
  const rightRef = useRef<View>(null);
  const bottomRightRef = useRef<View>(null);
  const bottomLeftRef = useRef<View>(null);
  const leftRef = useRef<View>(null);
  const farTopRef = useRef<View>(null);
  const farBottomRef = useRef<View>(null);

  return (
    <>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>🎯 Intelligent Auto Socket Selection</Text>
        <Text style={styles.sectionDescription}>
          The "auto" socket automatically chooses the closest connection point from 9 available positions (center, 4 sides, and 4 corners).
          Watch how each line connects from the optimal socket based on the target's position!
        </Text>
      </View>

      <View style={[styles.demo, styles.autoDemo]} ref={autoDemoContainerRef}>
        {/* Center target box */}
        <View ref={centerRef} style={styles.centerBox}>
          <Text style={styles.centerText}>Center</Text>
          <Text style={styles.centerSubtext}>Target</Text>
        </View>

        {/* Top-left box */}
        <View ref={topLeftRef} style={[styles.autoBox, { top: 20, left: 20 }]}>
          <Text style={styles.autoBoxText}>📍</Text>
        </View>
        <LeaderLine
          start={{ element: topLeftRef }}
          end={{ element: centerRef }}
          startSocket="auto"
          endSocket="auto"
          color="#e74c3c"
          strokeWidth={2}
          endPlug="arrow1"
          containerRef={autoDemoContainerRef}
        />

        {/* Top-right box */}
        <View ref={topRightRef} style={[styles.autoBox, { top: 20, right: 20 }]}>
          <Text style={styles.autoBoxText}>📍</Text>
        </View>
        <LeaderLine
          start={{ element: topRightRef }}
          end={{ element: centerRef }}
          startSocket="auto"
          endSocket="auto"
          color="#3498db"
          strokeWidth={2}
          endPlug="arrow1"
          containerRef={autoDemoContainerRef}
        />

        {/* Right box */}
        <View ref={rightRef} style={[styles.autoBox, { top: "50%", right: 20, marginTop: -20 }]}>
          <Text style={styles.autoBoxText}>📍</Text>
        </View>
        <LeaderLine
          start={{ element: rightRef }}
          end={{ element: centerRef }}
          startSocket="auto"
          endSocket="auto"
          color="#2ecc71"
          strokeWidth={2}
          endPlug="arrow1"
          containerRef={autoDemoContainerRef}
        />

        {/* Bottom-right box */}
        <View ref={bottomRightRef} style={[styles.autoBox, { bottom: 20, right: 20 }]}>
          <Text style={styles.autoBoxText}>📍</Text>
        </View>
        <LeaderLine
          start={{ element: bottomRightRef }}
          end={{ element: centerRef }}
          startSocket="auto"
          endSocket="auto"
          color="#f39c12"
          strokeWidth={2}
          endPlug="arrow1"
          containerRef={autoDemoContainerRef}
        />

        {/* Bottom-left box */}
        <View ref={bottomLeftRef} style={[styles.autoBox, { bottom: 20, left: 20 }]}>
          <Text style={styles.autoBoxText}>📍</Text>
        </View>
        <LeaderLine
          start={{ element: bottomLeftRef }}
          end={{ element: centerRef }}
          startSocket="auto"
          endSocket="auto"
          color="#9b59b6"
          strokeWidth={2}
          endPlug="arrow1"
          containerRef={autoDemoContainerRef}
        />

        {/* Left box */}
        <View ref={leftRef} style={[styles.autoBox, { top: "50%", left: 20, marginTop: -20 }]}>
          <Text style={styles.autoBoxText}>📍</Text>
        </View>
        <LeaderLine
          start={{ element: leftRef }}
          end={{ element: centerRef }}
          startSocket="auto"
          endSocket="auto"
          color="#1abc9c"
          strokeWidth={2}
          endPlug="arrow1"
          containerRef={autoDemoContainerRef}
        />

        {/* Far top box */}
        <View ref={farTopRef} style={[styles.autoBox, { top: 20, left: "50%", marginLeft: -20 }]}>
          <Text style={styles.autoBoxText}>📍</Text>
        </View>
        <LeaderLine
          start={{ element: farTopRef }}
          end={{ element: centerRef }}
          startSocket="auto"
          endSocket="auto"
          color="#e67e22"
          strokeWidth={2}
          endPlug="arrow1"
          containerRef={autoDemoContainerRef}
        />

        {/* Far bottom box */}
        <View ref={farBottomRef} style={[styles.autoBox, { bottom: 20, left: "50%", marginLeft: -20 }]}>
          <Text style={styles.autoBoxText}>📍</Text>
        </View>
        <LeaderLine
          start={{ element: farBottomRef }}
          end={{ element: centerRef }}
          startSocket="auto"
          endSocket="auto"
          color="#34495e"
          strokeWidth={2}
          endPlug="arrow1"
          containerRef={autoDemoContainerRef}
        />
      </View>

      <View style={styles.autoInfo}>
        <Text style={styles.autoInfoTitle}>✨ How Auto Socket Works:</Text>
        <Text style={styles.infoText}>
          1. Calculates the center position of the target element
        </Text>
        <Text style={styles.infoText}>
          2. Measures distance from each of the 9 socket positions to the target center
        </Text>
        <Text style={styles.infoText}>
          3. Selects the socket with the shortest distance
        </Text>
        <Text style={styles.infoText}>
          4. Creates the most natural-looking connection
        </Text>
        <Text style={[styles.infoText, { marginTop: 8, fontStyle: 'italic', color: '#7f8c8d' }]}>
          💡 Notice how each line connects from the nearest edge or corner to create optimal paths!
        </Text>
      </View>

      <View style={styles.codeSnippet}>
        <Text style={styles.codeTitle}>Auto Socket Example:</Text>
        <Text style={styles.code}>{`<LeaderLine
  start={{ element: sourceRef }}
  end={{ element: targetRef }}
  startSocket="auto"  // Finds closest socket on source
  endSocket="auto"    // Finds closest socket on target
  color="#3498db"
  strokeWidth={2}
  endPlug="arrow1"
/>`}</Text>
      </View>
    </>
  );
}

export default function SocketPositionsDemo() {
  const containerRef = useRef<ScrollView>(null);
  const demoContainerRef = useRef<View>(null); // New ref for the demo container
  const centerBoxRef = useRef<View>(null);
  const refs = socketPositions.reduce((acc, pos) => {
    acc[pos] = useRef<View>(null);
    return acc;
  }, {} as Record<string, React.RefObject<View>>);

  return (
    <ScrollView style={styles.container} ref={containerRef}>
      <View style={styles.description}>
        <Text style={styles.descriptionText}>
          Socket positions determine where the line connects to an element.
        </Text>
      </View>

      <View style={styles.demo} ref={demoContainerRef}>
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
          end={{ element: centerBoxRef }}
          startSocket="auto"
          endSocket="auto"
          color="#3498db"
          strokeWidth={2}
          endLabel="auto"
          containerRef={demoContainerRef}
          updateThreshold={500}
          optimizeUpdates={true}
          smoothAnimations={false}
        />

        <View ref={refs.top} style={[styles.box, { top: 30, right: 30 }]}>
          <Text style={styles.boxText}>Top</Text>
        </View>
        <LeaderLine
          start={{ element: refs.top }}
          end={{ element: centerBoxRef }}
          startSocket="bottom"
          endSocket="top"
          color="#e74c3c"
          strokeWidth={2}
          endLabel="top"
          containerRef={demoContainerRef}
          updateThreshold={500}
          optimizeUpdates={true}
          smoothAnimations={false}
        />

        <View ref={refs.right} style={[styles.box, { bottom: 130, right: 20 }]}>
          <Text style={styles.boxText}>Right</Text>
        </View>
        <LeaderLine
          start={{ element: refs.right }}
          end={{ element: centerBoxRef }}
          startSocket="left"
          endSocket="right"
          color="#2ecc71"
          strokeWidth={2}
          endLabel="right"
          containerRef={demoContainerRef}
          updateThreshold={500}
          optimizeUpdates={true}
          smoothAnimations={false}
        />

        <View ref={refs.bottom} style={[styles.box, { bottom: 30, right: 30 }]}>
          <Text style={styles.boxText}>Bottom</Text>
        </View>
        <LeaderLine
          start={{ element: refs.bottom }}
          end={{ element: centerBoxRef }}
          startSocket="top"
          endSocket="bottom"
          color="#f39c12"
          strokeWidth={2}
          endLabel="bottom"
          containerRef={demoContainerRef}
          updateThreshold={500}
          optimizeUpdates={true}
          smoothAnimations={false}
        />

        <View ref={refs.left} style={[styles.box, { bottom: 130, left: 20 }]}>
          <Text style={styles.boxText}>Left</Text>
        </View>
        <LeaderLine
          start={{ element: refs.left }}
          end={{ element: centerBoxRef }}
          startSocket="right"
          endSocket="left"
          color="#9b59b6"
          strokeWidth={2}
          endLabel="left"
          containerRef={demoContainerRef}
          updateThreshold={500}
          optimizeUpdates={true}
          smoothAnimations={false}
        />

        <View ref={refs.center} style={[styles.box, { bottom: 30, left: 30 }]}>
          <Text style={styles.boxText}>Center</Text>
        </View>
        <LeaderLine
          start={{ element: refs.center }}
          end={{ element: centerBoxRef }}
          startSocket="center"
          endSocket="center"
          color="#1abc9c"
          strokeWidth={2}
          endLabel="center"
          containerRef={demoContainerRef}
          updateThreshold={500}
          optimizeUpdates={true}
          smoothAnimations={false}
        />
      </View>

      <View style={styles.info}>
        <Text style={styles.infoTitle}>Socket Positions:</Text>
        <Text style={styles.infoText}>
          • auto: Automatically finds best connection point
        </Text>
        <Text style={styles.infoText}>
          • center: Connects to element center
        </Text>
        <Text style={styles.infoText}>
          • top/right/bottom/left: Connects to specific side
        </Text>
        <Text style={styles.infoText}>• Can be set for both start and end</Text>
        <Text
          style={[styles.infoText, { color: "#e74c3c", fontWeight: "bold" }]}
        >
          🏷️ Labels show socket types for reference
        </Text>
      </View>

      {/* Auto Socket Intelligence Demo */}
      <AutoSocketDemo containerRef={containerRef} />


      <View style={styles.codeSnippet}>
        <Text style={styles.codeTitle}>Example Usage:</Text>
        <Text style={styles.code}>{`<LeaderLine
  start={{ element: startRef }}
  end={{ element: endRef }}
  startSocket="right"
  endSocket="left"
  updateThreshold={200}
  optimizeUpdates={true}
/>`}</Text>
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
  demo: {
    height: 400,
    backgroundColor: "white",
    margin: 16,
    borderRadius: 10,
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  centerBox: {
    position: "absolute",
    width: 100,
    height: 100,
    backgroundColor: "#2c3e50",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    top: "50%",
    left: "50%",
    marginTop: -50,
    marginLeft: -50,
  },
  centerText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  box: {
    position: "absolute",
    width: 60,
    height: 40,
    backgroundColor: "#7f8c8d",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  boxText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
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
  codeSnippet: {
    margin: 16,
    padding: 16,
    backgroundColor: "#2c3e50",
    borderRadius: 8,
  },
  codeTitle: {
    color: "#ecf0f1",
    fontSize: 14,
    marginBottom: 8,
    fontWeight: "600",
  },
  code: {
    color: "#ecf0f1",
    fontSize: 12,
    fontFamily: "monospace",
    lineHeight: 18,
  },
  sectionHeader: {
    margin: 16,
    marginTop: 24,
    padding: 16,
    backgroundColor: "#3498db",
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "white",
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: "#ecf0f1",
    lineHeight: 20,
  },
  autoDemo: {
    height: 500,
    backgroundColor: "#f8f9fa",
  },
  autoCenterBox: {
    position: "absolute",
    width: 120,
    height: 120,
    backgroundColor: "#2c3e50",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 60,
    top: "50%",
    left: "50%",
    marginTop: -60,
    marginLeft: -60,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  centerSubtext: {
    color: "#95a5a6",
    fontSize: 12,
    marginTop: 4,
  },
  autoBox: {
    position: "absolute",
    width: 40,
    height: 40,
    backgroundColor: "#ecf0f1",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#bdc3c7",
  },
  autoBoxText: {
    fontSize: 18,
  },
  autoInfo: {
    margin: 16,
    padding: 16,
    backgroundColor: "#e8f5e9",
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#2ecc71",
  },
  autoInfoTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    color: "#27ae60",
  },
});
