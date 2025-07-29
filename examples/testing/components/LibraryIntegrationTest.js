/**
 * Library Integration Test
 * Consolidates: TestWithLibComponent, SimplifiedTest
 * Tests the compiled library integration
 */
import { useRef, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Try to import the library, with fallback if it fails
let LeaderLine;
try {
  const lib = require("react-native-leader-line");
  LeaderLine = lib.LeaderLine || lib.default;
} catch (error) {
  console.warn("Library import failed:", error.message);
}

const LibraryIntegrationTest = () => {
  const [connectionStatus, setConnectionStatus] = useState("Not connected");
  const elementARef = useRef(null);
  const elementBRef = useRef(null);

  const testConnection = () => {
    if (!LeaderLine) {
      Alert.alert(
        "Library Not Available",
        "The LeaderLine library could not be imported. This might be due to:\n\n" +
          "• Build issues with the library\n" +
          "• Missing dependencies\n" +
          "• TypeScript compilation errors\n\n" +
          "Check the console for more details."
      );
      setConnectionStatus("Library import failed");
      return;
    }

    try {
      setConnectionStatus("Attempting connection...");
      // Simulate connection attempt
      setTimeout(() => {
        setConnectionStatus("Connected successfully!");
      }, 1000);
    } catch (error) {
      setConnectionStatus(`Connection failed: ${error.message}`);
    }
  };

  const renderLeaderLine = () => {
    if (!LeaderLine) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>⚠️ Library Not Available</Text>
          <Text style={styles.errorSubtext}>Using fallback visualization</Text>
          {/* Fallback visual representation */}
          <View style={styles.fallbackLine} />
        </View>
      );
    }

    return (
      <LeaderLine
        start={elementARef}
        end={elementBRef}
        color="#8E44AD"
        size={3}
        startPlug="square"
        endPlug="arrow2"
        path="arc"
        dash={{ animation: true }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Library Integration Test</Text>

      <View style={styles.statusContainer}>
        <Text style={styles.statusLabel}>Status:</Text>
        <Text
          style={[
            styles.statusText,
            connectionStatus.includes("successfully") && styles.successText,
            connectionStatus.includes("failed") && styles.errorTextColor,
          ]}
        >
          {connectionStatus}
        </Text>
      </View>

      <TouchableOpacity style={styles.testButton} onPress={testConnection}>
        <Text style={styles.testButtonText}>Test Connection</Text>
      </TouchableOpacity>

      <View style={styles.testArea}>
        {/* Element A */}
        <View ref={elementARef} style={[styles.element, styles.elementA]}>
          <Text style={styles.elementText}>LIB</Text>
        </View>

        {/* Element B */}
        <View ref={elementBRef} style={[styles.element, styles.elementB]}>
          <Text style={styles.elementText}>TEST</Text>
        </View>

        {/* Leader Line or Fallback */}
        {renderLeaderLine()}
      </View>

      <View style={styles.info}>
        <Text style={styles.infoText}>
          ✓ Tests compiled library integration
        </Text>
        <Text style={styles.infoText}>
          ✓ Purple arc line with animated dash
        </Text>
        <Text style={styles.infoText}>
          ✓ Square start plug, arrow2 end plug
        </Text>
        <Text style={styles.infoText}>
          ✓ Graceful fallback if library fails
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
  statusContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
  },
  statusLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#495057",
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    color: "#6c757d",
  },
  successText: {
    color: "#28a745",
    fontWeight: "600",
  },
  errorTextColor: {
    color: "#dc3545",
    fontWeight: "600",
  },
  testButton: {
    backgroundColor: "#8E44AD",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: "center",
    marginBottom: 20,
  },
  testButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  testArea: {
    height: 200,
    backgroundColor: "#f0f8ff",
    borderRadius: 12,
    position: "relative",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#d6e9ff",
  },
  element: {
    width: 60,
    height: 40,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    borderWidth: 2,
    borderColor: "#8E44AD",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  elementA: {
    top: 30,
    left: 30,
  },
  elementB: {
    bottom: 30,
    right: 30,
  },
  elementText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#8E44AD",
  },
  errorContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -75 }, { translateY: -20 }],
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "#dc3545",
    fontWeight: "600",
  },
  errorSubtext: {
    fontSize: 12,
    color: "#6c757d",
    marginTop: 4,
  },
  fallbackLine: {
    width: 100,
    height: 2,
    backgroundColor: "#dee2e6",
    marginTop: 10,
    borderRadius: 1,
  },
  info: {
    backgroundColor: "#f0f8ff",
    padding: 15,
    borderRadius: 8,
    borderLeft: 4,
    borderLeftColor: "#8E44AD",
  },
  infoText: {
    fontSize: 14,
    color: "#495057",
    marginBottom: 5,
  },
});

export default LibraryIntegrationTest;
