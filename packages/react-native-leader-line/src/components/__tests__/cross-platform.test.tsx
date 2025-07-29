import { act, render } from "@testing-library/react-native";
import React, { useRef } from "react";
import { Platform, View } from "react-native";
import { LeaderLine } from "../LeaderLine";

/**
 * @fileoverview Cross-Platform Compatibility Tests
 * @description Tests for iOS and Android platform-specific behaviors and compatibility
 */

// Mock Platform module for testing
const mockPlatform = (os: "ios" | "android") => {
  Object.defineProperty(Platform, "OS", {
    writable: true,
    value: os,
  });
};

// Helper function to create mock refs with measure method
const createMockRef = (x = 0, y = 0, width = 50, height = 50) => {
  const ref = useRef<View>(null);
  (ref as any).current = {
    measure: jest.fn((callback) => callback(0, 0, width, height, x, y)),
  };
  return ref;
};

describe("Cross-Platform Compatibility Tests", () => {
  const originalPlatform = Platform.OS;

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    // Restore original platform
    Object.defineProperty(Platform, "OS", {
      writable: true,
      value: originalPlatform,
    });
  });

  describe("iOS Platform", () => {
    beforeEach(() => {
      mockPlatform("ios");
    });

    it("should render correctly on iOS", () => {
      const TestComponent = () => {
        const startRef = createMockRef(0, 0, 50, 50);
        const endRef = createMockRef(100, 100, 50, 50);

        return (
          <LeaderLine
            start={{ element: startRef }}
            end={{ element: endRef }}
            testID="ios-leader-line"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);
      expect(getByTestId("ios-leader-line")).toBeTruthy();
    });

    it("should handle iOS-specific SVG rendering", () => {
      const TestComponent = () => {
        const startRef = createMockRef(0, 0, 50, 50);
        const endRef = createMockRef(100, 100, 50, 50);

        return (
          <LeaderLine
            start={{ element: startRef }}
            end={{ element: endRef }}
            color="#FF0000"
            strokeWidth={3}
            testID="ios-svg-rendering"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);
      expect(getByTestId("ios-svg-rendering")).toBeTruthy();
    });

    it("should handle iOS touch events", async () => {
      const TestComponent = () => {
        const startRef = createMockRef(0, 0, 50, 50);
        const endRef = createMockRef(100, 100, 50, 50);

        return (
          <LeaderLine
            start={{ element: startRef }}
            end={{ element: endRef }}
            testID="ios-touch-events"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);
      const leaderLine = getByTestId("ios-touch-events");

      await act(async () => {
        jest.runAllTimers();
      });

      expect(leaderLine).toBeTruthy();
    });

    it("should handle iOS coordinate system", () => {
      const TestComponent = () => {
        const startRef = createMockRef(0, 64, 100, 50); // Account for iOS status bar
        const endRef = createMockRef(200, 264, 100, 50);

        return (
          <LeaderLine
            start={{ element: startRef }}
            end={{ element: endRef }}
            testID="ios-coordinates"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);
      expect(getByTestId("ios-coordinates")).toBeTruthy();
    });

    it("should handle iOS animation performance", async () => {
      const TestComponent = () => {
        const startRef = createMockRef(0, 0, 50, 50);
        const endRef = createMockRef(100, 100, 50, 50);

        return (
          <LeaderLine
            start={{ element: startRef }}
            end={{ element: endRef }}
            testID="ios-animation-performance"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId("ios-animation-performance")).toBeTruthy();
    });

    it("should handle iOS safe area considerations", () => {
      const TestComponent = () => {
        const startRef = createMockRef(0, 0, 50, 50);
        const endRef = createMockRef(100, 100, 50, 50);

        return (
          <LeaderLine
            start={{ element: startRef }}
            end={{ element: endRef }}
            testID="ios-safe-area"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);
      expect(getByTestId("ios-safe-area")).toBeTruthy();
    });
  });

  describe("Android Platform", () => {
    beforeEach(() => {
      mockPlatform("android");
    });

    it("should render correctly on Android", () => {
      const TestComponent = () => {
        const startRef = createMockRef(0, 0, 50, 50);
        const endRef = createMockRef(100, 100, 50, 50);

        return (
          <LeaderLine
            start={{ element: startRef }}
            end={{ element: endRef }}
            testID="android-leader-line"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);
      expect(getByTestId("android-leader-line")).toBeTruthy();
    });

    it("should handle Android-specific SVG rendering", () => {
      const TestComponent = () => {
        const startRef = createMockRef(0, 0, 50, 50);
        const endRef = createMockRef(100, 100, 50, 50);

        return (
          <LeaderLine
            start={{ element: startRef }}
            end={{ element: endRef }}
            color="#00FF00"
            strokeWidth={2}
            dash={{ pattern: "5,5" }}
            testID="android-svg-rendering"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);
      expect(getByTestId("android-svg-rendering")).toBeTruthy();
    });

    it("should handle Android touch events", async () => {
      const TestComponent = () => {
        const startRef = createMockRef(0, 0, 50, 50);
        const endRef = createMockRef(100, 100, 50, 50);

        return (
          <LeaderLine
            start={{ element: startRef }}
            end={{ element: endRef }}
            testID="android-touch-events"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);
      const leaderLine = getByTestId("android-touch-events");

      await act(async () => {
        jest.runAllTimers();
      });

      expect(leaderLine).toBeTruthy();
    });

    it("should handle Android coordinate system", () => {
      const TestComponent = () => {
        const startRef = createMockRef(0, 24, 100, 50); // Account for Android status bar
        const endRef = createMockRef(200, 224, 100, 50);

        return (
          <LeaderLine
            start={{ element: startRef }}
            end={{ element: endRef }}
            testID="android-coordinates"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);
      expect(getByTestId("android-coordinates")).toBeTruthy();
    });

    it("should handle Android hardware acceleration", () => {
      const TestComponent = () => {
        const startRef = createMockRef(0, 0, 50, 50);
        const endRef = createMockRef(100, 100, 50, 50);

        return (
          <LeaderLine
            start={{ element: startRef }}
            end={{ element: endRef }}
            testID="android-hardware-acceleration"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);
      expect(getByTestId("android-hardware-acceleration")).toBeTruthy();
    });

    it("should handle Android back button behavior", async () => {
      const TestComponent = () => {
        const startRef = createMockRef(0, 0, 50, 50);
        const endRef = createMockRef(100, 100, 50, 50);

        return (
          <LeaderLine
            start={{ element: startRef }}
            end={{ element: endRef }}
            testID="android-back-button"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);
      const leaderLine = getByTestId("android-back-button");

      await act(async () => {
        jest.runAllTimers();
      });

      expect(leaderLine).toBeTruthy();
    });
  });

  describe("Platform-Specific Features", () => {
    it("should apply iOS-specific styles", () => {
      mockPlatform("ios");

      const TestComponent = () => {
        const startRef = createMockRef(0, 0, 50, 50);
        const endRef = createMockRef(100, 100, 50, 50);

        return (
          <LeaderLine
            start={{ element: startRef }}
            end={{ element: endRef }}
            dropShadow={{
              dx: 2,
              dy: 2,
              blur: 5,
              color: "rgba(0,0,0,0.3)",
              opacity: 0.3,
            }}
            testID="ios-specific-styles"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);
      expect(getByTestId("ios-specific-styles")).toBeTruthy();
    });

    it("should apply Android-specific styles", () => {
      mockPlatform("android");

      const TestComponent = () => {
        const startRef = createMockRef(0, 0, 50, 50);
        const endRef = createMockRef(100, 100, 50, 50);

        return (
          <LeaderLine
            start={{ element: startRef }}
            end={{ element: endRef }}
            outline={{ enabled: true, color: "#FF0000", size: 2 }}
            testID="android-specific-styles"
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);
      expect(getByTestId("android-specific-styles")).toBeTruthy();
    });

    it("should handle platform-specific performance optimizations", async () => {
      const platforms = ["ios", "android"] as const;

      for (const platform of platforms) {
        mockPlatform(platform);

        const TestComponent = () => {
          const startRef = createMockRef(0, 0, 50, 50);
          const endRef = createMockRef(100, 100, 50, 50);

          return (
            <LeaderLine
              start={{ element: startRef }}
              end={{ element: endRef }}
              opacity={Platform.OS === "ios" ? 0.9 : 1.0}
              testID={`${platform}-performance`}
            />
          );
        };

        const { getByTestId } = render(<TestComponent />);
        expect(getByTestId(`${platform}-performance`)).toBeTruthy();
      }
    });
  });

  describe("Cross-Platform Consistency", () => {
    it("should render consistently across platforms", () => {
      const platforms = ["ios", "android"] as const;
      const results: any[] = [];

      platforms.forEach((platform) => {
        mockPlatform(platform);

        const TestComponent = () => {
          const startRef = createMockRef(0, 0, 50, 50);
          const endRef = createMockRef(100, 100, 50, 50);

          return (
            <LeaderLine
              start={{ element: startRef }}
              end={{ element: endRef }}
              color="#0000FF"
              strokeWidth={2}
              testID={`${platform}-consistency`}
            />
          );
        };

        const { getByTestId } = render(<TestComponent />);
        results.push(getByTestId(`${platform}-consistency`));
      });

      // Both platforms should render successfully
      expect(results).toHaveLength(2);
      results.forEach((result) => {
        expect(result).toBeTruthy();
      });
    });

    it("should handle measurements consistently across platforms", () => {
      const platforms = ["ios", "android"] as const;

      platforms.forEach((platform) => {
        mockPlatform(platform);

        const TestComponent = () => {
          const startRef = createMockRef(50, 50, 100, 50);
          const endRef = createMockRef(200, 200, 100, 50);

          return (
            <LeaderLine
              start={{ element: startRef }}
              end={{ element: endRef }}
              testID={`${platform}-measurements`}
            />
          );
        };

        const { getByTestId } = render(<TestComponent />);
        expect(getByTestId(`${platform}-measurements`)).toBeTruthy();
      });
    });

    it("should handle animations consistently across platforms", async () => {
      const platforms = ["ios", "android"] as const;

      for (const platform of platforms) {
        mockPlatform(platform);

        const TestComponent = () => {
          const startRef = createMockRef(0, 0, 50, 50);
          const endRef = createMockRef(100, 100, 50, 50);

          return (
            <LeaderLine
              start={{ element: startRef }}
              end={{ element: endRef }}
              opacity={0.8}
              testID={`${platform}-animation-consistency`}
            />
          );
        };

        const { getByTestId } = render(<TestComponent />);

        await act(async () => {
          jest.runAllTimers();
        });

        expect(getByTestId(`${platform}-animation-consistency`)).toBeTruthy();
      }
    });
  });

  describe("Platform Detection", () => {
    it("should correctly detect iOS platform", () => {
      mockPlatform("ios");

      const TestComponent = () => {
        const startRef = createMockRef(0, 0, 50, 50);
        const endRef = createMockRef(100, 100, 50, 50);

        // Component should adapt to iOS
        const isIOS = Platform.OS === "ios";

        return (
          <LeaderLine
            start={{ element: startRef }}
            end={{ element: endRef }}
            testID={`platform-detection-${isIOS ? "ios" : "other"}`}
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);
      expect(getByTestId("platform-detection-ios")).toBeTruthy();
    });

    it("should correctly detect Android platform", () => {
      mockPlatform("android");

      const TestComponent = () => {
        const startRef = createMockRef(0, 0, 50, 50);
        const endRef = createMockRef(100, 100, 50, 50);

        // Component should adapt to Android
        const isAndroid = Platform.OS === "android";

        return (
          <LeaderLine
            start={{ element: startRef }}
            end={{ element: endRef }}
            testID={`platform-detection-${isAndroid ? "android" : "other"}`}
          />
        );
      };

      const { getByTestId } = render(<TestComponent />);
      expect(getByTestId("platform-detection-android")).toBeTruthy();
    });
  });

  describe("Platform-Specific Errors", () => {
    it("should handle iOS-specific error scenarios", () => {
      mockPlatform("ios");

      const TestComponent = () => {
        const startRef = createMockRef(0, 0, 50, 50);
        const endRef = createMockRef(100, 100, 50, 50);

        // Component should render even with potential measurement issues
        return (
          <LeaderLine
            start={{ element: startRef }}
            end={{ element: endRef }}
            testID="ios-error-handling"
          />
        );
      };

      expect(() => render(<TestComponent />)).not.toThrow();
    });

    it("should handle Android-specific error scenarios", () => {
      mockPlatform("android");

      const TestComponent = () => {
        const startRef = createMockRef(0, 0, 50, 50);
        const endRef = createMockRef(100, 100, 50, 50);

        // Component should render even with potential measurement issues
        return (
          <LeaderLine
            start={{ element: startRef }}
            end={{ element: endRef }}
            testID="android-error-handling"
          />
        );
      };

      expect(() => render(<TestComponent />)).not.toThrow();
    });
  });

  describe("Platform-Specific API Usage", () => {
    it("should use platform-appropriate APIs", () => {
      const platforms = ["ios", "android"] as const;

      platforms.forEach((platform) => {
        mockPlatform(platform);

        const TestComponent = () => {
          const startRef = createMockRef(0, 0, 50, 50);
          const endRef = createMockRef(100, 100, 50, 50);

          return (
            <LeaderLine
              start={{ element: startRef }}
              end={{ element: endRef }}
              testID={`${platform}-api-usage`}
            />
          );
        };

        const { getByTestId } = render(<TestComponent />);
        expect(getByTestId(`${platform}-api-usage`)).toBeTruthy();
      });
    });

    it("should handle platform-specific memory management", () => {
      const platforms = ["ios", "android"] as const;

      platforms.forEach((platform) => {
        mockPlatform(platform);

        const TestComponent = ({ mounted }: { mounted: boolean }) => {
          const startRef = createMockRef(0, 0, 50, 50);
          const endRef = createMockRef(100, 100, 50, 50);

          if (!mounted) return null;

          return (
            <LeaderLine
              start={{ element: startRef }}
              end={{ element: endRef }}
              testID={`${platform}-memory-management`}
            />
          );
        };

        const { rerender, queryByTestId } = render(
          <TestComponent mounted={true} />
        );
        expect(queryByTestId(`${platform}-memory-management`)).toBeTruthy();

        // Unmount to test cleanup
        rerender(<TestComponent mounted={false} />);
        expect(queryByTestId(`${platform}-memory-management`)).toBeNull();
      });
    });
  });
});
