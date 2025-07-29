/**
 * Minimal SVG Test
 * Consolidates: SuperMinimalTest, MinimalTestComponent
 * Direct SVG implementation without using the library
 */
import { StyleSheet, Text, View } from "react-native";
import Svg, { Defs, Marker, Path } from "react-native-svg";

const MinimalSVGTest = () => {
  // Simple arrow path from top-left to bottom-right
  const startPoint = { x: 50, y: 50 };
  const endPoint = { x: 200, y: 150 };

  const pathData = `M ${startPoint.x} ${startPoint.y} L ${endPoint.x} ${endPoint.y}`;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minimal SVG Test</Text>

      <View style={styles.testArea}>
        {/* Start Box */}
        <View style={[styles.box, { top: 30, left: 30 }]}>
          <Text style={styles.boxText}>📦</Text>
        </View>

        {/* End Box */}
        <View style={[styles.box, { bottom: 30, right: 30 }]}>
          <Text style={styles.boxText}>🎯</Text>
        </View>

        {/* SVG Arrow */}
        <Svg style={styles.svg} width="100%" height="100%">
          <Defs>
            <Marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <Path d="M0,0 L0,7 L10,3.5 z" fill="#FF6B6B" />
            </Marker>
          </Defs>

          <Path
            d={pathData}
            stroke="#FF6B6B"
            strokeWidth="3"
            fill="none"
            markerEnd="url(#arrowhead)"
          />
        </Svg>
      </View>

      <View style={styles.info}>
        <Text style={styles.infoText}>
          ✓ Direct SVG implementation using react-native-svg
        </Text>
        <Text style={styles.infoText}>
          ✓ No library dependency - pure SVG rendering
        </Text>
        <Text style={styles.infoText}>
          ✓ Custom arrowhead marker with red color
        </Text>
        <Text style={styles.infoText}>
          ✓ Useful for debugging SVG rendering issues
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
    backgroundColor: "#fff8f0",
    borderRadius: 12,
    position: "relative",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ffe4cc",
  },
  svg: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  box: {
    width: 50,
    height: 50,
    backgroundColor: "white",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    borderWidth: 2,
    borderColor: "#FF6B6B",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  boxText: {
    fontSize: 20,
  },
  info: {
    backgroundColor: "#fff8f0",
    padding: 15,
    borderRadius: 8,
    borderLeft: 4,
    borderLeftColor: "#FF6B6B",
  },
  infoText: {
    fontSize: 14,
    color: "#495057",
    marginBottom: 5,
  },
});

export default MinimalSVGTest;
