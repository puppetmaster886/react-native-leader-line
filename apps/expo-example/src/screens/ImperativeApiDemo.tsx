import React, { useRef } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { useLeaderLineManager } from "react-native-leader-line";

export default function ImperativeApiDemo() {
  const box1Ref = useRef<View>(null);
  const box2Ref = useRef<View>(null);
  const box3Ref = useRef<View>(null);
  const box4Ref = useRef<View>(null);
  const demoRef = useRef<View>(null);

  const {
    createLine,
    removeLine,
    updateLine,
    removeAllLines,
    getLineIds,
    LeaderLineContainer,
  } = useLeaderLineManager();

  const handleCreateLine = () => {
    const lineId = `line-${Date.now()}`;
    createLine(lineId, {
      start: { element: box1Ref },
      end: { element: box2Ref },
      color: "#3498db",
      strokeWidth: 3,
      path: "arc",
      middleLabel: lineId,
    });
  };

  const handleCreateMultiple = () => {
    createLine("line-1-3", {
      start: { element: box1Ref },
      end: { element: box3Ref },
      color: "#e74c3c",
      strokeWidth: 2,
    });

    createLine("line-2-4", {
      start: { element: box2Ref },
      end: { element: box4Ref },
      color: "#2ecc71",
      strokeWidth: 2,
    });

    createLine("line-3-4", {
      start: { element: box3Ref },
      end: { element: box4Ref },
      color: "#f39c12",
      strokeWidth: 2,
    });
  };

  const handleUpdateLines = () => {
    const lineIds = getLineIds();
    lineIds.forEach((id: string, index: number) => {
      updateLine(id, {
        color: ["#9b59b6", "#1abc9c", "#34495e", "#e67e22"][index % 4],
        strokeWidth: 4,
        path: "fluid",
      });
    });
  };

  const handleRemoveLast = () => {
    const lineIds = getLineIds();
    if (lineIds.length > 0) {
      removeLine(lineIds[lineIds.length - 1]);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.description}>
        <Text style={styles.descriptionText}>
          Use the Manager pattern for dynamic line creation and management.
        </Text>
      </View>

      <View ref={demoRef} style={styles.demo}>
        <View
          ref={box1Ref}
          style={[
            styles.box,
            { backgroundColor: "#3498db", top: 30, left: 30 },
          ]}
        >
          <Text style={styles.boxText}>1</Text>
        </View>
        <View
          ref={box2Ref}
          style={[
            styles.box,
            { backgroundColor: "#e74c3c", top: 30, right: 30 },
          ]}
        >
          <Text style={styles.boxText}>2</Text>
        </View>
        <View
          ref={box3Ref}
          style={[
            styles.box,
            { backgroundColor: "#2ecc71", top: 30, left: 30 },
          ]}
        >
          <Text style={styles.boxText}>3</Text>
        </View>
        <View
          ref={box4Ref}
          style={[
            styles.box,
            { backgroundColor: "#f39c12", top: 30, right: 30 },
          ]}
        >
          <Text style={styles.boxText}>4</Text>
        </View>

        <LeaderLineContainer containerRef={demoRef} />
      </View>

      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.button, styles.createButton]}
          onPress={handleCreateLine}
        >
          <Text style={styles.buttonText}>Create Line</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.multiButton]}
          onPress={handleCreateMultiple}
        >
          <Text style={styles.buttonText}>Create Multiple</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.updateButton]}
          onPress={handleUpdateLines}
        >
          <Text style={styles.buttonText}>Update All</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.removeButton]}
          onPress={handleRemoveLast}
        >
          <Text style={styles.buttonText}>Remove Last</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.clearButton]}
          onPress={removeAllLines}
        >
          <Text style={styles.buttonText}>Clear All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statusSection}>
        <Text style={styles.statusText}>
          Active Lines: {getLineIds().length}
        </Text>
        <Text style={styles.statusText}>
          IDs: {getLineIds().join(", ") || "None"}
        </Text>
      </View>

      <View style={styles.codeSnippet}>
        <Text style={styles.codeTitle}>Usage Pattern:</Text>
        <Text style={styles.code}>{`const { 
  createLine, 
  removeLine, 
  updateLine,
  LeaderLineContainer 
} = useLeaderLineManager();

// Create a line
createLine('my-line', {
  start: { element: ref1 },
  end: { element: ref2 },
  color: '#3498db'
});

// Update it
updateLine('my-line', { 
  color: '#e74c3c' 
});

// Remove it
removeLine('my-line');`}</Text>
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
    height: 300,
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
  box: {
    position: "absolute",
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  boxText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  controls: {
    paddingHorizontal: 16,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  createButton: {
    backgroundColor: "#3498db",
  },
  multiButton: {
    backgroundColor: "#2ecc71",
  },
  updateButton: {
    backgroundColor: "#9b59b6",
  },
  removeButton: {
    backgroundColor: "#e74c3c",
  },
  clearButton: {
    backgroundColor: "#34495e",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  statusSection: {
    margin: 16,
    padding: 16,
    backgroundColor: "white",
    borderRadius: 8,
  },
  statusText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
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
});
