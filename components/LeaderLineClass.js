import React from 'react';
import { View } from 'react-native';

import { areaAnchor, mouseHoverAnchor, pointAnchor } from '../utils/math';
import LeaderLine from './LeaderLine';
export class LeaderLineClass {
  constructor(start, end, options = {}) {
    this.options = {};
    this.component = null;
    this.isVisible = true;
    this.id = `line_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`; // Generate unique ID
    this.options = { ...options };

    if (start && end) {
      // Preservar containerRef de las opciones
      const containerRef = options.containerRef;
      this.options.start = {
        element: start,
        containerRef: containerRef, // ← Agregar containerRef
      };
      this.options.end = {
        element: end,
        containerRef: containerRef, // ← Agregar containerRef
      };
    } else if (start && typeof start === 'object') {
      this.options = { ...this.options, ...start };
    }

    // Set default visibility
    if (this.options.hide === undefined) {
      this.options.hide = false;
    }
    this.isVisible = !this.options.hide;
  }
  // Method to set multiple options at once
  setOptions(options) {
    const oldOptions = { ...this.options };
    this.options = { ...this.options, ...options };
    // Check if any visual options changed
    const visualKeys = [
      'color',
      'size',
      'strokeWidth',
      'startPlug',
      'endPlug',
      'path',
      'dash',
      'outline',
      'dropShadow',
    ];
    const hasVisualChanges = visualKeys.some(key => oldOptions[key] !== this.options[key]);
    if (hasVisualChanges) {
      this._requestUpdate();
    }
    return this;
  }
  // Private method to request component update
  _requestUpdate() {
    // In a real implementation, this would trigger a re-render
    // For now, we just mark that an update is needed
  }
  // Render method to get React component
  render() {
    if (!this.options.start || !this.options.end) {
      return null; // Return null instead of empty View
    }

    // Don't render if not visible
    if (!this.isVisible) {
      return null;
    }

    // Extract start and end from options and pass them properly
    const { start, end, ...restOptions } = this.options;

    // Add key prop for React reconciliation
    return React.createElement(LeaderLine, {
      key: this.id,
      start: start,
      end: end,
      ...restOptions,
      // Remove the problematic display style - use visibility through conditional rendering instead
    });
  }
  // Property getters and setters
  get startSocket() {
    return this.options.startSocket || 'center';
  }
  set startSocket(value) {
    this.setOptions({ startSocket: value });
  }
  get endSocket() {
    return this.options.endSocket || 'center';
  }
  set endSocket(value) {
    this.setOptions({ endSocket: value });
  }
  get startSocketGravity() {
    return this.options.startSocketGravity || 'auto';
  }
  set startSocketGravity(value) {
    this.setOptions({ startSocketGravity: value });
  }
  get endSocketGravity() {
    return this.options.endSocketGravity || 'auto';
  }
  set endSocketGravity(value) {
    this.setOptions({ endSocketGravity: value });
  }
  get path() {
    return this.options.path || 'straight';
  }
  set path(value) {
    this.setOptions({ path: value });
  }
  get startPlug() {
    return this.options.startPlug || 'none';
  }
  set startPlug(value) {
    this.setOptions({ startPlug: value });
  }
  get endPlug() {
    return this.options.endPlug || 'arrow1';
  }
  set endPlug(value) {
    this.setOptions({ endPlug: value });
  }
  get dropShadow() {
    return this.options.dropShadow || false;
  }
  set dropShadow(value) {
    this.setOptions({ dropShadow: value });
  }
  // Get/set dash
  get dash() {
    return typeof this.options.dash === 'object' ? this.options.dash : undefined;
  }
  set dash(value) {
    this.setOptions({ dash: value });
  }
  get gradient() {
    return this.options.gradient;
  }
  set gradient(value) {
    this.setOptions({ gradient: value });
  }
  get outline() {
    return this.options.outline || false;
  }
  set outline(value) {
    this.setOptions({ outline: value });
  }
  // Enhanced label properties
  get startLabel() {
    return this.options.startLabel;
  }
  set startLabel(value) {
    this.setOptions({ startLabel: value });
  }
  get middleLabel() {
    return this.options.middleLabel;
  }
  set middleLabel(value) {
    this.setOptions({ middleLabel: value });
  }
  get endLabel() {
    return this.options.endLabel;
  }
  set endLabel(value) {
    this.setOptions({ endLabel: value });
  }
  get captionLabel() {
    return this.options.captionLabel;
  }
  set captionLabel(value) {
    this.setOptions({ captionLabel: value });
  }
  get pathLabel() {
    return this.options.pathLabel;
  }
  set pathLabel(value) {
    this.setOptions({ pathLabel: value });
  }
  // Animation methods
  show(showEffectName, animOptions) {
    this.isVisible = true;
    this.options.hide = false;
    if (showEffectName) {
      this._animate(showEffectName, animOptions);
    }
    this._requestUpdate();
    return this;
  }
  hide(hideEffectName, animOptions) {
    this.isVisible = false;
    this.options.hide = true;
    if (hideEffectName) {
      this._animate(hideEffectName, animOptions);
    }
    this._requestUpdate();
    return this;
  }
  // Position method to change start and end points
  position() {
    this._requestUpdate();
    return this;
  }
  // Remove method
  remove() {
    this.component = null;
    this.options = {};
  }
  // Get current options
  getOptions() {
    return { ...this.options };
  }
  // Check if line is currently visible
  get visible() {
    return this.isVisible;
  }
  // Get/set color
  get color() {
    return this.options.color || '#ff6b6b';
  }
  set color(value) {
    this.setOptions({ color: value });
  }
  // Get/set size (strokeWidth)
  get size() {
    return this.options.size || this.options.strokeWidth || 2;
  }
  set size(value) {
    this.setOptions({ size: value, strokeWidth: value });
  }
  // Private animation method
  _animate(effectName, animOptions) {
    // In a real implementation, this would handle animations
    // For React Native, we might use Animated API or other animation libraries
    const options = {
      duration: 300,
      ...animOptions,
    };
    switch (effectName) {
      case 'fade':
        // Implement fade animation
        break;
      case 'draw':
        // Implement draw animation
        break;
      case 'slide':
        // Implement slide animation
        break;
      default:
        // Default animation
        break;
    }
  }
  // Add measureElements method that the hook expects
  async measureElements() {
    return new Promise(resolve => {
      // For now, just resolve with a mock measurement
      // In a real implementation, this would measure the actual elements
      setTimeout(() => {
        resolve({
          start: { x: 0, y: 0 },
          end: { x: 100, y: 100 },
        });
      }, 10);
    });
  }
}
// Static anchor methods
LeaderLineClass.pointAnchor = pointAnchor;
LeaderLineClass.areaAnchor = areaAnchor;
LeaderLineClass.mouseHoverAnchor = mouseHoverAnchor;
// Helper function to create LeaderLine instance
export const createLeaderLine = (start, end, options = {}) => {
  return new LeaderLineClass(start, end, options);
};
// Helper function to render LeaderLine from options
export const renderLeaderLine = (options, instance) => {
  if (options.hide || !(instance === null || instance === void 0 ? void 0 : instance.visible)) {
    return React.createElement(View, { style: { display: 'none' } });
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
