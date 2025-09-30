/**
 * @fileoverview React Native Leader Line Component
 * @description Professional LeaderLine component for drawing connections between UI elements
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
 */

import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";
import { Text, View } from "react-native";
import Svg, { Path, Text as SvgText } from "react-native-svg";
import { useMultipleLabels } from "../hooks/useMultipleLabels";
import { BoundingBox, LeaderLineProps, Point, SocketPosition } from "../types";
import {
  areaAnchor,
  calculateConnectionPointsRelative,
  calculatePathBoundingBoxWithOutline,
  calculatePlugTransform,
  createEnhancedPlugPath,
  generateDashArray,
  generateEnhancedPathData,
  getSocketPoint,
  measureElementWithLayout,
  mouseHoverAnchor,
  normalizeOutlineOptions,
  pointAnchor,
} from "../utils/math";

/**
 * Utility function to check if two points are different
 */
const pointsAreDifferent = (
  p1: Point | null,
  p2: Point | null,
  threshold = 1
): boolean => {
  if (!p1 || !p2) return p1 !== p2;
  return Math.abs(p1.x - p2.x) > threshold || Math.abs(p1.y - p2.y) > threshold;
};

/**
 * Utility function to smoothly interpolate between two points
 */
const interpolatePoints = (
  current: Point | null,
  target: Point | null,
  factor = 0.3
): Point | null => {
  if (!current || !target) return target;
  return {
    x: current.x + (target.x - current.x) * factor,
    y: current.y + (target.y - current.y) * factor,
  };
};

/**
 * Hook to force re-calculation when elements layout changes
 */
const useLayoutRecalculation = (
  start: { element?: React.RefObject<View>; point?: Point },
  end: { element?: React.RefObject<View>; point?: Point },
  startSocket: SocketPosition,
  endSocket: SocketPosition,
  setStartPoint: (point: Point | null) => void,
  setEndPoint: (point: Point | null) => void,
  setElementsReady: (ready: boolean) => void,
  containerRef: React.RefObject<View>
) => {
  const recalculatePoints = useCallback(async () => {
    if (start.element?.current && end.element?.current) {
      try {
        const points = await calculateConnectionPointsRelative(
          start.element.current,
          end.element.current,
          startSocket,
          endSocket,
          containerRef
        );
        if (points) {
          setStartPoint(points.start);
          setEndPoint(points.end);
          setElementsReady(true);
        }
      } catch (error) {
        // Silent error handling for production
      }
    }
  }, [
    start,
    end,
    startSocket,
    endSocket,
    setStartPoint,
    setEndPoint,
    setElementsReady,
    containerRef,
  ]);

  return recalculatePoints;
};

/**
 * @component LeaderLine
 * @description A React Native component for drawing arrow lines and connectors between UI elements.
 * This component provides a powerful and flexible way to create visual connections in mobile apps.
 */
export const LeaderLine: React.FC<LeaderLineProps> = ({
  // Required props
  start,
  end,

  // Container configuration
  containerRef,

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
  animationDelay = 0,
  animationPaused = false,
  animationLoop = false,
  animationLoopCount,

  // Animation callbacks
  onAnimationStart,
  onAnimationEnd,
  onAnimationIteration,

  // Container props
  style,
  children,

  // Testing props
  testID,

  // Update configuration
  updateThreshold = 300, // Increased to 300ms for smoother scroll performance
  optimizeUpdates = true,
  smoothAnimations = false, // Disabled smooth interpolation to prevent overcompensation
}) => {
  // Auto-ref: LeaderLine's own container reference
  const leaderLineContainerRef = useRef<View>(null);

  // Internal state for connection points and SVG bounds
  const [startPoint, setStartPoint] = useState<Point | null>(null);
  const [endPoint, setEndPoint] = useState<Point | null>(null);
  const [svgBounds, setSvgBounds] = useState<BoundingBox>({
    x: 0,
    y: 0,
    width: 400,
    height: 300,
  });

  // Track layout readiness
  const [elementsReady, setElementsReady] = useState(false);

  // Store previous points for comparison
  const previousPointsRef = useRef<{ start: Point | null; end: Point | null }>({
    start: null,
    end: null,
  });

  // Hook for layout-triggered recalculation
  useLayoutRecalculation(
    start,
    end,
    startSocket,
    endSocket,
    setStartPoint,
    setEndPoint,
    setElementsReady,
    leaderLineContainerRef
  );

  // Animation state
  const [, setAnimationState] = useState<{
    isAnimating: boolean;
    currentIteration: number;
  }>({
    isAnimating: false,
    currentIteration: 0,
  });

  /**
   * Handle animation start
   */
  const handleAnimationStart = useCallback(() => {
    setAnimationState((prev) => ({ ...prev, isAnimating: true }));
    if (onAnimationStart) {
      setTimeout(() => {
        onAnimationStart();
      }, 0);
    }
  }, [onAnimationStart]);

  /**
   * Handle animation end
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
   * Handle animation iteration for loops
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
   * Start animation when component mounts or animation props change
   */
  useEffect(() => {
    if (animation && !animationPaused) {
      handleAnimationStart();

      const timer = setTimeout(() => {
        if (!animationLoop) {
          handleAnimationEnd();
        }
      }, animationDuration + animationDelay);

      if (animationLoop) {
        const maxIterations = animationLoopCount || 100;
        let currentIteration = 0;

        const loopTimer = setInterval(() => {
          currentIteration++;
          handleAnimationIteration();

          if (animationLoopCount && currentIteration >= animationLoopCount) {
            clearInterval(loopTimer);
            handleAnimationEnd();
          } else if (!animationLoopCount && currentIteration >= maxIterations) {
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

    return undefined;
  }, [
    animation,
    animationDuration,
    animationDelay,
    animationPaused,
    animationLoop,
    animationLoopCount,
    handleAnimationStart,
    handleAnimationEnd,
    handleAnimationIteration,
  ]);

  /**
   * Optimized auto-update mechanism for animated elements
   */
  useEffect(() => {
    if (!optimizeUpdates || updateThreshold <= 0) return;

    const calculatePointsOptimized = async () => {
      try {
        let newStartPoint: Point | null = null;
        let newEndPoint: Point | null = null;

        if (start.element?.current && end.element?.current) {
          const points = await calculateConnectionPointsRelative(
            start.element.current,
            end.element.current,
            startSocket,
            endSocket,
            containerRef
          );
          if (points) {
            newStartPoint = points.start;
            newEndPoint = points.end;
          }
        } else if (start.element?.current && end.point) {
          if (containerRef?.current) {
            try {
              const elementPromise = new Promise<Point | null>((resolve) => {
                start.element!.current!.measureLayout(
                  containerRef.current!,
                  (x: number, y: number, width: number, height: number) => {
                    const layout = {
                      x: 0,
                      y: 0,
                      width,
                      height,
                      pageX: x,
                      pageY: y,
                      timestamp: Date.now(),
                    };
                    const socketPoint = getSocketPoint(layout, startSocket);
                    resolve(socketPoint);
                  },
                  () => {
                    resolve(null);
                  }
                );
              });

              newStartPoint = await elementPromise;
              newEndPoint = end.point;
            } catch (error) {
              // Silent error handling
            }
          }
        } else if (start.point && end.element?.current) {
          if (containerRef?.current) {
            try {
              const elementPromise = new Promise<Point | null>((resolve) => {
                end.element!.current!.measureLayout(
                  containerRef.current!,
                  (x: number, y: number, width: number, height: number) => {
                    const layout = {
                      x: 0,
                      y: 0,
                      width,
                      height,
                      pageX: x,
                      pageY: y,
                      timestamp: Date.now(),
                    };
                    const socketPoint = getSocketPoint(layout, endSocket);
                    resolve(socketPoint);
                  },
                  () => {
                    resolve(null);
                  }
                );
              });

              newStartPoint = start.point;
              newEndPoint = await elementPromise;
            } catch (error) {
              // Silent error handling
            }
          }
        }

        // Only update if points actually changed (larger threshold to reduce oversensitivity)
        const startChanged = pointsAreDifferent(
          newStartPoint,
          previousPointsRef.current.start,
          5
        );
        const endChanged = pointsAreDifferent(
          newEndPoint,
          previousPointsRef.current.end,
          5
        );

        if (startChanged || endChanged) {
          if (newStartPoint && newEndPoint) {
            // Apply smooth interpolation if enabled (less aggressive)
            const finalStartPoint = smoothAnimations
              ? interpolatePoints(
                  previousPointsRef.current.start,
                  newStartPoint,
                  0.8
                )
              : newStartPoint;
            const finalEndPoint = smoothAnimations
              ? interpolatePoints(
                  previousPointsRef.current.end,
                  newEndPoint,
                  0.8
                )
              : newEndPoint;

            if (finalStartPoint && finalEndPoint) {
              setStartPoint(finalStartPoint);
              setEndPoint(finalEndPoint);
              setElementsReady(true);

              // Update previous points
              previousPointsRef.current = {
                start: finalStartPoint,
                end: finalEndPoint,
              };
            }
          }
        }
      } catch (error) {
        // Silent error handling for production
      }
    };

    // Start the update interval with optimized threshold
    const intervalId = setInterval(calculatePointsOptimized, updateThreshold);

    return () => {
      clearInterval(intervalId);
    };
  }, [
    start,
    end,
    startSocket,
    endSocket,
    containerRef,
    optimizeUpdates,
    updateThreshold,
  ]);

  /**
   * Initial calculation of connection points (only runs once or when dependencies change)
   */
  useEffect(() => {
    const calculateInitialPoints = async () => {
      try {
        if (start.element?.current && end.element?.current) {
          const points = await calculateConnectionPointsRelative(
            start.element.current,
            end.element.current,
            startSocket,
            endSocket,
            containerRef
          );
          if (points) {
            setStartPoint(points.start);
            setEndPoint(points.end);
            setElementsReady(true);

            // Store initial points
            previousPointsRef.current = {
              start: points.start,
              end: points.end,
            };
          } else {
            setElementsReady(false);
          }
        } else if (start.element?.current && end.point) {
          if (containerRef?.current) {
            const elementPromise = new Promise<Point | null>((resolve) => {
              start.element!.current!.measureLayout(
                containerRef.current!,
                (x: number, y: number, width: number, height: number) => {
                  const layout = {
                    x: 0,
                    y: 0,
                    width,
                    height,
                    pageX: x,
                    pageY: y,
                    timestamp: Date.now(),
                  };
                  const socketPoint = getSocketPoint(layout, startSocket);
                  resolve(socketPoint);
                },
                () => {
                  resolve(null);
                }
              );
            });

            const relativeStartPoint = await elementPromise;
            if (relativeStartPoint) {
              setStartPoint(relativeStartPoint);
              setEndPoint(end.point);
              setElementsReady(true);

              previousPointsRef.current = {
                start: relativeStartPoint,
                end: end.point,
              };
            } else {
              setElementsReady(false);
            }
          } else {
            const startLayout = await measureElementWithLayout(start.element);
            if (startLayout) {
              const rawStartPoint = getSocketPoint(startLayout, startSocket);
              setStartPoint(rawStartPoint);
              setEndPoint(end.point);
              setElementsReady(true);

              previousPointsRef.current = {
                start: rawStartPoint,
                end: end.point,
              };
            } else {
              setElementsReady(false);
            }
          }
        } else if (start.point && end.element?.current) {
          if (containerRef?.current) {
            const elementPromise = new Promise<Point | null>((resolve) => {
              end.element!.current!.measureLayout(
                containerRef.current!,
                (x: number, y: number, width: number, height: number) => {
                  const layout = {
                    x: 0,
                    y: 0,
                    width,
                    height,
                    pageX: x,
                    pageY: y,
                    timestamp: Date.now(),
                  };
                  const socketPoint = getSocketPoint(layout, endSocket);
                  resolve(socketPoint);
                },
                () => {
                  resolve(null);
                }
              );
            });

            const relativeEndPoint = await elementPromise;
            if (relativeEndPoint) {
              setStartPoint(start.point);
              setEndPoint(relativeEndPoint);
              setElementsReady(true);

              previousPointsRef.current = {
                start: start.point,
                end: relativeEndPoint,
              };
            } else {
              setElementsReady(false);
            }
          } else {
            const endLayout = await measureElementWithLayout(end.element);
            if (endLayout) {
              const rawEndPoint = getSocketPoint(endLayout, endSocket);
              setStartPoint(start.point);
              setEndPoint(rawEndPoint);
              setElementsReady(true);

              previousPointsRef.current = {
                start: start.point,
                end: rawEndPoint,
              };
            } else {
              setElementsReady(false);
            }
          }
        } else if (start.point && end.point) {
          setStartPoint(start.point);
          setEndPoint(end.point);
          setElementsReady(true);

          previousPointsRef.current = {
            start: start.point,
            end: end.point,
          };
        } else {
          setElementsReady(false);
        }
      } catch (error) {
        setElementsReady(false);
      }
    };

    // Reduced debounce for faster initial response
    const timer = setTimeout(() => {
      calculateInitialPoints();
    }, 10); // Further reduced from 16ms to 10ms for immediate response

    return () => clearTimeout(timer);
  }, [start, end, startSocket, endSocket, containerRef]);

  /**
   * Prepare labels configuration for multi-label support
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
   * Generate label render data using the multi-label hook
   */
  const { labelRenderData } = useMultipleLabels(startPoint, endPoint, labels);

  /**
   * Update SVG bounds when points change
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

      const padding = 20;
      const rawX = newBounds.x - padding;
      const rawY = newBounds.y - padding;

      const finalBounds = {
        x: Math.max(0, rawX),
        y: Math.max(0, rawY),
        width: newBounds.width + padding * 2 + Math.max(0, -rawX),
        height: newBounds.height + padding * 2 + Math.max(0, -rawY),
      };

      setSvgBounds(finalBounds);
    }
  }, [startPoint, endPoint, path, curvature, strokeWidth, outline]);

  /**
   * Calculate coordinate offset for SVG positioning
   */
  const coordinateOffset = useMemo(() => {
    if (!startPoint || !endPoint) return { x: 0, y: 0 };

    const padding = 20;
    const originalBounds = calculatePathBoundingBoxWithOutline(
      startPoint,
      endPoint,
      typeof path === "string" ? path : path.type,
      curvature,
      strokeWidth,
      normalizeOutlineOptions(outline)
    );

    return {
      x: originalBounds.x - padding,
      y: originalBounds.y - padding,
    };
  }, [startPoint, endPoint, path, curvature, strokeWidth, outline]);

  /**
   * Calculate SVG style with corrected positioning
   */
  const svgStyle = useMemo(() => {
    if (!startPoint || !endPoint)
      return { position: "relative" as const, left: 0, top: 0 };

    // Use coordinateOffset for consistent positioning
    return {
      position: "absolute" as const,
      left: coordinateOffset.x,
      top: coordinateOffset.y,
    };
  }, [startPoint, endPoint, coordinateOffset]);

  /**
   * Generate SVG path data for the line (corrected positioning)
   */
  const pathData = useMemo(() => {
    if (!startPoint || !endPoint) return "";

    try {
      // Ajustar coordenadas relativas a la nueva posición del SVG
      const adjustedStart = {
        x: startPoint.x - coordinateOffset.x,
        y: startPoint.y - coordinateOffset.y,
      };
      const adjustedEnd = {
        x: endPoint.x - coordinateOffset.x,
        y: endPoint.y - coordinateOffset.y,
      };

      const pathDataResult = generateEnhancedPathData(
        adjustedStart,
        adjustedEnd,
        path,
        curvature
      );

      // Validate path data
      if (!pathDataResult || pathDataResult.length === 0) {
        // Fallback to simple line
        return `M ${adjustedStart.x} ${adjustedStart.y} L ${adjustedEnd.x} ${adjustedEnd.y}`;
      }

      return pathDataResult;
    } catch (error) {
      // Fallback to simple line in case of error
      const adjustedStart = {
        x: startPoint.x - coordinateOffset.x,
        y: startPoint.y - coordinateOffset.y,
      };
      const adjustedEnd = {
        x: endPoint.x - coordinateOffset.x,
        y: endPoint.y - coordinateOffset.y,
      };
      return `M ${adjustedStart.x} ${adjustedStart.y} L ${adjustedEnd.x} ${adjustedEnd.y}`;
    }
  }, [startPoint, endPoint, path, curvature, coordinateOffset]);

  /**
   * Normalize outline options with default values
   */
  const normalizedMainOutline = useMemo(() => {
    return normalizeOutlineOptions(outline);
  }, [outline]);

  /**
   * Create SVG paths for start and end plugs/markers as direct paths
   */
  const startPlugPath = useMemo(() => {
    try {
      const path = createEnhancedPlugPath(startPlug, startPlugSize);
      return path && path.length > 0 ? path : null;
    } catch (error) {
      return null;
    }
  }, [startPlug, startPlugSize]);

  const endPlugPath = useMemo(() => {
    try {
      const path = createEnhancedPlugPath(endPlug, endPlugSize);
      return path && path.length > 0 ? path : null;
    } catch (error) {
      return null;
    }
  }, [endPlug, endPlugSize]);

  /**
   * Calculate transforms for drawing plugs as direct paths
   */
  const plugTransforms = useMemo(() => {
    if (!startPoint || !endPoint) return null;

    // Use the same coordinate adjustment as labels and behind plugs
    const adjustedStart = {
      x: startPoint.x - coordinateOffset.x,
      y: startPoint.y - coordinateOffset.y,
    };
    const adjustedEnd = {
      x: endPoint.x - coordinateOffset.x,
      y: endPoint.y - coordinateOffset.y,
    };

    return {
      start: calculatePlugTransform(
        adjustedStart,
        adjustedEnd,
        false,
        startPlugSize
      ),
      end: calculatePlugTransform(
        adjustedStart,
        adjustedEnd,
        true,
        endPlugSize
      ),
    };
  }, [startPoint, endPoint, coordinateOffset, path, curvature]);
  /**
   * Render drop shadow effect if enabled
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
   * Render simple label (legacy support)
   */
  const renderLabel = useCallback(() => {
    if (!label || !startPoint || !endPoint) return null;

    const labelConfig = typeof label === "string" ? { text: label } : label;
    const midPoint = {
      x: (startPoint.x + endPoint.x) / 2 - coordinateOffset.x,
      y: (startPoint.y + endPoint.y) / 2 - coordinateOffset.y,
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
  }, [label, startPoint, endPoint, coordinateOffset]);

  /**
   * Render multiple enhanced labels as React Native Views
   */
  const renderMultipleLabels = useCallback(() => {
    return labelRenderData.map(({ key, config, position }) => {
      const labelStyle = {
        position: "absolute" as const,
        left: position.x - 50,
        top: position.y - 15,
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
  if (!startPoint || !endPoint || !elementsReady) {
    return (
      <View
        style={[
          {
            position: "relative",
            zIndex: 999999,
            minWidth: 50,
            minHeight: 50,
          },
          style,
        ]}
        testID={testID}
      >
        {children}
      </View>
    );
  }

  return (
    <View
      ref={leaderLineContainerRef}
      style={[
        {
          position: "absolute",
          zIndex: 999999,
          minWidth: 50,
          minHeight: 50,
        },
        style,
      ]}
      testID={testID}
      onLayout={() => {}}
    >
      <Svg
        width={svgBounds.width}
        height={svgBounds.height}
        style={svgStyle}
        testID="svg"
        accessibilityLabel="Leader line connection"
        accessibilityRole="image"
        accessibilityHint="Visual connection between UI elements"
        onLayout={() => {}}
      >
        {/* No more Defs section with problematic markers */}

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

        {/* Main path - NO MARKERS */}
        <Path
          d={pathData}
          stroke={color}
          strokeWidth={Math.max(0.1, strokeWidth)}
          fill="none"
          opacity={Math.max(0, Math.min(1, opacity))}
          strokeDasharray={dash ? generateDashArray(dash) : undefined}
          testID="path"
        />

        {/* Draw plugs as direct paths to avoid marker issues */}
        {startPlug !== "none" &&
          startPlug !== "behind" &&
          startPlugPath &&
          plugTransforms && (
            <Path
              d={startPlugPath}
              fill={startPlugColor || color}
              transform={`translate(${plugTransforms.start.position.x}, ${plugTransforms.start.position.y}) rotate(${plugTransforms.start.rotation})`}
            />
          )}

        {endPlug !== "none" &&
          endPlug !== "behind" &&
          endPlugPath &&
          plugTransforms && (
            <Path
              d={endPlugPath}
              fill={endPlugColor || color}
              transform={`translate(${plugTransforms.end.position.x}, ${plugTransforms.end.position.y}) rotate(${plugTransforms.end.rotation})`}
            />
          )}

        {/* Behind plugs (rendered after the line) */}
        {startPlug === "behind" && (
          <Path
            d={createEnhancedPlugPath("square", startPlugSize)}
            fill={startPlugColor || color}
            transform={`translate(${startPoint.x - coordinateOffset.x}, ${
              startPoint.y - coordinateOffset.y - startPlugSize / 2
            })`}
          />
        )}

        {endPlug === "behind" && (
          <Path
            d={createEnhancedPlugPath("square", endPlugSize)}
            fill={endPlugColor || color}
            transform={`translate(${
              endPoint.x - coordinateOffset.x - endPlugSize
            }, ${endPoint.y - coordinateOffset.y - endPlugSize / 2})`}
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
 * Enhanced exports with anchor creation functions for compatibility with original API
 */
export const LeaderLineEnhanced = {
  pointAnchor,
  areaAnchor,
  mouseHoverAnchor,
  LeaderLine,
};

export default LeaderLine;
