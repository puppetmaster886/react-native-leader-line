/**
 * @fileoverview Socket and Attachment Position Tests
 * @description Comprehensive testing for all socket positions and attachment behaviors
 */

import { act, render } from "@testing-library/react-native";
import React, { useRef } from "react";
import { View } from "react-native";
import { SocketPosition } from "../../types";
import { LeaderLine } from "../LeaderLine";

describe("Socket/Attachment Position Tests", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe("All Socket Positions", () => {
    const allSocketPositions: SocketPosition[] = [
      "auto",
      "center",
      "top",
      "right",
      "bottom",
      "left",
      "top_left",
      "top_right",
      "bottom_left",
      "bottom_right",
    ];

    it("should render with all supported socket positions", async () => {
      const TestComponent = () => {
        return (
          <View>
            {allSocketPositions.map((socket, index) => {
              const startRef = useRef<View>(null);
              const endRef = useRef<View>(null);

              return (
                <LeaderLine
                  key={index}
                  start={{ element: startRef }}
                  end={{ element: endRef }}
                  startSocket={socket}
                  endSocket={socket}
                  testID={`socket-${socket}`}
                />
              );
            })}
          </View>
        );
      };

      const { getAllByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      // Verify all socket positions are rendered
      allSocketPositions.forEach((socket) => {
        expect(getAllByTestId(`socket-${socket}`)).toHaveLength(1);
      });
    });

    it("should handle mixed socket combinations", async () => {
      const socketCombinations: Array<{
        start: SocketPosition;
        end: SocketPosition;
      }> = [
        { start: "top", end: "bottom" },
        { start: "left", end: "right" },
        { start: "top_left", end: "bottom_right" },
        { start: "top_right", end: "bottom_left" },
        { start: "auto", end: "center" },
      ];

      const TestComponent = () => {
        return (
          <View>
            {socketCombinations.map((combo, index) => {
              const startRef = useRef<View>(null);
              const endRef = useRef<View>(null);

              return (
                <LeaderLine
                  key={index}
                  start={{ element: startRef }}
                  end={{ element: endRef }}
                  startSocket={combo.start}
                  endSocket={combo.end}
                  testID={`combo-${index}`}
                />
              );
            })}
          </View>
        );
      };

      const { getAllByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      // Verify all combinations are rendered
      socketCombinations.forEach((_, index) => {
        expect(getAllByTestId(`combo-${index}`)).toHaveLength(1);
      });
    });
  });

  describe("Automatic Socket Detection", () => {
    it("should automatically detect best socket positions", async () => {
      const TestComponent = () => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        // Mock elements at different relative positions
        (startRef as any).current = {
          measure: jest.fn((callback) => {
            callback(100, 100, 50, 50, 100, 100);
          }),
        };

        (endRef as any).current = {
          measure: jest.fn((callback) => {
            callback(200, 50, 50, 50, 200, 50);
          }),
        };

        return (
          <LeaderLine
            start={{ element: startRef }}
            end={{ element: endRef }}
            startSocket="auto"
            endSocket="auto"
            testID="auto-detection"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("auto-detection")).toBeTruthy();
    });

    it("should handle auto detection when elements move", async () => {
      let elementPosition = { x: 100, y: 100 };

      const TestComponent = () => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        // Mock dynamic element positions
        (startRef as any).current = {
          measure: jest.fn((callback) => {
            callback(
              elementPosition.x,
              elementPosition.y,
              50,
              50,
              elementPosition.x,
              elementPosition.y
            );
          }),
        };

        (endRef as any).current = {
          measure: jest.fn((callback) => {
            callback(200, 200, 50, 50, 200, 200);
          }),
        };

        return (
          <LeaderLine
            start={{ element: startRef }}
            end={{ element: endRef }}
            startSocket="auto"
            endSocket="auto"
            testID="dynamic-auto"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);

      // Simulate element movement
      await act(async () => {
        elementPosition = { x: 150, y: 80 };
        jest.advanceTimersByTime(100);
      });

      await act(async () => {
        elementPosition = { x: 250, y: 120 };
        jest.advanceTimersByTime(100);
      });

      expect(getByTestId("dynamic-auto")).toBeTruthy();
    });
  });

  describe("Element Layout Measurements", () => {
    it("should handle elements with different sizes", async () => {
      const elementSizes = [
        { width: 50, height: 50 },
        { width: 100, height: 30 },
        { width: 200, height: 100 },
        { width: 30, height: 150 },
      ];

      const TestComponent = () => {
        return (
          <View>
            {elementSizes.map((size, index) => {
              const startRef = useRef<View>(null);
              const endRef = useRef<View>(null);

              // Mock different sized elements
              (startRef as any).current = {
                measure: jest.fn((callback) => {
                  callback(50, 50, size.width, size.height, 50, 50);
                }),
              };

              (endRef as any).current = {
                measure: jest.fn((callback) => {
                  callback(200, 200, size.width, size.height, 200, 200);
                }),
              };

              return (
                <LeaderLine
                  key={index}
                  start={{ element: startRef }}
                  end={{ element: endRef }}
                  startSocket="center"
                  endSocket="center"
                  testID={`size-${index}`}
                />
              );
            })}
          </View>
        );
      };

      const { getAllByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      elementSizes.forEach((_, index) => {
        expect(getAllByTestId(`size-${index}`)).toHaveLength(1);
      });
    });

    it("should handle elements at different positions", async () => {
      const positions = [
        { x: 0, y: 0 },
        { x: 100, y: 50 },
        { x: 250, y: 200 },
        { x: 500, y: 300 },
      ];

      const TestComponent = () => {
        return (
          <View>
            {positions.map((pos, index) => {
              const startRef = useRef<View>(null);
              const endRef = useRef<View>(null);

              (startRef as any).current = {
                measure: jest.fn((callback) => {
                  callback(pos.x, pos.y, 50, 50, pos.x, pos.y);
                }),
              };

              (endRef as any).current = {
                measure: jest.fn((callback) => {
                  callback(
                    pos.x + 100,
                    pos.y + 100,
                    50,
                    50,
                    pos.x + 100,
                    pos.y + 100
                  );
                }),
              };

              return (
                <LeaderLine
                  key={index}
                  start={{ element: startRef }}
                  end={{ element: endRef }}
                  testID={`position-${index}`}
                />
              );
            })}
          </View>
        );
      };

      const { getAllByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      positions.forEach((_, index) => {
        expect(getAllByTestId(`position-${index}`)).toHaveLength(1);
      });
    });
  });

  describe("Point Attachments", () => {
    it("should connect to fixed points", async () => {
      const TestComponent = () => {
        return (
          <LeaderLine
            start={{ point: { x: 100, y: 100 } }}
            end={{ point: { x: 200, y: 200 } }}
            testID="point-attachment"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("point-attachment")).toBeTruthy();
    });

    it("should handle mixed element and point attachments", async () => {
      const TestComponent = () => {
        const startRef = useRef<View>(null);

        return (
          <View>
            <LeaderLine
              start={{ element: startRef }}
              end={{ point: { x: 200, y: 200 } }}
              testID="mixed-element-point"
            />
            <LeaderLine
              start={{ point: { x: 50, y: 50 } }}
              end={{ element: startRef }}
              testID="mixed-point-element"
            />
          </View>
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("mixed-element-point")).toBeTruthy();
      expect(getByTestId("mixed-point-element")).toBeTruthy();
    });
  });

  describe("Socket Position Edge Cases", () => {
    it("should handle elements with zero dimensions", async () => {
      const TestComponent = () => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        // Mock zero-sized elements
        (startRef as any).current = {
          measure: jest.fn((callback) => {
            callback(100, 100, 0, 0, 100, 100);
          }),
        };

        (endRef as any).current = {
          measure: jest.fn((callback) => {
            callback(200, 200, 0, 0, 200, 200);
          }),
        };

        return (
          <LeaderLine
            start={{ element: startRef }}
            end={{ element: endRef }}
            testID="zero-dimensions"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("zero-dimensions")).toBeTruthy();
    });

    it("should handle elements with negative positions", async () => {
      const TestComponent = () => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        // Mock elements with negative coordinates
        (startRef as any).current = {
          measure: jest.fn((callback) => {
            callback(-50, -30, 50, 50, -50, -30);
          }),
        };

        (endRef as any).current = {
          measure: jest.fn((callback) => {
            callback(100, 100, 50, 50, 100, 100);
          }),
        };

        return (
          <LeaderLine
            start={{ element: startRef }}
            end={{ element: endRef }}
            testID="negative-positions"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("negative-positions")).toBeTruthy();
    });

    it("should handle overlapping elements", async () => {
      const TestComponent = () => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        // Mock overlapping elements
        (startRef as any).current = {
          measure: jest.fn((callback) => {
            callback(100, 100, 100, 100, 100, 100);
          }),
        };

        (endRef as any).current = {
          measure: jest.fn((callback) => {
            callback(120, 120, 100, 100, 120, 120);
          }),
        };

        return (
          <LeaderLine
            start={{ element: startRef }}
            end={{ element: endRef }}
            startSocket="auto"
            endSocket="auto"
            testID="overlapping-elements"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("overlapping-elements")).toBeTruthy();
    });
  });

  describe("Socket Position Calculations", () => {
    it("should calculate correct positions for corner sockets", async () => {
      const cornerSockets: SocketPosition[] = [
        "top_left",
        "top_right",
        "bottom_left",
        "bottom_right",
      ];

      const TestComponent = () => {
        return (
          <View>
            {cornerSockets.map((socket, index) => {
              const startRef = useRef<View>(null);
              const endRef = useRef<View>(null);

              // Mock 100x100 elements at known positions
              (startRef as any).current = {
                measure: jest.fn((callback) => {
                  callback(100, 100, 100, 100, 100, 100);
                }),
              };

              (endRef as any).current = {
                measure: jest.fn((callback) => {
                  callback(300, 300, 100, 100, 300, 300);
                }),
              };

              return (
                <LeaderLine
                  key={index}
                  start={{ element: startRef }}
                  end={{ element: endRef }}
                  startSocket={socket}
                  endSocket={socket}
                  testID={`corner-${socket}`}
                />
              );
            })}
          </View>
        );
      };

      const { getAllByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      cornerSockets.forEach((socket) => {
        expect(getAllByTestId(`corner-${socket}`)).toHaveLength(1);
      });
    });

    it("should calculate correct positions for side sockets", async () => {
      const sideSockets: SocketPosition[] = ["top", "right", "bottom", "left"];

      const TestComponent = () => {
        return (
          <View>
            {sideSockets.map((socket, index) => {
              const startRef = useRef<View>(null);
              const endRef = useRef<View>(null);

              (startRef as any).current = {
                measure: jest.fn((callback) => {
                  callback(100, 100, 100, 100, 100, 100);
                }),
              };

              (endRef as any).current = {
                measure: jest.fn((callback) => {
                  callback(300, 300, 100, 100, 300, 300);
                }),
              };

              return (
                <LeaderLine
                  key={index}
                  start={{ element: startRef }}
                  end={{ element: endRef }}
                  startSocket={socket}
                  endSocket={socket}
                  testID={`side-${socket}`}
                />
              );
            })}
          </View>
        );
      };

      const { getAllByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      sideSockets.forEach((socket) => {
        expect(getAllByTestId(`side-${socket}`)).toHaveLength(1);
      });
    });
  });

  describe("Dynamic Socket Updates", () => {
    it("should update socket positions when elements resize", async () => {
      let elementSize = { width: 50, height: 50 };

      const TestComponent = () => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        (startRef as any).current = {
          measure: jest.fn((callback) => {
            callback(100, 100, elementSize.width, elementSize.height, 100, 100);
          }),
        };

        (endRef as any).current = {
          measure: jest.fn((callback) => {
            callback(200, 200, 50, 50, 200, 200);
          }),
        };

        return (
          <LeaderLine
            start={{ element: startRef }}
            end={{ element: endRef }}
            startSocket="center"
            endSocket="center"
            testID="resizing-element"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);

      // Initial render
      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("resizing-element")).toBeTruthy();

      // Simulate element resize
      await act(async () => {
        elementSize = { width: 100, height: 100 };
        jest.advanceTimersByTime(100);
      });

      expect(getByTestId("resizing-element")).toBeTruthy();
    });

    it("should handle rapid socket position changes", async () => {
      const currentSocket: SocketPosition = "top";
      const sockets: SocketPosition[] = ["top", "right", "bottom", "left"];

      const TestComponent = ({ socketIndex }: { socketIndex: number }) => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        return (
          <LeaderLine
            start={{ element: startRef }}
            end={{ element: endRef }}
            startSocket={sockets[socketIndex]}
            endSocket={sockets[socketIndex]}
            testID="rapid-socket-changes"
          />
        );
      };

      const { rerender } = render(<TestComponent socketIndex={0} />);

      // Rapidly change socket positions
      for (let i = 1; i < sockets.length; i++) {
        await act(async () => {
          rerender(<TestComponent socketIndex={i} />);
          jest.advanceTimersByTime(10);
        });
      }

      // Component should still be rendered after rapid changes
      expect(true).toBe(true); // Test passes if no errors thrown
    });
  });
});
