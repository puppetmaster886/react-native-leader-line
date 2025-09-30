import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from "react-native";
import { LeaderLine } from "react-native-leader-line";

export default function AnimationsDemo() {
  const startRef = useRef<View>(null);
  const endRef = useRef<View>(null);
  const animatedRef = useRef<View>(null);
  const demoRef1 = useRef<View>(null);
  const demoRef2 = useRef<View>(null);

  const [lineVisible, setLineVisible] = useState(true);
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Continuous animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [animatedValue]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });

  return (
    <View style={styles.container}>
      <View style={styles.description}>
        <Text style={styles.descriptionText}>
          Lines automatically update when connected elements move or change.
          Optimized for performance with configurable update rates.
        </Text>
      </View>

      {/* Example 1: Toggle Visibility */}
      <View style={styles.demoSection}>
        <Text style={styles.sectionTitle}>Toggle Visibility</Text>
        <View ref={demoRef1} style={styles.demo}>
          <View ref={startRef} style={[styles.box, styles.blueBox]}>
            <Text style={styles.boxText}>A</Text>
          </View>
          <View ref={endRef} style={[styles.box, styles.redBox]}>
            <Text style={styles.boxText}>B</Text>
          </View>
          {lineVisible && (
            <LeaderLine
              start={{ element: startRef }}
              end={{ element: endRef }}
              color="#3498db"
              strokeWidth={3}
              path="arc"
              containerRef={demoRef1}
            />
          )}
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setLineVisible(!lineVisible)}
        >
          <Text style={styles.buttonText}>
            {lineVisible ? "Hide Line" : "Show Line"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Example 2: Animated Position */}
      <View style={styles.demoSection}>
        <Text style={styles.sectionTitle}>Animated Movement</Text>
        <View ref={demoRef2} style={styles.demo}>
          <Animated.View
            ref={animatedRef}
            style={[
              styles.box,
              styles.greenBox,
              {
                transform: [{ translateX }],
              },
            ]}
          >
            <Text style={styles.boxText}>Move</Text>
          </Animated.View>
          <View
            ref={endRef}
            style={[styles.box, styles.purpleBox, { bottom: 40, left: 150 }]}
          >
            <Text style={styles.boxText}>Fixed</Text>
          </View>
          <LeaderLine
            start={{ element: animatedRef }}
            end={{ element: endRef }}
            color="#2ecc71"
            strokeWidth={2}
            path="fluid"
            containerRef={demoRef2}
            updateThreshold={50} // 20fps - balance perfecto entre suavidad y performance
            smoothAnimations={true} // Enable smooth interpolation
          />
        </View>
      </View>

      <View style={styles.info}>
        <Text style={styles.infoTitle}>Animation Features:</Text>
        <Text style={styles.infoText}>
          • Lines update automatically when refs move
        </Text>
        <Text style={styles.infoText}>
          • Use updateThreshold to control update frequency (default: 33ms)
        </Text>
        <Text style={styles.infoText}>
          • Enable smoothAnimations for interpolated movement
        </Text>
        <Text style={styles.infoText}>
          • Optimized performance with change detection
        </Text>
        <Text style={styles.infoText}>
          • Works with React Native Animated API
        </Text>
      </View>
    </View>
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
    top: 40,
    left: 40,
  },
  redBox: {
    backgroundColor: "#e74c3c",
    bottom: 40,
    right: 40,
  },
  greenBox: {
    backgroundColor: "#2ecc71",
    top: 40,
    left: 40,
  },
  purpleBox: {
    backgroundColor: "#9b59b6",
  },
  boxText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  button: {
    backgroundColor: "#3498db",
    padding: 12,
    marginHorizontal: 16,
    marginTop: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
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
