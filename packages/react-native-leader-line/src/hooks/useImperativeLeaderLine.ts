/**
 * @fileoverview Hook for Imperative Leader Line API
 * @description React hook that provides imperative leader line functionality
 * @version 1.2.0
 * @author Federico Garcia
 *
 * @example Basic Usage
 * ```tsx
 * import React, { useRef } from 'react';
 * import { View } from 'react-native';
 * import { useImperativeLeaderLine } from 'react-native-leader-line';
 *
 * const MyComponent = () => {
 *   const startRef = useRef(null);
 *   const endRef = useRef(null);
 *   
 *   const { createLine, LeaderLineContainer } = useImperativeLeaderLine();
 *   
 *   const handleCreateLine = () => {
 *     const line = createLine(startRef, endRef, {
 *       color: 'blue',
 *       size: 4,
 *       endPlug: 'arrow1'
 *     });
 *     
 *     // Use imperative API
 *     setTimeout(() => line.setOptions({ color: 'red' }), 1000);
 *     setTimeout(() => line.hide(), 2000);
 *   };
 *   
 *   return (
 *     <View>
 *       <View ref={startRef} />
 *       <View ref={endRef} />
 *       <LeaderLineContainer />
 *       <Button onPress={handleCreateLine} title="Create Line" />
 *     </View>
 *   );
 * };
 * ```
 */

import React, { useState, useCallback, useRef } from 'react';
import { View } from 'react-native';
import { 
  LeaderLineImperative, 
  ImperativeLeaderLineOptions 
} from '../components/LeaderLineImperative';
import { Point } from '../types';

/**
 * @interface ImperativeLineInstance
 * @description Interface for managing imperative leader line instances
 */
export interface ImperativeLineInstance {
  /** Unique identifier for this line instance */
  id: string;
  /** The leader line instance */
  line: LeaderLineImperative;
  /** React component to render */
  component: React.ReactElement;
}

/**
 * @interface UseImperativeLeaderLineReturn
 * @description Return value from useImperativeLeaderLine hook
 */
export interface UseImperativeLeaderLineReturn {
  /** Create a new leader line */
  createLine: (
    start: React.RefObject<any> | Point,
    end: React.RefObject<any> | Point,
    options?: ImperativeLeaderLineOptions
  ) => LeaderLineImperative;
  /** Remove a specific line by ID */
  removeLine: (lineId: string) => void;
  /** Remove all lines */
  removeAllLines: () => void;
  /** Get all active lines */
  getActiveLines: () => ImperativeLineInstance[];
  /** Container component to render all lines */
  LeaderLineContainer: React.ComponentType;
}

/**
 * @hook useImperativeLeaderLine
 * @description Hook for managing imperative leader lines in React components
 * @returns {UseImperativeLeaderLineReturn} Imperative API functions and components
 * 
 * @example Multiple Lines Management
 * ```tsx
 * const { createLine, removeLine, removeAllLines, LeaderLineContainer } = useImperativeLeaderLine();
 * 
 * const line1 = createLine(ref1, ref2, { color: 'red' });
 * const line2 = createLine(ref2, ref3, { color: 'blue' });
 * 
 * // Remove specific line
 * removeLine(line1.id);
 * 
 * // Remove all lines
 * removeAllLines();
 * ```
 */
export function useImperativeLeaderLine(): UseImperativeLeaderLineReturn {
  const [lines, setLines] = useState<Map<string, ImperativeLineInstance>>(new Map());
  const lineIdCounter = useRef(0);

  /**
   * @function generateLineId
   * @description Generate a unique ID for a line instance
   * @returns {string} Unique line ID
   */
  const generateLineId = useCallback((): string => {
    lineIdCounter.current += 1;
    return `leader-line-${lineIdCounter.current}-${Date.now()}`;
  }, []);

  /**
   * @function createLine
   * @description Create a new imperative leader line
   * @param {React.RefObject<any> | Point} start - Start element or point
   * @param {React.RefObject<any> | Point} end - End element or point
   * @param {ImperativeLeaderLineOptions} options - Line options
   * @returns {LeaderLineImperative} Leader line instance with additional methods
   */
  const createLine = useCallback((
    start: React.RefObject<any> | Point,
    end: React.RefObject<any> | Point,
    options: ImperativeLeaderLineOptions = {}
  ): LeaderLineImperative => {
    const lineId = generateLineId();
    
    // Create render callback that updates the lines state
    const renderCallback = (component: React.ReactElement) => {
      setLines(prevLines => {
        const newLines = new Map(prevLines);
        
        if (component.props.style?.display === 'none') {
          // Component is being removed
          newLines.delete(lineId);
        } else {
          // Component is being added/updated
          const existingInstance = newLines.get(lineId);
          if (existingInstance) {
            newLines.set(lineId, {
              ...existingInstance,
              component: React.cloneElement(component, { key: lineId })
            });
          }
        }
        
        return newLines;
      });
    };

    // Create the imperative leader line instance
    const lineInstance = new LeaderLineImperative(start, end, options, renderCallback);
    
    // Add custom remove method that cleans up from hook state
    const originalRemove = lineInstance.remove.bind(lineInstance);
    lineInstance.remove = () => {
      originalRemove();
      setLines(prevLines => {
        const newLines = new Map(prevLines);
        newLines.delete(lineId);
        return newLines;
      });
    };

    // Add the line to our state when it's first created
    const initialComponent = React.createElement(View, { 
      key: lineId, 
      style: { position: 'absolute' } 
    });
    
    setLines(prevLines => {
      const newLines = new Map(prevLines);
      newLines.set(lineId, {
        id: lineId,
        line: lineInstance,
        component: initialComponent
      });
      return newLines;
    });

    // Extend instance with ID for external reference
    (lineInstance as any).id = lineId;

    return lineInstance;
  }, [generateLineId]);

  /**
   * @function removeLine
   * @description Remove a specific line by ID
   * @param {string} lineId - ID of the line to remove
   * @returns {void}
   */
  const removeLine = useCallback((lineId: string): void => {
    const lineInstance = lines.get(lineId);
    if (lineInstance) {
      lineInstance.line.remove();
    }
  }, [lines]);

  /**
   * @function removeAllLines
   * @description Remove all active lines
   * @returns {void}
   */
  const removeAllLines = useCallback((): void => {
    lines.forEach(lineInstance => {
      lineInstance.line.remove();
    });
    setLines(new Map());
  }, [lines]);

  /**
   * @function getActiveLines
   * @description Get all currently active line instances
   * @returns {ImperativeLineInstance[]} Array of active line instances
   */
  const getActiveLines = useCallback((): ImperativeLineInstance[] => {
    return Array.from(lines.values());
  }, [lines]);

  /**
   * @component LeaderLineContainer
   * @description Container component that renders all active leader lines
   * @returns {React.ReactElement} Container with all line components
   */
  const LeaderLineContainer: React.ComponentType = useCallback(() => {
    const lineComponents = Array.from(lines.values()).map(lineInstance => 
      lineInstance.component
    );

    return React.createElement(
      View,
      {
        style: {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        } as any,
        pointerEvents: 'none',
        key: 'leader-line-container'
      },
      ...lineComponents
    );
  }, [lines]);

  return {
    createLine,
    removeLine,
    removeAllLines,
    getActiveLines,
    LeaderLineContainer
  };
}

/**
 * @hook useLeaderLineCompatibility
 * @description Hook that provides global leader-line compatibility
 * @returns {Object} Global LeaderLine constructor and utilities
 * 
 * @example Global API (leader-line compatibility)
 * ```tsx
 * const { LeaderLine } = useLeaderLineCompatibility();
 * 
 * // Use like original leader-line
 * const line = new LeaderLine(startElement, endElement, {
 *   color: 'coral',
 *   size: 4
 * });
 * ```
 */
export function useLeaderLineCompatibility() {
  const { createLine, LeaderLineContainer } = useImperativeLeaderLine();

  // Create a constructor function that mimics the original LeaderLine
  const LeaderLineConstructor = function(
    this: any,
    start: React.RefObject<any> | Point,
    end: React.RefObject<any> | Point,
    options: ImperativeLeaderLineOptions = {}
  ) {
    const line = createLine(start, end, options);
    
    // Copy all methods to 'this' for constructor pattern
    Object.setPrototypeOf(this, line);
    Object.assign(this, line);
    
    return this;
  };

  // Add static methods/properties for compatibility
  LeaderLineConstructor.prototype = LeaderLineImperative.prototype;
  
  return {
    LeaderLine: LeaderLineConstructor,
    LeaderLineContainer,
    createLine
  };
}

export default useImperativeLeaderLine;