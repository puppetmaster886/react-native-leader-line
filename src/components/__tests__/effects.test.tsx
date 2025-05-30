/**
 * @fileoverview Effects and animations tests for React Native Leader Line
 * @description Tests for show/hide effects and animations similar to the original leader-line library
 */

import { act, render } from "@testing-library/react-native";
import React, { useRef } from "react";
import { View } from "react-native";
import { LeaderLine } from "../LeaderLine";

describe("Effects and Animations Tests", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe("Show/Hide Effects", () => {
    it("should handle fade effect", async () => {
      const TestComponent = () => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        return (
          <LeaderLine
            startElement={startRef}
            endElement={endRef}
            showEffectName="fade"
            hideEffectName="fade"
            testID="fade-effect"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("fade-effect")).toBeTruthy();
    });

    it("should handle draw effect", async () => {
      const TestComponent = () => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        return (
          <LeaderLine
            startElement={startRef}
            endElement={endRef}
            showEffectName="draw"
            hideEffectName="draw"
            testID="draw-effect"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("draw-effect")).toBeTruthy();
    });

    it("should handle none effect", async () => {
      const TestComponent = () => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        return (
          <LeaderLine
            startElement={startRef}
            endElement={endRef}
            showEffectName="none"
            hideEffectName="none"
            testID="none-effect"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("none-effect")).toBeTruthy();
    });
  });

  describe("Animation Options", () => {
    it("should handle animation duration", async () => {
      const TestComponent = () => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        return (
          <LeaderLine
            startElement={startRef}
            endElement={endRef}
            animOptions={{ duration: 3000 }}
            testID="duration-anim"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("duration-anim")).toBeTruthy();
    });

    it("should handle timing functions", async () => {
      const timingFunctions = [
        "ease",
        "linear",
        "ease-in",
        "ease-out",
        "ease-in-out",
        [0.5, 0, 1, 0.42], // Custom cubic-bezier
      ];

      for (const timing of timingFunctions) {
        const TestComponent = () => {
          const startRef = useRef<View>(null);
          const endRef = useRef<View>(null);

          return (
            <LeaderLine
              startElement={startRef}
              endElement={endRef}
              animOptions={{ timing }}
              testID={`timing-${Array.isArray(timing) ? "custom" : timing}`}
            />
          );
        };

        const { getByTestId } = render(<TestComponent />);

        await act(async () => {
          jest.runAllTimers();
        });

        expect(
          getByTestId(`timing-${Array.isArray(timing) ? "custom" : timing}`)
        ).toBeTruthy();
      }
    });

    it("should handle complex animation configurations", async () => {
      const TestComponent = () => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        return (
          <LeaderLine
            startElement={startRef}
            endElement={endRef}
            animOptions={{
              duration: 3000,
              timing: [0.5, 0, 1, 0.42],
            }}
            testID="complex-anim"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("complex-anim")).toBeTruthy();
    });
  });

  describe("Dash Animation", () => {
    it("should handle dash animation", async () => {
      const TestComponent = () => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        return (
          <LeaderLine
            startElement={startRef}
            endElement={endRef}
            dash={{ animation: true }}
            testID="dash-animation"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("dash-animation")).toBeTruthy();
    });

    it("should handle dash animation with custom pattern", async () => {
      const TestComponent = () => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        return (
          <LeaderLine
            startElement={startRef}
            endElement={endRef}
            dash={{
              len: 4,
              gap: 24,
              animation: true,
            }}
            testID="custom-dash-animation"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("custom-dash-animation")).toBeTruthy();
    });
  });

  describe("Initial Hide State", () => {
    it("should handle hide option in constructor", async () => {
      const TestComponent = () => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        return (
          <LeaderLine
            startElement={startRef}
            endElement={endRef}
            hide={true}
            testID="initially-hidden"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("initially-hidden")).toBeTruthy();
    });

    it("should show line when hide is false", async () => {
      const TestComponent = () => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        return (
          <LeaderLine
            startElement={startRef}
            endElement={endRef}
            hide={false}
            testID="initially-visible"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("initially-visible")).toBeTruthy();
    });
  });

  describe("Dynamic Effects", () => {
    it("should handle changing effects dynamically", async () => {
      const TestComponent = ({ effect }: { effect: string }) => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        return (
          <LeaderLine
            startElement={startRef}
            endElement={endRef}
            showEffectName={effect as any}
            testID="dynamic-effect"
          />
        );
      };

      const { getByTestId, rerender } = render(<TestComponent effect="fade" />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("dynamic-effect")).toBeTruthy();

      // Change effect
      rerender(<TestComponent effect="draw" />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("dynamic-effect")).toBeTruthy();
    });

    it("should handle changing animation options dynamically", async () => {
      const TestComponent = ({ duration }: { duration: number }) => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        return (
          <LeaderLine
            startElement={startRef}
            endElement={endRef}
            animOptions={{ duration }}
            testID="dynamic-anim-options"
          />
        );
      };

      const { getByTestId, rerender } = render(
        <TestComponent duration={1000} />
      );

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("dynamic-anim-options")).toBeTruthy();

      // Change duration
      rerender(<TestComponent duration={3000} />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("dynamic-anim-options")).toBeTruthy();
    });
  });

  describe("Performance with Effects", () => {
    it("should handle multiple animated lines efficiently", async () => {
      const TestComponent = () => {
        const refs = Array.from({ length: 10 }, () => ({
          start: useRef<View>(null),
          end: useRef<View>(null),
        }));

        return (
          <View>
            {refs.map((ref, index) => (
              <LeaderLine
                key={index}
                startElement={ref.start}
                endElement={ref.end}
                showEffectName="draw"
                animOptions={{ duration: 1000 + index * 100 }}
                testID={`animated-line-${index}`}
              />
            ))}
          </View>
        );
      };

      const startTime = Date.now();
      const { getAllByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      const endTime = Date.now();
      const renderTime = endTime - startTime;

      const lines = getAllByTestId(/animated-line-/);
      expect(lines).toHaveLength(10);

      // Should render multiple animated lines efficiently
      expect(renderTime).toBeLessThan(1000);
    });
  });

  describe("Effect Combinations", () => {
    it("should handle complex effect combinations", async () => {
      const TestComponent = () => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        return (
          <LeaderLine
            startElement={startRef}
            endElement={endRef}
            showEffectName="draw"
            dash={{ animation: true }}
            dropShadow={true}
            gradient={true}
            testID="complex-effects"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("complex-effects")).toBeTruthy();
    });

    it("should handle effects with outline", async () => {
      const TestComponent = () => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        return (
          <LeaderLine
            startElement={startRef}
            endElement={endRef}
            showEffectName="fade"
            outline={true}
            outlineSize={2}
            testID="effects-with-outline"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("effects-with-outline")).toBeTruthy();
    });
  });

  describe("Mouse Hover Effects", () => {
    it("should handle mouse hover style changes", async () => {
      const TestComponent = () => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        return (
          <LeaderLine
            startElement={startRef}
            endElement={endRef}
            style={{ opacity: 0.8 }}
            hoverStyle={{ opacity: 1 }}
            testID="hover-effects"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("hover-effects")).toBeTruthy();
    });

    it("should handle mouse hover with show/hide effects", async () => {
      const TestComponent = () => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        return (
          <LeaderLine
            startElement={startRef}
            endElement={endRef}
            showEffectName="draw"
            hideEffectName="fade"
            onSwitch={(event) => {
              // Mock event handler
              console.log("Effect switched:", event);
            }}
            testID="hover-show-hide"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("hover-show-hide")).toBeTruthy();
    });
  });

  describe("Edge Cases with Effects", () => {
    it("should handle undefined effect names gracefully", async () => {
      const TestComponent = () => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        return (
          <LeaderLine
            startElement={startRef}
            endElement={endRef}
            showEffectName={undefined as any}
            hideEffectName={undefined as any}
            testID="undefined-effects"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("undefined-effects")).toBeTruthy();
    });

    it("should handle null animation options", async () => {
      const TestComponent = () => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        return (
          <LeaderLine
            startElement={startRef}
            endElement={endRef}
            animOptions={null as any}
            testID="null-anim-options"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("null-anim-options")).toBeTruthy();
    });

    it("should handle very short animation durations", async () => {
      const TestComponent = () => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        return (
          <LeaderLine
            startElement={startRef}
            endElement={endRef}
            animOptions={{ duration: 1 }}
            testID="short-duration"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("short-duration")).toBeTruthy();
    });

    it("should handle very long animation durations", async () => {
      const TestComponent = () => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        return (
          <LeaderLine
            startElement={startRef}
            endElement={endRef}
            animOptions={{ duration: 10000 }}
            testID="long-duration"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("long-duration")).toBeTruthy();
    });
  });
});
