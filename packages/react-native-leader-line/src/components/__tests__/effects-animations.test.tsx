/**
 * @fileoverview Effects and animations tests for React Native Leader Line
 * @description Tests for show/hide effects, path animations, and custom animations similar to the original leader-line library
 */

import { act, render } from "@testing-library/react-native";
import React, { useRef, useState } from "react";
import { View } from "react-native";
import { LeaderLine } from "../LeaderLine";

describe("Effects and Animations Tests", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe("Show Effects", () => {
    it("should handle fade show effect", async () => {
      const TestComponent = () => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        return (
          <LeaderLine
            startElement={startRef}
            endElement={endRef}
            showEffectName="fade"
            animOptions={{ duration: 1000 }}
            testID="fade-show"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("fade-show")).toBeTruthy();
    });

    it("should handle draw show effect", async () => {
      const TestComponent = () => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        return (
          <LeaderLine
            startElement={startRef}
            endElement={endRef}
            showEffectName="draw"
            animOptions={{ duration: 2000, timing: "ease-in-out" }}
            testID="draw-show"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("draw-show")).toBeTruthy();
    });

    it("should handle slide show effect", async () => {
      const TestComponent = () => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        return (
          <LeaderLine
            startElement={startRef}
            endElement={endRef}
            showEffectName="slide"
            animOptions={{ duration: 1500 }}
            testID="slide-show"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("slide-show")).toBeTruthy();
    });

    it("should handle custom show effect timing", async () => {
      const TestComponent = () => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        return (
          <LeaderLine
            startElement={startRef}
            endElement={endRef}
            showEffectName="fade"
            animOptions={{
              duration: 3000,
              timing: "cubic-bezier(0.4, 0, 0.2, 1)",
              delay: 500,
            }}
            testID="custom-timing"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("custom-timing")).toBeTruthy();
    });
  });

  describe("Hide Effects", () => {
    it("should handle fade hide effect", async () => {
      const TestComponent = () => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);
        const [isVisible, setIsVisible] = useState(true);

        React.useEffect(() => {
          setTimeout(() => setIsVisible(false), 100);
        }, []);

        return (
          <LeaderLine
            startElement={startRef}
            endElement={endRef}
            hide={!isVisible}
            hideEffectName="fade"
            animOptions={{ duration: 800 }}
            testID="fade-hide"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.advanceTimersByTime(1000);
      });

      expect(getByTestId("fade-hide")).toBeTruthy();
    });

    it("should handle slide hide effect", async () => {
      const TestComponent = () => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);
        const [isVisible, setIsVisible] = useState(true);

        React.useEffect(() => {
          setTimeout(() => setIsVisible(false), 100);
        }, []);

        return (
          <LeaderLine
            startElement={startRef}
            endElement={endRef}
            hide={!isVisible}
            hideEffectName="slide"
            animOptions={{ duration: 1200 }}
            testID="slide-hide"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.advanceTimersByTime(1500);
      });

      expect(getByTestId("slide-hide")).toBeTruthy();
    });

    it("should handle erase hide effect", async () => {
      const TestComponent = () => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);
        const [isVisible, setIsVisible] = useState(true);

        React.useEffect(() => {
          setTimeout(() => setIsVisible(false), 100);
        }, []);

        return (
          <LeaderLine
            startElement={startRef}
            endElement={endRef}
            hide={!isVisible}
            hideEffectName="erase"
            animOptions={{ duration: 1000 }}
            testID="erase-hide"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.advanceTimersByTime(1200);
      });

      expect(getByTestId("erase-hide")).toBeTruthy();
    });
  });

  describe("Path Animation", () => {
    it("should handle basic path animation", async () => {
      const TestComponent = () => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        return (
          <LeaderLine
            startElement={startRef}
            endElement={endRef}
            path="straight"
            pathAnimationSpeed={2}
            testID="path-animation"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("path-animation")).toBeTruthy();
    });

    it("should handle complex path animation", async () => {
      const TestComponent = () => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        return (
          <LeaderLine
            startElement={startRef}
            endElement={endRef}
            path="arc"
            pathAnimationSpeed={3}
            pathTimingFunction="ease-in-out"
            testID="complex-path-animation"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("complex-path-animation")).toBeTruthy();
    });

    it("should handle reverse path animation", async () => {
      const TestComponent = () => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        return (
          <LeaderLine
            startElement={startRef}
            endElement={endRef}
            path="fluid"
            pathAnimationSpeed={-1}
            testID="reverse-path-animation"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("reverse-path-animation")).toBeTruthy();
    });
  });

  describe("Dash Animation", () => {
    it("should handle basic dash animation", async () => {
      const TestComponent = () => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        return (
          <LeaderLine
            startElement={startRef}
            endElement={endRef}
            dash={{ animation: true, len: 8, gap: 4 }}
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

    it("should handle custom dash animation timing", async () => {
      const TestComponent = () => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        return (
          <LeaderLine
            startElement={startRef}
            endElement={endRef}
            dash={{
              animation: true,
              len: 12,
              gap: 6,
              timing: "linear",
              duration: 2000,
            }}
            testID="custom-dash-timing"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("custom-dash-timing")).toBeTruthy();
    });

    it("should handle dash animation direction", async () => {
      const TestComponent = () => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        return (
          <LeaderLine
            startElement={startRef}
            endElement={endRef}
            dash={{
              animation: true,
              len: 10,
              gap: 5,
              direction: "reverse",
            }}
            testID="dash-reverse"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("dash-reverse")).toBeTruthy();
    });
  });

  describe("Animation Chaining", () => {
    it("should handle sequential show and hide effects", async () => {
      const TestComponent = () => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);
        const [state, setState] = useState("show");

        React.useEffect(() => {
          const timeouts = [
            setTimeout(() => setState("hide"), 1000),
            setTimeout(() => setState("show"), 2000),
            setTimeout(() => setState("hide"), 3000),
          ];

          return () => timeouts.forEach(clearTimeout);
        }, []);

        return (
          <LeaderLine
            startElement={startRef}
            endElement={endRef}
            hide={state === "hide"}
            showEffectName="fade"
            hideEffectName="slide"
            animOptions={{ duration: 500 }}
            testID="sequential-effects"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.advanceTimersByTime(3500);
      });

      expect(getByTestId("sequential-effects")).toBeTruthy();
    });

    it("should handle overlapping animations", async () => {
      const TestComponent = () => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);
        const [color, setColor] = useState("#ff0000");

        React.useEffect(() => {
          const interval = setInterval(() => {
            setColor((prev) => (prev === "#ff0000" ? "#00ff00" : "#ff0000"));
          }, 200);

          setTimeout(() => clearInterval(interval), 1000);
          return () => clearInterval(interval);
        }, []);

        return (
          <LeaderLine
            startElement={startRef}
            endElement={endRef}
            color={color}
            dash={{ animation: true, len: 8, gap: 4 }}
            showEffectName="draw"
            animOptions={{ duration: 1500 }}
            testID="overlapping-animations"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.advanceTimersByTime(2000);
      });

      expect(getByTestId("overlapping-animations")).toBeTruthy();
    });
  });

  describe("Animation Performance", () => {
    it("should handle multiple animated lines efficiently", async () => {
      const TestComponent = () => {
        const lines = Array.from({ length: 10 }, (_, i) => {
          const startRef = useRef<View>(null);
          const endRef = useRef<View>(null);

          return (
            <LeaderLine
              key={i}
              startElement={startRef}
              endElement={endRef}
              showEffectName={i % 2 === 0 ? "fade" : "draw"}
              dash={{ animation: true, len: 6 + i, gap: 3 + i }}
              animOptions={{ duration: 1000 + i * 100 }}
              testID={`animated-line-${i}`}
            />
          );
        });

        return <View>{lines}</View>;
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

      // Should handle multiple animations efficiently
      expect(renderTime).toBeLessThan(2000);
    });

    it("should handle animation state changes efficiently", async () => {
      const TestComponent = () => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);
        const [animState, setAnimState] = useState({
          showEffect: "fade" as const,
          duration: 1000,
          dashAnimation: true,
        });

        React.useEffect(() => {
          const effects = ["fade", "draw", "slide"] as const;
          let index = 0;

          const interval = setInterval(() => {
            index = (index + 1) % effects.length;
            setAnimState({
              showEffect: effects[index],
              duration: 800 + index * 200,
              dashAnimation: index % 2 === 0,
            });
          }, 300);

          setTimeout(() => clearInterval(interval), 1000);
          return () => clearInterval(interval);
        }, []);

        return (
          <LeaderLine
            startElement={startRef}
            endElement={endRef}
            showEffectName={animState.showEffect}
            dash={{ animation: animState.dashAnimation, len: 8, gap: 4 }}
            animOptions={{ duration: animState.duration }}
            testID="animation-state-changes"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.advanceTimersByTime(1200);
      });

      expect(getByTestId("animation-state-changes")).toBeTruthy();
    });
  });

  describe("Animation Events and Callbacks", () => {
    it("should handle animation start callbacks", async () => {
      const onAnimationStart = jest.fn();

      const TestComponent = () => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        return (
          <LeaderLine
            startElement={startRef}
            endElement={endRef}
            showEffectName="fade"
            onAnimationStart={onAnimationStart}
            testID="animation-start-callback"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("animation-start-callback")).toBeTruthy();
      // Note: In real implementation, would verify callback was called
    });

    it("should handle animation end callbacks", async () => {
      const onAnimationEnd = jest.fn();

      const TestComponent = () => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        return (
          <LeaderLine
            startElement={startRef}
            endElement={endRef}
            showEffectName="draw"
            animOptions={{ duration: 500 }}
            onAnimationEnd={onAnimationEnd}
            testID="animation-end-callback"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.advanceTimersByTime(600);
      });

      expect(getByTestId("animation-end-callback")).toBeTruthy();
      // Note: In real implementation, would verify callback was called
    });

    it("should handle animation interruption", async () => {
      const TestComponent = () => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);
        const [isVisible, setIsVisible] = useState(true);

        React.useEffect(() => {
          // Start hide animation during show animation
          setTimeout(() => setIsVisible(false), 250);
        }, []);

        return (
          <LeaderLine
            startElement={startRef}
            endElement={endRef}
            hide={!isVisible}
            showEffectName="fade"
            hideEffectName="slide"
            animOptions={{ duration: 1000 }}
            testID="animation-interruption"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.advanceTimersByTime(1500);
      });

      expect(getByTestId("animation-interruption")).toBeTruthy();
    });
  });

  describe("Custom Animation Options", () => {
    it("should handle custom easing functions", async () => {
      const TestComponent = () => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        return (
          <LeaderLine
            startElement={startRef}
            endElement={endRef}
            showEffectName="draw"
            animOptions={{
              duration: 2000,
              timing: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
              delay: 200,
            }}
            testID="custom-easing"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("custom-easing")).toBeTruthy();
    });

    it("should handle step-based timing functions", async () => {
      const TestComponent = () => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        return (
          <LeaderLine
            startElement={startRef}
            endElement={endRef}
            showEffectName="fade"
            animOptions={{
              duration: 1000,
              timing: "steps(5, end)",
            }}
            testID="step-timing"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("step-timing")).toBeTruthy();
    });

    it("should handle infinite animation loops", async () => {
      const TestComponent = () => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        return (
          <LeaderLine
            startElement={startRef}
            endElement={endRef}
            dash={{
              animation: true,
              len: 8,
              gap: 4,
              duration: 1000,
              iterationCount: "infinite",
            }}
            testID="infinite-animation"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.advanceTimersByTime(3000);
      });

      expect(getByTestId("infinite-animation")).toBeTruthy();
    });
  });

  describe("Animation Cleanup", () => {
    it("should cleanup animations on unmount", async () => {
      const TestComponent = ({ shouldRender }: { shouldRender: boolean }) => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        if (!shouldRender) return null;

        return (
          <LeaderLine
            startElement={startRef}
            endElement={endRef}
            showEffectName="fade"
            dash={{ animation: true, len: 8, gap: 4 }}
            animOptions={{ duration: 5000 }}
            testID="animation-cleanup"
          />
        );
      };

      const { getByTestId, rerender } = render(
        <TestComponent shouldRender={true} />
      );

      await act(async () => {
        jest.advanceTimersByTime(1000);
      });

      expect(getByTestId("animation-cleanup")).toBeTruthy();

      // Unmount while animation is running
      rerender(<TestComponent shouldRender={false} />);

      await act(async () => {
        jest.runAllTimers();
      });

      // Should cleanup without errors
      expect(() => getByTestId("animation-cleanup")).toThrow();
    });

    it("should handle animation state reset", async () => {
      const TestComponent = () => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);
        const [resetKey, setResetKey] = useState(0);

        React.useEffect(() => {
          const interval = setInterval(() => {
            setResetKey((prev) => prev + 1);
          }, 800);

          setTimeout(() => clearInterval(interval), 2000);
          return () => clearInterval(interval);
        }, []);

        return (
          <LeaderLine
            key={resetKey}
            startElement={startRef}
            endElement={endRef}
            showEffectName="draw"
            animOptions={{ duration: 1500 }}
            testID="animation-reset"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.advanceTimersByTime(2200);
      });

      expect(getByTestId("animation-reset")).toBeTruthy();
    });
  });
});
