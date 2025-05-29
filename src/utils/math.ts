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
 * Get the socket point for an element based on socket position
 */
export const getSocketPoint = (
  layout: ElementLayout,
  socket: SocketPosition
): Point => {
  const { pageX, pageY, width, height } = layout;

  switch (socket) {
    case "top":
      return { x: pageX + width / 2, y: pageY };
    case "bottom":
      return { x: pageX + width / 2, y: pageY + height };
    case "left":
      return { x: pageX, y: pageY + height / 2 };
    case "right":
      return { x: pageX + width, y: pageY + height / 2 };
    case "top_left":
      return { x: pageX, y: pageY };
    case "top_right":
      return { x: pageX + width, y: pageY };
    case "bottom_left":
      return { x: pageX, y: pageY + height };
    case "bottom_right":
      return { x: pageX + width, y: pageY + height };
    case "center":
    case "auto":
    default:
      return { x: pageX + width / 2, y: pageY + height / 2 };
  }
};

/**
 * Measure element layout information
 */
export const measureElement = async (
  element: React.RefObject<any>
): Promise<ElementLayout | null> => {
  return new Promise((resolve) => {
    if (!element.current) {
      resolve(null);
      return;
    }

    element.current.measure(
      (
        x: number,
        y: number,
        width: number,
        height: number,
        pageX: number,
        pageY: number
      ) => {
        resolve({
          x,
          y,
          width,
          height,
          pageX,
          pageY,
          timestamp: Date.now(),
        });
      }
    );
  });
};

/**
 * Calculate connection points between two elements
 */
export const calculateConnectionPoints = async (
  startElement: any,
  endElement: any,
  startSocket: SocketPosition = "center",
  endSocket: SocketPosition = "center"
): Promise<{ start: Point; end: Point } | null> => {
  const startLayout = await measureElement({ current: startElement });
  const endLayout = await measureElement({ current: endElement });

  if (!startLayout || !endLayout) {
    return null;
  }

  const startPoint = getSocketPoint(startLayout, startSocket);
  const endPoint = getSocketPoint(endLayout, endSocket);

  return { start: startPoint, end: endPoint };
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
  curvature: number = 0.2,
  startGravity?: SocketGravity,
  endGravity?: SocketGravity
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
  const halfSize = size / 2;

  switch (plugType) {
    case "arrow1":
      return `M 0 0 L ${size} ${halfSize} L 0 ${size} z`;

    case "arrow2":
      return `M 0 ${halfSize} L ${size} 0 L ${
        size * 0.8
      } ${halfSize} L ${size} ${size} z`;

    case "arrow3":
      return `M 0 ${halfSize} L ${size} 0 L ${
        size * 0.6
      } ${halfSize} L ${size} ${size} z`;

    case "disc":
      return `M ${halfSize} ${halfSize} m -${halfSize} 0 a ${halfSize} ${halfSize} 0 1 0 ${size} 0 a ${halfSize} ${halfSize} 0 1 0 -${size} 0`;

    case "square":
      return `M 0 0 L ${size} 0 L ${size} ${size} L 0 ${size} z`;

    case "diamond":
      return `M ${halfSize} 0 L ${size} ${halfSize} L ${halfSize} ${size} L 0 ${halfSize} z`;

    case "hand":
      return `M 0 ${halfSize} L ${size * 0.6} 0 L ${size} ${halfSize * 0.3} L ${
        size * 0.8
      } ${halfSize} L ${size} ${halfSize * 1.7} L ${size * 0.6} ${size} z`;

    case "crosshair":
      return `M ${halfSize} 0 L ${halfSize} ${size} M 0 ${halfSize} L ${size} ${halfSize}`;

    case "none":
    case "behind":
    default:
      return "";
  }
};

/**
 * Enhanced plug path creation
 */
export const createEnhancedPlugPath = createPlugPath;

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
  curvature: number = 0.2,
  strokeWidth: number = 2
): BoundingBox => {
  const minX = Math.min(start.x, end.x) - strokeWidth;
  const minY = Math.min(start.y, end.y) - strokeWidth;
  const maxX = Math.max(start.x, end.x) + strokeWidth;
  const maxY = Math.max(start.y, end.y) + strokeWidth;

  // Add extra space for curved paths
  const extraSpace = pathType === "arc" ? 50 : 20;

  return {
    x: minX - extraSpace,
    y: minY - extraSpace,
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
  const baseBounds = calculatePathBoundingBox(
    start,
    end,
    pathType,
    curvature,
    strokeWidth
  );
  const outlineWidth = outline?.width || outline?.size || 0;

  return {
    x: baseBounds.x - outlineWidth,
    y: baseBounds.y - outlineWidth,
    width: baseBounds.width + outlineWidth * 2,
    height: baseBounds.height + outlineWidth * 2,
  };
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
  const midX = start.x + dx * 0.5;
  const midY = start.y + dy * 0.5;

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
  const midY = start.y + (end.y - start.y) * 0.5;

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
