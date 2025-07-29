/**
 * Testing app for React Native Leader Line
 * Consolidates all test components into organized examples
 */
import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Import consolidated test components
import BasicConnectionTest from "./components/BasicConnectionTest";
import LibraryIntegrationTest from "./components/LibraryIntegrationTest";
import MinimalSVGTest from "./components/MinimalSVGTest";

const TestApp = () => {
  const [activeTest, setActiveTest] = useState(0);

  const tests = [
    {
      id: 0,
      title: "Basic Connection",
      description: "Simple arrow connecting two elements",
      component: BasicConnectionTest,
    },
    {
      id: 1,
      title: "Minimal SVG",
      description: "Direct SVG implementation without library",
      component: MinimalSVGTest,
    },
    {
      id: 2,
      title: "Library Integration",
      description: "Test using the compiled library",
      component: LibraryIntegrationTest,
    },
  ];

  const ActiveComponent = tests[activeTest].component;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>React Native Leader Line</Text>
        <Text style={styles.subtitle}>Test Suite</Text>
      </View>

      {/* Test Navigation */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabs}
      >
        {tests.map((test) => (
          <TouchableOpacity
            key={test.id}
            style={[styles.tab, activeTest === test.id && styles.activeTab]}
            onPress={() => setActiveTest(test.id)}
          >
            <Text
              style={[
                styles.tabText,
                activeTest === test.id && styles.activeTabText,
              ]}
            >
              {test.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Test Description */}
      <View style={styles.description}>
        <Text style={styles.descriptionText}>
          {tests[activeTest].description}
        </Text>
      </View>

      {/* Active Test Component */}
      <View style={styles.testContainer}>
        <ActiveComponent />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 20,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginTop: 4,
  },
  tabs: {
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginRight: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#007AFF",
  },
  tabText: {
    fontSize: 16,
    color: "#666",
  },
  activeTabText: {
    color: "#007AFF",
    fontWeight: "600",
  },
  description: {
    padding: 15,
    backgroundColor: "white",
    marginTop: 1,
  },
  descriptionText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  testContainer: {
    flex: 1,
    margin: 15,
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
  },
});

export default TestApp;
