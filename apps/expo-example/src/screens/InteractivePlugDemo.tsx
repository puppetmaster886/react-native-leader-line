import React, { useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { LeaderLine, PlugType } from "react-native-leader-line";

const plugTypes: Array<{
  type: PlugType;
  color: string;
}> = [
  { type: "none", color: "#95a5a6" },
  { type: "arrow1", color: "#3498db" },
  { type: "arrow2", color: "#e74c3c" },
  { type: "arrow3", color: "#2ecc71" },
  { type: "disc", color: "#9b59b6" },
  { type: "square", color: "#f39c12" },
  { type: "diamond", color: "#1abc9c" },
  { type: "crosshair", color: "#e67e22" },
  { type: "star", color: "#f1c40f" },
  { type: "heart", color: "#e91e63" },
  { type: "chevron", color: "#8e44ad" },
  { type: "hollowArrow", color: "#c0392b" },
  { type: "pentagon", color: "#27ae60" },
  { type: "hexagon", color: "#d68910" },
  { type: "bar", color: "#34495e" },
  { type: "lineArrow", color: "#16a085" },
  { type: "lineArrowNarrow", color: "#d35400" },
  { type: "lineArrowVeryNarrow", color: "#7f8c8d" },
  { type: "lineArrowWide", color: "#2980b9" },
  { type: "lineArrowVeryWide", color: "#8e44ad" },
];

export default function InteractivePlugDemo() {
  const [selectedStartPlug, setSelectedStartPlug] =
    useState<PlugType>("arrow1");
  const [selectedEndPlug, setSelectedEndPlug] = useState<PlugType>("arrow1");
  const [plugSize, setPlugSize] = useState(12);
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [startPlugOffset, setStartPlugOffset] = useState(0);
  const [endPlugOffset, setEndPlugOffset] = useState(0);

  const containerRef = useRef<ScrollView>(null);
  const demoContainerRef = useRef<View>(null);
  const demoStartRef = useRef<View>(null);
  const demoEndRef = useRef<View>(null);

  // Refs for comparison grid
  const gridRefs = plugTypes.reduce((acc, { type }) => {
    acc[`${type}Start`] = useRef<View>(null);
    acc[`${type}End`] = useRef<View>(null);
    acc[`${type}Container`] = useRef<View>(null);
    return acc;
  }, {} as Record<string, React.RefObject<View>>);

  const currentColor =
    plugTypes.find((p) => p.type === selectedEndPlug)?.color || "#3498db";

  return (
    <ScrollView style={styles.container} ref={containerRef}>
      <View style={styles.description}>
        <Text style={styles.descriptionText}>
          Customize plug types, sizes, and stroke width dynamically. Experiment
          with different combinations to find the perfect style.
        </Text>
      </View>

      {/* Interactive Demo */}
      <View style={styles.interactiveSection}>
        <Text style={styles.sectionTitle}>Interactive Demo</Text>
        <View ref={demoContainerRef} style={styles.demoContainer}>
          <View ref={demoStartRef} style={[styles.largeBox, styles.startBox]}>
            <Text style={styles.boxText}>Start</Text>
          </View>
          <View ref={demoEndRef} style={[styles.largeBox, styles.endBox]}>
            <Text style={styles.boxText}>End</Text>
          </View>
          <LeaderLine
            start={{ element: demoStartRef }}
            end={{ element: demoEndRef }}
            startPlug={selectedStartPlug}
            endPlug={selectedEndPlug}
            color={currentColor}
            strokeWidth={strokeWidth}
            startPlugSize={plugSize}
            endPlugSize={plugSize}
            startPlugOffset={startPlugOffset}
            endPlugOffset={endPlugOffset}
            containerRef={demoContainerRef}
          />
        </View>

        {/* Start Plug Selector */}
        <View style={styles.controlSection}>
          <Text style={styles.controlTitle}>Start Plug</Text>
          <View style={styles.selectorContainer}>
            {plugTypes.map(({ type, color }) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.selectorButton,
                  selectedStartPlug === type && styles.selectedButton,
                  { borderColor: color },
                ]}
                onPress={() => setSelectedStartPlug(type)}
              >
                <Text
                  style={[
                    styles.selectorText,
                    selectedStartPlug === type && { color },
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* End Plug Selector */}
        <View style={styles.controlSection}>
          <Text style={styles.controlTitle}>End Plug</Text>
          <View style={styles.selectorContainer}>
            {plugTypes.map(({ type, color }) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.selectorButton,
                  selectedEndPlug === type && styles.selectedButton,
                  { borderColor: color },
                ]}
                onPress={() => setSelectedEndPlug(type)}
              >
                <Text
                  style={[
                    styles.selectorText,
                    selectedEndPlug === type && { color },
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Plug Size Control */}
        <View style={styles.controlRow}>
          <Text style={styles.controlLabel}>Plug Size: {plugSize}px</Text>
          <View style={styles.controlButtons}>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={() => setPlugSize(Math.max(4, plugSize - 2))}
            >
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={() => setPlugSize(Math.min(32, plugSize + 2))}
            >
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stroke Width Control */}
        <View style={styles.controlRow}>
          <Text style={styles.controlLabel}>Stroke Width: {strokeWidth}px</Text>
          <View style={styles.controlButtons}>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={() => setStrokeWidth(Math.max(1, strokeWidth - 1))}
            >
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={() => setStrokeWidth(Math.min(10, strokeWidth + 1))}
            >
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Start Plug Offset Control */}
        <View style={styles.controlRow}>
          <Text style={styles.controlLabel}>
            Start Offset: {startPlugOffset}px
          </Text>
          <View style={styles.controlButtons}>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={() =>
                setStartPlugOffset(Math.max(0, startPlugOffset - 2))
              }
            >
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={() =>
                setStartPlugOffset(Math.min(50, startPlugOffset + 2))
              }
            >
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* End Plug Offset Control */}
        <View style={styles.controlRow}>
          <Text style={styles.controlLabel}>End Offset: {endPlugOffset}px</Text>
          <View style={styles.controlButtons}>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={() => setEndPlugOffset(Math.max(0, endPlugOffset - 2))}
            >
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={() => setEndPlugOffset(Math.min(50, endPlugOffset + 2))}
            >
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.codeSnippet}>
          <Text style={styles.code}>{`<LeaderLine
  start={{ element: startRef }}
  end={{ element: endRef }}
  startPlug="${selectedStartPlug}"
  endPlug="${selectedEndPlug}"
  startPlugSize={${plugSize}}
  endPlugSize={${plugSize}}
  startPlugOffset={${startPlugOffset}}
  endPlugOffset={${endPlugOffset}}
  strokeWidth={${strokeWidth}}
  color="${currentColor}"
/>`}</Text>
        </View>
      </View>

      {/* Comparison Grid */}
      <View style={styles.comparisonSection}>
        <Text style={styles.sectionTitle}>All Plug Types Comparison</Text>
        {plugTypes.map(({ type, color }) => (
          <View key={type} style={styles.plugExample}>
            <View style={styles.plugHeader}>
              <Text style={[styles.plugTitle, { color }]}>
                {type.toUpperCase()}
              </Text>
            </View>
            <View ref={gridRefs[`${type}Container`]} style={styles.miniDemo}>
              <View
                ref={gridRefs[`${type}Start`]}
                style={[
                  styles.miniBox,
                  { backgroundColor: "#34495e", top: 20, left: 20 },
                ]}
              />
              <View
                ref={gridRefs[`${type}End`]}
                style={[
                  styles.miniBox,
                  { backgroundColor: "#34495e", top: 20, right: 20 },
                ]}
              />
              <LeaderLine
                start={{ element: gridRefs[`${type}Start`] }}
                end={{ element: gridRefs[`${type}End`] }}
                startPlug={type}
                endPlug={type}
                color={color}
                strokeWidth={strokeWidth}
                startPlugSize={plugSize}
                endPlugSize={plugSize}
                containerRef={gridRefs[`${type}Container`]}
              />
            </View>
          </View>
        ))}
      </View>

      <View style={styles.tips}>
        <Text style={styles.tipsTitle}>Tips:</Text>
        <Text style={styles.tipText}>
          • Different plug sizes work better with different stroke widths
        </Text>
        <Text style={styles.tipText}>
          • Try <Text style={styles.bold}>arrow</Text> types for directiosnal
          flow
        </Text>
        <Text style={styles.tipText}>
          • Use <Text style={styles.bold}>disc</Text> or{" "}
          <Text style={styles.bold}>square</Text> for simple endpoints
        </Text>
        <Text style={styles.tipText}>
          • <Text style={styles.bold}>diamond</Text> works great for data flow
          diagrams
        </Text>
        <Text style={styles.tipText}>
          • Adjust plug size to match your stroke width for best results
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
  interactiveSection: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2c3e50",
    marginHorizontal: 16,
    marginBottom: 12,
  },
  demoContainer: {
    height: 300,
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
  largeBox: {
    position: "absolute",
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  startBox: {
    backgroundColor: "#34495e",
    top: 40,
    left: 40,
  },
  endBox: {
    backgroundColor: "#34495e",
    top: 40,
    right: 40,
  },
  boxText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  controlSection: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  controlTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 8,
  },
  selectorContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  selectorButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 2,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedButton: {
    backgroundColor: "#f0f0f0",
  },
  selectorText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#7f8c8d",
  },
  controlRow: {
    marginHorizontal: 16,
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  controlLabel: {
    fontSize: 16,
    color: "#34495e",
    fontWeight: "500",
  },
  controlButtons: {
    flexDirection: "row",
  },
  controlButton: {
    width: 40,
    height: 40,
    backgroundColor: "#3498db",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  codeSnippet: {
    marginHorizontal: 16,
    marginTop: 16,
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
  comparisonSection: {
    marginTop: 32,
  },
  plugExample: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  plugHeader: {
    marginBottom: 8,
  },
  plugTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  miniDemo: {
    height: 120,
    backgroundColor: "white",
    borderRadius: 8,
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  miniBox: {
    position: "absolute",
    width: 30,
    height: 30,
    borderRadius: 6,
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
    marginBottom: 12,
  },
  tipText: {
    fontSize: 14,
    color: "#34495e",
    marginVertical: 3,
    lineHeight: 20,
  },
  bold: {
    fontWeight: "600",
  },
});
