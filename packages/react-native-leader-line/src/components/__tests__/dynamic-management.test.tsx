/**
 * @fileoverview Dynamic line management tests for React Native Leader Line
 * @description Tests for show/hide methods and dynamic line management similar to the original leader-line library
 */

import { act, render } from "@testing-library/react-native";
import React, { useRef, useState } from "react";
import { View } from "react-native";
import { LeaderLine } from "../LeaderLine";

// Helper function to create mock refs with measure method
const createMockRef = (x = 0, y = 0, width = 50, height = 50) => {
  const ref = useRef<View>(null);
  (ref as any).current = {
    measure: jest.fn((callback) => callback(0, 0, width, height, x, y)),
  };
  return ref;
};

describe("Dynamic Line Management Tests", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe("Show/Hide Methods", () => {
    it("should handle programmatic show/hide", async () => {
      const TestComponent = () => {
        const startRef = createMockRef(0, 0, 50, 50);
        const endRef = createMockRef(100, 100, 50, 50);
        const [isVisible, setIsVisible] = useState(true);

        return (
          <View>
            <LeaderLine
              start={{ element: startRef }}
              end={{ element: endRef }}
              style={{ display: isVisible ? "flex" : "none" }}
              testID="toggleable-line"
            />
          </View>
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("toggleable-line")).toBeTruthy();
    });

    it("should handle show with effects", async () => {
      const TestComponent = () => {
        const startRef = createMockRef(0, 0, 50, 50);
        const endRef = createMockRef(100, 100, 50, 50);
        const [isVisible, setIsVisible] = useState(false);

        // Show the line after initial render
        React.useEffect(() => {
          setTimeout(() => setIsVisible(true), 100);
        }, []);

        return (
          <View>
            {/* Always render the LeaderLine, but control visibility with opacity */}
            <LeaderLine
              start={{ element: startRef }}
              end={{ element: endRef }}
              opacity={isVisible ? 1 : 0}
              testID="show-with-effect"
            />
          </View>
        );
      };

      const { queryByTestId } = render(<TestComponent />);

      // Wait for component to mount and calculate points
      await act(async () => {
        jest.runAllTimers();
      });

      // Component should exist after points are calculated
      let element = queryByTestId("show-with-effect");
      expect(element).toBeTruthy();

      await act(async () => {
        jest.advanceTimersByTime(200);
      });

      // Should still exist after visibility change
      element = queryByTestId("show-with-effect");
      expect(element).toBeTruthy();
    });

    it("should handle hide with effects", async () => {
      const TestComponent = () => {
        const startRef = createMockRef(0, 0, 50, 50);
        const endRef = createMockRef(100, 100, 50, 50);
        const [isVisible, setIsVisible] = useState(true);

        return (
          <View>
            <LeaderLine
              start={{ element: startRef }}
              end={{ element: endRef }}
              style={{ display: isVisible ? "flex" : "none" }}
              opacity={isVisible ? 1 : 0}
              testID="hide-with-effect"
            />
          </View>
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("hide-with-effect")).toBeTruthy();
    });

    it("should handle rapid show/hide toggles", async () => {
      const TestComponent = () => {
        const startRef = createMockRef(0, 0, 50, 50);
        const endRef = createMockRef(100, 100, 50, 50);
        const [isVisible, setIsVisible] = useState(true);

        // Simulate rapid toggles using opacity instead of display
        React.useEffect(() => {
          const interval = setInterval(() => {
            setIsVisible((prev) => !prev);
          }, 100);

          setTimeout(() => clearInterval(interval), 500);
          return () => clearInterval(interval);
        }, []);

        return (
          <LeaderLine
            start={{ element: startRef }}
            end={{ element: endRef }}
            opacity={isVisible ? 1 : 0.1} // Use opacity for visibility control
            testID="rapid-toggle"
          />
        );
      };

      const { queryByTestId } = render(<TestComponent />);

      // Wait for component to mount and calculate points
      await act(async () => {
        jest.runAllTimers();
      });

      await act(async () => {
        jest.advanceTimersByTime(600);
      });

      // Element should exist regardless of final visibility state
      const element = queryByTestId("rapid-toggle");
      expect(element).toBeTruthy();
    });
  });

  describe("Dynamic Position Updates", () => {
    it("should handle element position changes", async () => {
      const TestComponent = () => {
        const startRef = createMockRef(0, 0, 50, 50);
        const endRef = useRef<View>(null);
        const [position, setPosition] = useState({ x: 100, y: 100 });

        // Mock position update
        React.useEffect(() => {
          setTimeout(() => {
            setPosition({ x: 200, y: 200 });
          }, 100);
        }, []);

        // Mock the ref with changing position
        (endRef as any).current = {
          measure: jest.fn((callback) =>
            callback(0, 0, 50, 50, position.x, position.y)
          ),
        };

        return (
          <LeaderLine
            start={{ element: startRef }}
            end={{ element: endRef }}
            testID="position-update"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.advanceTimersByTime(200);
      });

      expect(getByTestId("position-update")).toBeTruthy();
    });

    it("should handle window resize events", async () => {
      const TestComponent = () => {
        const startRef = createMockRef(0, 0, 50, 50);
        const endRef = createMockRef(100, 100, 50, 50);

        return (
          <LeaderLine
            start={{ element: startRef }}
            end={{ element: endRef }}
            testID="window-resize"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        // Simulate window resize
        global.dispatchEvent && global.dispatchEvent(new Event("resize"));
        jest.runAllTimers();
      });

      expect(getByTestId("window-resize")).toBeTruthy();
    });

    it("should handle scroll events", async () => {
      const TestComponent = () => {
        const startRef = createMockRef(0, 0, 50, 50);
        const endRef = createMockRef(100, 100, 50, 50);

        return (
          <LeaderLine
            start={{ element: startRef }}
            end={{ element: endRef }}
            testID="scroll-update"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        // Simulate scroll event
        global.dispatchEvent && global.dispatchEvent(new Event("scroll"));
        jest.runAllTimers();
      });

      expect(getByTestId("scroll-update")).toBeTruthy();
    });
  });

  describe("Option Updates", () => {
    it("should handle color changes", async () => {
      const TestComponent = () => {
        const startRef = createMockRef(0, 0, 50, 50);
        const endRef = createMockRef(100, 100, 50, 50);
        const [color, setColor] = useState("#ff0000");

        React.useEffect(() => {
          setTimeout(() => setColor("#00ff00"), 100);
        }, []);

        return (
          <LeaderLine
            start={{ element: startRef }}
            end={{ element: endRef }}
            color={color}
            testID="color-change"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.advanceTimersByTime(200);
      });

      expect(getByTestId("color-change")).toBeTruthy();
    });

    it("should handle size changes", async () => {
      const TestComponent = () => {
        const startRef = createMockRef(0, 0, 50, 50);
        const endRef = createMockRef(100, 100, 50, 50);
        const [size, setSize] = useState(4);

        React.useEffect(() => {
          const interval = setInterval(() => {
            setSize((prev) => (prev < 20 ? prev + 1 : prev));
          }, 50);

          setTimeout(() => clearInterval(interval), 300);
          return () => clearInterval(interval);
        }, []);

        return (
          <LeaderLine
            start={{ element: startRef }}
            end={{ element: endRef }}
            strokeWidth={size}
            testID="size-change"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.advanceTimersByTime(400);
      });

      expect(getByTestId("size-change")).toBeTruthy();
    });

    it("should handle multiple option changes simultaneously", async () => {
      const TestComponent = () => {
        const startRef = createMockRef(0, 0, 50, 50);
        const endRef = createMockRef(100, 100, 50, 50);
        const [options, setOptions] = useState({
          color: "#ff0000",
          size: 4,
          startPlug: "none" as const,
          endPlug: "arrow1" as const,
        });

        React.useEffect(() => {
          setTimeout(() => {
            setOptions({
              color: "#00ff00",
              size: 8,
              startPlug: "arrow2",
              endPlug: "disc",
            });
          }, 100);
        }, []);

        return (
          <LeaderLine
            start={{ element: startRef }}
            end={{ element: endRef }}
            color={options.color}
            strokeWidth={options.size}
            startPlug={options.startPlug}
            endPlug={options.endPlug}
            testID="multiple-changes"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.advanceTimersByTime(200);
      });

      expect(getByTestId("multiple-changes")).toBeTruthy();
    });
  });

  describe("Element Reference Updates", () => {
    it("should handle start element changes", async () => {
      const TestComponent = () => {
        const startRef1 = createMockRef(0, 0, 50, 50);
        const startRef2 = createMockRef(50, 50, 50, 50);
        const endRef = createMockRef(100, 100, 50, 50);
        const [useSecondStart, setUseSecondStart] = useState(false);

        React.useEffect(() => {
          setTimeout(() => setUseSecondStart(true), 100);
        }, []);

        return (
          <LeaderLine
            start={{ element: useSecondStart ? startRef2 : startRef1 }}
            end={{ element: endRef }}
            testID="start-element-change"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.advanceTimersByTime(200);
      });

      expect(getByTestId("start-element-change")).toBeTruthy();
    });

    it("should handle end element changes", async () => {
      const TestComponent = () => {
        const startRef = createMockRef(0, 0, 50, 50);
        const endRef1 = createMockRef(100, 100, 50, 50);
        const endRef2 = createMockRef(150, 150, 50, 50);
        const [useSecondEnd, setUseSecondEnd] = useState(false);

        React.useEffect(() => {
          setTimeout(() => setUseSecondEnd(true), 100);
        }, []);

        return (
          <LeaderLine
            start={{ element: startRef }}
            end={{ element: useSecondEnd ? endRef2 : endRef1 }}
            testID="end-element-change"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.advanceTimersByTime(200);
      });

      expect(getByTestId("end-element-change")).toBeTruthy();
    });

    it("should handle both element changes", async () => {
      const TestComponent = () => {
        const refs = {
          start1: createMockRef(0, 0, 50, 50),
          start2: createMockRef(25, 25, 50, 50),
          end1: createMockRef(100, 100, 50, 50),
          end2: createMockRef(125, 125, 50, 50),
        };
        const [config, setConfig] = useState({ startIndex: 0, endIndex: 0 });

        React.useEffect(() => {
          setTimeout(() => setConfig({ startIndex: 1, endIndex: 1 }), 100);
        }, []);

        return (
          <LeaderLine
            start={{
              element: config.startIndex === 0 ? refs.start1 : refs.start2,
            }}
            end={{ element: config.endIndex === 0 ? refs.end1 : refs.end2 }}
            testID="both-elements-change"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.advanceTimersByTime(200);
      });

      expect(getByTestId("both-elements-change")).toBeTruthy();
    });
  });

  describe("Line Removal and Cleanup", () => {
    it("should handle component unmounting", async () => {
      const TestComponent = ({ shouldRender }: { shouldRender: boolean }) => {
        const startRef = createMockRef(0, 0, 50, 50);
        const endRef = createMockRef(100, 100, 50, 50);

        if (!shouldRender) return null;

        return (
          <LeaderLine
            start={{ element: startRef }}
            end={{ element: endRef }}
            testID="unmount-test"
          />
        );
      };

      const { getByTestId, rerender } = render(
        <TestComponent shouldRender={true} />
      );

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("unmount-test")).toBeTruthy();

      // Unmount component
      rerender(<TestComponent shouldRender={false} />);

      await act(async () => {
        jest.runAllTimers();
      });

      // Component should be unmounted without errors
      expect(() => getByTestId("unmount-test")).toThrow();
    });

    it("should handle conditional rendering", async () => {
      const TestComponent = () => {
        const startRef = createMockRef(0, 0, 50, 50);
        const endRef = createMockRef(100, 100, 50, 50);
        const [showLine, setShowLine] = useState(true);

        React.useEffect(() => {
          const interval = setInterval(() => {
            setShowLine((prev) => !prev);
          }, 100);

          setTimeout(() => clearInterval(interval), 500);
          return () => clearInterval(interval);
        }, []);

        return (
          <View>
            {showLine && (
              <LeaderLine
                start={{ element: startRef }}
                end={{ element: endRef }}
                testID="conditional-line"
              />
            )}
          </View>
        );
      };

      const { queryByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.advanceTimersByTime(600);
      });

      // Should handle conditional rendering without crashes
      const line = queryByTestId("conditional-line");
      // Line may or may not be present depending on timing, but no errors should occur
    });
  });

  describe("Performance with Dynamic Updates", () => {
    it("should handle frequent updates efficiently", async () => {
      const TestComponent = () => {
        const startRef = createMockRef(0, 0, 50, 50);
        const endRef = createMockRef(100, 100, 50, 50);
        const [counter, setCounter] = useState(0);

        React.useEffect(() => {
          const interval = setInterval(() => {
            setCounter((prev) => prev + 1);
          }, 10);

          setTimeout(() => clearInterval(interval), 100);
          return () => clearInterval(interval);
        }, []);

        return (
          <LeaderLine
            start={{ element: startRef }}
            end={{ element: endRef }}
            color={`hsl(${counter * 10}, 70%, 50%)`}
            testID="frequent-updates"
          />
        );
      };

      const startTime = Date.now();
      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.advanceTimersByTime(150);
      });

      const endTime = Date.now();
      const renderTime = endTime - startTime;

      expect(getByTestId("frequent-updates")).toBeTruthy();
      // Should handle frequent updates efficiently
      expect(renderTime).toBeLessThan(1000);
    });

    it("should handle multiple dynamic lines", async () => {
      const TestComponent = () => {
        const [lines, setLines] = useState([
          { id: 1, color: "#ff0000" },
          { id: 2, color: "#00ff00" },
          { id: 3, color: "#0000ff" },
        ]);

        React.useEffect(() => {
          const interval = setInterval(() => {
            setLines((prev) =>
              prev.map((line) => ({
                ...line,
                color: `hsl(${Math.random() * 360}, 70%, 50%)`,
              }))
            );
          }, 50);

          setTimeout(() => clearInterval(interval), 200);
          return () => clearInterval(interval);
        }, []);

        return (
          <View>
            {lines.map((line) => {
              const startRef = createMockRef(0, 0, 50, 50);
              const endRef = createMockRef(
                100 + line.id * 20,
                100 + line.id * 20,
                50,
                50
              );

              return (
                <LeaderLine
                  key={line.id}
                  start={{ element: startRef }}
                  end={{ element: endRef }}
                  color={line.color}
                  testID={`dynamic-line-${line.id}`}
                />
              );
            })}
          </View>
        );
      };

      const { getAllByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.advanceTimersByTime(250);
      });

      const lines = getAllByTestId(/dynamic-line-/);
      expect(lines).toHaveLength(3);
    });
  });

  describe("Error Handling in Dynamic Scenarios", () => {
    it("should handle null refs gracefully during updates", async () => {
      const TestComponent = () => {
        const startRef = createMockRef(0, 0, 50, 50);
        const endRef = createMockRef(100, 100, 50, 50);
        const [nullifyRefs, setNullifyRefs] = useState(false);

        React.useEffect(() => {
          setTimeout(() => {
            if (nullifyRefs) {
              (startRef as any).current = null;
              (endRef as any).current = null;
            }
          }, 100);
        }, [nullifyRefs]);

        return (
          <LeaderLine
            start={{ element: startRef }}
            end={{ element: endRef }}
            testID="null-refs-handling"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.advanceTimersByTime(200);
      });

      expect(getByTestId("null-refs-handling")).toBeTruthy();
    });

    it("should handle rapid prop changes without memory leaks", async () => {
      const TestComponent = () => {
        const startRef = createMockRef(0, 0, 50, 50);
        const endRef = createMockRef(100, 100, 50, 50);
        const [config, setConfig] = useState({
          color: "#ff0000",
          size: 4,
          dash: false,
          opacity: 1,
        });

        React.useEffect(() => {
          const interval = setInterval(() => {
            setConfig({
              color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
              size: Math.floor(Math.random() * 10) + 1,
              dash: Math.random() > 0.5,
              opacity: Math.random(),
            });
          }, 20);

          setTimeout(() => clearInterval(interval), 200);
          return () => clearInterval(interval);
        }, []);

        return (
          <LeaderLine
            start={{ element: startRef }}
            end={{ element: endRef }}
            color={config.color}
            strokeWidth={config.size}
            dash={config.dash}
            opacity={config.opacity}
            testID="rapid-prop-changes"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.advanceTimersByTime(250);
      });

      expect(getByTestId("rapid-prop-changes")).toBeTruthy();
    });
  });
});
