/**
 * Native crash detection and error boundary for React Native Leader Line
 * This component catches both JavaScript errors and native crashes
 */

import React, { Component, ErrorInfo, ReactNode } from "react";
import { View, Text, Alert } from "react-native";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class NativeCrashBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    console.error("ReactNative: NativeCrashBoundary caught error:", error);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ReactNative: NativeCrashBoundary error details:", {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
    });

    // Log to native for adb logcat visibility
    console.log(
      "ReactNative: NATIVE_CRASH_DETECTED",
      JSON.stringify({
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
      })
    );

    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Show user-friendly alert for critical errors
    if (
      error.message.includes("ArrayIndexOutOfBoundsException") ||
      error.message.includes("renderMarkers") ||
      error.message.includes("svg")
    ) {
      Alert.alert(
        "SVG Rendering Error",
        "A graphics rendering error occurred. The component will attempt to recover.",
        [{ text: "OK" }]
      );
    }

    this.setState({ error, errorInfo });
  }

  handleRetry = () => {
    console.log("ReactNative: NativeCrashBoundary retry attempted");
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <View
          style={{
            padding: 20,
            backgroundColor: "#fee",
            margin: 10,
            borderRadius: 5,
          }}
        >
          <Text style={{ color: "#c00", fontWeight: "bold", marginBottom: 10 }}>
            Component Error Detected
          </Text>
          <Text style={{ fontSize: 12, color: "#666", marginBottom: 10 }}>
            {this.state.error?.message || "Unknown error occurred"}
          </Text>
          <Text
            style={{ color: "#007AFF", textDecorationLine: "underline" }}
            onPress={this.handleRetry}
          >
            Tap to retry
          </Text>
        </View>
      );
    }

    return this.props.children;
  }
}

/**
 * HOC to wrap components with native crash detection
 */
export function withNativeCrashBoundary<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  fallback?: ReactNode
) {
  return function NativeCrashBoundaryWrapper(props: P) {
    return (
      <NativeCrashBoundary fallback={fallback}>
        <WrappedComponent {...props} />
      </NativeCrashBoundary>
    );
  };
}

/**
 * Hook to safely execute SVG operations that might crash
 */
export function useSafeSVGExecution() {
  const executeSafely = React.useCallback(function <T>(
    operation: () => T,
    fallback: T,
    operationName: string = "SVG operation"
  ): T {
    try {
      console.log(`ReactNative: Executing ${operationName}`);
      const result = operation();
      console.log(`ReactNative: ${operationName} completed successfully`);
      return result;
    } catch (error) {
      console.error(`ReactNative: ${operationName} failed:`, error);
      console.log(
        "ReactNative: SVG_OPERATION_FAILED",
        JSON.stringify({
          operationName,
          error: error instanceof Error ? error.message : String(error),
          timestamp: new Date().toISOString(),
        })
      );
      return fallback;
    }
  },
  []);

  return { executeSafely };
}
