import { useCallback, useEffect, useRef, useState } from "react";
import { BoundingBox, ElementLayout, Point, SocketPosition } from "../types";
import { getSocketPoint, measureElement } from "../utils/math";

interface UseLeaderLineProps {
  startElement?: React.RefObject<any>;
  endElement?: React.RefObject<any>;
  startBox?: BoundingBox;
  endBox?: BoundingBox;
  startSocket?: SocketPosition;
  endSocket?: SocketPosition;
  observeChanges?: boolean;
}

// Helper function to convert BoundingBox to ElementLayout
const boundingBoxToLayout = (box: BoundingBox): ElementLayout => ({
  x: box.x,
  y: box.y,
  width: box.width,
  height: box.height,
  pageX: box.x,
  pageY: box.y,
  timestamp: Date.now(),
});

export const useLeaderLine = ({
  startElement,
  endElement,
  startBox,
  endBox,
  startSocket = "center",
  endSocket = "center",
  observeChanges = true,
}: UseLeaderLineProps) => {
  const [connectionPoints, setConnectionPoints] = useState<{
    start: Point;
    end: Point;
  } | null>(null);
  const [isReady, setIsReady] = useState(false);

  // Use number instead of NodeJS.Timeout for React Native compatibility
  const intervalRef = useRef<number | null>(null);

  const calculateConnectionPoint = useCallback(
    (box: BoundingBox, position: SocketPosition): Point => {
      const layout = boundingBoxToLayout(box);
      return getSocketPoint(layout, position);
    },
    []
  );

  const updateConnectionPoints = useCallback(async () => {
    try {
      if (startBox && endBox) {
        // Use provided bounding boxes
        const adjustedStartBox = boundingBoxToLayout(startBox);
        const adjustedEndBox = boundingBoxToLayout(endBox);

        const points = {
          start: getSocketPoint(adjustedStartBox, startSocket),
          end: getSocketPoint(adjustedEndBox, endSocket),
        };

        setConnectionPoints(points);
        setIsReady(true);
      } else if (startElement?.current && endElement?.current) {
        // Measure elements
        const startLayout = await measureElement(startElement);
        const endLayout = await measureElement(endElement);

        if (startLayout && endLayout) {
          const points = {
            start: getSocketPoint(startLayout, startSocket),
            end: getSocketPoint(endLayout, endSocket),
          };

          setConnectionPoints(points);
          setIsReady(true);
        }
      }
    } catch (error) {
      console.warn("Error calculating connection points:", error);
      setIsReady(false);
    }
  }, [startElement, endElement, startBox, endBox, startSocket, endSocket]);

  useEffect(() => {
    updateConnectionPoints();
  }, [updateConnectionPoints]);

  // Use interval-based observation for React Native instead of ResizeObserver
  useEffect(() => {
    if (!observeChanges) return;

    const startEl = startElement?.current;
    const endEl = endElement?.current;

    if (startEl && endEl) {
      // Poll for changes every 100ms (adjust as needed)
      intervalRef.current = setInterval(() => {
        updateConnectionPoints();
      }, 100);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [startElement, endElement, observeChanges, updateConnectionPoints]);

  return {
    connectionPoints,
    isReady,
    updateConnectionPoints,
    calculateConnectionPoint,
  };
};
