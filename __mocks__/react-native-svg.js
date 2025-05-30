// Mock for react-native-svg
import React from "react";
import { Text, View } from "react-native";

const createMockComponent = (name, useText = false) => {
  const MockComponent = React.forwardRef((props, ref) => {
    const { children, ...otherProps } = props;
    const Component = useText ? Text : View;
    return React.createElement(
      Component,
      {
        ...otherProps,
        ref,
        testID: props.testID || name,
      },
      children
    );
  });
  MockComponent.displayName = `Mock${name}`;
  return MockComponent;
};

export const Svg = createMockComponent("Svg");
export const Path = createMockComponent("Path");
export const Defs = createMockComponent("Defs");
export const Marker = createMockComponent("Marker");
export const Text = createMockComponent("SvgText", true); // Use Text component for SVG Text
export const Circle = createMockComponent("Circle");
export const Rect = createMockComponent("Rect");
export const Line = createMockComponent("Line");
export const G = createMockComponent("G");
export const Ellipse = createMockComponent("Ellipse");
export const Polygon = createMockComponent("Polygon");
export const Polyline = createMockComponent("Polyline");

export default {
  Svg,
  Path,
  Defs,
  Marker,
  Text,
  Circle,
  Rect,
  Line,
  G,
  Ellipse,
  Polygon,
  Polyline,
};
