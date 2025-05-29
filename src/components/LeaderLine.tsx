import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Text, View } from "react-native";
import Svg, { Defs, Marker, Path, Text as SvgText } from "react-native-svg";
import { useMultipleLabels } from "../hooks/useMultipleLabels";
import { BoundingBox, LeaderLineProps, Point } from "../types";
import {
  areaAnchor,
  calculateConnectionPoints,
  calculatePathBoundingBoxWithOutline,
  createEnhancedPlugPath,
  generateDashArray,
  generateEnhancedPathData,
  mouseHoverAnchor,
  normalizeOutlineOptions,
  normalizePlugOutlineOptions,
  pointAnchor,
} from "../utils/math";

export const LeaderLine: React.FC<LeaderLineProps> = ({
  start,
  end,
  startSocket = "center",
  endSocket = "center",
  color = "#ff6b6b",
  strokeWidth = 2,
  opacity = 1,
  path = "straight",
  curvature = 0.2,
  startPlug = "none",
  endPlug = "arrow1",
  startPlugColor,
  endPlugColor,
  startPlugSize = 10,
  endPlugSize = 10,
  dash,
  // Outline options
  outline,
  startPlugOutline,
  endPlugOutline,
  // Drop shadow
  dropShadow = false,
  // Label
  label,
  // Display options
  style,
  children,
  // Enhanced properties from original library (add these to LeaderLineProps)
  startLabel,
  middleLabel,
  endLabel,
  captionLabel,
  pathLabel,
}) => {
  const [startPoint, setStartPoint] = useState<Point | null>(null);
  const [endPoint, setEndPoint] = useState<Point | null>(null);
  const [svgBounds, setSvgBounds] = useState<BoundingBox>({
    x: 0,
    y: 0,
    width: 400,
    height: 300,
  });

  // Calculate connection points
  useEffect(() => {
    const calculatePoints = async () => {
      if (start.element?.current && end.element?.current) {
        const points = await calculateConnectionPoints(
          start.element.current,
          end.element.current,
          startSocket,
          endSocket
        );
        if (points) {
          setStartPoint(points.start);
          setEndPoint(points.end);
        }
      } else if (start.point && end.point) {
        setStartPoint(start.point);
        setEndPoint(end.point);
      }
    };

    calculatePoints();
  }, [start, end, startSocket, endSocket]);

  // Enhanced labels support
  const labels = useMemo(
    () => ({
      startLabel,
      middleLabel,
      endLabel,
      captionLabel,
      pathLabel,
    }),
    [startLabel, middleLabel, endLabel, captionLabel, pathLabel]
  );

  const { labelRenderData } = useMultipleLabels(startPoint, endPoint, labels);

  // Update SVG bounds when points change
  useEffect(() => {
    if (startPoint && endPoint) {
      const pathType = typeof path === "string" ? path : path.type;
      const normalizedMainOutline = normalizeOutlineOptions(outline);

      const newBounds = calculatePathBoundingBoxWithOutline(
        startPoint,
        endPoint,
        pathType,
        curvature,
        strokeWidth,
        normalizedMainOutline
      );

      // Add some padding
      const padding = 20;
      setSvgBounds({
        x: newBounds.x - padding,
        y: newBounds.y - padding,
        width: newBounds.width + padding * 2,
        height: newBounds.height + padding * 2,
      });
    }
  }, [startPoint, endPoint, path, curvature, strokeWidth, outline]);

  // Generate path data
  const pathData = useMemo(() => {
    if (!startPoint || !endPoint) return "";
    return generateEnhancedPathData(startPoint, endPoint, path, curvature);
  }, [startPoint, endPoint, path, curvature]);

  // Normalize outline options
  const normalizedMainOutline = useMemo(() => {
    return normalizeOutlineOptions(outline);
  }, [outline]);

  const normalizedStartPlugOutline = useMemo(() => {
    return normalizePlugOutlineOptions(startPlugOutline);
  }, [startPlugOutline]);

  const normalizedEndPlugOutline = useMemo(() => {
    return normalizePlugOutlineOptions(endPlugOutline);
  }, [endPlugOutline]);

  // Create plug paths
  const startPlugPath = useMemo(() => {
    return createEnhancedPlugPath(startPlug, startPlugSize);
  }, [startPlug, startPlugSize]);

  const endPlugPath = useMemo(() => {
    return createEnhancedPlugPath(endPlug, endPlugSize);
  }, [endPlug, endPlugSize]);

  // Render drop shadow
  const renderDropShadow = useCallback(() => {
    if (!dropShadow) return null;

    const shadowOptions =
      typeof dropShadow === "boolean"
        ? { dx: 2, dy: 2, blur: 2, color: "rgba(0,0,0,0.3)", opacity: 0.3 }
        : {
            dx: 2,
            dy: 2,
            blur: 2,
            color: "rgba(0,0,0,0.3)",
            opacity: 0.3,
            ...dropShadow,
          };

    return (
      <Path
        d={pathData}
        stroke={shadowOptions.color}
        strokeWidth={strokeWidth}
        fill="none"
        opacity={shadowOptions.opacity}
        transform={`translate(${shadowOptions.dx}, ${shadowOptions.dy})`}
      />
    );
  }, [dropShadow, pathData, strokeWidth]);

  // Render basic label
  const renderLabel = useCallback(() => {
    if (!label || !startPoint || !endPoint) return null;

    const labelConfig = typeof label === "string" ? { text: label } : label;
    const midPoint = {
      x: (startPoint.x + endPoint.x) / 2,
      y: (startPoint.y + endPoint.y) / 2,
    };

    return (
      <SvgText
        x={midPoint.x + (labelConfig.offset?.x || 0)}
        y={midPoint.y + (labelConfig.offset?.y || 0)}
        fontSize={labelConfig.fontSize || 14}
        fontFamily={labelConfig.fontFamily || "Arial"}
        fill={labelConfig.color || "#000000"}
        textAnchor="middle"
        alignmentBaseline="middle"
      >
        {labelConfig.text}
      </SvgText>
    );
  }, [label, startPoint, endPoint]);

  // Render multiple labels
  const renderMultipleLabels = useCallback(() => {
    return labelRenderData.map(({ key, config, position }) => {
      const labelStyle = {
        position: "absolute" as const,
        left: position.x - 50, // Center horizontally
        top: position.y - 15, // Center vertically
        backgroundColor: config.backgroundColor,
        borderRadius: config.borderRadius,
        padding: typeof config.padding === "number" ? config.padding : 4,
        minWidth: 30,
        alignItems: "center" as const,
        justifyContent: "center" as const,
      };

      return (
        <View key={key} style={labelStyle}>
          <Text
            style={{
              fontSize: config.fontSize,
              fontFamily: config.fontFamily,
              color: config.color,
              textAlign: "center",
            }}
          >
            {config.text}
          </Text>
        </View>
      );
    });
  }, [labelRenderData]);

  // Don't render if no points
  if (!startPoint || !endPoint) {
    return children ? <View style={style}>{children}</View> : null;
  }

  return (
    <View style={[{ position: "absolute" }, style]}>
      <Svg
        width={svgBounds.width}
        height={svgBounds.height}
        style={{
          position: "absolute",
          left: svgBounds.x,
          top: svgBounds.y,
        }}
      >
        <Defs>
          {/* Start plug marker */}
          {startPlug !== "none" && startPlug !== "behind" && (
            <Marker
              id="start-marker"
              markerWidth={startPlugSize}
              markerHeight={startPlugSize}
              refX={0}
              refY={startPlugSize / 2}
              orient="auto"
            >
              {/* Outline for start plug */}
              {normalizedStartPlugOutline && (
                <Path
                  d={startPlugPath}
                  fill={
                    normalizedStartPlugOutline.color === "auto"
                      ? startPlugColor || color
                      : normalizedStartPlugOutline.color
                  }
                  opacity={normalizedStartPlugOutline.opacity || 1}
                  transform={`scale(${
                    1 + (normalizedStartPlugOutline.width || 1) * 0.1
                  })`}
                />
              )}
              <Path d={startPlugPath} fill={startPlugColor || color} />
            </Marker>
          )}

          {/* End plug marker */}
          {endPlug !== "none" && endPlug !== "behind" && (
            <Marker
              id="end-marker"
              markerWidth={endPlugSize}
              markerHeight={endPlugSize}
              refX={endPlugSize}
              refY={endPlugSize / 2}
              orient="auto"
            >
              {/* Outline for end plug */}
              {normalizedEndPlugOutline && (
                <Path
                  d={endPlugPath}
                  fill={
                    normalizedEndPlugOutline.color === "auto"
                      ? endPlugColor || color
                      : normalizedEndPlugOutline.color
                  }
                  opacity={normalizedEndPlugOutline.opacity || 1}
                  transform={`scale(${
                    1 + (normalizedEndPlugOutline.width || 1) * 0.1
                  })`}
                />
              )}
              <Path d={endPlugPath} fill={endPlugColor || color} />
            </Marker>
          )}
        </Defs>

        {/* Drop shadow */}
        {renderDropShadow()}

        {/* Main outline path */}
        {normalizedMainOutline && (
          <Path
            d={pathData}
            stroke={
              normalizedMainOutline.color === "auto"
                ? color
                : normalizedMainOutline.color || color
            }
            strokeWidth={strokeWidth + (normalizedMainOutline.width || 1) * 2}
            fill="none"
            opacity={normalizedMainOutline.opacity || 1}
            strokeDasharray={dash ? generateDashArray(dash) : undefined}
          />
        )}

        {/* Main path */}
        <Path
          d={pathData}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          opacity={opacity}
          strokeDasharray={dash ? generateDashArray(dash) : undefined}
          markerStart={
            startPlug !== "none" && startPlug !== "behind"
              ? "url(#start-marker)"
              : undefined
          }
          markerEnd={
            endPlug !== "none" && endPlug !== "behind"
              ? "url(#end-marker)"
              : undefined
          }
        />

        {/* Behind plugs (rendered after the line) */}
        {startPlug === "behind" && (
          <Path
            d={createEnhancedPlugPath("square", startPlugSize)}
            fill={startPlugColor || color}
            transform={`translate(${startPoint.x}, ${
              startPoint.y - startPlugSize / 2
            })`}
          />
        )}

        {endPlug === "behind" && (
          <Path
            d={createEnhancedPlugPath("square", endPlugSize)}
            fill={endPlugColor || color}
            transform={`translate(${endPoint.x - endPlugSize}, ${
              endPoint.y - endPlugSize / 2
            })`}
          />
        )}

        {/* Basic label */}
        {renderLabel()}
      </Svg>

      {/* Render multiple labels as React Native Views */}
      {renderMultipleLabels()}

      {children}
    </View>
  );
};

// Export enhanced anchor creation functions for compatibility with original API
export const LeaderLineEnhanced = {
  pointAnchor,
  areaAnchor,
  mouseHoverAnchor,
  LeaderLine,
};

export default LeaderLine;
