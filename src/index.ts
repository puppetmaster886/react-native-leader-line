// Main components
export { LeaderLine } from "./components/LeaderLine";

// Hooks
export { useLeaderLine } from "./hooks/useLeaderLine";

// Utility functions
export {
  calculateConnectionPoints,
  getAngle,
  getDistance,
  getSocketPoint,
} from "./utils/math";

// Types - exporting all types from the types module
export * from "./types";

// Default export (main component)
export { LeaderLine as default } from "./components/LeaderLine";
