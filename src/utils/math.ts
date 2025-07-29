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
        (
          x: number,
          y: number,
          width: number,
          height: number
        ) => {
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
    await new Promise<void>(resolve => setTimeout(() => resolve(), retryDelay));
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
      (
        x: number,
        y: number,
        width: number,
        height: number
      ) => {
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
    return elementLayout ? { x: elementLayout.pageX, y: elementLayout.pageY } : null;
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
        measureElementWithLayout(element).then(layout => {
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
        y: containerLayout.pageY + scrollOffset.y
      };
      
      
      return offset;
    }
  } catch (error) {
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
    y: point.y - containerOffset.y
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

  try {
    // First, let's investigate the actual container offset by measuring both absolute and relative positions
    if (containerRef?.current) {
      
      // Measure container's absolute position on screen
      const containerAbsolute = await measureElementWithLayout(containerRef);
      
      // Measure start element absolute position
      const startAbsolute = await measureElementWithLayout({ current: startElement });
    }
    // Try to use measureLayout for more accurate relative positioning
    const startPromise = new Promise<ElementLayout | null>((resolve) => {
      if (!containerRef?.current) {
        // Fallback to absolute measurement
        measureElementWithLayout({ current: startElement }).then(resolve);
        return;
      }

      startElement.measureLayout(
        containerRef.current,
        (x: number, y: number, width: number, height: number) => {
          resolve({
            x: 0,
            y: 0,
            width,
            height,
            pageX: x,
            pageY: y,
            timestamp: Date.now()
          });
        },
        () => {
          // Fallback on error
          measureElementWithLayout({ current: startElement }).then(resolve);
        }
      );
    });

    const endPromise = new Promise<ElementLayout | null>((resolve) => {
      if (!containerRef?.current) {
        // Fallback to absolute measurement
        measureElementWithLayout({ current: endElement }).then(resolve);
        return;
      }

      endElement.measureLayout(
        containerRef.current,
        (x: number, y: number, width: number, height: number) => {
          resolve({
            x: 0,
            y: 0,
            width,
            height,
            pageX: x,
            pageY: y,
            timestamp: Date.now()
          });
        },
        () => {
          // Fallback on error
          measureElementWithLayout({ current: endElement }).then(resolve);
        }
      );
    });

    const [startLayout, endLayout] = await Promise.all([startPromise, endPromise]);

    if (!startLayout || !endLayout) {
      return null;
    }

    // Calculate the actual offset by comparing relative measurements with what we expect
    if (containerRef?.current) {
      const containerAbsolute = await measureElementWithLayout(containerRef);
      const startAbsolute = await measureElementWithLayout({ current: startElement });
      
      if (containerAbsolute && startAbsolute) {
        // Calculate expected relative position: startAbsolute - containerAbsolute
        const expectedRelativeX = startAbsolute.pageX - containerAbsolute.pageX;
        const expectedRelativeY = startAbsolute.pageY - containerAbsolute.pageY;
        
        // Compare with what measureLayout gives us
        const actualRelativeX = startLayout.pageX;
        const actualRelativeY = startLayout.pageY;
        
        // Calculate the offset difference
        const offsetX = actualRelativeX - expectedRelativeX;
        const offsetY = actualRelativeY - expectedRelativeY;
        
        
        // Apply offset correction to make coordinates truly relative to container's visible area
        const correctedStartLayout = {
          ...startLayout,
          pageX: expectedRelativeX,
          pageY: expectedRelativeY
        };
        
        const endAbsolute = await measureElementWithLayout({ current: endElement });
        const expectedEndRelativeX = endAbsolute!.pageX - containerAbsolute.pageX;
        const expectedEndRelativeY = endAbsolute!.pageY - containerAbsolute.pageY;
        
        const correctedEndLayout = {
          ...endLayout,
          pageX: expectedEndRelativeX,
          pageY: expectedEndRelativeY
        };
        
        
        const correctedStartPoint = getSocketPoint(correctedStartLayout, startSocket);
        const correctedEndPoint = getSocketPoint(correctedEndLayout, endSocket);
        
        
        return { start: correctedStartPoint, end: correctedEndPoint };
      }
    }

    // Fallback to original logic if offset correction fails
    
    const startPoint = getSocketPoint(startLayout, startSocket);
    const endPoint = getSocketPoint(endLayout, endSocket);


    return { start: startPoint, end: endPoint };
  } catch (error) {
    // Fallback to original method
    return calculateConnectionPoints(startElement, endElement, startSocket, endSocket, containerRef);
  }
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
    if ((startLayout.width === 0 || startLayout.height === 0) && (endLayout.width === 0 || endLayout.height === 0)) {
      return null;
    }
  }

  const rawStartPoint = getSocketPoint(startLayout, startSocket);
  const rawEndPoint = getSocketPoint(endLayout, endSocket);

  // Adjust coordinates relative to container to account for nav bars and other elements
  const startPoint = {
    x: rawStartPoint.x - containerOffset.x,
    y: rawStartPoint.y - containerOffset.y
  };
  const endPoint = {
    x: rawEndPoint.x - containerOffset.x,
    y: rawEndPoint.y - containerOffset.y
  };


  // Validate that we got reasonable coordinates
  if (isNaN(startPoint.x) || isNaN(startPoint.y) || isNaN(endPoint.x) || isNaN(endPoint.y)) {
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