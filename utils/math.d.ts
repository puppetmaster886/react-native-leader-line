import React from "react";
import { Point, SocketPosition, ElementLayout, BoundingBox, PlugType, PathType, SocketGravity, PathConfiguration } from "../types";
/**
 * Calculate the distance between two points
 */
export declare const getDistance: (p1: Point, p2: Point) => number;
/**
 * Calculate the angle between two points in radians
 */
export declare const getAngle: (p1: Point, p2: Point) => number;
/**
 * Get the socket point for an element based on socket position
 */
export declare const getSocketPoint: (layout: ElementLayout, socket: SocketPosition) => Point;
/**
 * Measure element layout information
 */
export declare const measureElement: (element: React.RefObject<any>) => Promise<ElementLayout | null>;
/**
 * Calculate connection points between two elements
 */
export declare const calculateConnectionPoints: (startElement: any, endElement: any, startSocket?: SocketPosition, endSocket?: SocketPosition) => Promise<{
    start: Point;
    end: Point;
} | null>;
/**
 * Generate path data for different path types
 */
export declare const generatePathData: (start: Point, end: Point, pathType: PathType | PathConfiguration, curvature?: number) => string;
/**
 * Generate enhanced path data with socket gravity
 */
export declare const generateEnhancedPathData: (start: Point, end: Point, pathType: PathType | PathConfiguration, curvature?: number, startGravity?: SocketGravity, endGravity?: SocketGravity) => string;
/**
 * Create plug path for different plug types
 */
export declare const createPlugPath: (plugType: PlugType, size?: number) => string;
/**
 * Enhanced plug path creation
 */
export declare const createEnhancedPlugPath: (plugType: PlugType, size?: number) => string;
/**
 * Generate dash array from dash options
 */
export declare const generateDashArray: (dash: boolean | string | any) => string | undefined;
/**
 * Calculate path bounding box
 */
export declare const calculatePathBoundingBox: (start: Point, end: Point, pathType: PathType, curvature?: number, strokeWidth?: number) => BoundingBox;
/**
 * Calculate path bounding box with outline
 */
export declare const calculatePathBoundingBoxWithOutline: (start: Point, end: Point, pathType: PathType, curvature: number, strokeWidth: number, outline: any) => BoundingBox;
/**
 * Normalize outline options
 */
export declare const normalizeOutlineOptions: (outline: any, defaultColor?: string) => {
    enabled: boolean;
    color: any;
    width: any;
    size: any;
    opacity: any;
} | null;
/**
 * Normalize plug outline options
 */
export declare const normalizePlugOutlineOptions: (outline: any, defaultColor?: string) => {
    enabled: boolean;
    color: any;
    width: any;
    size: any;
    opacity: any;
} | null;
/**
 * Calculate socket gravity effect
 */
export declare const calculateSocketGravity: (point: Point, element: BoundingBox, gravity: SocketGravity) => SocketPosition;
/**
 * Calculate anchor point for point anchors
 */
export declare const calculateAnchorPoint: (element: React.RefObject<any>, x: number, y: number) => Point;
export declare const pointAnchor: (element: React.RefObject<any>, options?: {
    x: number;
    y: number;
}) => {
    element: React.RefObject<any>;
    x: number;
    y: number;
};
export declare const areaAnchor: (element: React.RefObject<any>, options?: any) => {
    element: React.RefObject<any>;
    x: any;
    y: any;
    width: any;
    height: any;
};
export declare const mouseHoverAnchor: (element: React.RefObject<any>, options?: any) => {
    element: React.RefObject<any>;
    showEffectName: any;
    hideEffectName: any;
    animOptions: any;
    style: any;
    hoverStyle: any;
};
