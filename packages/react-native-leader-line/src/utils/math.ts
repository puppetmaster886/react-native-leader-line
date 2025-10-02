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
 * Calculate plug position and rotation for drawing as a regular path
 */
export const calculatePlugTransform = (
  start: Point,
  end: Point,
  isEndPlug: boolean = true,
  plugSize: number = 8
): { position: Point; rotation: number } => {
  const angle = getAngleDegrees(start, end);

  if (isEndPlug) {
    // For end plug, position it exactly at the end point
    return {
      position: {
        x: end.x,
        y: end.y,
      },
      rotation: angle,
    };
  } else {
    // For start plug, position it exactly at the start point
    return {
      position: {
        x: start.x,
        y: start.y,
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

  if (result) {
  } else {
  }

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
      (x: number, y: number, width: number, height: number) => {
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
  } catch (error) {}

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
  startSocket: SocketPosition = "center",
  endSocket: SocketPosition = "center",
  containerRef?: React.RefObject<any>
): Promise<{ start: Point; end: Point } | null> => {
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
        const isCoherent =
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
  startSocket: SocketPosition = "center",
  endSocket: SocketPosition = "center",
  containerRef?: React.RefObject<any>
): Promise<{ start: Point; end: Point } | null> => {
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
  if (startPoint.x < 0 || startPoint.y < 0) {
  }
  if (endPoint.x < 0 || endPoint.y < 0) {
  }

  const result = { start: startPoint, end: endPoint };

  return result;
};

/**
 * Generate path data for different path types
 */
export const generatePathData = (
  start: Point,
  end: Point,
  pathType: PathType | PathConfiguration,
  curvature: number = 0.2
): string => {
  const type = typeof pathType === "string" ? pathType : pathType.type;

  switch (type) {
    case "straight":
      return `M ${start.x} ${start.y} L ${end.x} ${end.y}`;

    case "arc": {
      const dx = end.x - start.x;
      const dy = end.y - start.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const radius = distance * curvature;
      return `M ${start.x} ${start.y} A ${radius} ${radius} 0 0 1 ${end.x} ${end.y}`;
    }

    case "fluid":
      return generateFluidPath(start, end, curvature);

    case "magnet":
      return generateMagnetPath(start, end);

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
  curvature: number = 0.2
): string => {
  // For now, use basic path generation
  // Socket gravity can be implemented later
  return generatePathData(start, end, pathType, curvature);
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

      case "hand":
        return `M ${-halfSize} 0 L ${
          halfSize * 0.6
        } ${-halfSize} L ${halfSize} ${-halfSize * 0.3} L ${
          halfSize * 0.8
        } 0 L ${halfSize} ${halfSize * 0.7} L ${halfSize * 0.6} ${halfSize} z`;

      case "crosshair":
        return `M 0 ${-halfSize} L 0 ${halfSize} M ${-halfSize} 0 L ${halfSize} 0`;

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
  if (start.x === 0 && start.y === 0 && end.x === 0 && end.y === 0) {
  }

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

// Fluid path generation
const generateFluidPath = (
  start: Point,
  end: Point,
  curvature: number = 0.2
): string => {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  // Create control points for smooth curves
  const controlDistance = distance * curvature;

  // Perpendicular offset for curve
  const perpX = (-dy / distance) * controlDistance;
  const perpY = (dx / distance) * controlDistance;

  const cp1X = start.x + dx * 0.25 + perpX;
  const cp1Y = start.y + dy * 0.25 + perpY;
  const cp2X = start.x + dx * 0.75 + perpX;
  const cp2Y = start.y + dy * 0.75 + perpY;

  return `M ${start.x} ${start.y} C ${cp1X} ${cp1Y} ${cp2X} ${cp2Y} ${end.x} ${end.y}`;
};

// Magnet path generation
const generateMagnetPath = (start: Point, end: Point): string => {
  const midX = (start.x + end.x) / 2;
  const midY = (start.y + end.y) / 2;

  // Create L-shaped path
  if (Math.abs(end.x - start.x) > Math.abs(end.y - start.y)) {
    // Horizontal preference
    return `M ${start.x} ${start.y} L ${midX} ${start.y} L ${midX} ${end.y} L ${end.x} ${end.y}`;
  } else {
    // Vertical preference
    return `M ${start.x} ${start.y} L ${start.x} ${midY} L ${end.x} ${midY} L ${end.x} ${end.y}`;
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
