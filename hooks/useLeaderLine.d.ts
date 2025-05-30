import { Point, BoundingBox, SocketPosition } from "../types";
interface UseLeaderLineProps {
    startElement?: React.RefObject<any>;
    endElement?: React.RefObject<any>;
    startBox?: BoundingBox;
    endBox?: BoundingBox;
    startSocket?: SocketPosition;
    endSocket?: SocketPosition;
    observeChanges?: boolean;
}
export declare const useLeaderLine: ({ startElement, endElement, startBox, endBox, startSocket, endSocket, observeChanges, }: UseLeaderLineProps) => {
    connectionPoints: {
        start: Point;
        end: Point;
    } | null;
    isReady: boolean;
    updateConnectionPoints: () => Promise<void>;
    calculateConnectionPoint: (box: BoundingBox, position: SocketPosition) => Point;
};
export {};
