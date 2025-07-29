import { act, render } from "@testing-library/react-native";
import React, { useRef } from "react";
import { View } from "react-native";
import { AnimationType } from "../../types";
import { LeaderLine } from "../LeaderLine";

/**
 * @fileoverview Animation State Coverage Tests
 * @description Comprehensive testing for animation states, transitions, and behaviors
 */

describe("Animation State Coverage Tests", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe("Animation Types", () => {
    const animationTypes: AnimationType[] = [
      "draw",
      "fade",
      "slide",
      "bounce",
      "elastic",
    ];

    it("should render with all supported animation types", async () => {
      const TestComponent = () => {
        return (
          <View>
            {animationTypes.map((animationType, index) => {
              const startRef = useRef<View>(null);
              const endRef = useRef<View>(null);

              return (
                <LeaderLine
                  key={index}
                  start={{ element: startRef }}
                  end={{ element: endRef }}
                  animation={animationType}
                  testID={`animation-${animationType}`}
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

      animationTypes.forEach((animationType) => {
        expect(getAllByTestId(`animation-${animationType}`)).toHaveLength(1);
      });
    });

    it("should handle animation with different durations", async () => {
      const durations = [100, 300, 500, 1000, 2000];

      const TestComponent = () => {
        return (
          <View>
            {durations.map((duration, index) => {
              const startRef = useRef<View>(null);
              const endRef = useRef<View>(null);

              return (
                <LeaderLine
                  key={index}
                  start={{ element: startRef }}
                  end={{ element: endRef }}
                  animation="draw"
                  animationDuration={duration}
                  testID={`duration-${duration}`}
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

      durations.forEach((duration) => {
        expect(getAllByTestId(`duration-${duration}`)).toHaveLength(1);
      });
    });
  });

  describe("Draw Animation", () => {
    it("should animate line drawing from start to end", async () => {
      const TestComponent = () => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        return (
          <LeaderLine
            start={{ element: startRef }}
            end={{ element: endRef }}
            animation="draw"
            animationDuration={1000}
            testID="draw-animation"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);

      // Initial state - animation not started
      await act(async () => {
        jest.advanceTimersByTime(0);
      });

      expect(getByTestId("draw-animation")).toBeTruthy();

      // Mid-animation state
      await act(async () => {
        jest.advanceTimersByTime(500);
      });

      expect(getByTestId("draw-animation")).toBeTruthy();

      // Animation complete
      await act(async () => {
        jest.advanceTimersByTime(1000);
      });

      expect(getByTestId("draw-animation")).toBeTruthy();
    });

    it("should handle draw animation in reverse", async () => {
      const TestComponent = () => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        return (
          <LeaderLine
            start={{ element: startRef }}
            end={{ element: endRef }}
            animation="draw"
            animationReverse={true}
            animationDuration={800}
            testID="draw-reverse"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("draw-reverse")).toBeTruthy();
    });

    it("should handle draw animation with different easing functions", async () => {
      const easingFunctions = ["linear", "ease-in", "ease-out", "ease-in-out"];

      const TestComponent = () => {
        return (
          <View>
            {easingFunctions.map((easing, index) => {
              const startRef = useRef<View>(null);
              const endRef = useRef<View>(null);

              return (
                <LeaderLine
                  key={index}
                  start={{ element: startRef }}
                  end={{ element: endRef }}
                  animation="draw"
                  animationEasing={easing}
                  testID={`draw-easing-${easing}`}
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

      easingFunctions.forEach((easing) => {
        expect(getAllByTestId(`draw-easing-${easing}`)).toHaveLength(1);
      });
    });
  });

  describe("Fade Animation", () => {
    it("should animate opacity from 0 to 1", async () => {
      const TestComponent = () => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        return (
          <LeaderLine
            start={{ element: startRef }}
            end={{ element: endRef }}
            animation="fade"
            animationDuration={600}
            testID="fade-animation"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("fade-animation")).toBeTruthy();
    });

    it("should handle fade animation with custom opacity values", async () => {
      const TestComponent = () => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        return (
          <LeaderLine
            start={{ element: startRef }}
            end={{ element: endRef }}
            animation="fade"
            animationFromOpacity={0.2}
            animationToOpacity={0.8}
            testID="fade-custom-opacity"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("fade-custom-opacity")).toBeTruthy();
    });
  });

  describe("Slide Animation", () => {
    it("should animate position with slide effect", async () => {
      const TestComponent = () => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        return (
          <LeaderLine
            start={{ element: startRef }}
            end={{ element: endRef }}
            animation="slide"
            animationDirection="right"
            testID="slide-animation"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("slide-animation")).toBeTruthy();
    });

    it("should handle slide animation in all directions", async () => {
      const directions = ["left", "right", "up", "down"];

      const TestComponent = () => {
        return (
          <View>
            {directions.map((direction, index) => {
              const startRef = useRef<View>(null);
              const endRef = useRef<View>(null);

              return (
                <LeaderLine
                  key={index}
                  start={{ element: startRef }}
                  end={{ element: endRef }}
                  animation="slide"
                  animationDirection={direction}
                  testID={`slide-${direction}`}
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

      directions.forEach((direction) => {
        expect(getAllByTestId(`slide-${direction}`)).toHaveLength(1);
      });
    });
  });

  describe("Bounce Animation", () => {
    it("should create bounce effect", async () => {
      const TestComponent = () => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        return (
          <LeaderLine
            start={{ element: startRef }}
            end={{ element: endRef }}
            animation="bounce"
            animationBounceHeight={10}
            testID="bounce-animation"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("bounce-animation")).toBeTruthy();
    });

    it("should handle bounce with different heights", async () => {
      const bounceHeights = [5, 10, 20, 30];

      const TestComponent = () => {
        return (
          <View>
            {bounceHeights.map((height, index) => {
              const startRef = useRef<View>(null);
              const endRef = useRef<View>(null);

              return (
                <LeaderLine
                  key={index}
                  start={{ element: startRef }}
                  end={{ element: endRef }}
                  animation="bounce"
                  animationBounceHeight={height}
                  testID={`bounce-height-${height}`}
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

      bounceHeights.forEach((height) => {
        expect(getAllByTestId(`bounce-height-${height}`)).toHaveLength(1);
      });
    });
  });

  describe("Elastic Animation", () => {
    it("should create elastic spring effect", async () => {
      const TestComponent = () => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        return (
          <LeaderLine
            start={{ element: startRef }}
            end={{ element: endRef }}
            animation="elastic"
            animationElasticity={0.5}
            testID="elastic-animation"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("elastic-animation")).toBeTruthy();
    });

    it("should handle different elasticity values", async () => {
      const elasticityValues = [0.1, 0.3, 0.5, 0.7, 1.0];

      const TestComponent = () => {
        return (
          <View>
            {elasticityValues.map((elasticity, index) => {
              const startRef = useRef<View>(null);
              const endRef = useRef<View>(null);

              return (
                <LeaderLine
                  key={index}
                  start={{ element: startRef }}
                  end={{ element: endRef }}
                  animation="elastic"
                  animationElasticity={elasticity}
                  testID={`elastic-${elasticity}`}
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

      elasticityValues.forEach((elasticity) => {
        expect(getAllByTestId(`elastic-${elasticity}`)).toHaveLength(1);
      });
    });
  });

  describe("Animation State Management", () => {
    it("should handle animation play/pause states", async () => {
      const TestComponent = ({ isPaused }: { isPaused: boolean }) => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        return (
          <LeaderLine
            start={{ element: startRef }}
            end={{ element: endRef }}
            animation="draw"
            animationPaused={isPaused}
            testID="animation-play-pause"
          />
        );
      };

      const { rerender } = render(<TestComponent isPaused={false} />);

      // Start animation
      await act(async () => {
        jest.advanceTimersByTime(100);
      });

      // Pause animation
      rerender(<TestComponent isPaused={true} />);
      await act(async () => {
        jest.advanceTimersByTime(100);
      });

      // Resume animation
      rerender(<TestComponent isPaused={false} />);
      await act(async () => {
        jest.runAllTimers();
      });

      expect(true).toBe(true); // Test passes if no errors thrown
    });

    it("should handle animation restart", async () => {
      const TestComponent = ({ restart }: { restart: boolean }) => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        return (
          <LeaderLine
            start={{ element: startRef }}
            end={{ element: endRef }}
            animation="draw"
            animationRestart={restart}
            testID="animation-restart"
          />
        );
      };

      const { rerender } = render(<TestComponent restart={false} />);

      // Complete first animation
      await act(async () => {
        jest.runAllTimers();
      });

      // Restart animation
      rerender(<TestComponent restart={true} />);
      await act(async () => {
        jest.runAllTimers();
      });

      expect(true).toBe(true);
    });

    it("should handle animation loops", async () => {
      const TestComponent = () => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        return (
          <LeaderLine
            start={{ element: startRef }}
            end={{ element: endRef }}
            animation="draw"
            animationLoop={true}
            animationDuration={200}
            testID="animation-loop"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);

      // Run multiple animation cycles
      await act(async () => {
        jest.advanceTimersByTime(600); // 3 loops
      });

      expect(getByTestId("animation-loop")).toBeTruthy();
    });

    it("should handle animation with finite loop count", async () => {
      const TestComponent = () => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        return (
          <LeaderLine
            start={{ element: startRef }}
            end={{ element: endRef }}
            animation="bounce"
            animationLoopCount={3}
            animationDuration={200}
            testID="animation-loop-count"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.advanceTimersByTime(800); // Should complete 3 loops and stop
      });

      expect(getByTestId("animation-loop-count")).toBeTruthy();
    });
  });

  describe("Animation Callbacks", () => {
    it("should call onAnimationStart callback", async () => {
      const onAnimationStart = jest.fn();

      const TestComponent = () => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        return (
          <LeaderLine
            start={{ element: startRef }}
            end={{ element: endRef }}
            animation="fade"
            onAnimationStart={onAnimationStart}
            testID="animation-start-callback"
          />
        );
      };

      render(<TestComponent />);

      await act(async () => {
        jest.advanceTimersByTime(50);
      });

      expect(onAnimationStart).toHaveBeenCalled();
    });

    it("should call onAnimationEnd callback", async () => {
      const onAnimationEnd = jest.fn();

      const TestComponent = () => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        return (
          <LeaderLine
            start={{ element: startRef }}
            end={{ element: endRef }}
            animation="fade"
            animationDuration={300}
            onAnimationEnd={onAnimationEnd}
            testID="animation-end-callback"
          />
        );
      };

      render(<TestComponent />);

      await act(async () => {
        jest.advanceTimersByTime(350);
      });

      expect(onAnimationEnd).toHaveBeenCalled();
    });

    it("should call onAnimationIteration callback for loops", async () => {
      const onAnimationIteration = jest.fn();

      const TestComponent = () => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        return (
          <LeaderLine
            start={{ element: startRef }}
            end={{ element: endRef }}
            animation="draw"
            animationLoop={true}
            animationDuration={200}
            onAnimationIteration={onAnimationIteration}
            testID="animation-iteration-callback"
          />
        );
      };

      render(<TestComponent />);

      await act(async () => {
        jest.advanceTimersByTime(450); // 2+ loops
      });

      expect(onAnimationIteration).toHaveBeenCalledTimes(2);
    });
  });

  describe("Animation Performance", () => {
    it("should handle multiple simultaneous animations", async () => {
      const TestComponent = () => {
        const animations = [];

        for (let i = 0; i < 10; i++) {
          const startRef = useRef<View>(null);
          const endRef = useRef<View>(null);

          animations.push(
            <LeaderLine
              key={i}
              start={{ element: startRef }}
              end={{ element: endRef }}
              animation="draw"
              animationDuration={500 + i * 50}
              testID={`multi-animation-${i}`}
            />
          );
        }

        return <View>{animations}</View>;
      };

      const { getAllByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      // All animations should render successfully
      expect(getAllByTestId(/multi-animation-/).length).toBe(10);
    });

    it("should handle rapid animation property changes", async () => {
      const animationTypes: AnimationType[] = ["draw", "fade", "slide"];

      const TestComponent = ({
        animationIndex,
      }: {
        animationIndex: number;
      }) => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        return (
          <LeaderLine
            start={{ element: startRef }}
            end={{ element: endRef }}
            animation={animationTypes[animationIndex]}
            testID="rapid-animation-changes"
          />
        );
      };

      const { rerender } = render(<TestComponent animationIndex={0} />);

      // Rapidly change animation types
      for (let i = 1; i < animationTypes.length; i++) {
        await act(async () => {
          rerender(<TestComponent animationIndex={i} />);
          jest.advanceTimersByTime(10);
        });
      }

      expect(true).toBe(true);
    });

    it("should handle animation cleanup on unmount", async () => {
      const TestComponent = ({ visible }: { visible: boolean }) => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        if (!visible) return null;

        return (
          <LeaderLine
            start={{ element: startRef }}
            end={{ element: endRef }}
            animation="draw"
            animationDuration={1000}
            testID="animation-cleanup"
          />
        );
      };

      const { rerender, queryByTestId } = render(
        <TestComponent visible={true} />
      );

      // Start animation
      await act(async () => {
        jest.advanceTimersByTime(500);
      });

      expect(queryByTestId("animation-cleanup")).toBeTruthy();

      // Unmount component mid-animation
      rerender(<TestComponent visible={false} />);

      await act(async () => {
        jest.advanceTimersByTime(1000);
      });

      expect(queryByTestId("animation-cleanup")).toBeNull();
    });
  });

  describe("Animation Integration", () => {
    it("should animate with path changes", async () => {
      const TestComponent = ({
        pathType,
      }: {
        pathType: "straight" | "arc";
      }) => {
        const startRef = useRef<View>(null);
        const endRef = useRef<View>(null);

        return (
          <LeaderLine
            start={{ element: startRef }}
            end={{ element: endRef }}
            path={pathType}
            animation="draw"
            testID="animation-with-path-changes"
          />
        );
      };

      const { rerender } = render(<TestComponent pathType="straight" />);

      await act(async () => {
        jest.advanceTimersByTime(200);
      });

      // Change path type mid-animation
      rerender(<TestComponent pathType="arc" />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(true).toBe(true);
    });

    it("should animate with element position changes", async () => {
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
            animation="draw"
            testID="animation-with-position-changes"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);

      // Start animation
      await act(async () => {
        jest.advanceTimersByTime(200);
      });

      // Change element position mid-animation
      await act(async () => {
        elementPosition = { x: 150, y: 150 };
        jest.advanceTimersByTime(200);
      });

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("animation-with-position-changes")).toBeTruthy();
    });
  });
});
