import React from "react";
import { LeaderLineProps } from "../types";
export declare const LeaderLine: React.FC<LeaderLineProps>;
export declare const LeaderLineEnhanced: {
    pointAnchor: (element: React.RefObject<any>, options?: {
        x: number;
        y: number;
    }) => {
        element: React.RefObject<any>;
        x: number;
        y: number;
    };
    areaAnchor: (element: React.RefObject<any>, options?: any) => {
        element: React.RefObject<any>;
        x: any;
        y: any;
        width: any;
        height: any;
    };
    mouseHoverAnchor: (element: React.RefObject<any>, options?: any) => {
        element: React.RefObject<any>;
        showEffectName: any;
        hideEffectName: any;
        animOptions: any;
        style: any;
        hoverStyle: any;
    };
    LeaderLine: React.FC<LeaderLineProps>;
};
export default LeaderLine;
