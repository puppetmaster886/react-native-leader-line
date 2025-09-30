import React, { useRef } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { LeaderLine } from "react-native-leader-line";

export default function App() {
  const startRef = useRef(null);
  const endRef = useRef(null);
  const containerRef = useRef(null);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>React Native Leader Line</Text>
      <Text style={styles.subtitle}>Basic Example</Text>

      <View ref={containerRef} style={styles.demoArea}>
        {/* Start element */}
        <View ref={startRef} style={[styles.box, styles.startBox]}>
          <Text style={styles.boxText}>START</Text>
        </View>

        {/* End element */}
        <View ref={endRef} style={[styles.box, styles.endBox]}>
          <Text style={styles.boxText}>END</Text>
        </View>

        {/* Leader Line connecting the boxes */}
        <LeaderLine
          start={{ element: startRef }}
          end={{ element: endRef }}
          color="#3498db"
          strokeWidth={3}
          endPlug="arrow1"
          startSocket="right"
          endSocket="left"
          containerRef={containerRef}
        />
      </View>

      <View style={styles.info}>
        <Text style={styles.infoTitle}>Features Shown:</Text>
        <Text style={styles.infoText}>• Basic arrow line connection</Text>
        <Text style={styles.infoText}>• Socket positioning (right → left)</Text>
        <Text style={styles.infoText}>• Arrow plug styling</Text>
        <Text style={styles.infoText}>• Custom colors and stroke width</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    color: "#2c3e50",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    color: "#7f8c8d",
    fontStyle: "italic",
  },
  demoArea: {
    height: 200,
    backgroundColor: "white",
    borderRadius: 12,
    position: "relative",
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  box: {
    position: "absolute",
    width: 80,
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  startBox: {
    top: 75,
    left: 30,
    backgroundColor: "#e74c3c",
  },
  endBox: {
    top: 75,
    right: 30,
    backgroundColor: "#3498db",
  },
  boxText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  info: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#2c3e50",
  },
  infoText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 6,
    lineHeight: 22,
  },
});
