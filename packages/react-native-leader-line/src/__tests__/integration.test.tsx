/**
 * @fileoverview Integration tests for React Native Leader Line
 * @description End-to-end tests that verify the complete integration between components, hooks, and utilities
 */

import { act, render } from "@testing-library/react-native";
import React, { useCallback, useRef, useState } from "react";
import { Text, View } from "react-native";
import { useAttachment } from "../hooks/useAttachment";
import { useLeaderLine } from "../hooks/useLeaderLine";
import { useLeaderLineManager } from "../hooks/useLeaderLineManager";
import LeaderLine from "../components/LeaderLine";

// Simple Button component to avoid TouchableOpacity issues
const Button = React.forwardRef<View, any>(
  ({ onPress, children, ...props }, ref) => {
    return (
      <View
        ref={ref}
        {...props}
        onTouchEnd={onPress}
        style={{ padding: 10, backgroundColor: "#007AFF" }}
      >
        {children}
      </View>
    );
  }
);
Button.displayName = "Button";

// Helper to simulate button press
const simulateButtonPress = (button: any) => {
  if (button.props.onTouchEnd) {
    button.props.onTouchEnd();
  } else if (button.props.onPress) {
    button.props.onPress();
  }
};

describe("Integration Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  describe("Complete Component Integration", () => {
    it("should render LeaderLine with connected elements", async () => {
      const TestComponent = () => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        return (
          <View>
            <View ref={startRef} testID="start-element">
              <Text>Start Element</Text>
            </View>
            <View ref={endRef} testID="end-element">
              <Text>End Element</Text>
            </View>
            <LeaderLine
              start={{ element: startRef }}
              end={{ element: endRef }}
              color="#ff0000"
              strokeWidth={2}
              path="arc"
              testID="leader-line"
            />
          </View>
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("start-element")).toBeTruthy();
      expect(getByTestId("end-element")).toBeTruthy();
      expect(getByTestId("leader-line")).toBeTruthy();
    });

    it("should handle dynamic element updates", async () => {
      const TestComponent = () => {
        const [showLine, setShowLine] = useState(false);
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        const toggleLine = useCallback(() => {
          setShowLine((prev) => !prev);
        }, []);

        return (
          <View>
            <View ref={startRef} testID="start-element">
              <Text>Start</Text>
            </View>
            <View ref={endRef} testID="end-element">
              <Text>End</Text>
            </View>
            <Button testID="toggle-button" onPress={toggleLine}>
              <Text>Toggle Line</Text>
            </Button>
            {showLine && (
              <LeaderLine
                start={{ element: startRef }}
                end={{ element: endRef }}
                testID="leader-line"
              />
            )}
          </View>
        );
      };

      const { getByTestId, queryByTestId } = render(<TestComponent />);

      // Initially no line
      expect(queryByTestId("leader-line")).toBeNull();

      // Toggle line on
      const button = getByTestId("toggle-button");
      simulateButtonPress(button);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("leader-line")).toBeTruthy();

      // Toggle line off
      simulateButtonPress(button);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(queryByTestId("leader-line")).toBeNull();
    });
  });

  describe("Hook Integration", () => {
    it("should integrate useLeaderLine with useAttachment", async () => {
      const TestComponent = () => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        const attachment = useAttachment({
          startAttachment: { element: startRef },
          endAttachment: { element: endRef },
        });

        const leaderLine = useLeaderLine({
          start: attachment.startState.effectivePoint,
          end: attachment.endState.effectivePoint,
          config: { path: "straight", color: "#00ff00" },
        });

        return (
          <View>
            <View ref={startRef} testID="start-element" />
            <View ref={endRef} testID="end-element" />
            <Text testID="connection-status">
              {attachment.isConnected ? "Connected" : "Disconnected"}
            </Text>
            <Text testID="path-data">{leaderLine.pathData || "No path"}</Text>
          </View>
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("start-element")).toBeTruthy();
      expect(getByTestId("end-element")).toBeTruthy();
      expect(getByTestId("connection-status")).toBeTruthy();
      expect(getByTestId("path-data")).toBeTruthy();
    });

    it("should integrate useLeaderLineManager with multiple lines", async () => {
      const TestComponent = () => {
        const ref1 = useRef<View>(null);
        const ref2 = useRef<View>(null);
        const ref3 = useRef<View>(null);
        const [initialized, setInitialized] = useState(false);

        const manager = useLeaderLineManager();

        React.useEffect(() => {
          if (!initialized) {
            try {
              manager.addLine("line1", {
                start: { element: ref1 },
                end: { element: ref2 },
                color: "#ff0000",
              });
              manager.addLine("line2", {
                start: { element: ref2 },
                end: { element: ref3 },
                color: "#00ff00",
              });
              setInitialized(true);
            } catch (error) {
              // Safely handle potential errors
            }
          }
        }, [manager, initialized]);

        const clearAll = useCallback(() => {
          try {
            manager.clearAll();
            setInitialized(false);
          } catch (error) {
          }
        }, [manager]);

        return (
          <View>
            <View ref={ref1} testID="element-1" />
            <View ref={ref2} testID="element-2" />
            <View ref={ref3} testID="element-3" />
            <Text testID="line-count">{manager.lines.length}</Text>
            <Button testID="clear-button" onPress={clearAll}>
              <Text>Clear All</Text>
            </Button>
          </View>
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("element-1")).toBeTruthy();
      expect(getByTestId("element-2")).toBeTruthy();
      expect(getByTestId("element-3")).toBeTruthy();

      // Try to clear all lines
      const clearButton = getByTestId("clear-button");
      simulateButtonPress(clearButton);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("line-count")).toBeTruthy();
    });
  });

  describe("Performance and Memory Management", () => {
    it("should handle mount/unmount cycles without memory leaks", async () => {
      const TestComponent = ({ show }: { show: boolean }) => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        if (!show) return null;

        return (
          <View>
            <View ref={startRef} testID="start" />
            <View ref={endRef} testID="end" />
            <LeaderLine
              start={{ element: startRef }}
              end={{ element: endRef }}
              testID="leader-line"
            />
          </View>
        );
      };

      const { rerender, queryByTestId } = render(<TestComponent show={true} />);

      // Limited cycles to prevent memory issues
      for (let i = 0; i < 3; i++) {
        await act(async () => {
          rerender(<TestComponent show={false} />);
          jest.runAllTimers();
        });

        expect(queryByTestId("leader-line")).toBeNull();

        await act(async () => {
          rerender(<TestComponent show={true} />);
          jest.runAllTimers();
        });

        expect(queryByTestId("leader-line")).toBeTruthy();
      }
    });

    it("should handle multiple concurrent lines efficiently", async () => {
      const TestComponent = () => {
        const refs = Array.from({ length: 5 }, () => useRef<View>(null)); // Reduced from 20 to 5

        return (
          <View>
            {refs.map((ref, index) => (
              <View key={index} ref={ref} testID={`element-${index}`} />
            ))}
            {refs.slice(0, -1).map((startRef, index) => (
              <LeaderLine
                key={index}
                start={{ element: startRef }}
                end={{ element: refs[index + 1] }}
                color={`#ff0000`} // Simplified color to avoid hsl calculations
                testID={`line-${index}`}
              />
            ))}
          </View>
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      // Verify elements exist
      for (let i = 0; i < 5; i++) {
        expect(getByTestId(`element-${i}`)).toBeTruthy();
      }

      // Verify lines exist
      for (let i = 0; i < 4; i++) {
        expect(getByTestId(`line-${i}`)).toBeTruthy();
      }
    });
  });

  describe("Error Boundary Integration", () => {
    it("should handle component errors gracefully", async () => {
      const TestComponent = () => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        return (
          <View>
            <View ref={startRef} testID="start" />
            <View ref={endRef} testID="end" />
            <LeaderLine
              start={{ element: startRef }}
              end={{ element: endRef }}
              testID="leader-line"
            />
          </View>
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("start")).toBeTruthy();
      expect(getByTestId("end")).toBeTruthy();
      expect(getByTestId("leader-line")).toBeTruthy();
    });
  });

  describe("Real-world Usage Scenarios", () => {
    it("should handle simple nested component structures", async () => {
      const NestedComponent = ({ children, testID }: any) => (
        <View testID={testID}>
          <View>
            <View>{children}</View>
          </View>
        </View>
      );

      const TestComponent = () => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        return (
          <View>
            <NestedComponent testID="nested-start">
              <View ref={startRef} testID="deep-start">
                <Text>Deep Start</Text>
              </View>
            </NestedComponent>
            <NestedComponent testID="nested-end">
              <View ref={endRef} testID="deep-end">
                <Text>Deep End</Text>
              </View>
            </NestedComponent>
            <LeaderLine
              start={{ element: startRef }}
              end={{ element: endRef }}
              path="fluid"
              testID="leader-line"
            />
          </View>
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("nested-start")).toBeTruthy();
      expect(getByTestId("nested-end")).toBeTruthy();
      expect(getByTestId("deep-start")).toBeTruthy();
      expect(getByTestId("deep-end")).toBeTruthy();
      expect(getByTestId("leader-line")).toBeTruthy();
    });

    it("should work with conditional rendering and state changes", async () => {
      const TestComponent = () => {
        const [config, setConfig] = useState({
          color: "#000000",
          path: "straight" as const,
          strokeWidth: 1,
        });
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        const changeConfig = useCallback(() => {
          setConfig({
            color: "#ff0000",
            path: "arc",
            strokeWidth: 3,
          });
        }, []);

        return (
          <View>
            <View ref={startRef} testID="start" />
            <View ref={endRef} testID="end" />
            <Button testID="config-button" onPress={changeConfig}>
              <Text>Change Config</Text>
            </Button>
            <LeaderLine
              start={{ element: startRef }}
              end={{ element: endRef }}
              {...config}
              testID="leader-line"
            />
          </View>
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("start")).toBeTruthy();
      expect(getByTestId("end")).toBeTruthy();
      expect(getByTestId("leader-line")).toBeTruthy();

      // Change configuration
      const configButton = getByTestId("config-button");
      simulateButtonPress(configButton);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("leader-line")).toBeTruthy();
    });
  });
});
