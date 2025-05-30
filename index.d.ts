export { LeaderLine } from './components/LeaderLine';
export { LeaderLine as LeaderLineClass, type LeaderLineOptions } from './components/LeaderLineClass';
export { useLeaderLine } from './hooks/useLeaderLine';
export { useLeaderLineManager } from './hooks/useLeaderLineManager';
export type { ArrowOptions, BoundingBox, LeaderLineProps, PathType, Point, SocketPosition } from './types';
export {
  areaAnchor,
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
  pointAnchor,
} from './utils/math';
