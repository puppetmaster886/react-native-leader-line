/**
 * Global error detection system for React Native Leader Line
 * This system captures both JavaScript errors and native crashes
 */

import { ErrorUtils } from "react-native";

interface ErrorLog {
  type: "js" | "native" | "svg";
  message: string;
  stack?: string;
  timestamp: string;
  component?: string;
  props?: any;
}

class GlobalErrorLogger {
  private static instance: GlobalErrorLogger;
  private errorHistory: ErrorLog[] = [];
  private maxHistorySize = 50;

  static getInstance(): GlobalErrorLogger {
    if (!GlobalErrorLogger.instance) {
      GlobalErrorLogger.instance = new GlobalErrorLogger();
    }
    return GlobalErrorLogger.instance;
  }

  initialize() {
    console.log("ReactNative: GlobalErrorLogger initialized");

    // Override global error handler to catch native crashes
    const originalHandler = ErrorUtils.getGlobalHandler();

    ErrorUtils.setGlobalHandler((error: any, isFatal: boolean = false) => {
      this.logError({
        type: "native",
        message: error.message || "Unknown native error",
        stack: error.stack,
        timestamp: new Date().toISOString(),
      });

      console.log(
        "ReactNative: NATIVE_ERROR_DETECTED",
        JSON.stringify({
          message: error.message,
          stack: error.stack,
          isFatal,
          timestamp: new Date().toISOString(),
        })
      );

      // Call original handler
      if (originalHandler) {
        originalHandler(error, isFatal);
      }
    });

    // Setup console intercept for better native visibility
    this.setupConsoleIntercept();
  }

  private setupConsoleIntercept() {
    const originalError = console.error;
    const originalLog = console.log;
    const originalWarn = console.warn;

    console.error = (...args: any[]) => {
      const message = args.join(" ");

      // Check for react-native-svg specific errors
      if (
        message.includes("ArrayIndexOutOfBoundsException") ||
        message.includes("renderMarkers") ||
        message.includes("svg") ||
        message.includes("marker")
      ) {
        this.logError({
          type: "svg",
          message,
          timestamp: new Date().toISOString(),
        });

        // Enhanced logging for adb logcat
        console.log(
          "ReactNative: SVG_CRASH_INTERCEPTED",
          JSON.stringify({
            error: message,
            timestamp: new Date().toISOString(),
            level: "ERROR",
          })
        );
      }

      originalError.apply(console, args);
    };

    console.log = (...args: any[]) => {
      const message = args.join(" ");

      // Enhance important logs for adb visibility
      if (message.includes("ReactNative:")) {
        // These logs are already prefixed for adb logcat
        originalLog.apply(console, args);
      } else {
        originalLog.apply(console, args);
      }
    };

    console.warn = (...args: any[]) => {
      const message = args.join(" ");

      // Check for memory warnings that might indicate crashes
      if (
        message.includes("Memory warning") ||
        message.includes("pressure level")
      ) {
        console.log(
          "ReactNative: MEMORY_WARNING_DETECTED",
          JSON.stringify({
            warning: message,
            timestamp: new Date().toISOString(),
          })
        );
      }

      originalWarn.apply(console, args);
    };
  }

  logError(errorLog: ErrorLog) {
    this.errorHistory.push(errorLog);

    // Keep history size manageable
    if (this.errorHistory.length > this.maxHistorySize) {
      this.errorHistory = this.errorHistory.slice(-this.maxHistorySize);
    }

    // Log to console with ReactNative prefix for adb logcat visibility
    console.log("ReactNative: ERROR_LOGGED", JSON.stringify(errorLog));
  }

  logLeaderLineError(error: any, component: string, props?: any) {
    this.logError({
      type: "js",
      message: error.message || "LeaderLine error",
      stack: error.stack,
      timestamp: new Date().toISOString(),
      component,
      props,
    });
  }

  getErrorHistory(): ErrorLog[] {
    return [...this.errorHistory];
  }

  clearHistory() {
    this.errorHistory = [];
    console.log("ReactNative: Error history cleared");
  }

  // Method to check if we have any SVG-related crashes
  hasSVGCrashes(): boolean {
    return this.errorHistory.some(
      (error) =>
        error.type === "svg" ||
        error.message.includes("svg") ||
        error.message.includes("ArrayIndexOutOfBoundsException") ||
        error.message.includes("renderMarkers")
    );
  }
}

// Export singleton instance
export const globalErrorLogger = GlobalErrorLogger.getInstance();

// Auto-initialize
globalErrorLogger.initialize();
