import { Point, SocketPosition } from "../types";
export declare const useAttachment: (options: {
    startAttachment?: any;
    endAttachment?: any;
    observeLayout?: boolean;
    throttleMs?: number;
    onAttachmentChange?: (event: any) => void;
}) => {
    startPoint: Point | null;
    endPoint: Point | null;
    startSocket: SocketPosition;
    endSocket: SocketPosition;
    isConnected: boolean;
    startState: {
        isConnected: boolean;
        lastUpdate: number;
        computedSocket: SocketPosition;
        effectivePoint: Point;
        isVisible: boolean;
    };
    endState: {
        isConnected: boolean;
        lastUpdate: number;
        computedSocket: SocketPosition;
        effectivePoint: Point;
        isVisible: boolean;
    };
    forceUpdate: () => void;
    reset: () => void;
};
export default useAttachment;
