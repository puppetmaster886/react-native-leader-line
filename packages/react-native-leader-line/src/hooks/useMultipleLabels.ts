import * as React from "react";
const { useMemo } = React;
import { EnhancedLabelOptions, MultipleLabels, Point } from "../types";

interface LabelRenderData {
  key: string;
  config: EnhancedLabelOptions;
  position: Point;
}

/**
 * Simplified hook for managing multiple labels on leader lines
 */
export const useMultipleLabels = (
  startPoint: Point | null,
  endPoint: Point | null,
  labels: MultipleLabels
): { labelRenderData: LabelRenderData[] } => {
  // Safety check for React hooks availability
  if (!React || !useMemo) {
    return { labelRenderData: [] };
  }
  
  const labelRenderData = useMemo(() => {
    if (!startPoint || !endPoint) return [];

    const renderData: LabelRenderData[] = [];

    // Helper function to normalize label config
    const normalizeLabel = (
      label: string | EnhancedLabelOptions
    ): EnhancedLabelOptions => {
      if (typeof label === "string") {
        return {
          text: label,
          fontSize: 14,
          fontFamily: "Arial",
          color: "#000000",
          backgroundColor: "transparent",
          padding: 4,
        };
      }
      return {
        fontSize: 14,
        fontFamily: "Arial",
        color: "#000000",
        backgroundColor: "transparent",
        padding: 4,
        ...label,
      };
    };

    // Calculate positions along the line
    const calculatePosition = (ratio: number): Point => ({
      x: startPoint.x + (endPoint.x - startPoint.x) * ratio,
      y: startPoint.y + (endPoint.y - startPoint.y) * ratio,
    });

    // Start label
    if (labels.startLabel) {
      renderData.push({
        key: "start",
        config: normalizeLabel(labels.startLabel),
        position: calculatePosition(0.1), // 10% from start
      });
    }

    // Middle label
    if (labels.middleLabel) {
      renderData.push({
        key: "middle",
        config: normalizeLabel(labels.middleLabel),
        position: calculatePosition(0.5), // 50% (center)
      });
    }

    // End label
    if (labels.endLabel) {
      renderData.push({
        key: "end",
        config: normalizeLabel(labels.endLabel),
        position: calculatePosition(0.9), // 90% from start
      });
    }

    // Caption label (above middle)
    if (labels.captionLabel) {
      const midPos = calculatePosition(0.5);
      renderData.push({
        key: "caption",
        config: normalizeLabel(labels.captionLabel),
        position: {
          x: midPos.x,
          y: midPos.y - 20, // Offset above line
        },
      });
    }

    // Path label (below middle)
    if (labels.pathLabel) {
      const midPos = calculatePosition(0.5);
      renderData.push({
        key: "path",
        config: normalizeLabel(labels.pathLabel),
        position: {
          x: midPos.x,
          y: midPos.y + 20, // Offset below line
        },
      });
    }

    return renderData;
  }, [startPoint, endPoint, labels]);

  return { labelRenderData };
};
