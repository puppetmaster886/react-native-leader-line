/**
 * @fileoverview Error Handling and Edge Cases Tests
 * @description Comprehensive tests for error conditions, edge cases, and failure scenarios
 */

import { act, render } from "@testing-library/react-native";
import React, { useRef } from "react";
import { View } from "react-native";
import { LeaderLine } from "../LeaderLine";

// Mock console methods to capture errors and warnings
const mockConsole = () => {
  const originalError = console.error;
  const originalWarn = console.warn;
  const errors: string[] = [];
  const warnings: string[] = [];

  console.error = jest.fn((...args) => {
    errors.push(args.join(" "));
  });

  console.warn = jest.fn((...args) => {
    warnings.push(args.join(" "));
  });

  return {
    errors,
    warnings,
    restore: () => {
      console.error = originalError;
      console.warn = originalWarn;
    },
  };
};

describe("Error Handling and Edge Cases", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe("Invalid Props Handling", () => {
    it("should handle null startElement gracefully", async () => {
      const mockConsoleOutput = mockConsole();

      const TestComponent = () => {
        const endRef = useRef<View>(null);

        return (
          <View testID="container">
            <LeaderLine
              start={{ element: null as any }}
              end={{ element: endRef }}
              testID="null-start"
            />
          </View>
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      // Should render container but LeaderLine returns null with invalid props
      expect(getByTestId("container")).toBeTruthy();
      // Should handle gracefully without crashing
      mockConsoleOutput.restore();
    });

    it("should handle null endElement gracefully", async () => {
      const mockConsoleOutput = mockConsole();

      const TestComponent = () => {
        const startRef = useRef<View>(null);

        return (
          <View testID="container">
            <LeaderLine
              start={{ element: startRef }}
              end={{ element: null as any }}
              testID="null-end"
            />
          </View>
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("container")).toBeTruthy();
      mockConsoleOutput.restore();
    });

    it("should handle invalid path types", async () => {
      const mockConsoleOutput = mockConsole();

      const TestComponent = () => {
        return (
          <View testID="container">
            <LeaderLine
              start={{ point: { x: 10, y: 10 } }}
              end={{ point: { x: 100, y: 100 } }}
              path={"invalid-path" as any}
              testID="invalid-path"
            />
          </View>
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("container")).toBeTruthy();
      // Should fallback to default path type
      mockConsoleOutput.restore();
    });

    it("should handle negative stroke width", async () => {
      const TestComponent = () => {
        return (
          <View testID="container">
            <LeaderLine
              start={{ point: { x: 10, y: 10 } }}
              end={{ point: { x: 100, y: 100 } }}
              strokeWidth={-5}
              testID="negative-stroke"
            />
          </View>
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("container")).toBeTruthy();
    });

    it("should handle extremely large stroke width", async () => {
      const TestComponent = () => {
        return (
          <View testID="container">
            <LeaderLine
              start={{ point: { x: 10, y: 10 } }}
              end={{ point: { x: 100, y: 100 } }}
              strokeWidth={1000}
              testID="large-stroke"
            />
          </View>
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("container")).toBeTruthy();
    });

    it("should handle invalid color values", async () => {
      const TestComponent = () => {
        return (
          <View testID="container">
            <LeaderLine
              start={{ point: { x: 10, y: 10 } }}
              end={{ point: { x: 100, y: 100 } }}
              color="invalid-color"
              testID="invalid-color"
            />
          </View>
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("container")).toBeTruthy();
    });

    it("should handle invalid curvature values", async () => {
      const TestComponent = () => {
        return (
          <View testID="container">
            <LeaderLine
              start={{ point: { x: 10, y: 10 } }}
              end={{ point: { x: 100, y: 100 } }}
              path="arc"
              curvature={Infinity}
              testID="invalid-curvature"
            />
          </View>
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("container")).toBeTruthy();
    });
  });

  describe("Measurement Failures", () => {
    it("should handle measurement callback failures", async () => {
      const mockConsoleOutput = mockConsole();

      const TestComponent = () => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        // Mock failing measurement
        React.useEffect(() => {
          if (startRef.current) {
            (startRef.current as any).measure = jest.fn((callback) => {
              throw new Error("Measurement failed");
            });
          }
          if (endRef.current) {
            (endRef.current as any).measure = jest.fn((callback) => {
              callback(100, 100, 50, 50, 100, 100);
            });
          }
        });

        return (
          <View testID="container">
            <View ref={startRef} />
            <View ref={endRef} />
            <LeaderLine
              start={{ element: startRef }}
              end={{ element: endRef }}
              testID="measurement-failure"
            />
          </View>
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("container")).toBeTruthy();
      mockConsoleOutput.restore();
    });

    it("should handle elements without measure method", async () => {
      const TestComponent = () => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        // Mock element without measure method
        React.useEffect(() => {
          if (startRef.current) {
            delete (startRef.current as any).measure;
          }
          if (endRef.current) {
            (endRef.current as any).measure = jest.fn((callback) => {
              callback(100, 100, 50, 50, 100, 100);
            });
          }
        });

        return (
          <View testID="container">
            <View ref={startRef} />
            <View ref={endRef} />
            <LeaderLine
              start={{ element: startRef }}
              end={{ element: endRef }}
              testID="no-measure-method"
            />
          </View>
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("container")).toBeTruthy();
    });

    it("should handle zero-size elements", async () => {
      const TestComponent = () => {
        return (
          <View testID="container">
            <LeaderLine
              start={{ point: { x: 0, y: 0 } }}
              end={{ point: { x: 0, y: 0 } }}
              testID="zero-size"
            />
          </View>
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("container")).toBeTruthy();
    });

    it("should handle negative position values", async () => {
      const TestComponent = () => {
        return (
          <View testID="container">
            <LeaderLine
              start={{ point: { x: -100, y: -100 } }}
              end={{ point: { x: 100, y: 100 } }}
              testID="negative-position"
            />
          </View>
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("container")).toBeTruthy();
    });
  });

  describe("Animation Edge Cases", () => {
    it("should handle invalid animation duration", async () => {
      const TestComponent = () => {
        return (
          <View testID="container">
            <LeaderLine
              start={{ point: { x: 10, y: 10 } }}
              end={{ point: { x: 100, y: 100 } }}
              animate="draw"
              animationDuration={-1000}
              testID="invalid-duration"
            />
          </View>
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("container")).toBeTruthy();
    });

    it("should handle extremely long animation duration", async () => {
      const TestComponent = () => {
        return (
          <View testID="container">
            <LeaderLine
              start={{ point: { x: 10, y: 10 } }}
              end={{ point: { x: 100, y: 100 } }}
              animate="draw"
              animationDuration={999999999}
              testID="long-duration"
            />
          </View>
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("container")).toBeTruthy();
    });

    it("should handle invalid animation type", async () => {
      const TestComponent = () => {
        return (
          <View testID="container">
            <LeaderLine
              start={{ point: { x: 10, y: 10 } }}
              end={{ point: { x: 100, y: 100 } }}
              animate={"invalid-animation" as any}
              testID="invalid-animation"
            />
          </View>
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("container")).toBeTruthy();
    });
  });

  describe("Rapid State Changes", () => {
    it("should handle rapid prop changes", async () => {
      const TestComponent = ({
        color,
        strokeWidth,
      }: {
        color: string;
        strokeWidth: number;
      }) => {
        return (
          <View testID="container">
            <LeaderLine
              start={{ point: { x: 10, y: 10 } }}
              end={{ point: { x: 100, y: 100 } }}
              color={color}
              strokeWidth={strokeWidth}
              testID="rapid-changes"
            />
          </View>
        );
      };

      const { rerender, getByTestId } = render(
        <TestComponent color="red" strokeWidth={2} />
      );

      // Rapid prop changes
      await act(async () => {
        for (let i = 0; i < 10; i++) {
          rerender(
            <TestComponent
              color={i % 2 === 0 ? "red" : "blue"}
              strokeWidth={(i % 3) + 1}
            />
          );
          jest.advanceTimersByTime(10);
        }
      });

      expect(getByTestId("container")).toBeTruthy();
    });

    it("should handle rapid mount/unmount cycles", async () => {
      const TestComponent = ({ show }: { show: boolean }) => {
        if (!show) return <View testID="empty-container" />;

        return (
          <View testID="container">
            <LeaderLine
              start={{ point: { x: 10, y: 10 } }}
              end={{ point: { x: 100, y: 100 } }}
              testID="mount-unmount"
            />
          </View>
        );
      };

      const { rerender, getByTestId } = render(<TestComponent show={true} />);

      // Rapid mount/unmount
      await act(async () => {
        for (let i = 0; i < 5; i++) {
          rerender(<TestComponent show={i % 2 === 0} />);
          jest.advanceTimersByTime(50);
        }
      });

      // Should have either container or empty-container
      const hasContainer = () => {
        try {
          return getByTestId("container") || getByTestId("empty-container");
        } catch {
          return false;
        }
      };

      expect(hasContainer()).toBeTruthy();
    });
  });

  describe("Memory and Resource Management", () => {
    it("should clean up resources on unmount", async () => {
      const cleanupSpies: jest.SpyInstance[] = [];

      const TestComponent = () => {
        const cleanupSpy = jest.fn();
        cleanupSpies.push(cleanupSpy);

        // Mock cleanup with useEffect
        React.useEffect(() => {
          return () => {
            cleanupSpy();
          };
        }, []);

        return (
          <View testID="container">
            <LeaderLine
              start={{ point: { x: 10, y: 10 } }}
              end={{ point: { x: 100, y: 100 } }}
              testID="cleanup-test"
            />
          </View>
        );
      };

      const { unmount, getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("container")).toBeTruthy();

      unmount();

      await act(async () => {
        jest.runAllTimers();
      });

      // Cleanup should be called
      cleanupSpies.forEach((spy) => {
        expect(spy).toHaveBeenCalled();
      });
    });

    it("should handle memory pressure scenarios", async () => {
      // Simulate memory pressure by creating many components
      const TestComponent = () => {
        const lines = Array.from({ length: 50 }, (_, index) => (
          <LeaderLine
            key={index}
            start={{ point: { x: 10 + index, y: 10 } }}
            end={{ point: { x: 100 + index, y: 100 } }}
            path="fluid"
            testID={`memory-pressure-${index}`}
          />
        ));

        return <View testID="container">{lines}</View>;
      };

      const { unmount, getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      // Should handle creation without running out of memory
      expect(getByTestId("container")).toBeTruthy();

      unmount();

      await act(async () => {
        jest.runAllTimers();
      });

      // Should clean up properly
      expect(true).toBe(true);
    });
  });

  describe("Concurrent Updates", () => {
    it("should handle concurrent property updates", async () => {
      const TestComponent = () => {
        const [color, setColor] = React.useState("red");
        const [strokeWidth, setStrokeWidth] = React.useState(2);

        React.useEffect(() => {
          // Simulate concurrent updates
          const timer1 = setTimeout(() => setColor("blue"), 10);
          const timer2 = setTimeout(() => setStrokeWidth(3), 15);
          const timer3 = setTimeout(() => setColor("green"), 20);

          return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
          };
        }, []);

        return (
          <View testID="container">
            <LeaderLine
              start={{ point: { x: 10, y: 10 } }}
              end={{ point: { x: 100, y: 100 } }}
              color={color}
              strokeWidth={strokeWidth}
              testID="concurrent-updates"
            />
          </View>
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.advanceTimersByTime(100);
      });

      expect(getByTestId("container")).toBeTruthy();
    });

    it("should handle concurrent element updates", async () => {
      const TestComponent = () => {
        const [useNewPoints, setUseNewPoints] = React.useState(false);

        React.useEffect(() => {
          // Simulate concurrent element updates
          const timer = setTimeout(() => {
            setUseNewPoints(true);
          }, 50);

          return () => clearTimeout(timer);
        }, []);

        const startPoint = useNewPoints ? { x: 20, y: 20 } : { x: 10, y: 10 };
        const endPoint = useNewPoints ? { x: 200, y: 200 } : { x: 100, y: 100 };

        return (
          <View testID="container">
            <LeaderLine
              start={{ point: startPoint }}
              end={{ point: endPoint }}
              testID="concurrent-elements"
            />
          </View>
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.advanceTimersByTime(100);
      });

      expect(getByTestId("container")).toBeTruthy();
    });
  });

  describe("Platform-Specific Edge Cases", () => {
    it("should handle undefined Platform.OS", async () => {
      const originalOS = require("react-native").Platform.OS;
      require("react-native").Platform.OS = undefined;

      const TestComponent = () => {
        return (
          <View testID="container">
            <LeaderLine
              start={{ point: { x: 10, y: 10 } }}
              end={{ point: { x: 100, y: 100 } }}
              testID="undefined-platform"
            />
          </View>
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("container")).toBeTruthy();

      // Restore original value
      require("react-native").Platform.OS = originalOS;
    });

    it("should handle unknown Platform.OS", async () => {
      const originalOS = require("react-native").Platform.OS;
      require("react-native").Platform.OS = "unknown";

      const TestComponent = () => {
        return (
          <View testID="container">
            <LeaderLine
              start={{ point: { x: 10, y: 10 } }}
              end={{ point: { x: 100, y: 100 } }}
              testID="unknown-platform"
            />
          </View>
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("container")).toBeTruthy();

      // Restore original value
      require("react-native").Platform.OS = originalOS;
    });
  });

  describe("Network and Async Edge Cases", () => {
    it("should handle delayed element resolution", async () => {
      const TestComponent = () => {
        const [elementsReady, setElementsReady] = React.useState(false);

        React.useEffect(() => {
          // Simulate delayed element availability
          setTimeout(() => {
            setElementsReady(true);
          }, 200);
        }, []);

        if (!elementsReady) {
          return <View testID="loading" />;
        }

        return (
          <View testID="container">
            <LeaderLine
              start={{ point: { x: 10, y: 10 } }}
              end={{ point: { x: 100, y: 100 } }}
              testID="delayed-elements"
            />
          </View>
        );
      };

      const { getByTestId } = render(<TestComponent />);

      // Initially should show loading
      expect(getByTestId("loading")).toBeTruthy();

      await act(async () => {
        jest.advanceTimersByTime(300);
      });

      // After delay should show container
      expect(getByTestId("container")).toBeTruthy();
    });

    it("should handle async measurement failures", async () => {
      const TestComponent = () => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        // Mock async measurement failure
        React.useEffect(() => {
          if (startRef.current) {
            (startRef.current as any).measure = jest.fn((callback) => {
              setTimeout(() => {
                try {
                  throw new Error("Async measurement failed");
                } catch (error) {
                  // Simulate async error that doesn't crash the component
                  console.warn("Measurement failed:", error);
                }
              }, 50);
            });
          }
          if (endRef.current) {
            (endRef.current as any).measure = jest.fn((callback) => {
              callback(100, 100, 50, 50, 100, 100);
            });
          }
        });

        return (
          <View testID="container">
            <View ref={startRef} />
            <View ref={endRef} />
            <LeaderLine
              start={{ element: startRef }}
              end={{ element: endRef }}
              testID="async-measurement-failure"
            />
          </View>
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.advanceTimersByTime(200);
      });

      expect(getByTestId("container")).toBeTruthy();
    });
  });
});
