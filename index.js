// Main components
export { LeaderLine } from "./components/LeaderLine";
export { LeaderLineClass, createLeaderLine } from "./components/LeaderLineClass";

// Hooks - usar importación directa para evitar problemas
export { useLeaderLine } from "./hooks/useLeaderLine";
export { useLeaderLineManager as default, useLeaderLineManager } from "./hooks/useLeaderLineManager";
// Utility functions
export {
    areaAnchor, calculateConnectionPoints, calculatePathBoundingBox,
    calculatePathBoundingBoxWithOutline, createEnhancedPlugPath, createPlugPath, generateDashArray, generateEnhancedPathData, generatePathData, getAngle, getDistance, getSocketPoint, mouseHoverAnchor, normalizeOutlineOptions,
    normalizePlugOutlineOptions,
    pointAnchor
} from "./utils/math";
// Types - exporting all types from the types module
export * from "./types";
// Default export (main component)
export { LeaderLine as default } from "./components/LeaderLine";
