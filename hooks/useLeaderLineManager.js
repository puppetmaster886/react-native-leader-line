import { useCallback, useEffect, useRef, useState } from 'react';

import LeaderLineClass from '../components/LeaderLineClass';
// Simple event emitter for line updates
class LineEventEmitter {
  constructor() {
    this.listeners = new Set();
  }
  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }
  emit() {
    this.listeners.forEach(callback => callback());
  }
}
const globalLineEmitter = new LineEventEmitter();
export const useLeaderLineManager = () => {
  const [lineStates, setLineStates] = useState(new Map());
  const [, forceRender] = useState(0);
  const [linesArray, setLinesArray] = useState([]);
  const measureTimeoutRef = useRef(null);
  // Non-hook function to measure a line
  const measureLineSync = async line => {
    try {
      return await line.measureElements();
    } catch (error) {
      console.error('Error measuring line elements:', error);
      return null;
    }
  };
  const createLeaderLine = useCallback((startElement, endElement, options = {}) => {
    // Create line with simple non-hook callback
    const line = new LeaderLineClass(startElement, endElement, options, () => {
      // This doesn't call any hooks - just emits an event
      globalLineEmitter.emit();
    });
    console.log('➕ createLeaderLine - Adding line with ID:', line.id);

    // Add to state immediately
    setLineStates(prev => {
      const newMap = new Map(prev);
      newMap.set(line.id, { line, points: null, measuring: false });
      console.log('➕ setLineStates - Map size after adding:', newMap.size);
      return newMap;
    });

    // Schedule measurement with improved timing
    setTimeout(async () => {
      console.log('📐 Starting measurement for line:', line.id);

      // Mark as measuring to prevent removal during measurement
      setLineStates(prev => {
        const newMap = new Map(prev);
        const existing = newMap.get(line.id);
        if (existing) {
          newMap.set(line.id, { ...existing, measuring: true });
        }
        return newMap;
      });

      const points = await measureLineSync(line);
      console.log('📐 Measurement completed for line:', line.id, 'Points:', !!points);

      setLineStates(prev => {
        const newMap = new Map(prev);
        const existing = newMap.get(line.id);
        if (existing) {
          newMap.set(line.id, { ...existing, points, measuring: false });
          console.log('📐 Updated line points in map for:', line.id);
        } else {
          console.log('⚠️ Line not found in map when updating points:', line.id);
        }
        return newMap;
      });
    }, 150); // Increased timeout to ensure elements are ready

    return line;
  }, []);

  const removeLine = useCallback(line => {
    console.log('🗑️ Removing line:', line.id);
    setLineStates(prev => {
      const newMap = new Map(prev);
      const existing = newMap.get(line.id);

      // Only remove if not currently measuring
      if (existing && !existing.measuring) {
        newMap.delete(line.id);
        console.log('🗑️ Line removed from map:', line.id);
      } else if (existing && existing.measuring) {
        console.log('⏳ Delaying removal - line is measuring:', line.id);
        // Schedule removal after measurement
        setTimeout(() => {
          setLineStates(current => {
            const currentMap = new Map(current);
            currentMap.delete(line.id);
            console.log('🗑️ Delayed removal completed:', line.id);
            return currentMap;
          });
        }, 500);
      }
      return newMap;
    });
  }, []);

  const measureAllLines = useCallback(async () => {
    const currentLines = Array.from(lineStates.values());
    for (const { line } of currentLines) {
      const points = await measureLineSync(line);
      setLineStates(prev => {
        const newMap = new Map(prev);
        const existing = newMap.get(line.id);
        if (existing) {
          newMap.set(line.id, { ...existing, points });
        }
        return newMap;
      });
    }
  }, [lineStates]);
  const forceUpdate = useCallback(() => {
    forceRender(prev => prev + 1);
  }, []);
  // Listen to global line events
  useEffect(() => {
    const unsubscribe = globalLineEmitter.subscribe(() => {
      // Re-measure all lines when any line changes
      measureAllLines();
    });
    return () => {
      unsubscribe();
    };
  }, [measureAllLines]);
  const renderLines = useCallback(() => {
    const rendered = [];
    lineStates.forEach(({ line, points }) => {
      if (line.isVisible) {
        const element = line.render(points);
        if (element) {
          rendered.push(element);
        }
      }
    });
    return rendered;
  }, [lineStates]);
  // Update lines array whenever lineStates changes
  useEffect(() => {
    const newLinesArray = Array.from(lineStates.values()).map(({ line }) => line);
    console.log('🔄 useEffect - lineStates changed. Size:', lineStates.size, 'Lines:', newLinesArray.length);
    setLinesArray(newLinesArray);
  }, [lineStates]);
  return {
    createLeaderLine,
    removeLine,
    measureAllLines,
    renderLines,
    forceUpdate,
    lines: linesArray,
  };
};
export default useLeaderLineManager;
