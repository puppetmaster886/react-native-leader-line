import React from "react";
import { ViewStyle } from "react-native";
export interface Point {
    x: number;
    y: number;
}
export interface BoundingBox {
    x: number;
    y: number;
    width: number;
    height: number;
}
export type SocketPosition = "auto" | "center" | "top" | "right" | "bottom" | "left" | "top_left" | "top_right" | "bottom_left" | "bottom_right";
export type PathType = "straight" | "arc" | "fluid" | "magnet" | "grid";
export type PlugType = "none" | "behind" | "disc" | "square" | "arrow1" | "arrow2" | "arrow3" | "hand" | "crosshair" | "diamond";
export type AnimationType = "fade" | "draw" | "slide" | "bounce" | "scale";
export type TimingFunction = "linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out";
export type SocketGravity = number | [number, number] | "auto";
export interface Attachment {
    element?: React.RefObject<any>;
    point?: Point;
}
export interface ElementLayout {
    x: number;
    y: number;
    width: number;
    height: number;
    pageX: number;
    pageY: number;
    timestamp: number;
}
export interface AnimationOptions {
    duration?: number;
    timing?: TimingFunction;
    delay?: number;
}
export interface OutlineOptions {
    enabled?: boolean;
    color?: string;
    size?: number;
    opacity?: number;
    width?: number;
}
export interface PlugOutlineOptions {
    enabled?: boolean;
    color?: string;
    size?: number;
    opacity?: number;
    width?: number;
}
export interface DropShadowOptions {
    dx?: number;
    dy?: number;
    blur?: number;
    color?: string;
    opacity?: number;
}
export interface LabelOptions {
    text: string;
    fontSize?: number;
    fontFamily?: string;
    color?: string;
    position?: number;
    offset?: Point;
    background?: {
        color?: string;
        padding?: number;
        borderRadius?: number;
    };
}
export interface DashOptions {
    pattern?: string;
    animation?: boolean;
}
export interface PathConfiguration {
    type: PathType;
    curvature?: number;
}
export interface EnhancedLabelOptions {
    text: string;
    fontSize?: number;
    fontFamily?: string;
    color?: string;
    backgroundColor?: string;
    borderRadius?: number;
    padding?: number;
    offset?: [number, number];
}
export interface MultipleLabels {
    startLabel?: string | EnhancedLabelOptions;
    middleLabel?: string | EnhancedLabelOptions;
    endLabel?: string | EnhancedLabelOptions;
    captionLabel?: string | EnhancedLabelOptions;
    pathLabel?: string | EnhancedLabelOptions;
}
export interface SocketGravityOptions {
    startSocketGravity?: SocketGravity;
    endSocketGravity?: SocketGravity;
}
export interface EnhancedDropShadowOptions {
    enabled?: boolean;
    dx?: number;
    dy?: number;
    blur?: number;
    color?: string;
    opacity?: number;
}
export interface PointAnchor {
    element: React.RefObject<any>;
    x: number;
    y: number;
}
export interface AreaAnchor {
    element: React.RefObject<any>;
    x: number;
    y: number;
    width: number;
    height: number;
}
export interface MouseHoverAnchor {
    element: React.RefObject<any>;
    showEffectName?: AnimationType;
    hideEffectName?: AnimationType;
    animOptions?: AnimationOptions;
    style?: any;
    hoverStyle?: any;
}
export type EnhancedAttachmentType = React.RefObject<any> | Point | PointAnchor | AreaAnchor | MouseHoverAnchor;
export interface LeaderLineOptions {
    color?: string;
    size?: number;
    strokeWidth?: number;
    endPlug?: PlugType;
    startPlug?: PlugType;
    startPlugColor?: string;
    endPlugColor?: string;
    startPlugSize?: number;
    endPlugSize?: number;
    path?: PathType | PathConfiguration;
    startSocket?: SocketPosition;
    endSocket?: SocketPosition;
    dash?: boolean | string | DashOptions;
    dropShadow?: boolean | DropShadowOptions;
    outline?: boolean | OutlineOptions;
    startPlugOutline?: boolean | PlugOutlineOptions;
    endPlugOutline?: boolean | PlugOutlineOptions;
    opacity?: number;
    curvature?: number;
    label?: LabelOptions;
    startSocketGravity?: SocketGravity;
    endSocketGravity?: SocketGravity;
    gradient?: boolean | any;
    hide?: boolean;
    startLabel?: string | EnhancedLabelOptions;
    middleLabel?: string | EnhancedLabelOptions;
    endLabel?: string | EnhancedLabelOptions;
    captionLabel?: string | EnhancedLabelOptions;
    pathLabel?: string | EnhancedLabelOptions;
}
export interface EnhancedLeaderLineOptions extends LeaderLineOptions, MultipleLabels, SocketGravityOptions {
    dropShadow?: boolean | EnhancedDropShadowOptions;
    start?: Attachment;
    end?: Attachment;
}
export interface LeaderLineProps extends LeaderLineOptions {
    start: Attachment;
    end: Attachment;
    startSocket?: SocketPosition;
    endSocket?: SocketPosition;
    options?: LeaderLineOptions;
    children?: React.ReactNode;
    style?: ViewStyle;
    startLabel?: string | EnhancedLabelOptions;
    middleLabel?: string | EnhancedLabelOptions;
    endLabel?: string | EnhancedLabelOptions;
    captionLabel?: string | EnhancedLabelOptions;
    pathLabel?: string | EnhancedLabelOptions;
}
export interface AttachmentState {
    isConnected: boolean;
    lastUpdate: number;
    layoutInfo?: ElementLayout;
    computedSocket: SocketPosition;
    effectivePoint: Point;
    isVisible: boolean;
}
export interface UseLeaderLineResult {
    createElement: (id: string) => {
        ref: React.RefObject<any>;
        measure: () => Promise<ElementLayout>;
    };
    getConnectionPoints: (startId: string, endId: string, startSocket?: SocketPosition, endSocket?: SocketPosition) => Promise<{
        start: Point;
        end: Point;
    } | null>;
    elements: Map<string, React.RefObject<any>>;
    layouts: Map<string, ElementLayout>;
}
export interface UseAttachmentResult {
    attachments: Map<string, AttachmentState>;
    updateAttachment: (id: string, attachment: Attachment) => void;
    removeAttachment: (id: string) => void;
    getAttachmentPoint: (id: string) => Point | null;
}
export * as LeaderLineTypes from "./index";
