/**
 * Basic Connection Test
 * Consolidates: SimpleTestComponent, BasicTestComponent, MiniTestComponent
 */
import { useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { LeaderLine } from "react-native-leader-line";

const BasicConnectionTest = () => {
  const elementARef = useRef(null);
  const elementBRef = useRef(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Basic Connection Test</Text>

      <View style={styles.testArea}>
        {/* Element A */}
        <View ref={elementARef} style={[styles.element, styles.elementA]}>
          <Text style={styles.elementText}>A</Text>
        </View>

        {/* Element B */}
        <View ref={elementBRef} style={[styles.element, styles.elementB]}>
          <Text style={styles.elementText}>B</Text>
        </View>

        {/* Leader Line */}
        <LeaderLine
          start={elementARef}
          end={elementBRef}
          color="#007AFF"
          size={2}
          startPlug="disc"
          endPlug="arrow1"
          path="straight"
        />
      </View>

      <View style={styles.info}>
        <Text style={styles.infoText}>
          ✓ Two circular elements connected by a straight arrow line
        </Text>
        <Text style={styles.infoText}>✓ Start: disc plug, End: arrow plug</Text>
        <Text style={styles.infoText}>
          ✓ Blue color (#007AFF) with 2px width
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  testArea: {
    height: 250,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    position: "relative",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  element: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    borderWidth: 2,
    borderColor: "#007AFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  elementA: {
    top: 40,
    left: 40,
  },
  elementB: {
    bottom: 40,
    right: 40,
  },
  elementText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007AFF",
  },
  info: {
    backgroundColor: "#f8f9fa",
    padding: 15,
    borderRadius: 8,
    borderLeft: 4,
    borderLeftColor: "#28a745",
  },
  infoText: {
    fontSize: 14,
    color: "#495057",
    marginBottom: 5,
  },
});

export default BasicConnectionTest;
