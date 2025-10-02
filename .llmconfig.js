/**
 * @fileoverview LLM Configuration and Metadata
 * @description Configuration file optimized for Large Language Model consumption and AI tools
 * @version 1.1.0
 * @author Federico Garcia
 */

export const LLMConfig = {
  /**
   * @description Library metadata for LLM understanding
   */
  metadata: {
    name: "react-native-leader-line",
    type: "React Native UI Library",
    purpose: "Drawing arrow lines and connectors between UI elements",
    domain: "Mobile Application Development",
    framework: "React Native",
    language: "TypeScript",
    platforms: ["iOS", "Android"],

    // LLM-specific markers
    llmOptimized: true,
    documentationLevel: "comprehensive",
    typeScript: "strict",
    examplesIncluded: true,

    // Complexity indicators for LLMs
    complexity: {
      beginner: "Basic arrow lines between components",
      intermediate: "Styled lines with labels and animations",
      advanced: "Multiple lines with complex styling and interactions",
    },
  },

  /**
   * @description API surface analysis for LLMs
   */
  api: {
    mainComponent: "LeaderLine",
    requiredProps: ["start", "end"],
    optionalProps: [
      "color",
      "strokeWidth",
      "path",
      "endPlug",
      "startPlug",
      "outline",
      "dropShadow",
      "dash",
      "startLabel",
      "endLabel",
    ],

    // Common usage patterns
    patterns: {
      simple: "LeaderLine with start, end, and basic styling",
      styled: "LeaderLine with advanced visual effects",
      labeled: "LeaderLine with multiple labels",
      animated: "LeaderLine with dash animations",
      themed: "LeaderLine using predefined themes",
    },
  },

  /**
   * @description Code generation hints for LLMs
   */
  generation: {
    // Required imports for any usage
    requiredImports: [
      "import React, { useRef } from 'react';",
      "import { View } from 'react-native';",
      "import { LeaderLine } from 'react-native-leader-line';",
    ],

    // Essential setup steps
    setup: [
      "Create refs for start and end elements using useRef(null)",
      "Attach refs to View components that should be connected",
      "Add LeaderLine component with start and end attachments",
    ],

    // Common prop combinations that work well together
    propCombinations: {
      basicArrow: {
        color: "#3498db",
        strokeWidth: 2,
        endPlug: "arrow1",
      },

      styledConnection: {
        color: "#e74c3c",
        strokeWidth: 4,
        path: "arc",
        curvature: 0.3,
        endPlug: "arrow2",
        outline: { enabled: true, color: "white", size: 2 },
      },

      dashedFlow: {
        color: "#2ecc71",
        strokeWidth: 3,
        dash: { pattern: "8,4", animation: true },
        endPlug: "arrow1",
      },
    },

    // Validation rules for LLM-generated code
    validation: {
      required: [
        "start prop must have element or point",
        "end prop must have element or point",
        "refs must be attached to View components",
      ],

      recommended: [
        "Use strokeWidth between 1-10 for best visibility",
        "Use curvature between 0-1 for arc paths",
        "Provide meaningful colors using hex or rgba values",
      ],
    },
  },

  /**
   * @description Error prevention for LLMs
   */
  errorPrevention: {
    commonMistakes: [
      {
        mistake: "Forgetting to attach refs to View components",
        solution:
          "Always use ref={yourRef} on the View components you want to connect",
      },
      {
        mistake: "Using invalid socket positions",
        solution:
          "Use valid SocketPosition values: center, top, bottom, left, right, top_left, top_right, bottom_left, bottom_right, auto",
      },
      {
        mistake: "Invalid path types",
        solution:
          "Use valid PathType values: straight, arc, fluid, magnet, grid",
      },
      {
        mistake: "Invalid plug types",
        solution:
          "Use valid PlugType values: none, arrow1, arrow2, arrow3, disc, square, behind, hand, crosshair, diamond",
      },
    ],

    debugging: [
      "Check that elements are properly mounted before creating lines",
      "Verify that refs are attached to the correct View components",
      "Ensure strokeWidth is a positive number",
      "Validate that color strings are properly formatted",
    ],
  },

  /**
   * @description Performance recommendations for LLMs
   */
  performance: {
    recommendations: [
      "Use React.memo for LeaderLine components that don't change frequently",
      "Memoize prop objects to prevent unnecessary re-renders",
      "Avoid creating new objects in render functions",
      "Use useCallback for event handlers and dynamic updates",
    ],

    antiPatterns: [
      "Creating new objects in render functions",
      "Recreating refs on every render",
      "Using complex curvature calculations in tight loops",
      "Rendering too many lines simultaneously without virtualization",
    ],
  },

  /**
   * @description Testing guidance for LLMs
   */
  testing: {
    unitTests: [
      "Test that LeaderLine renders without crashing",
      "Test prop validation and type safety",
      "Test that refs are properly attached",
      "Test color and styling prop application",
    ],

    integrationTests: [
      "Test line rendering with actual React Native Views",
      "Test socket position calculations",
      "Test path generation for different types",
      "Test label positioning and rendering",
    ],
  },
};

/**
 * @description Quick reference schemas for LLM validation
 */
export const QuickSchemas = {
  // Basic LeaderLine props schema
  basicProps: {
    start: "{ element: RefObject } | { point: { x: number, y: number } }",
    end: "{ element: RefObject } | { point: { x: number, y: number } }",
    color: "string (CSS color)",
    strokeWidth: "number (1-10 recommended)",
    endPlug: "'none' | 'arrow1' | 'arrow2' | 'arrow3' | 'disc' | 'square'",
  },

  // Socket positions
  sockets: [
    "center",
    "top",
    "bottom",
    "left",
    "right",
    "top_left",
    "top_right",
    "bottom_left",
    "bottom_right",
    "auto",
  ],

  // Path types
  paths: ["straight", "arc", "fluid", "magnet", "grid"],

  // Complete prop validation
  fullValidation: {
    required: ["start", "end"],
    optional: [
      "color",
      "strokeWidth",
      "path",
      "curvature",
      "endPlug",
      "startPlug",
    ],
    ranges: {
      strokeWidth: "1-50",
      curvature: "0-1",
      opacity: "0-1",
    },
  },
};

export default LLMConfig;
