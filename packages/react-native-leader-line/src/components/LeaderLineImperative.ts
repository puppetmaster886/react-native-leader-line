/**
 * @fileoverview Imperative API Wrapper for Leader Line
 * @description Provides a leader-line compatible imperative API for backward compatibility
 * @version 1.2.0
 * @author Federico Garcia
 *
 * @example Basic Usage (leader-line compatibility)
 * ```tsx
 * import { LeaderLineImperative } from 'react-native-leader-line';
 * 
 * // Create a new leader line (similar to original leader-line)
 * const line = new LeaderLineImperative(startRef, endRef, {
 *   color: 'coral',
 *   size: 4,
 *   path: 'straight',
 *   endPlug: 'arrow1'
 * });
 * 
 * // Show the line
 * line.show();
 * 
 * // Update properties
 * line.setOptions({ color: 'blue', size: 6 });
 * 
 * // Hide and remove
 * line.hide();
 * line.remove();
 * ```
 */

import React from 'react';
import { LeaderLineOptions, Attachment, Point } from '../types';

/**
 * @interface ImperativeLeaderLineOptions
 * @description Options for imperative API with leader-line compatibility
 */
export interface ImperativeLeaderLineOptions extends LeaderLineOptions {
  /** Show effect type */
  showEffectName?: string;
  /** Hide effect type */
  hideEffectName?: string;
  /** Animation duration in milliseconds */
  duration?: number;
  /** Animation timing function */
  timing?: string;
  /** Visibility state */
  visible?: boolean;
}

/**
 * @class LeaderLineImperative
 * @description Imperative API wrapper that mimics the original leader-line library
 * 
 * This class provides backward compatibility with the original leader-line API
 * while using React Native Leader Line components under the hood.
 */
export class LeaderLineImperative {
  private startElement: React.RefObject<any> | Point;
  private endElement: React.RefObject<any> | Point;
  private options: ImperativeLeaderLineOptions;
  private isVisible: boolean = false;
  private componentRef: React.RefObject<any> | null = null;
  private renderCallback?: (component: React.ReactElement) => void;

  /**
   * @constructor
   * @param {React.RefObject<any> | Point} start - Start element ref or point
   * @param {React.RefObject<any> | Point} end - End element ref or point  
   * @param {ImperativeLeaderLineOptions} options - Configuration options
   * @param {Function} renderCallback - Callback to render the component
   */
  constructor(
    start: React.RefObject<any> | Point,
    end: React.RefObject<any> | Point,
    options: ImperativeLeaderLineOptions = {},
    renderCallback?: (component: React.ReactElement) => void
  ) {
    this.startElement = start;
    this.endElement = end;
    this.options = { ...options };
    this.renderCallback = renderCallback;
    
    // Auto-show by default (like original leader-line)
    if (this.renderCallback) {
      this.show();
    }
  }

  /**
   * @method show
   * @description Show the leader line with optional effect
   * @param {string} [effectName] - Show effect name
   * @param {ImperativeLeaderLineOptions} [animOptions] - Animation options
   * @returns {LeaderLineImperative} This instance for chaining
   */
  show(effectName?: string, animOptions?: ImperativeLeaderLineOptions): LeaderLineImperative {
    if (!this.renderCallback) {
      return this;
    }

    this.isVisible = true;
    
    const component = this.createComponent({
      ...this.options,
      ...animOptions,
      showEffectName: effectName || this.options.showEffectName,
      visible: true
    });

    this.renderCallback(component);
    return this;
  }

  /**
   * @method hide
   * @description Hide the leader line with optional effect
   * @param {string} [effectName] - Hide effect name
   * @param {ImperativeLeaderLineOptions} [animOptions] - Animation options
   * @returns {LeaderLineImperative} This instance for chaining
   */
  hide(effectName?: string, animOptions?: ImperativeLeaderLineOptions): LeaderLineImperative {
    if (!this.renderCallback) {
      return this;
    }

    this.isVisible = false;
    
    const component = this.createComponent({
      ...this.options,
      ...animOptions,
      hideEffectName: effectName || this.options.hideEffectName,
      visible: false
    });

    this.renderCallback(component);
    return this;
  }

  /**
   * @method setOptions
   * @description Update leader line options
   * @param {ImperativeLeaderLineOptions} newOptions - New options to apply
   * @returns {LeaderLineImperative} This instance for chaining
   */
  setOptions(newOptions: ImperativeLeaderLineOptions): LeaderLineImperative {
    this.options = { ...this.options, ...newOptions };
    
    if (this.isVisible && this.renderCallback) {
      const component = this.createComponent(this.options);
      this.renderCallback(component);
    }
    
    return this;
  }

  /**
   * @method position
   * @description Update line position (recalculate attachment points)
   * @returns {LeaderLineImperative} This instance for chaining
   */
  position(): LeaderLineImperative {
    if (this.isVisible && this.renderCallback) {
      const component = this.createComponent(this.options);
      this.renderCallback(component);
    }
    return this;
  }

  /**
   * @method remove
   * @description Remove the leader line completely
   * @returns {void}
   */
  remove(): void {
    this.isVisible = false;
    if (this.renderCallback) {
      this.renderCallback(React.createElement('div', { style: { display: 'none' } }));
    }
    this.renderCallback = undefined;
  }

  /**
   * @method getOptions
   * @description Get current options
   * @returns {ImperativeLeaderLineOptions} Current options
   */
  getOptions(): ImperativeLeaderLineOptions {
    return { ...this.options };
  }

  /**
   * @method isShown
   * @description Check if line is currently visible
   * @returns {boolean} True if visible
   */
  isShown(): boolean {
    return this.isVisible;
  }

  /**
   * @private
   * @method createComponent
   * @description Create the React component with current options
   * @param {ImperativeLeaderLineOptions} opts - Options to use
   * @returns {React.ReactElement} LeaderLine component
   */
  private createComponent(opts: ImperativeLeaderLineOptions): React.ReactElement {
    // Import dynamically to avoid circular dependencies
    const LeaderLine = require('./LeaderLine').LeaderLine;
    
    // Convert start/end to attachment format
    const startAttachment: Attachment = this.isPoint(this.startElement) 
      ? { point: this.startElement }
      : { element: this.startElement };
      
    const endAttachment: Attachment = this.isPoint(this.endElement)
      ? { point: this.endElement }
      : { element: this.endElement };

    // Map leader-line options to React Native Leader Line props
    const props = {
      start: startAttachment,
      end: endAttachment,
      color: opts.color,
      strokeWidth: opts.size || opts.strokeWidth,
      opacity: opts.visible === false ? 0 : 1,
      path: opts.path,
      curvature: opts.curvature,
      startPlug: opts.startPlug,
      endPlug: opts.endPlug,
      startPlugColor: opts.startPlugColor,
      endPlugColor: opts.endPlugColor,
      startSocket: opts.startSocket,
      endSocket: opts.endSocket,
      outline: opts.outline,
      dropShadow: opts.dropShadow,
      dash: opts.dash,
      animation: opts.showEffectName || opts.hideEffectName,
      animationDuration: opts.duration,
      startLabel: opts.startLabel,
      endLabel: opts.endLabel,
      middleLabel: opts.middleLabel,
      ref: this.componentRef
    };

    return React.createElement(LeaderLine, props);
  }

  /**
   * @private
   * @method isPoint
   * @description Check if value is a Point
   * @param {any} value - Value to check
   * @returns {boolean} True if value is a Point
   */
  private isPoint(value: any): value is Point {
    return value && typeof value.x === 'number' && typeof value.y === 'number';
  }
}

/**
 * @function createLeaderLine
 * @description Factory function for creating leader lines (leader-line compatibility)
 * @param {React.RefObject<any> | Point} start - Start element or point
 * @param {React.RefObject<any> | Point} end - End element or point
 * @param {ImperativeLeaderLineOptions} options - Configuration options
 * @param {Function} renderCallback - Callback to render the component
 * @returns {LeaderLineImperative} New leader line instance
 * 
 * @example
 * ```tsx
 * const line = createLeaderLine(startRef, endRef, {
 *   color: 'red',
 *   size: 3,
 *   endPlug: 'arrow1'
 * }, renderComponent);
 * ```
 */
export function createLeaderLine(
  start: React.RefObject<any> | Point,
  end: React.RefObject<any> | Point,
  options: ImperativeLeaderLineOptions = {},
  renderCallback?: (component: React.ReactElement) => void
): LeaderLineImperative {
  return new LeaderLineImperative(start, end, options, renderCallback);
}

/**
 * @constant LEADER_LINE_VERSION
 * @description Version compatibility with original leader-line
 */
export const LEADER_LINE_VERSION = '1.0.7-react-native';

// Export class as default for ES6 import compatibility
export default LeaderLineImperative;