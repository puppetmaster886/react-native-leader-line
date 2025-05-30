/**
 * Calculate the distance between two points
 */
export const getDistance = (p1, p2) => {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
};
/**
 * Calculate the angle between two points in radians
 */
export const getAngle = (p1, p2) => {
  return Math.atan2(p2.y - p1.y, p2.x - p1.x);
};
/**
 * Get the socket point for an element based on socket position
 */
export const getSocketPoint = (layout, socket) => {
  const { pageX, pageY, width, height } = layout;

  switch (socket) {
    case 'top':
      return { x: pageX + width / 2, y: pageY };
    case 'bottom':
      return { x: pageX + width / 2, y: pageY + height };
    case 'left':
      return { x: pageX, y: pageY + height / 2 };
    case 'right':
      return { x: pageX + width, y: pageY + height / 2 };
    case 'top_left':
      return { x: pageX, y: pageY };
    case 'top_right':
      return { x: pageX + width, y: pageY };
    case 'bottom_left':
      return { x: pageX, y: pageY + height };
    case 'bottom_right':
      return { x: pageX + width, y: pageY + height };
    case 'center':
    case 'auto':
    default:
      return { x: pageX + width / 2, y: pageY + height / 2 };
  }
};
/**
 * Measure element layout information
 */
export const measureElement = async element => {
  return new Promise(resolve => {
    if (!element.current) {
      resolve(null);
      return;
    }
    element.current.measure((x, y, width, height, pageX, pageY) => {
      resolve({
        x,
        y,
        width,
        height,
        pageX,
        pageY,
        timestamp: Date.now(),
      });
    });
  });
};
/**
 * Calculate connection points between two elements
 */
export const calculateConnectionPoints = async (
  startElement,
  endElement,
  startSocket = 'center',
  endSocket = 'center',
  containerRef = null,
) => {
  const startLayout = await measureElement({ current: startElement });
  const endLayout = await measureElement({ current: endElement });

  if (!startLayout || !endLayout) {
    return null;
  }

  let containerLayout = null;
  if (containerRef?.current) {
    containerLayout = await measureElement(containerRef);
  }

  // Si tenemos un contenedor, calcular posiciones relativas
  if (containerLayout) {
    // Ajustar las coordenadas para que sean relativas al contenedor
    const adjustedStartLayout = {
      ...startLayout,
      pageX: startLayout.pageX - containerLayout.pageX,
      pageY: startLayout.pageY - containerLayout.pageY,
    };

    const adjustedEndLayout = {
      ...endLayout,
      pageX: endLayout.pageX - containerLayout.pageX,
      pageY: endLayout.pageY - containerLayout.pageY,
    };

    const startPoint = getSocketPoint(adjustedStartLayout, startSocket);
    const endPoint = getSocketPoint(adjustedEndLayout, endSocket);

    return { start: startPoint, end: endPoint };
  }

  // Fallback: usar coordenadas absolutas
  const startPoint = getSocketPoint(startLayout, startSocket);
  const endPoint = getSocketPoint(endLayout, endSocket);

  return { start: startPoint, end: endPoint };
};
/**
 * Generate path data for different path types
 */
export const generatePathData = (start, end, pathType, curvature = 0.2) => {
  const type = typeof pathType === 'string' ? pathType : pathType.type;
  switch (type) {
    case 'straight':
      return `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
    case 'arc': {
      const dx = end.x - start.x;
      const dy = end.y - start.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const radius = distance * curvature;
      return `M ${start.x} ${start.y} A ${radius} ${radius} 0 0 1 ${end.x} ${end.y}`;
    }
    case 'fluid':
      return generateFluidPath(start, end, curvature);
    case 'magnet':
      return generateMagnetPath(start, end);
    case 'grid':
      return generateGridPath(start, end);
    default:
      return `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
  }
};
/**
 * Generate enhanced path data with socket gravity
 */
export const generateEnhancedPathData = (start, end, pathType, curvature = 0.2, _startGravity, _endGravity) => {
  // For now, use basic path generation
  // Socket gravity can be implemented later
  return generatePathData(start, end, pathType, curvature);
};
/**
 * Create plug path for different plug types
 */
export const createPlugPath = (plugType, size = 8) => {
  const halfSize = size / 2;
  switch (plugType) {
    case 'arrow1':
      return `M 0 0 L ${size} ${halfSize} L 0 ${size} z`;
    case 'arrow2':
      return `M 0 ${halfSize} L ${size} 0 L ${size * 0.8} ${halfSize} L ${size} ${size} z`;
    case 'arrow3':
      return `M 0 ${halfSize} L ${size} 0 L ${size * 0.6} ${halfSize} L ${size} ${size} z`;
    case 'disc':
      return `M ${halfSize} ${halfSize} m -${halfSize} 0 a ${halfSize} ${halfSize} 0 1 0 ${size} 0 a ${halfSize} ${halfSize} 0 1 0 -${size} 0`;
    case 'square':
      return `M 0 0 L ${size} 0 L ${size} ${size} L 0 ${size} z`;
    case 'diamond':
      return `M ${halfSize} 0 L ${size} ${halfSize} L ${halfSize} ${size} L 0 ${halfSize} z`;
    case 'hand':
      return `M 0 ${halfSize} L ${size * 0.6} 0 L ${size} ${halfSize * 0.3} L ${size * 0.8} ${halfSize} L ${size} ${
        halfSize * 1.7
      } L ${size * 0.6} ${size} z`;
    case 'crosshair':
      return `M ${halfSize} 0 L ${halfSize} ${size} M 0 ${halfSize} L ${size} ${halfSize}`;
    case 'none':
    case 'behind':
    default:
      return '';
  }
};
/**
 * Enhanced plug path creation
 */
export const createEnhancedPlugPath = createPlugPath;
/**
 * Generate dash array from dash options
 */
export const generateDashArray = dash => {
  if (typeof dash === 'boolean') {
    return dash ? '5,5' : undefined;
  }
  if (typeof dash === 'string') {
    return dash;
  }
  if (typeof dash === 'object' && dash.pattern) {
    return dash.pattern;
  }
  return undefined;
};
/**
 * Calculate path bounding box
 */
export const calculatePathBoundingBox = (start, end, pathType, _curvature = 0.2, strokeWidth = 2) => {
  // Basic bounding box calculation
  const minX = Math.min(start.x, end.x) - strokeWidth / 2;
  const maxX = Math.max(start.x, end.x) + strokeWidth / 2;
  const minY = Math.min(start.y, end.y) - strokeWidth / 2;
  const maxY = Math.max(start.y, end.y) + strokeWidth / 2;

  const width = maxX - minX;
  const height = maxY - minY;

  return {
    x: minX,
    y: minY,
    width: width,
    height: height,
  };
};
/**
 * Calculate path bounding box with outline
 */
export const calculatePathBoundingBoxWithOutline = (start, end, pathType, curvature, strokeWidth, outline) => {
  const baseBounds = calculatePathBoundingBox(start, end, pathType, curvature, strokeWidth);

  // Safely extract outline width with proper null checking
  let outlineWidth = 0;
  if (outline && typeof outline === 'object') {
    outlineWidth = outline.width || outline.size || 0;
  } else if (outline === true) {
    outlineWidth = 1; // Default outline width for boolean true
  }

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
export const normalizeOutlineOptions = (outline, defaultColor) => {
  if (!outline) return null;
  if (typeof outline === 'boolean') {
    return outline
      ? {
          enabled: true,
          color: defaultColor || 'auto',
          width: 1,
          size: 1,
          opacity: 1,
        }
      : null;
  }
  return {
    enabled: outline.enabled !== false,
    color: outline.color || defaultColor || 'auto',
    width: outline.width || outline.size || 1,
    size: outline.size || outline.width || 1,
    opacity: outline.opacity || 1,
  };
};
/**
 * Normalize plug outline options
 */
export const normalizePlugOutlineOptions = (outline, defaultColor) => {
  return normalizeOutlineOptions(outline, defaultColor);
};
// Fluid path generation
const generateFluidPath = (start, end, curvature = 0.2) => {
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
const generateMagnetPath = (start, end) => {
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
const generateGridPath = (start, end) => {
  // Simple grid-aligned path
  const midX = start.x + (end.x - start.x) * 0.5;
  const midY = start.y + (end.y - start.y) * 0.5;
  return `M ${start.x} ${start.y} L ${midX} ${start.y} L ${midX} ${end.y} L ${end.x} ${end.y}`;
};
/**
 * Calculate socket gravity effect
 */
export const calculateSocketGravity = (point, element, gravity) => {
  if (gravity === 'auto') {
    // Auto-determine best socket based on relative position
    const centerX = element.x + element.width / 2;
    const centerY = element.y + element.height / 2;
    const dx = point.x - centerX;
    const dy = point.y - centerY;
    if (Math.abs(dx) > Math.abs(dy)) {
      return dx > 0 ? 'right' : 'left';
    } else {
      return dy > 0 ? 'bottom' : 'top';
    }
  }
  // For now, return center for numeric gravity values
  return 'center';
};
/**
 * Calculate anchor point for point anchors
 */
export const calculateAnchorPoint = (element, x, y) => {
  // This would need element measurement in real implementation
  return { x, y };
};
// Point anchor creation
export const pointAnchor = (element, options) => {
  return {
    element,
    x: (options === null || options === void 0 ? void 0 : options.x) || 0,
    y: (options === null || options === void 0 ? void 0 : options.y) || 0,
  };
};
// Area anchor creation
export const areaAnchor = (element, options) => {
  return {
    element,
    x: (options === null || options === void 0 ? void 0 : options.x) || 0,
    y: (options === null || options === void 0 ? void 0 : options.y) || 0,
    width: (options === null || options === void 0 ? void 0 : options.width) || 100,
    height: (options === null || options === void 0 ? void 0 : options.height) || 100,
  };
};
// Mouse hover anchor creation
export const mouseHoverAnchor = (element, options) => {
  return {
    element,
    showEffectName: (options === null || options === void 0 ? void 0 : options.showEffectName) || 'fade',
    hideEffectName: (options === null || options === void 0 ? void 0 : options.hideEffectName) || 'fade',
    animOptions: (options === null || options === void 0 ? void 0 : options.animOptions) || {},
    style: (options === null || options === void 0 ? void 0 : options.style) || {},
    hoverStyle: (options === null || options === void 0 ? void 0 : options.hoverStyle) || {},
  };
};

export const getConnectionPoints = (startLayout, endLayout, startSocket = 'auto', endSocket = 'auto') => {
  if (!startLayout || !endLayout) {
    return null;
  }

  const dx = endLayout.pageX - startLayout.pageX;
  const dy = endLayout.pageY - startLayout.pageY;

  let startPoint, endPoint;

  if (startSocket === 'auto') {
    // Auto-detect best start socket
    if (Math.abs(dx) > Math.abs(dy)) {
      startPoint = getSocketPoint(startLayout, dx > 0 ? 'right' : 'left');
    } else {
      startPoint = getSocketPoint(startLayout, dy > 0 ? 'bottom' : 'top');
    }
  } else {
    startPoint = getSocketPoint(startLayout, startSocket);
  }

  if (endSocket === 'auto') {
    // Auto-detect best end socket
    if (Math.abs(dx) > Math.abs(dy)) {
      endPoint = getSocketPoint(endLayout, dx > 0 ? 'left' : 'right');
    } else {
      endPoint = getSocketPoint(endLayout, dy > 0 ? 'top' : 'bottom');
    }
  } else {
    endPoint = getSocketPoint(endLayout, endSocket);
  }

  return { start: startPoint, end: endPoint };
};

export const createCaptionDefaults = (options = {}) => {
  return {
    x: options?.x || 0,
    y: options?.y || 0,
    x: options?.x || 0,
    y: options?.y || 0,
    width: options?.width || 100,
    height: options?.height || 100,
    showEffectName: options?.showEffectName || 'fade',
    hideEffectName: options?.hideEffectName || 'fade',
    animOptions: options?.animOptions || {},
    style: options?.style || {},
    hoverStyle: options?.hoverStyle || {},
  };
};
