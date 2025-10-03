import React from "react";
import {
  BoundingBox,
  ElementLayout,
  PathConfiguration,
  PathType,
  PlugType,
  Point,
  SocketGravity,
  SocketPosition,
} from "../types";

/**
 * Check if measurement is valid (not 0x0 dimensions)
 */
const isValidMeasurement = (layout: ElementLayout): boolean => {
  return layout.width > 0 && layout.height > 0;
};

/**
 * Calculate the distance between two points
 */
export const getDistance = (p1: Point, p2: Point): number => {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
};

/**
 * Calculate the angle between two points in radians
 */
export const getAngle = (p1: Point, p2: Point): number => {
  return Math.atan2(p2.y - p1.y, p2.x - p1.x);
};

/**
 * Calculate the angle between two points in degrees
 */
export const getAngleDegrees = (p1: Point, p2: Point): number => {
  return (getAngle(p1, p2) * 180) / Math.PI;
};

/**
 * Calculate the tangent angle at the start or end of a path
 */
export const calculatePathTangentAngle = (
  start: Point,
  end: Point,
  pathType: PathType | PathConfiguration,
  curvature: number = 0.2,
  startSocket?: SocketPosition,
  endSocket?: SocketPosition,
  isEndPoint: boolean = true
): number => {
  const type = typeof pathType === "string" ? pathType : pathType.type;

  switch (type) {
    case "straight":
      // For straight lines, use the direct angle
      return getAngleDegrees(start, end);

    case "arc": {
      // For arc, calculate tangent based on control points
      const downward = end.y > start.y;
      const circle8rad = (Math.PI / 8) * (downward ? -1 : 1);
      const angle = Math.atan2(end.y - start.y, end.x - start.x);

      if (isEndPoint) {
        // Tangent at end point
        const cp2Angle = Math.PI - angle - circle8rad;
        const distance = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
        const CIRCLE_CP = 0.5522847498;
        const crLen = (distance / Math.sqrt(2)) * CIRCLE_CP * (1 + curvature);
        const cp2x = end.x + Math.cos(cp2Angle) * crLen;
        const cp2y = end.y + Math.sin(cp2Angle) * crLen * -1;
        return (Math.atan2(end.y - cp2y, end.x - cp2x) * 180) / Math.PI;
      } else {
        // Tangent at start point
        const cp1Angle = -angle + circle8rad;
        const distance = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
        const CIRCLE_CP = 0.5522847498;
        const crLen = (distance / Math.sqrt(2)) * CIRCLE_CP * (1 + curvature);
        const cp1x = start.x + Math.cos(cp1Angle) * crLen;
        const cp1y = start.y + Math.sin(cp1Angle) * crLen * -1;
        return (Math.atan2(cp1y - start.y, cp1x - start.x) * 180) / Math.PI;
      }
    }

    case "fluid": {
      // For fluid paths, calculate tangent from control points
      const dx = end.x - start.x;
      const dy = end.y - start.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const MIN_GRAVITY = 30;
      let len = distance / 2;
      if (len < MIN_GRAVITY) len = MIN_GRAVITY;
      len = len * (0.5 + curvature);

      const getSocketOffset = (socket: SocketPosition | undefined, isStart: boolean): { x: number, y: number } => {
        if (!socket || socket === 'auto' || socket === 'center') {
          // Auto-detect based on dominant direction
          if (Math.abs(dx) > Math.abs(dy)) {
            if (isStart) {
              return dx > 0 ? { x: len, y: 0 } : { x: -len, y: 0 };
            } else {
              return dx > 0 ? { x: -len, y: 0 } : { x: len, y: 0 };
            }
          } else {
            if (isStart) {
              return dy > 0 ? { x: 0, y: len } : { x: 0, y: -len };
            } else {
              return dy > 0 ? { x: 0, y: -len } : { x: 0, y: len };
            }
          }
        }

        switch (socket) {
          case 'top': return { x: 0, y: -len };
          case 'right': return { x: len, y: 0 };
          case 'bottom': return { x: 0, y: len };
          case 'left': return { x: -len, y: 0 };
          case 'top_left': return { x: -len * 0.7, y: -len * 0.7 };
          case 'top_right': return { x: len * 0.7, y: -len * 0.7 };
          case 'bottom_left': return { x: -len * 0.7, y: len * 0.7 };
          case 'bottom_right': return { x: len * 0.7, y: len * 0.7 };
          default: return { x: 0, y: 0 };
        }
      };

      if (isEndPoint) {
        // Calculate tangent at end: direction from second control point to end
        const endOffset = getSocketOffset(endSocket, false);
        const cp2x = end.x + endOffset.x;
        const cp2y = end.y + endOffset.y;
        return (Math.atan2(end.y - cp2y, end.x - cp2x) * 180) / Math.PI;
      } else {
        // Calculate tangent at start: direction from start to first control point
        const startOffset = getSocketOffset(startSocket, true);
        const cp1x = start.x + startOffset.x;
        const cp1y = start.y + startOffset.y;
        return (Math.atan2(cp1y - start.y, cp1x - start.x) * 180) / Math.PI;
      }
    }

    case "magnet": {
      // For magnet orthogonal paths, determine the angle of the first/last segment
      const dx = end.x - start.x;
      const dy = end.y - start.y;

      // Determine path direction based on socket or distance
      let preferHorizontal = Math.abs(dx) > Math.abs(dy);

      if (startSocket && startSocket !== 'auto' && startSocket !== 'center') {
        const horizontalSockets: SocketPosition[] = ['left', 'right'];
        const verticalSockets: SocketPosition[] = ['top', 'bottom'];

        if (horizontalSockets.includes(startSocket)) {
          preferHorizontal = true;
        } else if (verticalSockets.includes(startSocket)) {
          preferHorizontal = false;
        }
      }

      if (isEndPoint) {
        // Last segment direction
        if (preferHorizontal) {
          // Path goes horizontal first, so last segment is vertical
          return dy > 0 ? 90 : 270;
        } else {
          // Path goes vertical first, so last segment is horizontal
          return dx > 0 ? 0 : 180;
        }
      } else {
        // First segment direction
        if (preferHorizontal) {
          // First segment is horizontal
          return dx > 0 ? 0 : 180;
        } else {
          // First segment is vertical
          return dy > 0 ? 90 : 270;
        }
      }
    }

    case "grid": {
      // For grid paths with middle point: start → midX horizontal → midX vertical → end horizontal
      const dx = end.x - start.x;

      if (isEndPoint) {
        // Last segment is always horizontal (from midX to end.x)
        return dx > 0 ? 0 : 180;
      } else {
        // First segment is always horizontal (from start to midX)
        return dx > 0 ? 0 : 180;
      }
    }

    default:
      return getAngleDegrees(start, end);
  }
};

/**
 * Calculate plug position and rotation for drawing as a regular path
 */
export const calculatePlugTransform = (
  start: Point,
  end: Point,
  isEndPlug: boolean = true,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _plugSize: number = 8,
  offset: number = 0,
  tangentAngle?: number
): { position: Point; rotation: number } => {
  const angleRad = getAngle(start, end);
  const angle = tangentAngle !== undefined ? tangentAngle : getAngleDegrees(start, end);

  if (isEndPlug) {
    // For end plug, position it at the end point, offset backwards along the line
    return {
      position: {
        x: end.x - offset * Math.cos(angleRad),
        y: end.y - offset * Math.sin(angleRad),
      },
      rotation: angle,
    };
  } else {
    // For start plug, position it at the start point, offset forward along the line
    return {
      position: {
        x: start.x + offset * Math.cos(angleRad),
        y: start.y + offset * Math.sin(angleRad),
      },
      rotation: angle + 180, // Opposite direction for start plug
    };
  }
};

/**
 * Get all socket points for an element
 * Returns coordinates for all 9 socket positions
 */
export const getAllSocketPoints = (
  layout: ElementLayout
): Record<SocketPosition, Point> => {
  const { pageX, pageY, width, height } = layout;

  return {
    center: { x: pageX + width / 2, y: pageY + height / 2 },
    top: { x: pageX + width / 2, y: pageY },
    right: { x: pageX + width, y: pageY + height / 2 },
    bottom: { x: pageX + width / 2, y: pageY + height },
    left: { x: pageX, y: pageY + height / 2 },
    top_left: { x: pageX, y: pageY },
    top_right: { x: pageX + width, y: pageY },
    bottom_left: { x: pageX, y: pageY + height },
    bottom_right: { x: pageX + width, y: pageY + height },
    auto: { x: pageX + width / 2, y: pageY + height / 2 }, // fallback to center
  };
};

/**
 * Calculate which socket is closest to a target point
 * Used for intelligent "auto" socket selection
 */
export const calculateClosestSocket = (
  sourceLayout: ElementLayout,
  targetCenter: Point
): SocketPosition => {
  const allSockets = getAllSocketPoints(sourceLayout);

  // Exclude 'auto' from consideration
  const socketPositions: SocketPosition[] = [
    "center",
    "top",
    "right",
    "bottom",
    "left",
    "top_left",
    "top_right",
    "bottom_left",
    "bottom_right",
  ];

  let closestSocket: SocketPosition = "center";
  let minDistance = Infinity;

  for (const socket of socketPositions) {
    const socketPoint = allSockets[socket];
    const distance = getDistance(socketPoint, targetCenter);

    if (distance < minDistance) {
      minDistance = distance;
      closestSocket = socket;
    }
  }

  return closestSocket;
};

/**
 * Get the socket point for an element based on socket position
 */
export const getSocketPoint = (
  layout: ElementLayout,
  socket: SocketPosition
): Point => {
  const { pageX, pageY, width, height } = layout;

  let result: Point;

  switch (socket) {
    case "top":
      result = { x: pageX + width / 2, y: pageY };
      break;
    case "bottom":
      result = { x: pageX + width / 2, y: pageY + height };
      break;
    case "left":
      result = { x: pageX, y: pageY + height / 2 };
      break;
    case "right":
      result = { x: pageX + width, y: pageY + height / 2 };
      break;
    case "top_left":
      result = { x: pageX, y: pageY };
      break;
    case "top_right":
      result = { x: pageX + width, y: pageY };
      break;
    case "bottom_left":
      result = { x: pageX, y: pageY + height };
      break;
    case "bottom_right":
      result = { x: pageX + width, y: pageY + height };
      break;
    case "center":
    case "auto":
    default:
      result = { x: pageX + width / 2, y: pageY + height / 2 };
      break;
  }
  return result;
};

/**
 * Measure element layout information with retry logic for timing issues
 */
export const measureElement = async (
  element: React.RefObject<any>,
  maxRetries: number = 3,
  retryDelay: number = 50
): Promise<ElementLayout | null> => {
  if (!element.current) {
    return null;
  }

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const layout = await new Promise<ElementLayout | null>((resolve) => {
      element.current.measureInWindow(
        (x: number, y: number, width: number, height: number) => {
          const result = {
            x: 0, // measureInWindow doesn't provide local coordinates
            y: 0,
            width,
            height,
            pageX: x, // These are absolute screen coordinates
            pageY: y,
            timestamp: Date.now(),
          };

          resolve(result);
        }
      );
    });

    // If measurement is valid or this is the last attempt, return it
    if (!layout) {
      continue;
    }

    if (isValidMeasurement(layout)) {
      return layout;
    }

    // If this is the last attempt, return even if invalid
    if (attempt === maxRetries - 1) {
      return layout;
    }

    // Wait before retrying
    await new Promise<void>((resolve) =>
      setTimeout(() => resolve(), retryDelay)
    );
  }

  return null;
};

/**
 * Measure element using measureInWindow for absolute screen coordinates
 */
export const measureElementInWindow = async (
  element: React.RefObject<any>
): Promise<ElementLayout | null> => {
  if (!element.current) {
    return null;
  }

  return new Promise((resolve) => {
    element.current.measureInWindow(
      (x: number, y: number, width: number, height: number) => {
        const result = {
          x: 0, // measureInWindow doesn't provide local coordinates
          y: 0,
          width,
          height,
          pageX: x, // These are absolute screen coordinates
          pageY: y,
          timestamp: Date.now(),
        };

        resolve(result);
      }
    );
  });
};

/**
 * Measure element with better timing - waits for layout completion
 */
export const measureElementWithLayout = async (
  element: React.RefObject<any>
): Promise<ElementLayout | null> => {
  if (!element.current) {
    return null;
  }

  // Use measureElement which now uses measureInWindow internally
  const result = await measureElement(element, 10, 150);
  return result;
};

/**
 * Measure element relative to a container using a more reliable method
 */
export const measureRelativeToContainer = async (
  element: React.RefObject<any>,
  containerRef?: React.RefObject<any>
): Promise<Point | null> => {
  if (!element.current) {
    return null;
  }

  // If no container, use absolute coordinates
  if (!containerRef?.current) {
    const elementLayout = await measureElementWithLayout(element);
    return elementLayout
      ? { x: elementLayout.pageX, y: elementLayout.pageY }
      : null;
  }

  return new Promise((resolve) => {
    // This method measures the element relative to a specific ancestor
    element.current.measureLayout(
      containerRef.current,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (x: number, y: number, _width: number, _height: number) => {
        resolve({ x, y });
      },
      () => {
        // Fallback to absolute measurement
        measureElementWithLayout(element).then((layout) => {
          resolve(layout ? { x: layout.pageX, y: layout.pageY } : null);
        });
      }
    );
  });
};

/**
 * Get container offset to adjust for navigation bars and other elements
 */
export const getContainerOffset = async (
  containerRef?: React.RefObject<any>
): Promise<Point> => {
  if (!containerRef?.current) {
    return { x: 0, y: 0 };
  }

  try {
    // Use measureElementWithLayout for consistency
    const containerLayout = await measureElementWithLayout(containerRef);

    if (containerLayout) {
      // For ScrollView, we might need to account for scroll offset
      const scrollOffset = { x: 0, y: 0 };

      // Check if it's a ScrollView by looking for _scrollViewRef
      if (containerRef.current._scrollViewRef) {
        // ScrollView doesn't directly expose scroll position in a sync way
        // We'll rely on the measureInWindow which should give us the current visible position
      }

      const offset = {
        x: containerLayout.pageX + scrollOffset.x,
        y: containerLayout.pageY + scrollOffset.y,
      };

      return offset;
    }
  } catch (error) {
    // Ignore errors and return default offset
  }

  return { x: 0, y: 0 };
};

/**
 * Convert an absolute point to relative coordinates based on container offset
 */
export const convertPointToRelative = async (
  point: Point,
  containerRef?: React.RefObject<any>
): Promise<Point> => {
  if (!containerRef?.current) {
    return point;
  }

  const containerOffset = await getContainerOffset(containerRef);
  const relativePoint = {
    x: point.x - containerOffset.x,
    y: point.y - containerOffset.y,
  };

  return relativePoint;
};

/**
 * Calculate connection points between two elements using relative measurements
 */
export const calculateConnectionPointsRelative = async (
  startElement: any,
  endElement: any,
  startSocket: SocketPosition = "auto",
  endSocket: SocketPosition = "auto",
  containerRef?: React.RefObject<any>
): Promise<{ start: Point; end: Point; startSocket?: SocketPosition; endSocket?: SocketPosition } | null> => {
  if (!startElement || !endElement) {
    return null;
  }

  return new Promise((resolve) => {
    let startLayout: ElementLayout | null = null;
    let endLayout: ElementLayout | null = null;
    let containerLayout: ElementLayout | null = null;
    let measurementsCompleted = 0;
    const totalMeasurements = containerRef?.current ? 3 : 2;

    const checkComplete = () => {
      if (measurementsCompleted >= totalMeasurements) {
        if (!startLayout || !endLayout) {
          // Silent error handling for production
          resolve(null);
          return;
        }

        // 🔧 FIX: Calculate offset correctly
        let offsetX = 0;
        let offsetY = 0;

        if (containerLayout) {
          // If we have container, use its pageX/pageY as base
          offsetX = containerLayout.pageX;
          offsetY = containerLayout.pageY;
          // Container offset logs removed for performance
        } else {
          // If no container, find minimum offset
          offsetX = Math.min(startLayout.pageX, endLayout.pageX);
          offsetY = Math.min(startLayout.pageY, endLayout.pageY);
          // No container logs removed for performance
        }

        // 🔧 FIX: Adjust coordinates by subtracting container offset
        const adjustedStartLayout = {
          ...startLayout,
          pageX: startLayout.pageX - offsetX,
          pageY: startLayout.pageY - offsetY,
        };

        const adjustedEndLayout = {
          ...endLayout,
          pageX: endLayout.pageX - offsetX,
          pageY: endLayout.pageY - offsetY,
        };

        // Intelligent auto socket selection
        let effectiveStartSocket = startSocket;
        let effectiveEndSocket = endSocket;

        if (startSocket === "auto") {
          // Find the socket on start element closest to the center of end element
          const endCenter = getSocketPoint(adjustedEndLayout, "center");
          effectiveStartSocket = calculateClosestSocket(
            adjustedStartLayout,
            endCenter
          );
        }

        if (endSocket === "auto") {
          // Find the socket on end element closest to the center of start element
          const startCenter = getSocketPoint(adjustedStartLayout, "center");
          effectiveEndSocket = calculateClosestSocket(
            adjustedEndLayout,
            startCenter
          );
        }

        // All verbose logging removed for performance
        const startPoint = getSocketPoint(
          adjustedStartLayout,
          effectiveStartSocket
        );
        const endPoint = getSocketPoint(adjustedEndLayout, effectiveEndSocket);

        // Verificación de coherencia (silent in production)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _isCoherent =
          Math.abs(
            startPoint.x - (startLayout.pageX + startLayout.width / 2 - offsetX)
          ) < 1 &&
          Math.abs(
            startPoint.y -
              (startLayout.pageY + startLayout.height / 2 - offsetY)
          ) < 1;
        // Coherence logging removed for performance

        resolve({
          start: startPoint,
          end: endPoint,
          startSocket: effectiveStartSocket,
          endSocket: effectiveEndSocket,
        });
      }
    };

    // Measure start element
    startElement.measure(
      (
        x: number,
        y: number,
        width: number,
        height: number,
        pageX: number,
        pageY: number
      ) => {
        startLayout = {
          x,
          y,
          width,
          height,
          pageX,
          pageY,
          timestamp: Date.now(),
        };
        // Logging removed for performance
        measurementsCompleted++;
        checkComplete();
      }
    );

    // Measure end element
    endElement.measure(
      (
        x: number,
        y: number,
        width: number,
        height: number,
        pageX: number,
        pageY: number
      ) => {
        endLayout = {
          x,
          y,
          width,
          height,
          pageX,
          pageY,
          timestamp: Date.now(),
        };
        // Logging removed for performance
        measurementsCompleted++;
        checkComplete();
      }
    );

    // Measure container if provided
    if (containerRef?.current) {
      containerRef.current.measure(
        (
          x: number,
          y: number,
          width: number,
          height: number,
          pageX: number,
          pageY: number
        ) => {
          containerLayout = {
            x,
            y,
            width,
            height,
            pageX,
            pageY,
            timestamp: Date.now(),
          };
          // Logging removed for performance
          measurementsCompleted++;
          checkComplete();
        }
      );
    }
  });
};

/**
 * Calculate connection points between two elements with improved validation
 */
export const calculateConnectionPoints = async (
  startElement: any,
  endElement: any,
  startSocket: SocketPosition = "auto",
  endSocket: SocketPosition = "auto",
  containerRef?: React.RefObject<any>
): Promise<{ start: Point; end: Point; startSocket?: SocketPosition; endSocket?: SocketPosition } | null> => {
  // Get container offset first
  const containerOffset = await getContainerOffset(containerRef);

  const startLayout = await measureElementWithLayout({ current: startElement });

  const endLayout = await measureElementWithLayout({ current: endElement });

  if (!startLayout || !endLayout) {
    return null;
  }

  // Additional validation for measurement quality
  const startValid = isValidMeasurement(startLayout);
  const endValid = isValidMeasurement(endLayout);

  // If either measurement is invalid, we should still try to render but warn
  if (!startValid || !endValid) {
    // Try to proceed anyway if we have some reasonable dimensions
    if (
      (startLayout.width === 0 || startLayout.height === 0) &&
      (endLayout.width === 0 || endLayout.height === 0)
    ) {
      return null;
    }
  }

  // Intelligent auto socket selection
  let effectiveStartSocket = startSocket;
  let effectiveEndSocket = endSocket;

  if (startSocket === "auto") {
    // Find the socket on start element closest to the center of end element
    const endCenter = getSocketPoint(endLayout, "center");
    effectiveStartSocket = calculateClosestSocket(startLayout, endCenter);
  }

  if (endSocket === "auto") {
    // Find the socket on end element closest to the center of start element
    const startCenter = getSocketPoint(startLayout, "center");
    effectiveEndSocket = calculateClosestSocket(endLayout, startCenter);
  }

  const rawStartPoint = getSocketPoint(startLayout, effectiveStartSocket);
  const rawEndPoint = getSocketPoint(endLayout, effectiveEndSocket);

  // Adjust coordinates relative to container to account for nav bars and other elements
  const startPoint = {
    x: rawStartPoint.x - containerOffset.x,
    y: rawStartPoint.y - containerOffset.y,
  };
  const endPoint = {
    x: rawEndPoint.x - containerOffset.x,
    y: rawEndPoint.y - containerOffset.y,
  };

  // Validate that we got reasonable coordinates
  if (
    isNaN(startPoint.x) ||
    isNaN(startPoint.y) ||
    isNaN(endPoint.x) ||
    isNaN(endPoint.y)
  ) {
    return null;
  }

  // Additional validation for negative coordinates
  // These checks are kept for future validation logic

  const result = {
    start: startPoint,
    end: endPoint,
    startSocket: effectiveStartSocket,
    endSocket: effectiveEndSocket
  };

  return result;
};

/**
 * Generate path data for different path types
 */
export const generatePathData = (
  start: Point,
  end: Point,
  pathType: PathType | PathConfiguration,
  curvature: number = 0.2,
  startSocket?: SocketPosition,
  endSocket?: SocketPosition
): string => {
  const type = typeof pathType === "string" ? pathType : pathType.type;

  switch (type) {
    case "straight":
      return `M ${start.x} ${start.y} L ${end.x} ${end.y}`;

    case "arc":
      return generateArcPath(start, end, curvature);

    case "fluid":
      return generateFluidPath(start, end, curvature, startSocket, endSocket);

    case "magnet":
      return generateMagnetPath(start, end, startSocket, endSocket);

    case "grid":
      return generateGridPath(start, end);

    default:
      return `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
  }
};

/**
 * Generate enhanced path data with socket gravity
 */
export const generateEnhancedPathData = (
  start: Point,
  end: Point,
  pathType: PathType | PathConfiguration,
  curvature: number = 0.2,
  startSocket?: SocketPosition,
  endSocket?: SocketPosition
): string => {
  return generatePathData(start, end, pathType, curvature, startSocket, endSocket);
};

/**
 * Create plug path for different plug types
 */
export const createPlugPath = (
  plugType: PlugType,
  size: number = 8
): string => {
  // Validate and normalize size
  const normalizedSize = Math.max(1, Math.min(100, size));
  const halfSize = normalizedSize / 2;

  // Validate plug type
  if (!plugType || plugType === "none" || plugType === "behind") {
    return "";
  }

  try {
    // Create paths centered at origin (0,0) for easier transformation
    switch (plugType) {
      case "arrow1":
        return `M ${-halfSize} ${-halfSize} L ${halfSize} 0 L ${-halfSize} ${halfSize} z`;

      case "arrow2":
        return `M ${-halfSize} 0 L ${halfSize} ${-halfSize} L ${
          halfSize * 0.8
        } 0 L ${halfSize} ${halfSize} z`;

      case "arrow3":
        return `M ${-halfSize} 0 L ${halfSize} ${-halfSize} L ${
          halfSize * 0.6
        } 0 L ${halfSize} ${halfSize} z`;

      case "disc":
        return `M 0 0 m -${halfSize} 0 a ${halfSize} ${halfSize} 0 1 0 ${normalizedSize} 0 a ${halfSize} ${halfSize} 0 1 0 -${normalizedSize} 0`;

      case "square":
        return `M ${-halfSize} ${-halfSize} L ${halfSize} ${-halfSize} L ${halfSize} ${halfSize} L ${-halfSize} ${halfSize} z`;

      case "diamond":
        return `M 0 ${-halfSize} L ${halfSize} 0 L 0 ${halfSize} L ${-halfSize} 0 z`;

      case "crosshair": {
        // Cross/plus symbol made of two perpendicular lines
        const thickness = normalizedSize * 0.15; // Line thickness
        return `M ${-thickness} ${-halfSize} L ${thickness} ${-halfSize}
                L ${thickness} ${-thickness} L ${halfSize} ${-thickness}
                L ${halfSize} ${thickness} L ${thickness} ${thickness}
                L ${thickness} ${halfSize} L ${-thickness} ${halfSize}
                L ${-thickness} ${thickness} L ${-halfSize} ${thickness}
                L ${-halfSize} ${-thickness} L ${-thickness} ${-thickness} z`;
      }

      case "star": {
        // Five-pointed star
        const outerR = halfSize;
        const innerR = halfSize * 0.382;
        const points: string[] = [];
        for (let i = 0; i < 5; i++) {
          const outerAngle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
          const innerAngle = ((i + 0.5) * 2 * Math.PI) / 5 - Math.PI / 2;
          if (i === 0) {
            points.push(`M ${outerR * Math.cos(outerAngle)} ${outerR * Math.sin(outerAngle)}`);
          } else {
            points.push(`L ${outerR * Math.cos(outerAngle)} ${outerR * Math.sin(outerAngle)}`);
          }
          points.push(`L ${innerR * Math.cos(innerAngle)} ${innerR * Math.sin(innerAngle)}`);
        }
        points.push('z');
        return points.join(' ');
      }

      case "heart": {
        // Heart shape
        const heartW = halfSize * 0.8;
        const heartH = halfSize;
        return `M 0 ${heartH * 0.3}
                C ${-heartW} ${-heartH * 0.5} ${-heartW * 0.5} ${-heartH} 0 ${-heartH * 0.2}
                C ${heartW * 0.5} ${-heartH} ${heartW} ${-heartH * 0.5} 0 ${heartH * 0.3} z`;
      }

      case "chevron":
        // Chevron arrow (V shape)
        return `M ${halfSize} 0 L ${-halfSize * 0.5} ${halfSize}
                L ${-halfSize * 0.5} ${halfSize * 0.5} L ${halfSize * 0.5} 0
                L ${-halfSize * 0.5} ${-halfSize * 0.5} L ${-halfSize * 0.5} ${-halfSize} z`;

      case "hollowArrow": {
        // Hollow arrow outline (not filled)
        const arrowWidth = halfSize * 0.3;
        return `M ${halfSize} 0 L ${-halfSize} ${-halfSize}
                L ${-halfSize} ${-arrowWidth} L ${halfSize * 0.3} 0
                L ${-halfSize} ${arrowWidth} L ${-halfSize} ${halfSize} z`;
      }

      case "pentagon": {
        // Regular pentagon
        const pentPoints: string[] = [];
        for (let i = 0; i < 5; i++) {
          const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
          const x = halfSize * Math.cos(angle);
          const y = halfSize * Math.sin(angle);
          pentPoints.push(i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`);
        }
        pentPoints.push('z');
        return pentPoints.join(' ');
      }

      case "hexagon": {
        // Regular hexagon
        const hexPoints: string[] = [];
        for (let i = 0; i < 6; i++) {
          const angle = (i * 2 * Math.PI) / 6;
          const x = halfSize * Math.cos(angle);
          const y = halfSize * Math.sin(angle);
          hexPoints.push(i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`);
        }
        hexPoints.push('z');
        return hexPoints.join(' ');
      }

      case "bar": {
        // Perpendicular bar (line perpendicular to the connection line)
        const barThickness = normalizedSize * 0.15;
        return `M ${-barThickness} ${-halfSize} L ${barThickness} ${-halfSize}
                L ${barThickness} ${halfSize} L ${-barThickness} ${halfSize} z`;
      }

      case "lineArrow": {
        // Two lines intersecting at 45 degrees (90 degree total angle between lines)
        const lineWidth = normalizedSize * 0.2;
        const armLength = halfSize * 0.9;
        const halfAngle = Math.PI / 4; // 45 degrees from center = 90 degrees total

        // First line (upper)
        const x1Start = 0;
        const y1Start = 0;
        const x1End = -armLength * Math.cos(halfAngle);
        const y1End = -armLength * Math.sin(halfAngle);

        // Second line (lower)
        const x2Start = 0;
        const y2Start = 0;
        const x2End = -armLength * Math.cos(halfAngle);
        const y2End = armLength * Math.sin(halfAngle);

        // Create two separate line paths
        return `M ${x1Start} ${y1Start - lineWidth/2} L ${x1End} ${y1End - lineWidth/2}
                L ${x1End} ${y1End + lineWidth/2} L ${x1Start} ${y1Start + lineWidth/2} z
                M ${x2Start} ${y2Start - lineWidth/2} L ${x2End} ${y2End - lineWidth/2}
                L ${x2End} ${y2End + lineWidth/2} L ${x2Start} ${y2Start + lineWidth/2} z`;
      }

      case "lineArrowNarrow": {
        // Two lines intersecting at 30 degrees (60 degree total angle between lines)
        const lineWidth = normalizedSize * 0.2;
        const armLength = halfSize * 0.9;
        const halfAngle = Math.PI / 6; // 30 degrees from center = 60 degrees total

        const x1End = -armLength * Math.cos(halfAngle);
        const y1End = -armLength * Math.sin(halfAngle);
        const x2End = -armLength * Math.cos(halfAngle);
        const y2End = armLength * Math.sin(halfAngle);

        return `M 0 ${-lineWidth/2} L ${x1End} ${y1End - lineWidth/2}
                L ${x1End} ${y1End + lineWidth/2} L 0 ${lineWidth/2} z
                M 0 ${-lineWidth/2} L ${x2End} ${y2End - lineWidth/2}
                L ${x2End} ${y2End + lineWidth/2} L 0 ${lineWidth/2} z`;
      }

      case "lineArrowVeryNarrow": {
        // Two lines intersecting at 20 degrees (40 degree total angle between lines)
        const lineWidth = normalizedSize * 0.2;
        const armLength = halfSize * 0.95;
        const halfAngle = Math.PI / 9; // 20 degrees from center = 40 degrees total

        const x1End = -armLength * Math.cos(halfAngle);
        const y1End = -armLength * Math.sin(halfAngle);
        const x2End = -armLength * Math.cos(halfAngle);
        const y2End = armLength * Math.sin(halfAngle);

        return `M 0 ${-lineWidth/2} L ${x1End} ${y1End - lineWidth/2}
                L ${x1End} ${y1End + lineWidth/2} L 0 ${lineWidth/2} z
                M 0 ${-lineWidth/2} L ${x2End} ${y2End - lineWidth/2}
                L ${x2End} ${y2End + lineWidth/2} L 0 ${lineWidth/2} z`;
      }

      case "lineArrowWide": {
        // Two lines intersecting at 60 degrees (120 degree total angle between lines)
        const lineWidth = normalizedSize * 0.2;
        const armLength = halfSize * 0.85;
        const halfAngle = Math.PI / 3; // 60 degrees from center = 120 degrees total

        const x1End = -armLength * Math.cos(halfAngle);
        const y1End = -armLength * Math.sin(halfAngle);
        const x2End = -armLength * Math.cos(halfAngle);
        const y2End = armLength * Math.sin(halfAngle);

        return `M 0 ${-lineWidth/2} L ${x1End} ${y1End - lineWidth/2}
                L ${x1End} ${y1End + lineWidth/2} L 0 ${lineWidth/2} z
                M 0 ${-lineWidth/2} L ${x2End} ${y2End - lineWidth/2}
                L ${x2End} ${y2End + lineWidth/2} L 0 ${lineWidth/2} z`;
      }

      case "lineArrowVeryWide": {
        // Two lines intersecting at 75 degrees (150 degree total angle between lines)
        const lineWidth = normalizedSize * 0.2;
        const armLength = halfSize * 0.8;
        const halfAngle = (Math.PI * 5) / 12; // 75 degrees from center = 150 degrees total

        const x1End = -armLength * Math.cos(halfAngle);
        const y1End = -armLength * Math.sin(halfAngle);
        const x2End = -armLength * Math.cos(halfAngle);
        const y2End = armLength * Math.sin(halfAngle);

        return `M 0 ${-lineWidth/2} L ${x1End} ${y1End - lineWidth/2}
                L ${x1End} ${y1End + lineWidth/2} L 0 ${lineWidth/2} z
                M 0 ${-lineWidth/2} L ${x2End} ${y2End - lineWidth/2}
                L ${x2End} ${y2End + lineWidth/2} L 0 ${lineWidth/2} z`;
      }

      default:
        // Fallback to simple arrow if unknown plug type
        return `M ${-halfSize} ${-halfSize} L ${halfSize} 0 L ${-halfSize} ${halfSize} z`;
    }
  } catch (error) {
    // Fallback in case of any calculation error
    return `M ${-halfSize} ${-halfSize} L ${halfSize} 0 L ${-halfSize} ${halfSize} z`;
  }
};

/**
 * Enhanced plug path creation
 */
export const createEnhancedPlugPath = createPlugPath;

/**
 * Create a direct arrow path at a specific position and rotation
 * This replaces the problematic marker system
 */
export const createDirectArrowPath = (
  plugType: PlugType,
  position: Point,
  rotation: number,
  size: number = 8
): string => {
  if (!plugType || plugType === "none" || plugType === "behind") {
    return "";
  }

  // Validate and normalize inputs
  const normalizedSize = Math.max(1, Math.min(100, size));
  const normalizedRotation = rotation || 0;

  try {
    // Get base path
    const basePath = createPlugPath(plugType, normalizedSize);
    if (!basePath) return "";

    // Create transform for position and rotation
    const transform = `translate(${position.x}, ${
      position.y
    }) rotate(${normalizedRotation}) translate(${-normalizedSize / 2}, ${
      -normalizedSize / 2
    })`;

    // Return path with transform applied via a group
    return `<g transform="${transform}"><path d="${basePath}"/></g>`;
  } catch (error) {
    return "";
  }
};

/**
 * Create arrow path positioned at line end without using markers
 */
export const createArrowAtEnd = (
  start: Point,
  end: Point,
  plugType: PlugType,
  size: number,
  isStartPlug: boolean = false
): string => {
  if (!plugType || plugType === "none" || plugType === "behind") {
    return "";
  }

  const transform = calculatePlugTransform(start, end, !isStartPlug);
  return createDirectArrowPath(
    plugType,
    transform.position,
    transform.rotation,
    size
  );
};

/**
 * Generate dash array from dash options
 */
export const generateDashArray = (
  dash: boolean | string | any
): string | undefined => {
  if (typeof dash === "boolean") {
    return dash ? "5,5" : undefined;
  }

  if (typeof dash === "string") {
    return dash;
  }

  if (typeof dash === "object" && dash.pattern) {
    return dash.pattern;
  }

  return undefined;
};

/**
 * Calculate path bounding box
 */
export const calculatePathBoundingBox = (
  start: Point,
  end: Point,
  pathType: PathType,
  curvature: number = 0.2, // eslint-disable-line @typescript-eslint/no-unused-vars
  strokeWidth: number = 2
): BoundingBox => {
  const minX = Math.min(start.x, end.x) - strokeWidth;
  const minY = Math.min(start.y, end.y) - strokeWidth;
  const maxX = Math.max(start.x, end.x) + strokeWidth;
  const maxY = Math.max(start.y, end.y) + strokeWidth;

  // Add extra space for curved paths
  const extraSpace = pathType === "arc" ? 50 : 20;

  // Add extra space for curved paths
  const boundingX = minX - extraSpace;
  const boundingY = minY - extraSpace;

  return {
    x: boundingX,
    y: boundingY,
    width: maxX - minX + extraSpace * 2,
    height: maxY - minY + extraSpace * 2,
  };
};

/**
 * Calculate path bounding box with outline
 */
export const calculatePathBoundingBoxWithOutline = (
  start: Point,
  end: Point,
  pathType: PathType,
  curvature: number,
  strokeWidth: number,
  outline: any
): BoundingBox => {
  // Validate points before calculating bounds
  // (validation logic can be added here if needed)

  const baseBounds = calculatePathBoundingBox(
    start,
    end,
    pathType,
    curvature,
    strokeWidth
  );

  const outlineWidth = outline?.width || outline?.size || 0;

  const result = {
    x: baseBounds.x - outlineWidth,
    y: baseBounds.y - outlineWidth,
    width: baseBounds.width + outlineWidth * 2,
    height: baseBounds.height + outlineWidth * 2,
  };

  return result;
};

/**
 * Normalize outline options
 */
export const normalizeOutlineOptions = (
  outline: any,
  defaultColor?: string
) => {
  if (!outline) return null;

  if (typeof outline === "boolean") {
    return outline
      ? {
          enabled: true,
          color: defaultColor || "auto",
          width: 1,
          size: 1,
          opacity: 1,
        }
      : null;
  }

  return {
    enabled: outline.enabled !== false,
    color: outline.color || defaultColor || "auto",
    width: outline.width || outline.size || 1,
    size: outline.size || outline.width || 1,
    opacity: outline.opacity || 1,
  };
};

/**
 * Normalize plug outline options
 */
export const normalizePlugOutlineOptions = (
  outline: any,
  defaultColor?: string
) => {
  return normalizeOutlineOptions(outline, defaultColor);
};

// Constants for arc path calculation
const CIRCLE_8_RAD = Math.PI / 8; // 22.5 degrees
const CIRCLE_CP = 0.5522847498; // Control point ratio for circular arc approximation

// Arc path generation - creates a single smooth arc using cubic Bezier
const generateArcPath = (
  start: Point,
  end: Point,
  curvature: number = 0.2
): string => {
  // Determine if arc should go downward (affects arc direction)
  // For simplicity, we'll determine this based on vertical relationship
  const downward = end.y > start.y;
  const circle8rad = CIRCLE_8_RAD * (downward ? -1 : 1);

  // Calculate angle between points
  const angle = Math.atan2(end.y - start.y, end.x - start.x);

  // Control point angles
  const cp1Angle = -angle + circle8rad;
  const cp2Angle = Math.PI - angle - circle8rad;

  // Distance between points
  const distance = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));

  // Control point distance (adjusted by curvature)
  const crLen = (distance / Math.sqrt(2)) * CIRCLE_CP * (1 + curvature);

  // Calculate control points
  const cp1 = {
    x: start.x + Math.cos(cp1Angle) * crLen,
    y: start.y + Math.sin(cp1Angle) * crLen * -1
  };

  const cp2 = {
    x: end.x + Math.cos(cp2Angle) * crLen,
    y: end.y + Math.sin(cp2Angle) * crLen * -1
  };

  return `M ${start.x} ${start.y} C ${cp1.x} ${cp1.y} ${cp2.x} ${cp2.y} ${end.x} ${end.y}`;
};

// Fluid path generation - creates S-shaped curve with control points extending from socket direction
const generateFluidPath = (
  start: Point,
  end: Point,
  curvature: number = 0.2,
  startSocket?: SocketPosition,
  endSocket?: SocketPosition
): string => {
  // Calculate base distance for control point offset
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  // Minimum gravity distance
  const MIN_GRAVITY = 30;

  // Calculate adaptive control point distance (half the distance between points)
  let len = distance / 2;
  if (len < MIN_GRAVITY) {
    len = MIN_GRAVITY;
  }

  // Apply curvature factor (curvature affects the control point distance)
  len = len * (0.5 + curvature);

  // Helper function to get offset based on socket position
  const getSocketOffset = (socket: SocketPosition | undefined, isStart: boolean): { x: number, y: number } => {
    // If no socket specified, auto-detect based on relative position
    if (!socket || socket === 'auto' || socket === 'center') {
      // Auto-detect: use the dominant direction
      if (Math.abs(dx) > Math.abs(dy)) {
        // Horizontal is dominant
        if (isStart) {
          return dx > 0 ? { x: len, y: 0 } : { x: -len, y: 0 };
        } else {
          return dx > 0 ? { x: -len, y: 0 } : { x: len, y: 0 };
        }
      } else {
        // Vertical is dominant
        if (isStart) {
          return dy > 0 ? { x: 0, y: len } : { x: 0, y: -len };
        } else {
          return dy > 0 ? { x: 0, y: -len } : { x: 0, y: len };
        }
      }
    }

    // Use explicit socket position
    switch (socket) {
      case 'top':
        return { x: 0, y: -len };
      case 'right':
        return { x: len, y: 0 };
      case 'bottom':
        return { x: 0, y: len };
      case 'left':
        return { x: -len, y: 0 };
      case 'top_left':
        return { x: -len * 0.7, y: -len * 0.7 };
      case 'top_right':
        return { x: len * 0.7, y: -len * 0.7 };
      case 'bottom_left':
        return { x: -len * 0.7, y: len * 0.7 };
      case 'bottom_right':
        return { x: len * 0.7, y: len * 0.7 };
      default:
        return { x: 0, y: 0 };
    }
  };

  // Calculate control points based on socket directions
  const startOffset = getSocketOffset(startSocket, true);
  const endOffset = getSocketOffset(endSocket, false);

  const cp1 = {
    x: start.x + startOffset.x,
    y: start.y + startOffset.y
  };

  const cp2 = {
    x: end.x + endOffset.x,
    y: end.y + endOffset.y
  };

  return `M ${start.x} ${start.y} C ${cp1.x} ${cp1.y} ${cp2.x} ${cp2.y} ${end.x} ${end.y}`;
};

// Magnet path generation - creates orthogonal (right-angle) paths
const generateMagnetPath = (
  start: Point,
  end: Point,
  startSocket?: SocketPosition,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _endSocket?: SocketPosition
): string => {
  const dx = end.x - start.x;
  const dy = end.y - start.y;

  // Determine primary direction based on socket positions if available
  let preferHorizontal = Math.abs(dx) > Math.abs(dy);

  // If we have socket information, use it to determine the path direction
  if (startSocket && startSocket !== 'auto' && startSocket !== 'center') {
    const horizontalSockets: SocketPosition[] = ['left', 'right'];
    const verticalSockets: SocketPosition[] = ['top', 'bottom'];

    if (horizontalSockets.includes(startSocket)) {
      preferHorizontal = true;
    } else if (verticalSockets.includes(startSocket)) {
      preferHorizontal = false;
    }
  }

  // Create orthogonal path with single turn
  if (preferHorizontal) {
    // Go horizontal first, then vertical
    return `M ${start.x} ${start.y} L ${end.x} ${start.y} L ${end.x} ${end.y}`;
  } else {
    // Go vertical first, then horizontal
    return `M ${start.x} ${start.y} L ${start.x} ${end.y} L ${end.x} ${end.y}`;
  }
};

// Grid path generation
const generateGridPath = (start: Point, end: Point): string => {
  // Simple grid-aligned path
  const midX = start.x + (end.x - start.x) * 0.5;

  return `M ${start.x} ${start.y} L ${midX} ${start.y} L ${midX} ${end.y} L ${end.x} ${end.y}`;
};

/**
 * Calculate socket gravity effect
 */
export const calculateSocketGravity = (
  point: Point,
  element: BoundingBox,
  gravity: SocketGravity
): SocketPosition => {
  if (gravity === "auto") {
    // Auto-determine best socket based on relative position
    const centerX = element.x + element.width / 2;
    const centerY = element.y + element.height / 2;

    const dx = point.x - centerX;
    const dy = point.y - centerY;

    if (Math.abs(dx) > Math.abs(dy)) {
      return dx > 0 ? "right" : "left";
    } else {
      return dy > 0 ? "bottom" : "top";
    }
  }

  // For now, return center for numeric gravity values
  return "center";
};

/**
 * Calculate anchor point for point anchors
 */
export const calculateAnchorPoint = (
  element: React.RefObject<any>,
  x: number,
  y: number
): Point => {
  // This would need element measurement in real implementation
  return { x, y };
};

// Point anchor creation
export const pointAnchor = (
  element: React.RefObject<any>,
  options?: { x: number; y: number }
) => {
  return {
    element,
    x: options?.x || 0,
    y: options?.y || 0,
  };
};

// Area anchor creation
export const areaAnchor = (element: React.RefObject<any>, options?: any) => {
  return {
    element,
    x: options?.x || 0,
    y: options?.y || 0,
    width: options?.width || 100,
    height: options?.height || 100,
  };
};

// Mouse hover anchor creation
export const mouseHoverAnchor = (
  element: React.RefObject<any>,
  options?: any
) => {
  return {
    element,
    showEffectName: options?.showEffectName || "fade",
    hideEffectName: options?.hideEffectName || "fade",
    animOptions: options?.animOptions || {},
    style: options?.style || {},
    hoverStyle: options?.hoverStyle || {},
  };
};
