// Main components
export { LeaderLine } from "./components/LeaderLine";
export { LeaderLineClass } from "./components/LeaderLineClass";

// Hooks
export { useAttachment } from "./hooks/useAttachment";
export { useLeaderLine } from "./hooks/useLeaderLine";
export { useLeaderLineAnimation } from "./hooks/useLeaderLineAnimation";
export { useLeaderLineManager } from "./hooks/useLeaderLineManager";
export { useMultipleLabels } from "./hooks/useMultipleLabels";

// Utility functions (matching original leader-line API)
export {
  areaAnchor,
  // Math utilities
  calculateConnectionPoints,
  calculatePathBoundingBox,
  calculatePathBoundingBoxWithOutline,
  createEnhancedPlugPath,
  createPlugPath,
  generateDashArray,
  generateEnhancedPathData,
  generatePathData,
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
