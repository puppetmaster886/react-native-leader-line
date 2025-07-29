/**
 * @fileoverview Memoized Path Component
 * @description Performance-optimized SVG path component for LeaderLine
 * @version 1.2.0
 * @author Federico Garcia
 */

import React from 'react';
import { Path } from 'react-native-svg';

/**
 * @interface MemoizedPathProps
 * @description Props for the memoized path component
 */
export interface MemoizedPathProps {
  /** SVG path data */
  d: string;
  /** Stroke color */
  stroke?: string;
  /** Stroke width */
  strokeWidth?: number;
  /** Fill color */
  fill?: string;
  /** Stroke opacity */
  strokeOpacity?: number;
  /** Fill opacity */
  fillOpacity?: number;
  /** Stroke dash array */
  strokeDasharray?: string;
  /** Stroke dash offset */
  strokeDashoffset?: number;
  /** Stroke line cap */
  strokeLinecap?: 'butt' | 'round' | 'square';
  /** Stroke line join */
  strokeLinejoin?: 'miter' | 'round' | 'bevel';
  /** Opacity */
  opacity?: number;
  /** Transform */
  transform?: string;
  /** Test ID for testing */
  testID?: string;
}

/**
 * @component MemoizedPath
 * @description Performance-optimized SVG path component with React.memo
 * 
 * This component is memoized with a custom comparison function to prevent
 * unnecessary re-renders when path properties haven't changed significantly.
 */
const MemoizedPath: React.FC<MemoizedPathProps> = React.memo(({
  d,
  stroke = 'black',
  strokeWidth = 2,
  fill = 'none',
  strokeOpacity = 1,
  fillOpacity = 1,
  strokeDasharray,
  strokeDashoffset,
  strokeLinecap = 'round',
  strokeLinejoin = 'round',
  opacity = 1,
  transform,
  testID
}) => {
  return (
    <Path
      d={d}
      stroke={stroke}
      strokeWidth={strokeWidth}
      fill={fill}
      strokeOpacity={strokeOpacity}
      fillOpacity={fillOpacity}
      strokeDasharray={strokeDasharray}
      strokeDashoffset={strokeDashoffset}
      strokeLinecap={strokeLinecap}
      strokeLinejoin={strokeLinejoin}
      opacity={opacity}
      transform={transform}
      testID={testID}
    />
  );
}, (prevProps, nextProps) => {
  // Custom comparison function with tolerance for floating point numbers
  const floatEquals = (a?: number, b?: number, tolerance = 0.001) => {
    if (a === undefined && b === undefined) return true;
    if (a === undefined || b === undefined) return false;
    return Math.abs(a - b) < tolerance;
  };

  // Check all props for equality
  return (
    prevProps.d === nextProps.d &&
    prevProps.stroke === nextProps.stroke &&
    floatEquals(prevProps.strokeWidth, nextProps.strokeWidth) &&
    prevProps.fill === nextProps.fill &&
    floatEquals(prevProps.strokeOpacity, nextProps.strokeOpacity) &&
    floatEquals(prevProps.fillOpacity, nextProps.fillOpacity) &&
    prevProps.strokeDasharray === nextProps.strokeDasharray &&
    floatEquals(prevProps.strokeDashoffset, nextProps.strokeDashoffset) &&
    prevProps.strokeLinecap === nextProps.strokeLinecap &&
    prevProps.strokeLinejoin === nextProps.strokeLinejoin &&
    floatEquals(prevProps.opacity, nextProps.opacity) &&
    prevProps.transform === nextProps.transform &&
    prevProps.testID === nextProps.testID
  );
});

// Set display name for debugging
MemoizedPath.displayName = 'MemoizedPath';

export default MemoizedPath;