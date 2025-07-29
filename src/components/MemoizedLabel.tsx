/**
 * @fileoverview Memoized Label Component
 * @description Performance-optimized label component for LeaderLine
 * @version 1.2.0
 * @author Federico Garcia
 */

import React from 'react';
import { Text } from 'react-native-svg';

/**
 * @interface ExtendedLabelOptions
 * @description Extended label options for memoized label component
 */
export interface ExtendedLabelOptions {
  color?: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string | number;
  textAnchor?: 'start' | 'middle' | 'end';
  opacity?: number;
  rotation?: number;
  dx?: number;
  dy?: number;
}

/**
 * @interface MemoizedLabelProps
 * @description Props for the memoized label component
 */
export interface MemoizedLabelProps {
  /** Label text content */
  text: string;
  /** X position */
  x: number;
  /** Y position */
  y: number;
  /** Label options */
  options?: ExtendedLabelOptions;
  /** Test ID for testing */
  testID?: string;
}

/**
 * @component MemoizedLabel
 * @description Performance-optimized label component with React.memo
 * 
 * This component is memoized to prevent unnecessary re-renders when
 * parent components update but label props haven't changed.
 */
const MemoizedLabel: React.FC<MemoizedLabelProps> = React.memo(({
  text,
  x,
  y,
  options = {},
  testID
}) => {
  const {
    color = '#000000',
    fontSize = 14,
    fontFamily = 'Arial',
    fontWeight = 'normal',
    textAnchor = 'middle',
    opacity = 1,
    rotation = 0,
    dx = 0,
    dy = 0,
  } = options;

  return (
    <Text
      x={x + dx}
      y={y + dy}
      fill={color}
      fontSize={fontSize}
      fontFamily={fontFamily}
      fontWeight={fontWeight}
      textAnchor={textAnchor}
      opacity={opacity}
      transform={rotation !== 0 ? `rotate(${rotation} ${x} ${y})` : undefined}
      testID={testID}
    >
      {text}
    </Text>
  );
}, (prevProps, nextProps) => {
  // Custom comparison function for better memoization
  return (
    prevProps.text === nextProps.text &&
    prevProps.x === nextProps.x &&
    prevProps.y === nextProps.y &&
    JSON.stringify(prevProps.options) === JSON.stringify(nextProps.options) &&
    prevProps.testID === nextProps.testID
  );
});

// Set display name for debugging
MemoizedLabel.displayName = 'MemoizedLabel';

export default MemoizedLabel;