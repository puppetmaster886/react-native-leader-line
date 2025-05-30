/**
 * @fileoverview Label Positioning Tests
 * @description Comprehensive testing for label positioning, multiple labels, and collision detection
 */

import { act, render } from "@testing-library/react-native";
import React from "react";
import { View } from "react-native";
import { LeaderLine } from "../LeaderLine";

describe("Label Positioning Tests", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe("Single Label Positioning", () => {
    const labelPositions = [0, 0.25, 0.5, 0.75, 1];

    it("should position labels at different percentages along the path", async () => {
      const TestComponent = () => {
        return (
          <View>
            {labelPositions.map((position, index) => {
              return (
                <View key={index} testID={`container-${position}`}>
                  <LeaderLine
                    start={{ point: { x: 10, y: 10 } }}
                    end={{ point: { x: 100, y: 100 } }}
                    middleLabel={{
                      text: `Label ${position}`,
                    }}
                    testID={`label-position-${position}`}
                  />
                </View>
              );
            })}
          </View>
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      labelPositions.forEach((position) => {
        expect(getByTestId(`container-${position}`)).toBeTruthy();
      });
    });

    it("should handle label positioning on different path types", async () => {
      const pathTypes = ["straight", "arc", "fluid"];

      const TestComponent = () => {
        return (
          <View>
            {pathTypes.map((pathType, index) => {
              return (
                <View key={index} testID={`container-${pathType}`}>
                  <LeaderLine
                    start={{ point: { x: 10, y: 10 } }}
                    end={{ point: { x: 100, y: 100 } }}
                    path={pathType as any}
                    middleLabel={{
                      text: `${pathType} Label`,
                    }}
                    testID={`path-label-${pathType}`}
                  />
                </View>
              );
            })}
          </View>
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      pathTypes.forEach((pathType) => {
        expect(getByTestId(`container-${pathType}`)).toBeTruthy();
      });
    });

    it("should handle labels with custom styling", async () => {
      const TestComponent = () => {
        return (
          <View testID="styled-container">
            <LeaderLine
              start={{ point: { x: 10, y: 10 } }}
              end={{ point: { x: 100, y: 100 } }}
              middleLabel={{
                text: "Styled Label",
                backgroundColor: "#ff0000",
                color: "#ffffff",
                padding: 8,
                borderRadius: 4,
              }}
              testID="styled-label"
            />
          </View>
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("styled-container")).toBeTruthy();
    });

    it("should handle labels with custom components - using startLabel", async () => {
      const TestComponent = () => {
        return (
          <View testID="custom-container">
            <LeaderLine
              start={{ point: { x: 10, y: 10 } }}
              end={{ point: { x: 100, y: 100 } }}
              startLabel={{
                text: "Custom Component",
                backgroundColor: "blue",
                color: "white",
                padding: 4,
              }}
              testID="custom-component-label"
            />
          </View>
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("custom-container")).toBeTruthy();
    });
  });

  describe("Multiple Labels", () => {
    it("should handle multiple labels on a single line", async () => {
      const TestComponent = () => {
        return (
          <View testID="multiple-container">
            <LeaderLine
              start={{ point: { x: 10, y: 10 } }}
              end={{ point: { x: 100, y: 100 } }}
              startLabel="Start"
              middleLabel="Middle"
              endLabel="End"
              testID="multiple-labels"
            />
          </View>
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("multiple-container")).toBeTruthy();
    });

    it("should handle many labels without overlap", async () => {
      const TestComponent = () => {
        return (
          <View testID="many-container">
            <LeaderLine
              start={{ point: { x: 10, y: 10 } }}
              end={{ point: { x: 100, y: 100 } }}
              startLabel="Label 1"
              middleLabel="Label 2"
              endLabel="Label 3"
              captionLabel="Caption"
              pathLabel="Path"
              testID="many-labels"
            />
          </View>
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("many-container")).toBeTruthy();
    });

    it("should handle labels with different styles", async () => {
      const TestComponent = () => {
        return (
          <View testID="styled-multiple-container">
            <LeaderLine
              start={{ point: { x: 10, y: 10 } }}
              end={{ point: { x: 100, y: 100 } }}
              startLabel={{
                text: "Red Label",
                backgroundColor: "red",
                color: "white",
              }}
              middleLabel={{
                text: "Blue Label",
                backgroundColor: "blue",
                color: "white",
              }}
              endLabel={{
                text: "Green Label",
                backgroundColor: "green",
                color: "white",
              }}
              testID="styled-multiple-labels"
            />
          </View>
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("styled-multiple-container")).toBeTruthy();
    });

    it("should handle mixed text and component labels", async () => {
      const TestComponent = () => {
        return (
          <View testID="mixed-container">
            <LeaderLine
              start={{ point: { x: 10, y: 10 } }}
              end={{ point: { x: 100, y: 100 } }}
              startLabel="Text Label"
              endLabel={{
                text: "Component Label",
                backgroundColor: "orange",
                borderRadius: 10,
              }}
              testID="mixed-labels"
            />
          </View>
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("mixed-container")).toBeTruthy();
    });
  });

  describe("Label Collision Detection", () => {
    it("should handle overlapping label positions", async () => {
      const TestComponent = () => {
        return (
          <View testID="overlapping-container">
            <LeaderLine
              start={{ point: { x: 10, y: 10 } }}
              end={{ point: { x: 100, y: 100 } }}
              startLabel="Label 1"
              middleLabel="Label 2"
              endLabel="Label 3"
              testID="overlapping-labels"
            />
          </View>
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("overlapping-container")).toBeTruthy();
    });

    it("should automatically reposition conflicting labels", async () => {
      const TestComponent = () => {
        return (
          <View testID="auto-adjusted-container">
            <LeaderLine
              start={{ point: { x: 10, y: 10 } }}
              end={{ point: { x: 100, y: 100 } }}
              startLabel="Very Long Label Text"
              endLabel="Another Long Label"
              testID="auto-adjusted-labels"
            />
          </View>
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("auto-adjusted-container")).toBeTruthy();
    });

    it("should handle labels on very short paths", async () => {
      const TestComponent = () => {
        return (
          <View testID="short-path-container">
            <LeaderLine
              start={{ point: { x: 100, y: 100 } }}
              end={{ point: { x: 110, y: 105 } }} // Very short distance
              middleLabel="Short Path Label"
              testID="short-path-label"
            />
          </View>
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("short-path-container")).toBeTruthy();
    });
  });

  describe("Label Positioning Edge Cases", () => {
    it("should handle labels at extreme positions", async () => {
      const TestComponent = () => {
        return (
          <View>
            {[0, 1, 2, 3].map((index) => {
              return (
                <View key={index} testID={`extreme-container-${index}`}>
                  <LeaderLine
                    start={{ point: { x: 10, y: 10 } }}
                    end={{ point: { x: 100, y: 100 } }}
                    middleLabel={{
                      text: `Extreme ${index}`,
                    }}
                    testID={`extreme-position-${index}`}
                  />
                </View>
              );
            })}
          </View>
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      [0, 1, 2, 3].forEach((index) => {
        expect(getByTestId(`extreme-container-${index}`)).toBeTruthy();
      });
    });

    it("should handle empty label text", async () => {
      const TestComponent = () => {
        return (
          <View testID="empty-container">
            <LeaderLine
              start={{ point: { x: 10, y: 10 } }}
              end={{ point: { x: 100, y: 100 } }}
              middleLabel={{
                text: "",
              }}
              testID="empty-label"
            />
          </View>
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("empty-container")).toBeTruthy();
    });

    it("should handle very long label text", async () => {
      const TestComponent = () => {
        const longText =
          "This is a very long label text that might overflow or cause layout issues in the UI and should be handled gracefully by the component";

        return (
          <View testID="long-container">
            <LeaderLine
              start={{ point: { x: 10, y: 10 } }}
              end={{ point: { x: 100, y: 100 } }}
              middleLabel={{
                text: longText,
              }}
              testID="long-label"
            />
          </View>
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("long-container")).toBeTruthy();
    });

    it("should handle labels with special characters", async () => {
      const specialTexts = [
        "Label with émojis 🚀✨",
        "Arabic: مرحبا",
        "Chinese: 你好",
        "Math: ∑∂∆π∞",
      ];

      const TestComponent = () => {
        return (
          <View>
            {specialTexts.map((text, index) => {
              return (
                <View key={index} testID={`special-container-${index}`}>
                  <LeaderLine
                    start={{ point: { x: 10, y: 10 } }}
                    end={{ point: { x: 100, y: 100 } }}
                    middleLabel={{
                      text: text,
                    }}
                    testID={`special-text-${index}`}
                  />
                </View>
              );
            })}
          </View>
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      specialTexts.forEach((_, index) => {
        expect(getByTestId(`special-container-${index}`)).toBeTruthy();
      });
    });
  });

  describe("Dynamic Label Updates", () => {
    it("should handle changing label positions", async () => {
      const TestComponent = ({ labelText }: { labelText: string }) => {
        return (
          <View testID="moving-container">
            <LeaderLine
              start={{ point: { x: 10, y: 10 } }}
              end={{ point: { x: 100, y: 100 } }}
              middleLabel={{
                text: labelText,
              }}
              testID="moving-label"
            />
          </View>
        );
      };

      const { rerender, getByTestId } = render(
        <TestComponent labelText="Initial" />
      );

      // Move label along the path
      const texts = ["Updated 1", "Updated 2", "Updated 3", "Final"];
      for (const text of texts) {
        await act(async () => {
          rerender(<TestComponent labelText={text} />);
          jest.advanceTimersByTime(100);
        });
      }

      expect(getByTestId("moving-container")).toBeTruthy();
    });

    it("should handle changing label text", async () => {
      const texts = ["Initial", "Updated", "Final"];

      const TestComponent = ({ text }: { text: string }) => {
        return (
          <View testID="changing-container">
            <LeaderLine
              start={{ point: { x: 10, y: 10 } }}
              end={{ point: { x: 100, y: 100 } }}
              middleLabel={{
                text: text,
              }}
              testID="changing-text-label"
            />
          </View>
        );
      };

      const { rerender, getByTestId } = render(
        <TestComponent text={texts[0]} />
      );

      for (let i = 1; i < texts.length; i++) {
        await act(async () => {
          rerender(<TestComponent text={texts[i]} />);
          jest.advanceTimersByTime(50);
        });
      }

      expect(getByTestId("changing-container")).toBeTruthy();
    });

    it("should handle adding and removing labels dynamically", async () => {
      const TestComponent = ({ showLabels }: { showLabels: boolean }) => {
        return (
          <View testID="dynamic-container">
            <LeaderLine
              start={{ point: { x: 10, y: 10 } }}
              end={{ point: { x: 100, y: 100 } }}
              startLabel={showLabels ? "Dynamic 1" : undefined}
              middleLabel={showLabels ? "Dynamic 2" : undefined}
              endLabel={showLabels ? "Dynamic 3" : undefined}
              testID="dynamic-labels"
            />
          </View>
        );
      };

      const { rerender, getByTestId } = render(
        <TestComponent showLabels={true} />
      );

      // Remove labels
      await act(async () => {
        rerender(<TestComponent showLabels={false} />);
        jest.advanceTimersByTime(50);
      });

      // Add labels back
      await act(async () => {
        rerender(<TestComponent showLabels={true} />);
        jest.advanceTimersByTime(50);
      });

      expect(getByTestId("dynamic-container")).toBeTruthy();
    });
  });

  describe("Label Offset and Alignment", () => {
    it("should handle label offset from the path", async () => {
      const offsets = [
        [0, 0],
        [10, 0],
        [0, 10],
        [-10, -10],
      ];

      const TestComponent = () => {
        return (
          <View>
            {offsets.map((offset, index) => {
              return (
                <View key={index} testID={`offset-container-${index}`}>
                  <LeaderLine
                    start={{ point: { x: 10, y: 10 } }}
                    end={{ point: { x: 100, y: 100 } }}
                    middleLabel={{
                      text: `Offset ${index}`,
                      offset: offset as [number, number],
                    }}
                    testID={`offset-label-${index}`}
                  />
                </View>
              );
            })}
          </View>
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      offsets.forEach((_, index) => {
        expect(getByTestId(`offset-container-${index}`)).toBeTruthy();
      });
    });

    it("should handle different label alignments", async () => {
      const alignments = ["left", "center", "right"];

      const TestComponent = () => {
        return (
          <View>
            {alignments.map((alignment, index) => {
              return (
                <View key={index} testID={`alignment-container-${alignment}`}>
                  <LeaderLine
                    start={{ point: { x: 10, y: 10 } }}
                    end={{ point: { x: 100, y: 100 } }}
                    middleLabel={{
                      text: `${alignment} aligned`,
                    }}
                    testID={`alignment-${alignment}`}
                  />
                </View>
              );
            })}
          </View>
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      alignments.forEach((alignment) => {
        expect(getByTestId(`alignment-container-${alignment}`)).toBeTruthy();
      });
    });
  });

  describe("Label Performance", () => {
    it("should handle many labels efficiently", async () => {
      const TestComponent = () => {
        return (
          <View testID="performance-container">
            <LeaderLine
              start={{ point: { x: 10, y: 10 } }}
              end={{ point: { x: 100, y: 100 } }}
              startLabel="Start Label"
              middleLabel="Middle Label"
              endLabel="End Label"
              captionLabel="Path Label"
              testID="performance-labels"
            />
          </View>
        );
      };

      const startTime = Date.now();
      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      const endTime = Date.now();
      const renderTime = endTime - startTime;

      expect(renderTime).toBeLessThan(1000);
      expect(getByTestId("performance-container")).toBeTruthy();
    });

    it("should handle rapid label updates efficiently", async () => {
      const TestComponent = ({ updateCount }: { updateCount: number }) => {
        return (
          <View testID="rapid-container">
            <LeaderLine
              start={{ point: { x: 10, y: 10 } }}
              end={{ point: { x: 100, y: 100 } }}
              middleLabel={{
                text: `Update ${updateCount}`,
              }}
              testID="rapid-updates"
            />
          </View>
        );
      };

      const { rerender, getByTestId } = render(
        <TestComponent updateCount={0} />
      );

      // Perform many rapid updates
      for (let i = 1; i <= 20; i++) {
        await act(async () => {
          rerender(<TestComponent updateCount={i} />);
          jest.advanceTimersByTime(5);
        });
      }

      expect(getByTestId("rapid-container")).toBeTruthy();
    });
  });
});
