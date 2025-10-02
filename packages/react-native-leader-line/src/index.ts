// Main components
export { LeaderLine } from "./components/LeaderLine";
export { LeaderLineClass } from "./components/LeaderLineClass";

// Performance-optimized components
export { default as MemoizedLabel } from "./components/MemoizedLabel";
export { default as MemoizedPath } from "./components/MemoizedPath";

// Imperative API (leader-line compatibility)
export { 
  LeaderLineImperative, 
  createLeaderLine as createImperativeLeaderLine,
  LEADER_LINE_VERSION 
} from "./components/LeaderLineImperative";

// Hooks
export { useAttachment } from "./hooks/useAttachment";
export { useLeaderLine } from "./hooks/useLeaderLine";
export { useLeaderLineAnimation } from "./hooks/useLeaderLineAnimation";
export { useLeaderLineManager } from "./hooks/useLeaderLineManager";
export { useMultipleLabels } from "./hooks/useMultipleLabels";
export { 
  useImperativeLeaderLine, 
  useLeaderLineCompatibility 
} from "./hooks/useImperativeLeaderLine";

// Utility functions (matching original leader-line API)
export {
  areaAnchor,
  // Math utilities
  calculateClosestSocket,
  calculateConnectionPoints,
  calculatePathBoundingBox,
  calculatePathBoundingBoxWithOutline,
  createEnhancedPlugPath,
  createPlugPath,
  generateDashArray,
  generateEnhancedPathData,
  generatePathData,
  getAllSocketPoints,
  getAngle,
  getDistance,
  getSocketPoint,
  mouseHoverAnchor,
  normalizeOutlineOptions,
  normalizePlugOutlineOptions,
  // Anchor functions (original API compatibility)
  pointAnchor,
} from "./utils/math";

// Types (comprehensive export)
export type {
  AnimationOptions,
  AnimationType,
  AreaAnchor,
  Attachment,
  // Hook types
  AttachmentState,
  BoundingBox,
  DashOptions,
  DropShadowOptions,
  ElementLayout,
  EnhancedAttachmentType,
  EnhancedDropShadowOptions,
  EnhancedLabelOptions,
  EnhancedLeaderLineOptions,
  LabelOptions,
  // Configuration types
  LeaderLineOptions,
  LeaderLineProps,
  MouseHoverAnchor,
  MultipleLabels,
  OutlineOptions,
  // Advanced types
  PathConfiguration,
  PathType,
  PlugOutlineOptions,
  PlugType,
  // Core types
  Point,
  // Anchor types
  PointAnchor,
  SocketGravityOptions,
  // Enum-like types
  SocketPosition,
  TimingFunction,
  UseAttachmentResult,
  UseLeaderLineResult,
} from "./types";

// Imperative API types
export type { 
  ImperativeLeaderLineOptions,
} from "./components/LeaderLineImperative";
export type {
  ImperativeLineInstance,
  UseImperativeLeaderLineReturn,
} from "./hooks/useImperativeLeaderLine";

// Performance component types
export type { MemoizedLabelProps } from "./components/MemoizedLabel";
export type { MemoizedPathProps } from "./components/MemoizedPath";

// Import required types for the helper function
import { LeaderLineClass } from "./components/LeaderLineClass";
import type { LeaderLineOptions } from "./types";

// Helper function for original API compatibility
export const createLeaderLine = (
  start: any,
  end: any,
  options: Partial<LeaderLineOptions> = {}
): LeaderLineClass => {
  return new LeaderLineClass(start, end, options);
};

// Default export (main component for easy importing)
export { LeaderLine as default } from "./components/LeaderLine";

// Version tracking for development
export { LIBRARY_VERSION, VERSION_NOTES, BUILD_TIMESTAMP } from "./version";
