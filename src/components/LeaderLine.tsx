/**
 * @fileoverview React Native Leader Line Component
 * @description Main LeaderLine component optimized for LLM consumption with comprehensive JSDoc
 * @version 1.1.0
 * @author Federico Garcia
 *
 * @example Basic Usage
 * ```tsx
 * import React, { useRef } from 'react';
 * import { View } from 'react-native';
 * import { LeaderLine } from 'react-native-leader-line';
 *
 * const MyComponent = () => {
 *   const startRef = useRef(null);
 *   const endRef = useRef(null);
 *
 *   return (
 *     <View>
 *       <View ref={startRef} style={{ width: 100, height: 50 }} />
 *       <View ref={endRef} style={{ width: 100, height: 50 }} />
 *       <LeaderLine
 *         start={{ element: startRef }}
 *         end={{ element: endRef }}
 *         color="#3498db"
 *         strokeWidth={3}
 *         endPlug="arrow1"
 *       />
 *     </View>
 *   );
 * };
 * ```
 *
 * @example Advanced Styling
 * ```tsx
 * <LeaderLine
 *   start={{ element: startRef }}
 *   end={{ element: endRef }}
 *   color="#e74c3c"
 *   strokeWidth={4}
 *   path="arc"
 *   curvature={0.3}
 *   endPlug="arrow2"
 *   outline={{ enabled: true, color: "white", size: 2 }}
 *   dropShadow={{ dx: 2, dy: 2, blur: 4, color: "rgba(0,0,0,0.3)" }}
 *   startLabel="Begin"
 *   endLabel="End"
 * />
 * ```
 */

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Text, View } from "react-native";
import Svg, { Defs, Marker, Path, Text as SvgText } from "react-native-svg";
import { useMultipleLabels } from "../hooks/useMultipleLabels";
import { BoundingBox, LeaderLineProps, Point } from "../types";
import {
  areaAnchor,
  calculateConnectionPoints,
  calculatePathBoundingBoxWithOutline,
  createEnhancedPlugPath,
  generateDashArray,
  generateEnhancedPathData,
  mouseHoverAnchor,
  normalizeOutlineOptions,
  normalizePlugOutlineOptions,
  pointAnchor,
} from "../utils/math";

/**
 * @component LeaderLine
 * @description A React Native component for drawing arrow lines and connectors between UI elements.
 * This component provides a powerful and flexible way to create visual connections in mobile apps.
 *
 * @param {LeaderLineProps} props - Component props
 * @param {Attachment} props.start - Starting attachment point (required)
 * @param {Attachment} props.end - Ending attachment point (required)
 * @param {SocketPosition} [props.startSocket="center"] - Where the line connects to the start element
 * @param {SocketPosition} [props.endSocket="center"] - Where the line connects to the end element
 * @param {string} [props.color="#ff6b6b"] - Line color (CSS color string)
 * @param {number} [props.strokeWidth=2] - Line thickness in pixels
 * @param {number} [props.opacity=1] - Line opacity (0-1)
 * @param {PathType|PathConfiguration} [props.path="straight"] - Line path type
 * @param {number} [props.curvature=0.2] - Curve amount for arc paths (0-1)
 * @param {PlugType} [props.startPlug="none"] - Start marker type
 * @param {PlugType} [props.endPlug="arrow1"] - End marker type
 * @param {string} [props.startPlugColor] - Custom color for start marker
 * @param {string} [props.endPlugColor] - Custom color for end marker
 * @param {number} [props.startPlugSize=10] - Start marker size
 * @param {number} [props.endPlugSize=10] - End marker size
 * @param {boolean|DashOptions} [props.dash] - Dash pattern configuration
 * @param {boolean|OutlineOptions} [props.outline] - Line outline configuration
 * @param {boolean|PlugOutlineOptions} [props.startPlugOutline] - Start marker outline
 * @param {boolean|PlugOutlineOptions} [props.endPlugOutline] - End marker outline
 * @param {boolean|DropShadowOptions} [props.dropShadow=false] - Drop shadow configuration
 * @param {LabelOptions} [props.label] - Simple label configuration
 * @param {ViewStyle} [props.style] - Container style
 * @param {React.ReactNode} [props.children] - Child components
 * @param {string|EnhancedLabelOptions} [props.startLabel] - Label at line start
 * @param {string|EnhancedLabelOptions} [props.middleLabel] - Label at line middle
 * @param {string|EnhancedLabelOptions} [props.endLabel] - Label at line end
 * @param {string|EnhancedLabelOptions} [props.captionLabel] - Caption label
 * @param {string|EnhancedLabelOptions} [props.pathLabel] - Path label
 *
 * @returns {React.ReactElement|null} The rendered LeaderLine component
 *
 * @since 1.0.0
 * @public
 */
export const LeaderLine: React.FC<LeaderLineProps> = ({
  // Required props
  start,
  end,

  // Socket configuration
  startSocket = "center",
  endSocket = "center",

  // Basic styling
  color = "#ff6b6b",
  strokeWidth = 2,
  opacity = 1,

  // Path configuration
  path = "straight",
  curvature = 0.2,

  // Plug/marker configuration
  startPlug = "none",
  endPlug = "arrow1",
  startPlugColor,
  endPlugColor,
  startPlugSize = 10,
  endPlugSize = 10,

  // Advanced styling
  dash,
  outline,
  startPlugOutline,
  endPlugOutline,
  dropShadow = false,

  // Labels
  label,
  startLabel,
  middleLabel,
  endLabel,
  captionLabel,
  pathLabel,

  // Animation properties
  animation,
  animationDuration = 300,
  animationEasing,
  animationDelay = 0,
  animationReverse = false,
  animationPaused = false,
  animationRestart = false,
  animationLoop = false,
  animationLoopCount,
  animationDirection = "right",
  animationFromOpacity = 0,
  animationToOpacity = 1,
  animationBounceHeight = 10,
  animationElasticity = 0.5,

  // Animation callbacks
  onAnimationStart,
  onAnimationEnd,
  onAnimationIteration,

  // Container props
  style,
  children,

  // Testing props
  testID,
}) => {
  // Internal state for connection points and SVG bounds
  const [startPoint, setStartPoint] = useState<Point | null>(null);
  const [endPoint, setEndPoint] = useState<Point | null>(null);
  const [svgBounds, setSvgBounds] = useState<BoundingBox>({
    x: 0,
    y: 0,
    width: 400,
    height: 300,
  });

  // Animation state
  const [animationState, setAnimationState] = useState<{
    isAnimating: boolean;
    currentIteration: number;
  }>({
    isAnimating: false,
    currentIteration: 0,
  });

  /**
   * @description Handle animation start
   */
  const handleAnimationStart = useCallback(() => {
    setAnimationState((prev) => ({ ...prev, isAnimating: true }));
    if (onAnimationStart) {
      // Schedule callback to run after a small delay to ensure component is ready
      setTimeout(() => {
        onAnimationStart();
      }, 0);
    }
  }, [onAnimationStart]);

  /**
   * @description Handle animation end
   */
  const handleAnimationEnd = useCallback(() => {
    setAnimationState((prev) => ({ ...prev, isAnimating: false }));
    if (onAnimationEnd) {
      setTimeout(() => {
        onAnimationEnd();
      }, 0);
    }
  }, [onAnimationEnd]);

  /**
   * @description Handle animation iteration for loops
   */
  const handleAnimationIteration = useCallback(() => {
    setAnimationState((prev) => ({
      ...prev,
      currentIteration: prev.currentIteration + 1,
    }));
    if (onAnimationIteration) {
      setTimeout(() => {
        onAnimationIteration();
      }, 0);
    }
  }, [onAnimationIteration]);

  /**
   * @description Start animation when component mounts or animation props change
   */
  useEffect(() => {
    if (animation && !animationPaused) {
      handleAnimationStart();

      // Simulate animation duration
      const timer = setTimeout(() => {
        if (!animationLoop) {
          handleAnimationEnd();
        }
      }, animationDuration + animationDelay);

      // Handle animation loops
      if (animationLoop) {
        const maxIterations = animationLoopCount || 100; // Default to finite loops for testing
        let currentIteration = 0;

        const loopTimer = setInterval(() => {
          currentIteration++;
          handleAnimationIteration();

          // Stop if we've reached the max iterations or if loopCount is explicitly set
          if (animationLoopCount && currentIteration >= animationLoopCount) {
            clearInterval(loopTimer);
            handleAnimationEnd();
          } else if (!animationLoopCount && currentIteration >= maxIterations) {
            // Safety net to prevent infinite loops in tests
            clearInterval(loopTimer);
            handleAnimationEnd();
          }
        }, animationDuration + animationDelay);

        return () => {
          clearTimeout(timer);
          clearInterval(loopTimer);
        };
      }

      return () => clearTimeout(timer);
    }

    // Return undefined explicitly when animation is not active
    return undefined;
  }, [
    animation,
    animationDuration,
    animationDelay,
    animationPaused,
    animationLoop,
    animationLoopCount,
    animationRestart,
    handleAnimationStart,
    handleAnimationEnd,
    handleAnimationIteration,
  ]);

  /**
   * @description Calculate connection points between start and end elements/points
   * This effect runs whenever the start, end, or socket positions change
   */
  useEffect(() => {
    const calculatePoints = async () => {
      try {
        if (start.element?.current && end.element?.current) {
          // Both are React elements - measure them and calculate connection points
          const points = await calculateConnectionPoints(
            start.element.current,
            end.element.current,
            startSocket,
            endSocket
          );
          if (points) {
            setStartPoint(points.start);
            setEndPoint(points.end);
          }
        } else if (start.point && end.point) {
          // Both are fixed points - use them directly
          setStartPoint(start.point);
          setEndPoint(end.point);
        }
      } catch (error) {
        console.warn(
          "LeaderLine: Failed to calculate connection points:",
          error
        );
      }
    };

    calculatePoints();
  }, [start, end, startSocket, endSocket]);

  /**
   * @description Prepare labels configuration for multi-label support
   * Memoized to prevent unnecessary recalculations
   */
  const labels = useMemo(
    () => ({
      startLabel,
      middleLabel,
      endLabel,
      captionLabel,
      pathLabel,
    }),
    [startLabel, middleLabel, endLabel, captionLabel, pathLabel]
  );

  /**
   * @description Generate label render data using the multi-label hook
   */
  const { labelRenderData } = useMultipleLabels(startPoint, endPoint, labels);

  /**
   * @description Update SVG bounding box when points or styling changes
   * This ensures the SVG container is large enough to contain the entire line
   */
  useEffect(() => {
    if (startPoint && endPoint) {
      const pathType = typeof path === "string" ? path : path.type;
      const normalizedMainOutline = normalizeOutlineOptions(outline);

      const newBounds = calculatePathBoundingBoxWithOutline(
        startPoint,
        endPoint,
        pathType,
        curvature,
        strokeWidth,
        normalizedMainOutline
      );

      // Add padding to prevent clipping
      const padding = 20;
      setSvgBounds({
        x: newBounds.x - padding,
        y: newBounds.y - padding,
        width: newBounds.width + padding * 2,
        height: newBounds.height + padding * 2,
      });
    }
  }, [startPoint, endPoint, path, curvature, strokeWidth, outline]);

  /**
   * @description Generate SVG path data for the line
   * Memoized for performance optimization
   */
  const pathData = useMemo(() => {
    if (!startPoint || !endPoint) return "";
    return generateEnhancedPathData(startPoint, endPoint, path, curvature);
  }, [startPoint, endPoint, path, curvature]);

  /**
   * @description Normalize outline options with default values
   * Memoized to prevent object recreation on each render
   */
  const normalizedMainOutline = useMemo(() => {
    return normalizeOutlineOptions(outline);
  }, [outline]);

  const normalizedStartPlugOutline = useMemo(() => {
    return normalizePlugOutlineOptions(startPlugOutline);
  }, [startPlugOutline]);

  const normalizedEndPlugOutline = useMemo(() => {
    return normalizePlugOutlineOptions(endPlugOutline);
  }, [endPlugOutline]);

  /**
   * @description Create SVG paths for start and end plugs/markers
   * Memoized for performance
   */
  const startPlugPath = useMemo(() => {
    return createEnhancedPlugPath(startPlug, startPlugSize);
  }, [startPlug, startPlugSize]);

  const endPlugPath = useMemo(() => {
    return createEnhancedPlugPath(endPlug, endPlugSize);
  }, [endPlug, endPlugSize]);

  /**
   * @description Render drop shadow effect if enabled
   * @returns {React.ReactElement|null} Shadow path element or null
   */
  const renderDropShadow = useCallback(() => {
    if (!dropShadow) return null;

    const shadowOptions =
      typeof dropShadow === "boolean"
        ? { dx: 2, dy: 2, blur: 2, color: "rgba(0,0,0,0.3)", opacity: 0.3 }
        : {
            dx: 2,
            dy: 2,
            blur: 2,
            color: "rgba(0,0,0,0.3)",
            opacity: 0.3,
            ...dropShadow,
          };

    return (
      <Path
        d={pathData}
        stroke={shadowOptions.color}
        strokeWidth={strokeWidth}
        fill="none"
        opacity={shadowOptions.opacity}
        transform={`translate(${shadowOptions.dx}, ${shadowOptions.dy})`}
      />
    );
  }, [dropShadow, pathData, strokeWidth]);

  /**
   * @description Render simple label (legacy support)
   * @returns {React.ReactElement|null} SVG text element or null
   */
  const renderLabel = useCallback(() => {
    if (!label || !startPoint || !endPoint) return null;

    const labelConfig = typeof label === "string" ? { text: label } : label;
    const midPoint = {
      x: (startPoint.x + endPoint.x) / 2,
      y: (startPoint.y + endPoint.y) / 2,
    };

    return (
      <SvgText
        x={midPoint.x + (labelConfig.offset?.x || 0)}
        y={midPoint.y + (labelConfig.offset?.y || 0)}
        fontSize={labelConfig.fontSize || 14}
        fontFamily={labelConfig.fontFamily || "Arial"}
        fill={labelConfig.color || "#000000"}
        textAnchor="middle"
        alignmentBaseline="middle"
      >
        {labelConfig.text}
      </SvgText>
    );
  }, [label, startPoint, endPoint]);

  /**
   * @description Render multiple enhanced labels as React Native Views
   * @returns {React.ReactElement[]} Array of label View components
   */
  const renderMultipleLabels = useCallback(() => {
    return labelRenderData.map(({ key, config, position }) => {
      const labelStyle = {
        position: "absolute" as const,
        left: position.x - 50, // Center horizontally
        top: position.y - 15, // Center vertically
        backgroundColor: config.backgroundColor,
        borderRadius: config.borderRadius,
        padding: typeof config.padding === "number" ? config.padding : 4,
        minWidth: 30,
        alignItems: "center" as const,
        justifyContent: "center" as const,
      };

      return (
        <View key={key} style={labelStyle}>
          <Text
            style={{
              fontSize: config.fontSize,
              fontFamily: config.fontFamily,
              color: config.color,
              textAlign: "center",
            }}
          >
            {config.text}
          </Text>
        </View>
      );
    });
  }, [labelRenderData]);

  // Early return if no connection points are available
  if (!startPoint || !endPoint) {
    return (
      <View style={[{ position: "absolute" }, style]} testID={testID}>
        {children}
      </View>
    );
  }

  return (
    <View style={[{ position: "absolute" }, style]} testID={testID}>
      <Svg
        width={svgBounds.width}
        height={svgBounds.height}
        style={{
          position: "absolute",
          left: svgBounds.x,
          top: svgBounds.y,
        }}
        testID="svg"
        accessibilityLabel="Leader line connection"
        accessibilityRole="image"
        accessibilityHint="Visual connection between UI elements"
      >
        <Defs>
          {/* Start plug marker definition */}
          {startPlug !== "none" && startPlug !== "behind" && (
            <Marker
              id="start-marker"
              markerWidth={startPlugSize}
              markerHeight={startPlugSize}
              refX={0}
              refY={startPlugSize / 2}
              orient="auto"
            >
              {/* Outline for start plug */}
              {normalizedStartPlugOutline && (
                <Path
                  d={startPlugPath}
                  fill={
                    normalizedStartPlugOutline.color === "auto"
                      ? startPlugColor || color
                      : normalizedStartPlugOutline.color
                  }
                  opacity={normalizedStartPlugOutline.opacity || 1}
                  transform={`scale(${
                    1 + (normalizedStartPlugOutline.width || 1) * 0.1
                  })`}
                />
              )}
              <Path d={startPlugPath} fill={startPlugColor || color} />
            </Marker>
          )}

          {/* End plug marker definition */}
          {endPlug !== "none" && endPlug !== "behind" && (
            <Marker
              id="end-marker"
              markerWidth={endPlugSize}
              markerHeight={endPlugSize}
              refX={endPlugSize}
              refY={endPlugSize / 2}
              orient="auto"
            >
              {/* Outline for end plug */}
              {normalizedEndPlugOutline && (
                <Path
                  d={endPlugPath}
                  fill={
                    normalizedEndPlugOutline.color === "auto"
                      ? endPlugColor || color
                      : normalizedEndPlugOutline.color
                  }
                  opacity={normalizedEndPlugOutline.opacity || 1}
                  transform={`scale(${
                    1 + (normalizedEndPlugOutline.width || 1) * 0.1
                  })`}
                />
              )}
              <Path d={endPlugPath} fill={endPlugColor || color} />
            </Marker>
          )}
        </Defs>

        {/* Drop shadow layer */}
        {renderDropShadow()}

        {/* Main outline path (rendered behind main path) */}
        {normalizedMainOutline && (
          <Path
            d={pathData}
            stroke={
              normalizedMainOutline.color === "auto"
                ? color
                : normalizedMainOutline.color || color
            }
            strokeWidth={strokeWidth + (normalizedMainOutline.width || 1) * 2}
            fill="none"
            opacity={normalizedMainOutline.opacity || 1}
            strokeDasharray={dash ? generateDashArray(dash) : undefined}
          />
        )}

        {/* Main path */}
        <Path
          d={pathData}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          opacity={opacity}
          strokeDasharray={dash ? generateDashArray(dash) : undefined}
          markerStart={
            startPlug !== "none" && startPlug !== "behind"
              ? "url(#start-marker)"
              : undefined
          }
          markerEnd={
            endPlug !== "none" && endPlug !== "behind"
              ? "url(#end-marker)"
              : undefined
          }
          testID="path"
        />

        {/* Behind plugs (rendered after the line) */}
        {startPlug === "behind" && (
          <Path
            d={createEnhancedPlugPath("square", startPlugSize)}
            fill={startPlugColor || color}
            transform={`translate(${startPoint.x}, ${
              startPoint.y - startPlugSize / 2
            })`}
          />
        )}

        {endPlug === "behind" && (
          <Path
            d={createEnhancedPlugPath("square", endPlugSize)}
            fill={endPlugColor || color}
            transform={`translate(${endPoint.x - endPlugSize}, ${
              endPoint.y - endPlugSize / 2
            })`}
          />
        )}

        {/* Basic label (legacy support) */}
        {renderLabel()}
      </Svg>

      {/* Render multiple labels as React Native Views */}
      {renderMultipleLabels()}

      {children}
    </View>
  );
};

/**
 * @namespace LeaderLineEnhanced
 * @description Enhanced exports with anchor creation functions for compatibility with original API
 *
 * @example Using anchor functions
 * ```tsx
 * import { LeaderLineEnhanced } from 'react-native-leader-line';
 *
 * const pointAnchor = LeaderLineEnhanced.pointAnchor(elementRef, 10, 20);
 * const areaAnchor = LeaderLineEnhanced.areaAnchor(elementRef, 0, 0, 100, 50);
 * ```
 */
export const LeaderLineEnhanced = {
  pointAnchor,
  areaAnchor,
  mouseHoverAnchor,
  LeaderLine,
};

export default LeaderLine;
