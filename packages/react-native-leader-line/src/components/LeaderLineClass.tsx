import React from "react";
import { View } from "react-native";
import {
  AnimationOptions,
  AnimationType,
  DashOptions,
  EnhancedDropShadowOptions,
  EnhancedLabelOptions,
  EnhancedLeaderLineOptions,
  OutlineOptions,
  PathConfiguration,
  PathType,
  PlugType,
  SocketGravity,
  SocketPosition,
} from "../types";
import { areaAnchor, mouseHoverAnchor, pointAnchor } from "../utils/math";
import { LeaderLine } from "./LeaderLine";

// Memoized LeaderLine component for better performance
const MemoizedLeaderLine = React.memo(LeaderLine);

export class LeaderLineClass {
  private options: EnhancedLeaderLineOptions = {};
  private component: React.ComponentType<any> | null = null;
  private isVisible: boolean = true;

  constructor(start?: any, end?: any, options: EnhancedLeaderLineOptions = {}) {
    this.options = { ...options };

    if (start && end) {
      this.options.start = { element: start };
      this.options.end = { element: end };
    } else if (start && typeof start === "object") {
      this.options = { ...this.options, ...start };
    }

    // Set default visibility
    if (this.options.hide === undefined) {
      this.options.hide = false;
    }
    this.isVisible = !this.options.hide;
  }

  // Method to set multiple options at once
  setOptions(options: Partial<EnhancedLeaderLineOptions>): this {
    const oldOptions = { ...this.options };
    this.options = { ...this.options, ...options };

    // Check if any visual options changed
    const visualKeys = [
      "color",
      "size",
      "strokeWidth",
      "startPlug",
      "endPlug",
      "path",
      "dash",
      "outline",
      "dropShadow",
    ];

    const hasVisualChanges = visualKeys.some(
      (key) => (oldOptions as any)[key] !== (this.options as any)[key]
    );

    if (hasVisualChanges) {
      this._requestUpdate();
    }

    return this;
  }

  // Private method to request component update
  private _requestUpdate(): void {
    // In a real implementation, this would trigger a re-render
    // For now, we just mark that an update is needed
  }

  // Render method to get React component
  render(): React.ReactElement {
    if (!this.options.start || !this.options.end) {
      return React.createElement(View, {});
    }

    // Extract start and end from options and pass them properly
    const { start, end, ...restOptions } = this.options;

    return React.createElement(MemoizedLeaderLine, {
      start: start!,
      end: end!,
      ...restOptions,
      style: { display: this.isVisible ? "flex" : "none" },
    });
  }

  // Property getters and setters
  get startSocket(): SocketPosition {
    return this.options.startSocket || "center";
  }

  set startSocket(value: SocketPosition) {
    this.setOptions({ startSocket: value });
  }

  get endSocket(): SocketPosition {
    return this.options.endSocket || "center";
  }

  set endSocket(value: SocketPosition) {
    this.setOptions({ endSocket: value });
  }

  get startSocketGravity(): SocketGravity {
    return this.options.startSocketGravity || "auto";
  }

  set startSocketGravity(value: SocketGravity) {
    this.setOptions({ startSocketGravity: value });
  }

  get endSocketGravity(): SocketGravity {
    return this.options.endSocketGravity || "auto";
  }

  set endSocketGravity(value: SocketGravity) {
    this.setOptions({ endSocketGravity: value });
  }

  get path(): PathType | PathConfiguration {
    return this.options.path || "straight";
  }

  set path(value: PathType | PathConfiguration) {
    this.setOptions({ path: value });
  }

  get startPlug(): PlugType {
    return this.options.startPlug || "none";
  }

  set startPlug(value: PlugType) {
    this.setOptions({ startPlug: value });
  }

  get endPlug(): PlugType {
    return this.options.endPlug || "arrow1";
  }

  set endPlug(value: PlugType) {
    this.setOptions({ endPlug: value });
  }

  get dropShadow(): boolean | EnhancedDropShadowOptions {
    return this.options.dropShadow || false;
  }

  set dropShadow(value: boolean | EnhancedDropShadowOptions) {
    this.setOptions({ dropShadow: value });
  }

  // Get/set dash
  get dash(): DashOptions | undefined {
    return typeof this.options.dash === "object"
      ? this.options.dash
      : undefined;
  }

  set dash(value: DashOptions | undefined) {
    this.setOptions({ dash: value });
  }

  get gradient(): any {
    return this.options.gradient;
  }

  set gradient(value: any) {
    this.setOptions({ gradient: value });
  }

  get outline(): boolean | OutlineOptions {
    return this.options.outline || false;
  }

  set outline(value: boolean | OutlineOptions) {
    this.setOptions({ outline: value });
  }

  // Enhanced label properties
  get startLabel(): string | EnhancedLabelOptions | undefined {
    return this.options.startLabel;
  }

  set startLabel(value: string | EnhancedLabelOptions | undefined) {
    this.setOptions({ startLabel: value });
  }

  get middleLabel(): string | EnhancedLabelOptions | undefined {
    return this.options.middleLabel;
  }

  set middleLabel(value: string | EnhancedLabelOptions | undefined) {
    this.setOptions({ middleLabel: value });
  }

  get endLabel(): string | EnhancedLabelOptions | undefined {
    return this.options.endLabel;
  }

  set endLabel(value: string | EnhancedLabelOptions | undefined) {
    this.setOptions({ endLabel: value });
  }

  get captionLabel(): string | EnhancedLabelOptions | undefined {
    return this.options.captionLabel;
  }

  set captionLabel(value: string | EnhancedLabelOptions | undefined) {
    this.setOptions({ captionLabel: value });
  }

  get pathLabel(): string | EnhancedLabelOptions | undefined {
    return this.options.pathLabel;
  }

  set pathLabel(value: string | EnhancedLabelOptions | undefined) {
    this.setOptions({ pathLabel: value });
  }

  // Animation methods
  show(showEffectName?: AnimationType, animOptions?: AnimationOptions): this {
    this.isVisible = true;
    this.options.hide = false;

    if (showEffectName) {
      this._animate(showEffectName, animOptions);
    }

    this._requestUpdate();
    return this;
  }

  hide(hideEffectName?: AnimationType, animOptions?: AnimationOptions): this {
    this.isVisible = false;
    this.options.hide = true;

    if (hideEffectName) {
      this._animate(hideEffectName, animOptions);
    }

    this._requestUpdate();
    return this;
  }

  // Position method to change start and end points
  position(): this {
    this._requestUpdate();
    return this;
  }

  // Remove method
  remove(): void {
    this.component = null;
    this.options = {};
  }

  // Get current options
  getOptions(): EnhancedLeaderLineOptions {
    return { ...this.options };
  }

  // Check if line is currently visible
  public get visible(): boolean {
    return this.isVisible;
  }

  // Get/set color
  get color(): string {
    return this.options.color || "#ff6b6b";
  }

  set color(value: string) {
    this.setOptions({ color: value });
  }

  // Get/set size (strokeWidth)
  get size(): number {
    return this.options.size || this.options.strokeWidth || 2;
  }

  set size(value: number) {
    this.setOptions({ size: value, strokeWidth: value });
  }

  // Private animation method
  private _animate(effectName: AnimationType, _animOptions?: AnimationOptions) {
    // In a real implementation, this would handle animations
    // For React Native, we might use Animated API or other animation libraries
    // Animation options parameter is currently unused but kept for API compatibility

    switch (effectName) {
      case "fade":
        // Implement fade animation
        break;
      case "draw":
        // Implement draw animation
        break;
      case "slide":
        // Implement slide animation
        break;
      default:
        // Default animation
        break;
    }
  }

  // Static anchor methods
  static pointAnchor = pointAnchor;
  static areaAnchor = areaAnchor;
  static mouseHoverAnchor = mouseHoverAnchor;
}

// Helper function to create LeaderLine instance
export const createLeaderLine = (
  start: any,
  end: any,
  options: EnhancedLeaderLineOptions = {}
): LeaderLineClass => {
  return new LeaderLineClass(start, end, options);
};

// Helper function to render LeaderLine from options
export const renderLeaderLine = (
  options: EnhancedLeaderLineOptions,
  instance?: LeaderLineClass
): React.ReactElement => {
  if (options.hide || !instance?.visible) {
    return React.createElement(View, { style: { display: "none" } });
  }

  // Ensure start and end are provided
  if (!options.start || !options.end) {
    return React.createElement(View, {});
  }

  const { start, end, ...restOptions } = options;
  return React.createElement(LeaderLine, {
    start,
    end,
    ...restOptions,
  });
};

export default LeaderLineClass;
