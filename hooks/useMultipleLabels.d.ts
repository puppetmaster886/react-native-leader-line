import { Point, EnhancedLabelOptions, MultipleLabels } from "../types";
interface LabelRenderData {
    key: string;
    config: EnhancedLabelOptions;
    position: Point;
}
/**
 * Simplified hook for managing multiple labels on leader lines
 */
export declare const useMultipleLabels: (startPoint: Point | null, endPoint: Point | null, labels: MultipleLabels) => {
    labelRenderData: LabelRenderData[];
};
export {};
