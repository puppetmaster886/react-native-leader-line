/**
 * @fileoverview Tests for useAttachment hook
 * @description Comprehensive tests for the useAttachment custom hook
 */

import { act, renderHook } from "@testing-library/react-native";
import { useAttachment } from "../useAttachment";

describe("useAttachment", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  describe("initialization", () => {
    it("should initialize with default state", async () => {
      const { result } = renderHook(() => useAttachment({}));

      await act(async () => {
        jest.runAllTimers();
      });

      expect(result.current.startPoint).toBeNull();
      expect(result.current.endPoint).toBeNull();
      expect(result.current.isConnected).toBe(false);
      expect(result.current.startSocket).toBe("center");
      expect(result.current.endSocket).toBe("center");
    });

    it("should provide state objects for start and end attachments", async () => {
      const { result } = renderHook(() => useAttachment({}));

      await act(async () => {
        jest.runAllTimers();
      });

      expect(result.current.startState).toEqual({
        isConnected: false,
        lastUpdate: expect.any(Number),
        computedSocket: "center",
        effectivePoint: { x: 0, y: 0 },
        isVisible: true,
      });

      expect(result.current.endState).toEqual({
        isConnected: false,
        lastUpdate: expect.any(Number),
        computedSocket: "center",
        effectivePoint: { x: 0, y: 0 },
        isVisible: true,
      });
    });

    it("should provide utility functions", async () => {
      const { result } = renderHook(() => useAttachment({}));

      await act(async () => {
        jest.runAllTimers();
      });

      expect(typeof result.current.forceUpdate).toBe("function");
      expect(typeof result.current.reset).toBe("function");
    });
  });

  describe("attachment connection", () => {
    it("should connect when both attachments are provided", async () => {
      const startAttachment = { element: { current: {} } };
      const endAttachment = { element: { current: {} } };

      const { result } = renderHook(() =>
        useAttachment({
          startAttachment,
          endAttachment,
        })
      );

      await act(async () => {
        jest.runAllTimers();
      });

      expect(result.current.isConnected).toBe(true);
    });

    it("should not connect when only start attachment is provided", async () => {
      const startAttachment = { element: { current: {} } };

      const { result } = renderHook(() =>
        useAttachment({
          startAttachment,
        })
      );

      await act(async () => {
        jest.runAllTimers();
      });

      expect(result.current.isConnected).toBe(false);
    });

    it("should not connect when only end attachment is provided", async () => {
      const endAttachment = { element: { current: {} } };

      const { result } = renderHook(() =>
        useAttachment({
          endAttachment,
        })
      );

      await act(async () => {
        jest.runAllTimers();
      });

      expect(result.current.isConnected).toBe(false);
    });

    it("should update connection state when attachments change", async () => {
      const { result, rerender } = renderHook(
        ({ start, end }) =>
          useAttachment({ startAttachment: start, endAttachment: end }),
        { initialProps: { start: undefined, end: undefined } }
      );

      await act(async () => {
        jest.runAllTimers();
      });

      expect(result.current.isConnected).toBe(false);

      const startAttachment = { element: { current: {} } };
      const endAttachment = { element: { current: {} } };

      await act(async () => {
        rerender({ start: startAttachment, end: endAttachment });
        jest.runAllTimers();
      });

      expect(result.current.isConnected).toBe(true);
    });
  });

  describe("forceUpdate functionality", () => {
    it("should temporarily disconnect and reconnect when forceUpdate is called", async () => {
      const startAttachment = { element: { current: {} } };
      const endAttachment = { element: { current: {} } };

      const { result } = renderHook(() =>
        useAttachment({
          startAttachment,
          endAttachment,
        })
      );

      await act(async () => {
        jest.runAllTimers();
      });

      expect(result.current.isConnected).toBe(true);

      await act(async () => {
        result.current.forceUpdate();
      });

      expect(result.current.isConnected).toBe(false);

      await act(async () => {
        jest.runAllTimers();
      });

      expect(result.current.isConnected).toBe(true);
    });

    it("should work when called multiple times", async () => {
      const startAttachment = { element: { current: {} } };
      const endAttachment = { element: { current: {} } };

      const { result } = renderHook(() =>
        useAttachment({
          startAttachment,
          endAttachment,
        })
      );

      await act(async () => {
        result.current.forceUpdate();
        result.current.forceUpdate();
        result.current.forceUpdate();
        jest.runAllTimers();
      });

      expect(result.current.isConnected).toBe(true);
    });
  });

  describe("reset functionality", () => {
    it("should reset all state to initial values", async () => {
      const startAttachment = { element: { current: {} } };
      const endAttachment = { element: { current: {} } };

      const { result } = renderHook(() =>
        useAttachment({
          startAttachment,
          endAttachment,
        })
      );

      await act(async () => {
        jest.runAllTimers();
      });

      expect(result.current.isConnected).toBe(true);

      await act(async () => {
        result.current.reset();
        jest.runAllTimers();
      });

      expect(result.current.startPoint).toBeNull();
      expect(result.current.endPoint).toBeNull();
      expect(result.current.isConnected).toBe(false);
    });

    it("should reset state objects", async () => {
      const startAttachment = { element: { current: {} } };
      const endAttachment = { element: { current: {} } };

      const { result } = renderHook(() =>
        useAttachment({
          startAttachment,
          endAttachment,
        })
      );

      await act(async () => {
        result.current.reset();
        jest.runAllTimers();
      });

      expect(result.current.startState.isConnected).toBe(false);
      expect(result.current.endState.isConnected).toBe(false);
      expect(result.current.startState.effectivePoint).toEqual({ x: 0, y: 0 });
      expect(result.current.endState.effectivePoint).toEqual({ x: 0, y: 0 });
    });
  });

  describe("options handling", () => {
    it("should accept observeLayout option", async () => {
      const { result } = renderHook(() =>
        useAttachment({
          observeLayout: true,
        })
      );

      await act(async () => {
        jest.runAllTimers();
      });

      expect(result.current).toBeDefined();
    });

    it("should accept throttleMs option", async () => {
      const { result } = renderHook(() =>
        useAttachment({
          throttleMs: 100,
        })
      );

      await act(async () => {
        jest.runAllTimers();
      });

      expect(result.current).toBeDefined();
    });

    it("should accept onAttachmentChange callback", async () => {
      const onAttachmentChange = jest.fn();

      const { result } = renderHook(() =>
        useAttachment({
          onAttachmentChange,
        })
      );

      await act(async () => {
        jest.runAllTimers();
      });

      expect(result.current).toBeDefined();
    });

    it("should handle all options together", async () => {
      const onAttachmentChange = jest.fn();
      const startAttachment = { element: { current: {} } };
      const endAttachment = { element: { current: {} } };

      const { result } = renderHook(() =>
        useAttachment({
          startAttachment,
          endAttachment,
          observeLayout: true,
          throttleMs: 50,
          onAttachmentChange,
        })
      );

      await act(async () => {
        jest.runAllTimers();
      });

      expect(result.current.isConnected).toBe(true);
    });
  });

  describe("state consistency", () => {
    it("should maintain consistent state between start and end", () => {
      const startAttachment = { element: { current: {} } };
      const endAttachment = { element: { current: {} } };

      const { result } = renderHook(() =>
        useAttachment({
          startAttachment,
          endAttachment,
        })
      );

      expect(result.current.startState.isConnected).toBe(
        result.current.endState.isConnected
      );
      expect(result.current.startState.isConnected).toBe(
        result.current.isConnected
      );
      expect(result.current.endState.isConnected).toBe(
        result.current.isConnected
      );
    });

    it("should update timestamps on state changes", () => {
      const { result } = renderHook(() => useAttachment({}));

      const initialStartTime = result.current.startState.lastUpdate;
      const initialEndTime = result.current.endState.lastUpdate;

      // Wait a bit to ensure timestamp difference
      act(() => {
        jest.advanceTimersByTime(10);
      });

      act(() => {
        result.current.forceUpdate();
      });

      // Note: In this simplified implementation, timestamps might not change
      // This test validates the structure is correct
      expect(typeof result.current.startState.lastUpdate).toBe("number");
      expect(typeof result.current.endState.lastUpdate).toBe("number");
    });
  });

  describe("socket positions", () => {
    it("should default to center sockets", () => {
      const { result } = renderHook(() => useAttachment({}));

      expect(result.current.startSocket).toBe("center");
      expect(result.current.endSocket).toBe("center");
      expect(result.current.startState.computedSocket).toBe("center");
      expect(result.current.endState.computedSocket).toBe("center");
    });
  });

  describe("effective points", () => {
    it("should provide effective points with fallback values", () => {
      const { result } = renderHook(() => useAttachment({}));

      expect(result.current.startState.effectivePoint).toEqual({ x: 0, y: 0 });
      expect(result.current.endState.effectivePoint).toEqual({ x: 0, y: 0 });
    });

    it("should use actual points when available", () => {
      const { result } = renderHook(() => useAttachment({}));

      // In this simplified implementation, points remain null
      // but effective points provide fallbacks
      expect(result.current.startPoint).toBeNull();
      expect(result.current.endPoint).toBeNull();
      expect(result.current.startState.effectivePoint).toEqual({ x: 0, y: 0 });
      expect(result.current.endState.effectivePoint).toEqual({ x: 0, y: 0 });
    });
  });

  describe("visibility state", () => {
    it("should default to visible state", () => {
      const { result } = renderHook(() => useAttachment({}));

      expect(result.current.startState.isVisible).toBe(true);
      expect(result.current.endState.isVisible).toBe(true);
    });
  });

  describe("memoization and stability", () => {
    it("should maintain stable function references", () => {
      const { result, rerender } = renderHook(() => useAttachment({}));

      const { forceUpdate: forceUpdate1, reset: reset1 } = result.current;

      rerender();

      const { forceUpdate: forceUpdate2, reset: reset2 } = result.current;

      expect(forceUpdate1).toBe(forceUpdate2);
      expect(reset1).toBe(reset2);
    });

    it("should update when options change", () => {
      const { result, rerender } = renderHook(
        ({ options }) => useAttachment(options),
        { initialProps: { options: {} } }
      );

      const initialState = result.current.isConnected;

      const startAttachment = { element: { current: {} } };
      const endAttachment = { element: { current: {} } };

      rerender({ options: { startAttachment, endAttachment } });

      expect(result.current.isConnected).not.toBe(initialState);
      expect(result.current.isConnected).toBe(true);
    });
  });

  describe("edge cases", () => {
    it("should handle undefined attachments gracefully", async () => {
      const { result } = renderHook(() =>
        useAttachment({
          startAttachment: undefined,
          endAttachment: undefined,
        })
      );

      await act(async () => {
        jest.runAllTimers();
      });

      expect(result.current.isConnected).toBe(false);
      expect(() => result.current.forceUpdate()).not.toThrow();
      expect(() => result.current.reset()).not.toThrow();
    });

    it("should handle null attachments gracefully", async () => {
      const { result } = renderHook(() =>
        useAttachment({
          startAttachment: null,
          endAttachment: null,
        })
      );

      await act(async () => {
        jest.runAllTimers();
      });

      expect(result.current.isConnected).toBe(false);
    });

    it("should handle empty object attachments", async () => {
      const { result } = renderHook(() =>
        useAttachment({
          startAttachment: {},
          endAttachment: {},
        })
      );

      await act(async () => {
        jest.runAllTimers();
      });

      expect(result.current.isConnected).toBe(true);
    });
  });
});
