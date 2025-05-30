import { useCallback, useEffect, useState } from "react";
import { LeaderLineProps } from "../types";

// Simplified manager for basic functionality
export const useLeaderLineManager = (options: any = {}) => {
  const [lines, setLines] = useState<Map<string, any>>(new Map());
  const [isInitialized, setIsInitialized] = useState(false);

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

  useEffect(() => {
    setIsInitialized(true);
  }, []);

  return {
    lines: Array.from(lines.values()),
    isInitialized,
    createLine,
    addLine, // Added for test compatibility
    updateLine,
    removeLine,
    showLine,
    hideLine,
    refreshAll,
    clear,
    clearAll, // Added for test compatibility
    getLine: (id: string) => lines.get(id),
    hasLine: (id: string) => lines.has(id),
  };
};

export default useLeaderLineManager;
