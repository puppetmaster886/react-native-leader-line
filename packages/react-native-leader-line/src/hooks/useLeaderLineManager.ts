import { useCallback, useEffect, useRef, useState } from "react";
import { LeaderLineProps } from "../types";

// Simplified manager for basic functionality
export const useLeaderLineManager = (options: any = {}) => {
  const [lines, setLines] = useState<Map<string, any>>(new Map());
  const [isInitialized, setIsInitialized] = useState(false);

  // Performance tracking
  const [updateQueue, setUpdateQueue] = useState<
    Array<{ id: string; props: any }>
  >([]);
  const updateTimeoutRef = useRef<number | null>(null);

  // Batch updates for better performance
  const processBatchUpdates = useCallback(() => {
    if (updateQueue.length === 0) return;

    setLines((prev) => {
      const newLines = new Map(prev);

      updateQueue.forEach(({ id, props }) => {
        const existing = newLines.get(id);
        if (existing) {
          newLines.set(id, {
            ...existing,
            props: { ...existing.props, ...props },
            lastUpdate: Date.now(),
          });
        }
      });

      return newLines;
    });

    setUpdateQueue([]);
  }, [updateQueue]);

  // Debounced batch update
  const queueUpdate = useCallback(
    (id: string, props: Partial<LeaderLineProps>) => {
      setUpdateQueue((prev) => {
        const existingIndex = prev.findIndex((item) => item.id === id);
        const newQueue = [...prev];

        if (existingIndex >= 0) {
          const existingItem = newQueue[existingIndex];
          if (existingItem) {
            newQueue[existingIndex] = {
              id,
              props: { ...existingItem.props, ...props },
            };
          }
        } else {
          newQueue.push({ id, props });
        }

        return newQueue;
      });

      // Clear existing timeout and set new one
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }

      updateTimeoutRef.current = setTimeout(() => {
        processBatchUpdates();
      }, 16); // ~60fps batching
    },
    [processBatchUpdates]
  );

  const createLine = useCallback(
    (id: string, props: Partial<LeaderLineProps> = {}) => {
      setLines((prev) => {
        const newLines = new Map(prev);
        newLines.set(id, {
          id,
          props,
          isVisible: true,
          lastUpdate: Date.now(),
        });
        return newLines;
      });
      return id;
    },
    []
  );

  // Alias for createLine to match test expectations
  const addLine = useCallback(
    (id: string, props: Partial<LeaderLineProps> = {}) => {
      return createLine(id, props);
    },
    [createLine]
  );

  const updateLine = useCallback(
    (id: string, props: Partial<LeaderLineProps>) => {
      if (options.batchUpdates !== false) {
        queueUpdate(id, props);
      } else {
        // Immediate update
        setLines((prev) => {
          const newLines = new Map(prev);
          const existing = newLines.get(id);
          if (existing) {
            newLines.set(id, {
              ...existing,
              props: { ...existing.props, ...props },
              lastUpdate: Date.now(),
            });
          }
          return newLines;
        });
      }
    },
    [options.batchUpdates, queueUpdate]
  );

  // Enhanced bulk operations
  const updateMultipleLines = useCallback(
    (updates: Array<{ id: string; props: Partial<LeaderLineProps> }>) => {
      setLines((prev) => {
        const newLines = new Map(prev);

        updates.forEach(({ id, props }) => {
          const existing = newLines.get(id);
          if (existing) {
            newLines.set(id, {
              ...existing,
              props: { ...existing.props, ...props },
              lastUpdate: Date.now(),
            });
          }
        });

        return newLines;
      });
    },
    []
  );

  const removeLine = useCallback((id: string) => {
    setLines((prev) => {
      const newLines = new Map(prev);
      newLines.delete(id);
      return newLines;
    });
  }, []);

  const showLine = useCallback(
    (id: string) => {
      updateLine(id, { opacity: 1 });
    },
    [updateLine]
  );

  const hideLine = useCallback(
    (id: string) => {
      updateLine(id, { opacity: 0 });
    },
    [updateLine]
  );

  const refreshAll = useCallback(() => {
    setLines((prev) => {
      const newLines = new Map(prev);
      for (const [id, line] of newLines) {
        newLines.set(id, {
          ...line,
          lastUpdate: Date.now(),
        });
      }
      return newLines;
    });
  }, []);

  const clear = useCallback(() => {
    setLines(new Map());
  }, []);

  // Alias for clear to match test expectations
  const clearAll = useCallback(() => {
    clear();
  }, [clear]);

  // Alias for clearAll
  const removeAllLines = useCallback(() => {
    clear();
  }, [clear]);

  // Get all line IDs
  const getLineIds = useCallback(() => {
    return Array.from(lines.keys());
  }, [lines]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setIsInitialized(true);
  }, []);

  // Container component that renders all lines
  const LeaderLineContainer = useCallback(({ containerRef }: { containerRef?: any }) => {
    const React = require('react');
    const { LeaderLine } = require('../components/LeaderLine');

    return React.createElement(
      React.Fragment,
      null,
      Array.from(lines.values()).map((line) =>
        React.createElement(LeaderLine, {
          key: line.id,
          containerRef,
          ...line.props,
        })
      )
    );
  }, [lines]);

  return {
    lines: Array.from(lines.values()),
    isInitialized,
    createLine,
    addLine,
    updateLine,
    updateMultipleLines, // New bulk update method
    removeLine,
    removeAllLines,
    getLineIds,
    showLine,
    hideLine,
    refreshAll,
    clear,
    clearAll,
    getLine: (id: string) => lines.get(id),
    hasLine: (id: string) => lines.has(id),
    LeaderLineContainer,

    // Performance utilities
    getPerformanceMetrics: () => ({
      totalLines: lines.size,
      queuedUpdates: updateQueue.length,
      lastUpdateTime: Math.max(
        ...Array.from(lines.values()).map((l) => l.lastUpdate || 0)
      ),
    }),
  };
};

export default useLeaderLineManager;
