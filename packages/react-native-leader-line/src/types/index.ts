import React from "react";
import { ViewStyle } from "react-native";

/**
 * @fileoverview React Native Leader Line Types
 * @description Complete type definitions for the React Native Leader Line library
 * @version 1.1.0
 * @author Federico Garcia
 * @example
 * ```tsx
 * import { LeaderLineProps, SocketPosition } from 'react-native-leader-line';
 *
 * const props: LeaderLineProps = {
 *   start: { element: startRef },
 *   end: { element: endRef },
 *   color: "#3498db",
 *   strokeWidth: 3
 * };
 * ```
 */

/**
 * @interface Point
 * @description Represents a 2D coordinate point in the React Native coordinate system
 * @example
 * ```tsx
 * const point: Point = { x: 100, y: 200 };
 * ```
 */
export interface Point {
  /** X coordinate in React Native's coordinate system (0 = left edge) */
  x: number;
  /** Y coordinate in React Native's coordinate system (0 = top edge) */
  y: number;
}

/**
 * @interface BoundingBox
 * @description Defines a rectangular area with position and dimensions
 * @example
 * ```tsx
 * const box: BoundingBox = { x: 0, y: 0, width: 300, height: 200 };
 * ```
 */
export interface BoundingBox {
  /** Left edge X coordinate */
  x: number;
  /** Top edge Y coordinate */
  y: number;
  /** Width of the rectangle */
  width: number;
  /** Height of the rectangle */
  height: number;
}

/**
 * @type SocketPosition
 * @description Defines where the line connects to an element. Use these predefined positions
 * for consistent attachment points.
 *
 * @example
 * ```tsx
 * // Connect to the top-right corner of an element
 * const socket: SocketPosition = "top_right";
 *
 * // Auto-detect best connection point
 * const autoSocket: SocketPosition = "auto";
 * ```
 */
export type SocketPosition =
  | "auto" // Automatically determine best connection point
  | "center" // Center of the element
  | "top" // Top center
  | "right" // Right center
  | "bottom" // Bottom center
  | "left" // Left center
  | "top_left" // Top-left corner
  | "top_right" // Top-right corner
  | "bottom_left" // Bottom-left corner
  | "bottom_right"; // Bottom-right corner

/**
 * @type PathType
 * @description Defines the visual style of the line path between elements
 *
 * @example
 * ```tsx
 * // Straight line (fastest rendering)
 * const straightPath: PathType = "straight";
 *
 * // Curved arc (more visually appealing)
 * const arcPath: PathType = "arc";
 *
 * // Fluid curved line (most natural looking)
 * const fluidPath: PathType = "fluid";
 * ```
 */
export type PathType =
  | "straight" // Direct line between points
  | "arc" // Simple curved arc
  | "fluid" // Smooth curved line
  | "magnet" // Magnetic field-style curve
  | "grid"; // Grid-aligned path

/**
 * @type PlugType
 * @description Defines the visual marker at the start or end of a line
 *
 * @example
 * ```tsx
 * // Arrow pointing to target
 * const arrowPlug: PlugType = "arrow1";
 *
 * // Circular marker
 * const discPlug: PlugType = "disc";
 *
 * // No marker
 * const noPlug: PlugType = "none";
 * ```
 */
export type PlugType =
  | "none" // No marker
  | "behind" // Marker rendered behind the line
  | "disc" // Circular marker
  | "square" // Square marker
  | "arrow1" // Standard arrow (recommended)
  | "arrow2" // Wider arrow
  | "arrow3" // Narrow arrow
  | "hand" // Hand pointer
  | "crosshair" // Crosshair marker
  | "diamond"; // Diamond shape

/**
 * @type AnimationType
 * @description Animation effects for showing/hiding lines
 *
 * @example
 * ```tsx
 * // Fade in animation
 * line.show("fade");
 *
 * // Draw animation (line draws from start to end)
 * line.show("draw");
 * ```
 */
export type AnimationType =
  | "fade" // Opacity animation
  | "draw" // Line drawing animation
  | "slide" // Slide in/out
  | "bounce" // Bounce effect
  | "scale" // Scale up/down
  | "elastic"; // Elastic spring effect

/**
 * @type TimingFunction
 * @description Easing functions for animations
 */
export type TimingFunction =
  | "linear"
  | "ease"
  | "ease-in"
  | "ease-out"
  | "ease-in-out";

/**
 * @type SocketGravity
 * @description Controls how strongly a connection point "pulls" the line
 *
 * @example
 * ```tsx
 * // Auto-calculate gravity
 * const autoGravity: SocketGravity = "auto";
 *
 * // Custom gravity strength
 * const customGravity: SocketGravity = 150;
 *
 * // X and Y gravity values
 * const xyGravity: SocketGravity = [100, 200];
 * ```
 */
export type SocketGravity = number | [number, number] | "auto";

/**
 * @interface Attachment
 * @description Defines what the line connects to - either a React element or a fixed point
 *
 * @example
 * ```tsx
 * // Connect to a React component
 * const elementAttachment: Attachment = {
 *   element: useRef(null)
 * };
 *
 * // Connect to a fixed coordinate
 * const pointAttachment: Attachment = {
 *   point: { x: 100, y: 200 }
 * };
 * ```
 */
export interface Attachment {
  /** Reference to a React Native component */
  element?: React.RefObject<any>;
  /** Fixed coordinate point */
  point?: Point;
}

/**
 * @interface ElementLayout
 * @description Layout information for a measured React Native element
 */
export interface ElementLayout {
  /** Relative X position */
  x: number;
  /** Relative Y position */
  y: number;
  /** Element width */
  width: number;
  /** Element height */
  height: number;
  /** Absolute X position on screen */
  pageX: number;
  /** Absolute Y position on screen */
  pageY: number;
  /** Timestamp when measured */
  timestamp: number;
}

/**
 * @interface AnimationOptions
 * @description Configuration for line animations
 *
 * @example
 * ```tsx
 * const animOptions: AnimationOptions = {
 *   duration: 1000, // 1 second
 *   timing: "ease-in-out",
 *   delay: 500 // Start after 0.5 seconds
 * };
 * ```
 */
export interface AnimationOptions {
  /** Animation duration in milliseconds */
  duration?: number;
  /** Easing function */
  timing?: TimingFunction;
  /** Delay before animation starts (ms) */
  delay?: number;
}

/**
 * @interface OutlineOptions
 * @description Configuration for line outline/border effect
 *
 * @example
 * ```tsx
 * // White outline around red line
 * const outline: OutlineOptions = {
 *   enabled: true,
 *   color: "white",
 *   size: 2,
 *   opacity: 0.8
 * };
 * ```
 */
export interface OutlineOptions {
  /** Enable outline effect */
  enabled?: boolean;
  /** Outline color (use "auto" to match line color) */
  color?: string;
  /** Outline thickness */
  size?: number;
  /** Outline opacity (0-1) */
  opacity?: number;
  /** Alternative property name for thickness */
  width?: number;
}

/**
 * @interface PlugOutlineOptions
 * @description Configuration for marker/plug outline effects
 */
export interface PlugOutlineOptions {
  enabled?: boolean;
  color?: string;
  size?: number;
  opacity?: number;
  width?: number;
}

/**
 * @interface DropShadowOptions
 * @description Configuration for drop shadow effects
 *
 * @example
 * ```tsx
 * // Subtle drop shadow
 * const shadow: DropShadowOptions = {
 *   dx: 2, // 2px right
 *   dy: 2, // 2px down
 *   blur: 4, // 4px blur
 *   color: "rgba(0,0,0,0.3)",
 *   opacity: 0.5
 * };
 * ```
 */
export interface DropShadowOptions {
  /** Horizontal shadow offset */
  dx?: number;
  /** Vertical shadow offset */
  dy?: number;
  /** Shadow blur radius */
  blur?: number;
  /** Shadow color */
  color?: string;
  /** Shadow opacity (0-1) */
  opacity?: number;
}

/**
 * @interface LabelOptions
 * @description Configuration for simple text labels on lines
 *
 * @example
 * ```tsx
 * const label: LabelOptions = {
 *   text: "Connection",
 *   fontSize: 16,
 *   color: "#333",
 *   offset: { x: 10, y: -5 }
 * };
 * ```
 */
export interface LabelOptions {
  /** Label text content */
  text: string;
  /** Font size in points */
  fontSize?: number;
  /** Font family name */
  fontFamily?: string;
  /** Text color */
  color?: string;
  /** Position along line (0-1, where 0.5 is middle) */
  position?: number;
  /** Offset from calculated position */
  offset?: Point;
  /** Background styling */
  background?: {
    color?: string;
    padding?: number;
    borderRadius?: number;
  };
}

/**
 * @interface DashOptions
 * @description Configuration for dashed line patterns
 *
 * @example
 * ```tsx
 * // Animated dashed line
 * const dash: DashOptions = {
 *   pattern: "10,5", // 10px dash, 5px gap
 *   animation: true
 * };
 * ```
 */
export interface DashOptions {
  /** SVG dash pattern (e.g., "5,5" or "10,5,2,5") */
  pattern?: string;
  /** Enable dash animation */
  animation?: boolean;
}

/**
 * @interface PathConfiguration
 * @description Advanced path configuration with curvature control
 */
export interface PathConfiguration {
  type: PathType;
  /** Curvature amount (0-1, where 0 is straight, 1 is maximum curve) */
  curvature?: number;
}

/**
 * @interface EnhancedLabelOptions
 * @description Rich label configuration with styling options
 *
 * @example
 * ```tsx
 * // Styled label with background
 * const enhancedLabel: EnhancedLabelOptions = {
 *   text: "Process Step",
 *   fontSize: 14,
 *   color: "white",
 *   backgroundColor: "#3498db",
 *   borderRadius: 8,
 *   padding: 8,
 *   offset: [0, -20]
 * };
 * ```
 */
export interface EnhancedLabelOptions {
  /** Label text */
  text: string;
  /** Font size */
  fontSize?: number;
  /** Font family */
  fontFamily?: string;
  /** Text color */
  color?: string;
  /** Background color */
  backgroundColor?: string;
  /** Border radius for background */
  borderRadius?: number;
  /** Padding around text */
  padding?: number;
  /** Position offset [x, y] */
  offset?: [number, number];
}

/**
 * @interface MultipleLabels
 * @description Support for multiple labels at different positions on the line
 *
 * @example
 * ```tsx
 * const multiLabels: MultipleLabels = {
 *   startLabel: "Begin",
 *   middleLabel: {
 *     text: "Processing",
 *     backgroundColor: "#f39c12"
 *   },
 *   endLabel: "Complete",
 *   captionLabel: "Workflow"
 * };
 * ```
 */
export interface MultipleLabels {
  /** Label at line start */
  startLabel?: string | EnhancedLabelOptions;
  /** Label at line middle */
  middleLabel?: string | EnhancedLabelOptions;
  /** Label at line end */
  endLabel?: string | EnhancedLabelOptions;
  /** Caption label (typically above the line) */
  captionLabel?: string | EnhancedLabelOptions;
  /** Path label (follows the line path) */
  pathLabel?: string | EnhancedLabelOptions;
}

/**
 * @interface SocketGravityOptions
 * @description Socket gravity configuration for both ends of the line
 */
export interface SocketGravityOptions {
  /** Start point gravity */
  startSocketGravity?: SocketGravity;
  /** End point gravity */
  endSocketGravity?: SocketGravity;
}

/**
 * @interface EnhancedDropShadowOptions
 * @description Extended drop shadow options with enable flag
 */
export interface EnhancedDropShadowOptions {
  enabled?: boolean;
  dx?: number;
  dy?: number;
  blur?: number;
  color?: string;
  opacity?: number;
}

/**
 * @interface PointAnchor
 * @description Anchor that connects to a specific point on an element
 */
export interface PointAnchor {
  element: React.RefObject<any>;
  x: number;
  y: number;
}

/**
 * @interface AreaAnchor
 * @description Anchor that connects to a rectangular area on an element
 */
export interface AreaAnchor {
  element: React.RefObject<any>;
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * @interface MouseHoverAnchor
 * @description Anchor with hover effects (for future web compatibility)
 */
export interface MouseHoverAnchor {
  element: React.RefObject<any>;
  showEffectName?: AnimationType;
  hideEffectName?: AnimationType;
  animOptions?: AnimationOptions;
  style?: any;
  hoverStyle?: any;
}

/**
 * @type EnhancedAttachmentType
 * @description Union type for all possible attachment types
 */
export type EnhancedAttachmentType =
  | React.RefObject<any>
  | Point
  | PointAnchor
  | AreaAnchor
  | MouseHoverAnchor;

/**
 * @interface LeaderLineOptions
 * @description Core configuration options for LeaderLine
 *
 * @example
 * ```tsx
 * const options: LeaderLineOptions = {
 *   color: "#e74c3c",
 *   strokeWidth: 3,
 *   endPlug: "arrow1",
 *   path: "arc",
 *   curvature: 0.3,
 *   dash: { pattern: "8,4", animation: true }
 * };
 * ```
 */
export interface LeaderLineOptions {
  /** Line color (CSS color string) */
  color?: string;
  /** Line thickness (legacy property name) */
  size?: number;
  /** Line thickness in pixels */
  strokeWidth?: number;
  /** End marker type */
  endPlug?: PlugType;
  /** Start marker type */
  startPlug?: PlugType;
  /** Custom color for start marker */
  startPlugColor?: string;
  /** Custom color for end marker */
  endPlugColor?: string;
  /** Start marker size */
  startPlugSize?: number;
  /** End marker size */
  endPlugSize?: number;
  /** Path type or configuration */
  path?: PathType | PathConfiguration;
  /** Start connection point */
  startSocket?: SocketPosition;
  /** End connection point */
  endSocket?: SocketPosition;
  /** Dash pattern configuration */
  dash?: boolean | string | DashOptions;
  /** Drop shadow configuration */
  dropShadow?: boolean | DropShadowOptions;
  /** Line outline configuration */
  outline?: boolean | OutlineOptions;
  /** Start marker outline */
  startPlugOutline?: boolean | PlugOutlineOptions;
  /** End marker outline */
  endPlugOutline?: boolean | PlugOutlineOptions;
  /** Line opacity (0-1) */
  opacity?: number;
  /** Curve amount for arc paths (0-1) */
  curvature?: number;
  /** Simple label configuration */
  label?: LabelOptions;
  /** Start socket gravity */
  startSocketGravity?: SocketGravity;
  /** End socket gravity */
  endSocketGravity?: SocketGravity;
  /** Gradient configuration */
  gradient?: boolean | any;
  /** Hide the line */
  hide?: boolean;
  /** Start label */
  startLabel?: string | EnhancedLabelOptions;
  /** Middle label */
  middleLabel?: string | EnhancedLabelOptions;
  /** End label */
  endLabel?: string | EnhancedLabelOptions;
  /** Caption label */
  captionLabel?: string | EnhancedLabelOptions;
  /** Path label */
  pathLabel?: string | EnhancedLabelOptions;

  // Animation properties
  /** Animation type for showing/hiding */
  animation?: AnimationType;
  /** Animation duration in milliseconds */
  animationDuration?: number;
  /** Animation easing function */
  animationEasing?: string;
  /** Animation delay in milliseconds */
  animationDelay?: number;
  /** Reverse animation direction */
  animationReverse?: boolean;
  /** Pause animation */
  animationPaused?: boolean;
  /** Restart animation */
  animationRestart?: boolean;
  /** Loop animation */
  animationLoop?: boolean;
  /** Number of animation loops */
  animationLoopCount?: number;
  /** Animation direction */
  animationDirection?: string;
  /** Animation from opacity */
  animationFromOpacity?: number;
  /** Animation to opacity */
  animationToOpacity?: number;
  /** Bounce height for bounce animation */
  animationBounceHeight?: number;
  /** Elasticity for elastic animation */
  animationElasticity?: number;

  // Animation callbacks
  /** Called when animation starts */
  onAnimationStart?: () => void;
  /** Called when animation ends */
  onAnimationEnd?: () => void;
  /** Called on each animation iteration/loop */
  onAnimationIteration?: () => void;
}

/**
 * @interface EnhancedLeaderLineOptions
 * @description Extended options with all enhanced features
 */
export interface EnhancedLeaderLineOptions
  extends LeaderLineOptions,
    MultipleLabels,
    SocketGravityOptions {
  dropShadow?: boolean | EnhancedDropShadowOptions;
  start?: Attachment;
  end?: Attachment;
}

/**
 * @interface LeaderLineProps
 * @description Props for the LeaderLine React component
 *
 * @example
 * ```tsx
 * import React, { useRef } from 'react';
 * import { LeaderLine } from 'react-native-leader-line';
 *
 * const MyComponent = () => {
 *   const startRef = useRef(null);
 *   const endRef = useRef(null);
 *
 *   const props: LeaderLineProps = {
 *     start: { element: startRef },
 *     end: { element: endRef },
 *     color: "#3498db",
 *     strokeWidth: 3,
 *     endPlug: "arrow1",
 *     path: "arc",
 *     curvature: 0.2
 *   };
 *
 *   return (
 *     <View>
 *       <View ref={startRef} />
 *       <View ref={endRef} />
 *       <LeaderLine {...props} />
 *     </View>
 *   );
 * };
 * ```
 */
export interface LeaderLineProps extends LeaderLineOptions {
  /** Starting attachment point (required) */
  start: Attachment;
  /** Ending attachment point (required) */
  end: Attachment;
  /** Container ref to calculate proper coordinate offset for nested layouts */
  containerRef?: React.RefObject<any>;
  /** Additional options object */
  options?: LeaderLineOptions;
  /** Child React components */
  children?: React.ReactNode;
  /** Container style */
  style?: ViewStyle;
  /** Test identifier for testing frameworks */
  testID?: string;
  /** Whether to optimize updates (default: true) */
  optimizeUpdates?: boolean;
  /** Minimum pixel change to trigger update (default: 5) */
  updateThreshold?: number;
}

/**
 * @interface AttachmentState
 * @description State tracking for attachment points
 */
export interface AttachmentState {
  isConnected: boolean;
  lastUpdate: number;
  layoutInfo?: ElementLayout;
  computedSocket: SocketPosition;
  effectivePoint: Point;
  isVisible: boolean;
}

/**
 * @interface UseLeaderLineResult
 * @description Return type for useLeaderLine hook
 */
export interface UseLeaderLineResult {
  createElement: (id: string) => {
    ref: React.RefObject<any>;
    measure: () => Promise<ElementLayout>;
  };
  getConnectionPoints: (
    startId: string,
    endId: string,
    startSocket?: SocketPosition,
    endSocket?: SocketPosition
  ) => Promise<{ start: Point; end: Point } | null>;
  elements: Map<string, React.RefObject<any>>;
  layouts: Map<string, ElementLayout>;
}

/**
 * @interface UseAttachmentResult
 * @description Return type for useAttachment hook
 */
export interface UseAttachmentResult {
  attachments: Map<string, AttachmentState>;
  updateAttachment: (id: string, attachment: Attachment) => void;
  removeAttachment: (id: string) => void;
  getAttachmentPoint: (id: string) => Point | null;
}

/**
 * @namespace LeaderLineTypes
 * @description All types exported as a namespace for convenience
 *
 * @example
 * ```tsx
 * import { LeaderLineTypes } from 'react-native-leader-line';
 *
 * const point: LeaderLineTypes.Point = { x: 100, y: 200 };
 * const socket: LeaderLineTypes.SocketPosition = "top_right";
 * ```
 */
export * as LeaderLineTypes from "./index";

/**
 * @description JSON Schema for LeaderLineProps validation
 * This schema can be used by LLMs to understand and validate the component props
 */
export const LeaderLinePropsSchema = {
  type: "object",
  required: ["start", "end"],
  properties: {
    start: {
      type: "object",
      properties: {
        element: { type: "object" },
        point: {
          type: "object",
          properties: {
            x: { type: "number" },
            y: { type: "number" },
          },
        },
      },
    },
    end: {
      type: "object",
      properties: {
        element: { type: "object" },
        point: {
          type: "object",
          properties: {
            x: { type: "number" },
            y: { type: "number" },
          },
        },
      },
    },
    color: { type: "string", pattern: "^#[0-9A-Fa-f]{6}$|^rgba?\\(" },
    strokeWidth: { type: "number", minimum: 1 },
    startSocket: {
      type: "string",
      enum: [
        "auto",
        "center",
        "top",
        "right",
        "bottom",
        "left",
        "top_left",
        "top_right",
        "bottom_left",
        "bottom_right",
      ],
    },
    endSocket: {
      type: "string",
      enum: [
        "auto",
        "center",
        "top",
        "right",
        "bottom",
        "left",
        "top_left",
        "top_right",
        "bottom_left",
        "bottom_right",
      ],
    },
    path: {
      type: "string",
      enum: ["straight", "arc", "fluid", "magnet", "grid"],
    },
    endPlug: {
      type: "string",
      enum: [
        "none",
        "behind",
        "disc",
        "square",
        "arrow1",
        "arrow2",
        "arrow3",
        "hand",
        "crosshair",
        "diamond",
      ],
    },
  },
} as const;
