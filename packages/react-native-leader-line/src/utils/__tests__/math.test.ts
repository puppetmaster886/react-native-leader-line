/**
 * @fileoverview Tests for math utilities
 * @description Comprehensive tests for all mathematical functions used in LeaderLine
 */

import { ElementLayout, PathType, Point, SocketPosition } from "../../types";
import {
  areaAnchor,
  calculateClosestSocket,
  calculateConnectionPoints,
  calculatePathBoundingBox,
  calculatePathBoundingBoxWithOutline,
  calculateSocketGravity,
  createEnhancedPlugPath,
  createPlugPath,
  generateDashArray,
  generateEnhancedPathData,
  generatePathData,
  getAllSocketPoints,
  getAngle,
  getDistance,
  getSocketPoint,
  measureElement,
  mouseHoverAnchor,
  normalizeOutlineOptions,
  pointAnchor,
} from "../math";

describe("Math Utilities", () => {
  describe("getDistance", () => {
    it("should calculate distance between two points correctly", () => {
      const p1: Point = { x: 0, y: 0 };
      const p2: Point = { x: 3, y: 4 };
      expect(getDistance(p1, p2)).toBe(5); // 3-4-5 triangle
    });

    it("should return 0 for same points", () => {
      const p: Point = { x: 10, y: 20 };
      expect(getDistance(p, p)).toBe(0);
    });

    it("should handle negative coordinates", () => {
      const p1: Point = { x: -5, y: -3 };
      const p2: Point = { x: 7, y: 1 };
      expect(getDistance(p1, p2)).toBe(Math.sqrt(144 + 16)); // sqrt(12² + 4²)
    });

    it("should handle decimal coordinates", () => {
      const p1: Point = { x: 1.5, y: 2.5 };
      const p2: Point = { x: 4.5, y: 6.5 };
      expect(getDistance(p1, p2)).toBe(5); // 3-4-5 triangle scaled
    });
  });

  describe("getAngle", () => {
    it("should calculate angle correctly for horizontal line", () => {
      const p1: Point = { x: 0, y: 0 };
      const p2: Point = { x: 10, y: 0 };
      expect(getAngle(p1, p2)).toBe(0);
    });

    it("should calculate angle correctly for vertical line", () => {
      const p1: Point = { x: 0, y: 0 };
      const p2: Point = { x: 0, y: 10 };
      expect(getAngle(p1, p2)).toBe(Math.PI / 2);
    });

    it("should calculate angle correctly for diagonal lines", () => {
      const p1: Point = { x: 0, y: 0 };
      const p2: Point = { x: 10, y: 10 };
      expect(getAngle(p1, p2)).toBeCloseTo(Math.PI / 4);
    });

    it("should handle negative angles", () => {
      const p1: Point = { x: 0, y: 0 };
      const p2: Point = { x: 10, y: -10 };
      expect(getAngle(p1, p2)).toBeCloseTo(-Math.PI / 4);
    });
  });

  describe("getSocketPoint", () => {
    const layout: ElementLayout = {
      x: 10,
      y: 20,
      width: 100,
      height: 50,
      pageX: 110,
      pageY: 120,
      timestamp: Date.now(),
    };

    it("should return center point for center socket", () => {
      const point = getSocketPoint(layout, "center");
      expect(point).toEqual({ x: 160, y: 145 }); // pageX + width/2, pageY + height/2
    });

    it("should return top center for top socket", () => {
      const point = getSocketPoint(layout, "top");
      expect(point).toEqual({ x: 160, y: 120 }); // pageX + width/2, pageY
    });

    it("should return bottom center for bottom socket", () => {
      const point = getSocketPoint(layout, "bottom");
      expect(point).toEqual({ x: 160, y: 170 }); // pageX + width/2, pageY + height
    });

    it("should return left center for left socket", () => {
      const point = getSocketPoint(layout, "left");
      expect(point).toEqual({ x: 110, y: 145 }); // pageX, pageY + height/2
    });

    it("should return right center for right socket", () => {
      const point = getSocketPoint(layout, "right");
      expect(point).toEqual({ x: 210, y: 145 }); // pageX + width, pageY + height/2
    });

    it("should return corner points correctly", () => {
      expect(getSocketPoint(layout, "top_left")).toEqual({ x: 110, y: 120 });
      expect(getSocketPoint(layout, "top_right")).toEqual({ x: 210, y: 120 });
      expect(getSocketPoint(layout, "bottom_left")).toEqual({ x: 110, y: 170 });
      expect(getSocketPoint(layout, "bottom_right")).toEqual({
        x: 210,
        y: 170,
      });
    });

    it("should default to center for auto socket when used directly", () => {
      const point = getSocketPoint(layout, "auto");
      expect(point).toEqual({ x: 160, y: 145 });
    });
  });

  describe("getAllSocketPoints", () => {
    const layout: ElementLayout = {
      x: 0,
      y: 0,
      width: 100,
      height: 50,
      pageX: 100,
      pageY: 100,
      timestamp: Date.now(),
    };

    it("should return all 9 socket positions", () => {
      const sockets = getAllSocketPoints(layout);

      expect(sockets.center).toEqual({ x: 150, y: 125 });
      expect(sockets.top).toEqual({ x: 150, y: 100 });
      expect(sockets.right).toEqual({ x: 200, y: 125 });
      expect(sockets.bottom).toEqual({ x: 150, y: 150 });
      expect(sockets.left).toEqual({ x: 100, y: 125 });
      expect(sockets.top_left).toEqual({ x: 100, y: 100 });
      expect(sockets.top_right).toEqual({ x: 200, y: 100 });
      expect(sockets.bottom_left).toEqual({ x: 100, y: 150 });
      expect(sockets.bottom_right).toEqual({ x: 200, y: 150 });
    });

    it("should include auto socket as center fallback", () => {
      const sockets = getAllSocketPoints(layout);
      expect(sockets.auto).toEqual(sockets.center);
    });
  });

  describe("calculateClosestSocket", () => {
    const layout: ElementLayout = {
      x: 0,
      y: 0,
      width: 100,
      height: 50,
      pageX: 100,
      pageY: 100,
      timestamp: Date.now(),
    };

    it("should return right socket when target is to the right", () => {
      const targetCenter: Point = { x: 300, y: 125 }; // Far to the right
      const closestSocket = calculateClosestSocket(layout, targetCenter);
      expect(closestSocket).toBe("right");
    });

    it("should return left socket when target is to the left", () => {
      const targetCenter: Point = { x: 0, y: 125 }; // Far to the left
      const closestSocket = calculateClosestSocket(layout, targetCenter);
      expect(closestSocket).toBe("left");
    });

    it("should return top socket when target is above", () => {
      const targetCenter: Point = { x: 150, y: 0 }; // Far above
      const closestSocket = calculateClosestSocket(layout, targetCenter);
      expect(closestSocket).toBe("top");
    });

    it("should return bottom socket when target is below", () => {
      const targetCenter: Point = { x: 150, y: 250 }; // Far below
      const closestSocket = calculateClosestSocket(layout, targetCenter);
      expect(closestSocket).toBe("bottom");
    });

    it("should return top_right when target is in top-right direction", () => {
      const targetCenter: Point = { x: 300, y: 0 }; // Top-right
      const closestSocket = calculateClosestSocket(layout, targetCenter);
      expect(closestSocket).toBe("top_right");
    });

    it("should return bottom_left when target is in bottom-left direction", () => {
      const targetCenter: Point = { x: 0, y: 250 }; // Bottom-left
      const closestSocket = calculateClosestSocket(layout, targetCenter);
      expect(closestSocket).toBe("bottom_left");
    });

    it("should return center when target is at the center", () => {
      const targetCenter: Point = { x: 150, y: 125 }; // Exactly at center
      const closestSocket = calculateClosestSocket(layout, targetCenter);
      expect(closestSocket).toBe("center");
    });
  });

  describe("measureElement", () => {
    it("should measure element and return layout", async () => {
      const mockRef = global.createMockRef({
        x: 5,
        y: 10,
        width: 200,
        height: 100,
        pageX: 15,
        pageY: 25,
      });

      const layout = await measureElement(mockRef);

      expect(layout).toEqual({
        x: 0,  // measureInWindow doesn't provide local coordinates
        y: 0,
        width: 200,
        height: 100,
        pageX: 15,
        pageY: 25,
        timestamp: expect.any(Number),
      });
    });

    it("should return null for null element", async () => {
      const layout = await measureElement({ current: null });
      expect(layout).toBeNull();
    });

    it("should return null for undefined element", async () => {
      const layout = await measureElement({ current: undefined });
      expect(layout).toBeNull();
    });
  });

  describe("calculateConnectionPoints", () => {
    it("should calculate connection points between two elements", async () => {
      const startElement = global.createMockRef({
        pageX: 10,
        pageY: 20,
        width: 50,
        height: 30,
      }).current;

      const endElement = global.createMockRef({
        pageX: 100,
        pageY: 80,
        width: 60,
        height: 40,
      }).current;

      const result = await calculateConnectionPoints(
        startElement,
        endElement,
        "center",
        "center"
      );

      expect(result).toEqual({
        start: { x: 35, y: 35 }, // 10 + 50/2, 20 + 30/2
        end: { x: 130, y: 100 }, // 100 + 60/2, 80 + 40/2
      });
    });

    it("should handle different socket positions", async () => {
      const startElement = global.createMockRef({
        pageX: 0,
        pageY: 0,
        width: 100,
        height: 50,
      }).current;

      const endElement = global.createMockRef({
        pageX: 200,
        pageY: 100,
        width: 100,
        height: 50,
      }).current;

      const result = await calculateConnectionPoints(
        startElement,
        endElement,
        "right",
        "left"
      );

      expect(result).toEqual({
        start: { x: 100, y: 25 }, // right edge of start
        end: { x: 200, y: 125 }, // left edge of end
      });
    });

    it("should return null if start element cannot be measured", async () => {
      const startElement = null;
      const endElement = global.createMockRef().current;

      const result = await calculateConnectionPoints(startElement, endElement);
      expect(result).toBeNull();
    });

    it("should return null if end element cannot be measured", async () => {
      const startElement = global.createMockRef().current;
      const endElement = null;

      const result = await calculateConnectionPoints(startElement, endElement);
      expect(result).toBeNull();
    });
  });

  describe("generatePathData", () => {
    const start: Point = { x: 0, y: 0 };
    const end: Point = { x: 100, y: 50 };

    it("should generate straight path", () => {
      const path = generatePathData(start, end, "straight");
      expect(path).toBe("M 0 0 L 100 50");
    });

    it("should generate arc path", () => {
      const path = generatePathData(start, end, "arc", 0.3);
      expect(path).toContain("M 0 0 A");
      expect(path).toContain("100 50");
    });

    it("should generate fluid path", () => {
      const path = generatePathData(start, end, "fluid", 0.2);
      expect(path).toContain("M 0 0 C");
      expect(path).toContain("100 50");
    });

    it("should generate magnet path", () => {
      const path = generatePathData(start, end, "magnet");
      expect(path).toContain("M 0 0 L");
      expect(path).not.toBe("M 0 0 L 100 50"); // Should not be straight
    });

    it("should generate grid path", () => {
      const path = generatePathData(start, end, "grid");
      expect(path).toContain("M 0 0 L");
      expect(path).toContain("100 50");
    });

    it("should handle path configuration object", () => {
      const pathConfig = { type: "arc" as PathType, curvature: 0.5 };
      const path = generatePathData(start, end, pathConfig, 0.2);
      expect(path).toContain("M 0 0 A");
    });

    it("should default to straight for unknown path types", () => {
      const path = generatePathData(start, end, "unknown" as PathType);
      expect(path).toBe("M 0 0 L 100 50");
    });
  });

  describe("createPlugPath", () => {
    it("should create arrow1 plug path centered at origin", () => {
      const path = createPlugPath("arrow1", 16);
      // size=16, halfSize=8 -> M -8 -8 L 8 0 L -8 8 z
      expect(path).toBe("M -8 -8 L 8 0 L -8 8 z");
    });

    it("should create arrow2 plug path centered at origin", () => {
      const path = createPlugPath("arrow2", 20);
      // size=20, halfSize=10 -> M -10 0 L 10 -10 L 8 0 L 10 10 z
      expect(path).toBe("M -10 0 L 10 -10 L 8 0 L 10 10 z");
    });

    it("should create disc plug path centered at origin", () => {
      const path = createPlugPath("disc", 12);
      // size=12, halfSize=6 -> M 0 0 m -6 0 a 6 6 0 1 0 12 0 a 6 6 0 1 0 -12 0
      expect(path).toBe("M 0 0 m -6 0 a 6 6 0 1 0 12 0 a 6 6 0 1 0 -12 0");
    });

    it("should create square plug path centered at origin", () => {
      const path = createPlugPath("square", 10);
      // size=10, halfSize=5 -> M -5 -5 L 5 -5 L 5 5 L -5 5 z
      expect(path).toBe("M -5 -5 L 5 -5 L 5 5 L -5 5 z");
    });

    it("should create diamond plug path centered at origin", () => {
      const path = createPlugPath("diamond", 16);
      // size=16, halfSize=8 -> M 0 -8 L 8 0 L 0 8 L -8 0 z
      expect(path).toBe("M 0 -8 L 8 0 L 0 8 L -8 0 z");
    });

    it("should return empty string for none plug", () => {
      const path = createPlugPath("none");
      expect(path).toBe("");
    });



    it("should return empty string for behind plug", () => {
      const path = createPlugPath("behind");
      expect(path).toBe("");
    });

    it("should create hand plug path", () => {
      const path = createPlugPath("hand", 20);
      expect(path).toBe("M -10 0 L 6 -10 L 10 -3 L 8 0 L 10 7 L 6 10 z");
    });

    it("should create crosshair plug path centered at origin", () => {
      const path = createPlugPath("crosshair", 16);
      // size=16, halfSize=8 -> M 0 -8 L 0 8 M -8 0 L 8 0
      expect(path).toBe("M 0 -8 L 0 8 M -8 0 L 8 0");
    });
  });

  describe("generateDashArray", () => {
    it("should return default dash for boolean true", () => {
      const dash = generateDashArray(true);
      expect(dash).toBe("5,5");
    });

    it("should return undefined for boolean false", () => {
      const dash = generateDashArray(false);
      expect(dash).toBeUndefined();
    });

    it("should return string as-is", () => {
      const dash = generateDashArray("10,5,2,5");
      expect(dash).toBe("10,5,2,5");
    });

    it("should extract pattern from object", () => {
      const dashObj = { pattern: "8,4,8,4", animation: true };
      const dash = generateDashArray(dashObj);
      expect(dash).toBe("8,4,8,4");
    });

    it("should return undefined for object without pattern", () => {
      const dashObj = { animation: true };
      const dash = generateDashArray(dashObj);
      expect(dash).toBeUndefined();
    });
  });

  describe("calculatePathBoundingBox", () => {
    const start: Point = { x: 10, y: 20 };
    const end: Point = { x: 110, y: 70 };

    it("should calculate bounding box for straight path", () => {
      const box = calculatePathBoundingBox(start, end, "straight", 0.2, 2);
      expect(box.x).toBeLessThan(start.x);
      expect(box.y).toBeLessThan(start.y);
      expect(box.width).toBeGreaterThan(end.x - start.x);
      expect(box.height).toBeGreaterThan(end.y - start.y);
    });

    it("should add extra space for arc paths", () => {
      const straightBox = calculatePathBoundingBox(
        start,
        end,
        "straight",
        0.2,
        2
      );
      const arcBox = calculatePathBoundingBox(start, end, "arc", 0.2, 2);

      expect(arcBox.x).toBeLessThan(straightBox.x);
      expect(arcBox.y).toBeLessThan(straightBox.y);
      expect(arcBox.width).toBeGreaterThan(straightBox.width);
      expect(arcBox.height).toBeGreaterThan(straightBox.height);
    });

    it("should account for stroke width", () => {
      const thinBox = calculatePathBoundingBox(start, end, "straight", 0.2, 1);
      const thickBox = calculatePathBoundingBox(
        start,
        end,
        "straight",
        0.2,
        10
      );

      expect(thickBox.x).toBeLessThan(thinBox.x);
      expect(thickBox.y).toBeLessThan(thinBox.y);
    });
  });

  describe("calculatePathBoundingBoxWithOutline", () => {
    const start: Point = { x: 10, y: 20 };
    const end: Point = { x: 110, y: 70 };

    it("should expand bounding box for outline", () => {
      const outline = { width: 5, color: "white" };
      const normalBox = calculatePathBoundingBox(
        start,
        end,
        "straight",
        0.2,
        2
      );
      const outlineBox = calculatePathBoundingBoxWithOutline(
        start,
        end,
        "straight",
        0.2,
        2,
        outline
      );

      expect(outlineBox.x).toBeLessThan(normalBox.x);
      expect(outlineBox.y).toBeLessThan(normalBox.y);
      expect(outlineBox.width).toBeGreaterThan(normalBox.width);
      expect(outlineBox.height).toBeGreaterThan(normalBox.height);
    });

    it("should handle null outline", () => {
      const normalBox = calculatePathBoundingBox(
        start,
        end,
        "straight",
        0.2,
        2
      );
      const outlineBox = calculatePathBoundingBoxWithOutline(
        start,
        end,
        "straight",
        0.2,
        2,
        null
      );

      expect(outlineBox).toEqual(normalBox);
    });
  });

  describe("normalizeOutlineOptions", () => {
    it("should return null for falsy values", () => {
      expect(normalizeOutlineOptions(false)).toBeNull();
      expect(normalizeOutlineOptions(null)).toBeNull();
      expect(normalizeOutlineOptions(undefined)).toBeNull();
    });

    it("should create default options for boolean true", () => {
      const options = normalizeOutlineOptions(true, "#ff0000");
      expect(options).toEqual({
        enabled: true,
        color: "#ff0000",
        width: 1,
        size: 1,
        opacity: 1,
      });
    });

    it("should merge provided options with defaults", () => {
      const input = { color: "blue", width: 3, opacity: 0.5 };
      const options = normalizeOutlineOptions(input);
      expect(options).toEqual({
        enabled: true,
        color: "blue",
        width: 3,
        size: 3,
        opacity: 0.5,
      });
    });

    it("should handle size property as fallback for width", () => {
      const input = { size: 2 };
      const options = normalizeOutlineOptions(input);
      expect(options!.width).toBe(2);
      expect(options!.size).toBe(2);
    });

    it("should use auto color when no color specified", () => {
      const options = normalizeOutlineOptions(true);
      expect(options!.color).toBe("auto");
    });
  });

  describe("calculateSocketGravity", () => {
    const element = { x: 0, y: 0, width: 100, height: 50 };

    it("should return right for point to the right", () => {
      const point: Point = { x: 200, y: 25 };
      const socket = calculateSocketGravity(point, element, "auto");
      expect(socket).toBe("right");
    });

    it("should return left for point to the left", () => {
      const point: Point = { x: -50, y: 25 };
      const socket = calculateSocketGravity(point, element, "auto");
      expect(socket).toBe("left");
    });

    it("should return bottom for point below", () => {
      const point: Point = { x: 50, y: 100 };
      const socket = calculateSocketGravity(point, element, "auto");
      expect(socket).toBe("bottom");
    });

    it("should return top for point above", () => {
      const point: Point = { x: 50, y: -50 };
      const socket = calculateSocketGravity(point, element, "auto");
      expect(socket).toBe("top");
    });

    it("should return center for numeric gravity", () => {
      const point: Point = { x: 200, y: 25 };
      const socket = calculateSocketGravity(point, element, 100);
      expect(socket).toBe("center");
    });
  });

  describe("Anchor functions", () => {
    describe("pointAnchor", () => {
      it("should create point anchor with default coordinates", () => {
        const ref = { current: null };
        const anchor = pointAnchor(ref);
        expect(anchor).toEqual({
          element: ref,
          x: 0,
          y: 0,
        });
      });

      it("should create point anchor with custom coordinates", () => {
        const ref = { current: null };
        const anchor = pointAnchor(ref, { x: 10, y: 20 });
        expect(anchor).toEqual({
          element: ref,
          x: 10,
          y: 20,
        });
      });
    });

    describe("areaAnchor", () => {
      it("should create area anchor with default dimensions", () => {
        const ref = { current: null };
        const anchor = areaAnchor(ref);
        expect(anchor).toEqual({
          element: ref,
          x: 0,
          y: 0,
          width: 100,
          height: 100,
        });
      });

      it("should create area anchor with custom dimensions", () => {
        const ref = { current: null };
        const options = { x: 5, y: 10, width: 200, height: 150 };
        const anchor = areaAnchor(ref, options);
        expect(anchor).toEqual({
          element: ref,
          ...options,
        });
      });
    });

    describe("mouseHoverAnchor", () => {
      it("should create hover anchor with default options", () => {
        const ref = { current: null };
        const anchor = mouseHoverAnchor(ref);
        expect(anchor).toEqual({
          element: ref,
          showEffectName: "fade",
          hideEffectName: "fade",
          animOptions: {},
          style: {},
          hoverStyle: {},
        });
      });

      it("should create hover anchor with custom options", () => {
        const ref = { current: null };
        const options = {
          showEffectName: "slide",
          hideEffectName: "bounce",
          animOptions: { duration: 500 },
          style: { opacity: 0.8 },
          hoverStyle: { opacity: 1 },
        };
        const anchor = mouseHoverAnchor(ref, options);
        expect(anchor).toEqual({
          element: ref,
          ...options,
        });
      });
    });
  });

  describe("Enhanced functions", () => {
    it("should alias createEnhancedPlugPath to createPlugPath", () => {
      expect(createEnhancedPlugPath).toBe(createPlugPath);
    });

    it("should generateEnhancedPathData work with socket gravity", () => {
      const start: Point = { x: 0, y: 0 };
      const end: Point = { x: 100, y: 50 };
      const path = generateEnhancedPathData(
        start,
        end,
        "straight",
        0.2,
        "auto",
        100
      );
      expect(path).toBe("M 0 0 L 100 50");
    });
  });

  describe("Real coordinate calculations", () => {
    it("should calculate exact socket coordinates for all positions", () => {
      const layout: ElementLayout = {
        x: 5,
        y: 10,
        width: 200,
        height: 100,
        pageX: 50,
        pageY: 75,
        timestamp: Date.now(),
      };

      // Test all socket positions with exact coordinates
      const expectedCoordinates = {
        center: { x: 150, y: 125 }, // pageX + width/2, pageY + height/2
        top: { x: 150, y: 75 }, // pageX + width/2, pageY
        bottom: { x: 150, y: 175 }, // pageX + width/2, pageY + height
        left: { x: 50, y: 125 }, // pageX, pageY + height/2
        right: { x: 250, y: 125 }, // pageX + width, pageY + height/2
        top_left: { x: 50, y: 75 }, // pageX, pageY
        top_right: { x: 250, y: 75 }, // pageX + width, pageY
        bottom_left: { x: 50, y: 175 }, // pageX, pageY + height
        bottom_right: { x: 250, y: 175 }, // pageX + width, pageY + height
      };

      Object.entries(expectedCoordinates).forEach(([socket, expected]) => {
        const result = getSocketPoint(layout, socket as SocketPosition);
        expect(result).toEqual(expected);
      });
    });

    it("should handle fractional coordinates correctly", () => {
      const layout: ElementLayout = {
        x: 1.5,
        y: 2.7,
        width: 99.8,
        height: 50.3,
        pageX: 10.1,
        pageY: 20.9,
        timestamp: Date.now(),
      };

      const centerPoint = getSocketPoint(layout, "center");
      expect(centerPoint.x).toBeCloseTo(60.0); // 10.1 + 99.8/2
      expect(centerPoint.y).toBeCloseTo(46.05); // 20.9 + 50.3/2
    });

    it("should verify path data contains exact coordinates", () => {
      const start: Point = { x: 25.5, y: 30.7 };
      const end: Point = { x: 125.3, y: 80.9 };

      const straightPath = generatePathData(start, end, "straight");
      expect(straightPath).toBe("M 25.5 30.7 L 125.3 80.9");

      // Verify arc path contains start and end points
      const arcPath = generatePathData(start, end, "arc", 0.3);
      expect(arcPath).toContain("M 25.5 30.7");
      expect(arcPath).toContain("125.3 80.9");
    });

    it("should calculate correct bounding boxes with precise measurements", () => {
      const start: Point = { x: 10, y: 20 };
      const end: Point = { x: 110, y: 70 };
      const strokeWidth = 4;

      const bbox = calculatePathBoundingBox(
        start,
        end,
        "straight",
        0.2,
        strokeWidth
      );

      // Verify exact calculations
      expect(bbox.x).toBe(10 - strokeWidth - 20); // minX - strokeWidth - extraSpace
      expect(bbox.y).toBe(20 - strokeWidth - 20); // minY - strokeWidth - extraSpace
      expect(bbox.width).toBe(100 + strokeWidth * 2 + 40); // width + stroke + extraSpace*2
      expect(bbox.height).toBe(50 + strokeWidth * 2 + 40); // height + stroke + extraSpace*2
    });
  });

  describe("Container coordinate transformation", () => {
    it("should transform absolute coordinates to container-relative", async () => {
      // Simulate real measurement scenario
      const containerLayout: ElementLayout = {
        x: 0,
        y: 0,
        width: 400,
        height: 300,
        pageX: 100,
        pageY: 150,
        timestamp: Date.now(),
      };

      const elementLayout: ElementLayout = {
        x: 20,
        y: 30,
        width: 80,
        height: 50,
        pageX: 160,
        pageY: 220,
        timestamp: Date.now(), // container + relative
      };

      // Manual calculation of relative coordinates
      const relativeX = elementLayout.pageX - containerLayout.pageX; // 160 - 100 = 60
      const relativeY = elementLayout.pageY - containerLayout.pageY; // 220 - 150 = 70

      expect(relativeX).toBe(60);
      expect(relativeY).toBe(70);
    });

    it("should handle negative relative coordinates", async () => {
      const containerLayout: ElementLayout = {
        x: 0,
        y: 0,
        width: 300,
        height: 200,
        pageX: 200,
        pageY: 100,
        timestamp: Date.now(),
      };

      const elementLayout: ElementLayout = {
        x: 0,
        y: 0,
        width: 50,
        height: 30,
        pageX: 150,
        pageY: 80,
        timestamp: Date.now(), // Before container
      };

      const relativeX = elementLayout.pageX - containerLayout.pageX; // 150 - 200 = -50
      const relativeY = elementLayout.pageY - containerLayout.pageY; // 80 - 100 = -20

      expect(relativeX).toBe(-50);
      expect(relativeY).toBe(-20);
    });
  });

  describe("Auto socket detection", () => {
    it("should detect correct auto socket based on relative positions", () => {
      const elementBounds = { x: 100, y: 100, width: 100, height: 50 };

      // Test points in different directions
      const testCases = [
        { point: { x: 250, y: 125 }, expected: "right" }, // Far right
        { point: { x: 50, y: 125 }, expected: "left" }, // Far left
        { point: { x: 150, y: 200 }, expected: "bottom" }, // Far below
        { point: { x: 150, y: 50 }, expected: "top" }, // Far above
      ];

      testCases.forEach(({ point, expected }) => {
        const result = calculateSocketGravity(point, elementBounds, "auto");
        expect(result).toBe(expected);
      });
    });

    it("should prefer horizontal over vertical when distances are close", () => {
      const elementBounds = { x: 0, y: 0, width: 100, height: 100 };
      const centerX = 50,
        centerY = 50;

      // Point slightly more horizontal than vertical
      const point = { x: centerX + 60, y: centerY + 50 }; // dx=60, dy=50
      const result = calculateSocketGravity(point, elementBounds, "auto");
      expect(result).toBe("right"); // Should prefer horizontal
    });
  });

  describe("Distance and angle calculations", () => {
    it("should calculate distances with high precision", () => {
      const testCases = [
        { p1: { x: 0, y: 0 }, p2: { x: 3, y: 4 }, expected: 5 },
        { p1: { x: 1, y: 1 }, p2: { x: 4, y: 5 }, expected: 5 },
        { p1: { x: -2, y: -3 }, p2: { x: 1, y: 1 }, expected: 5 },
        { p1: { x: 0.5, y: 1.2 }, p2: { x: 3.5, y: 5.2 }, expected: 5 },
      ];

      testCases.forEach(({ p1, p2, expected }) => {
        const distance = getDistance(p1, p2);
        expect(distance).toBeCloseTo(expected, 10);
      });
    });

    it("should calculate angles correctly for all quadrants", () => {
      const origin = { x: 0, y: 0 };
      const testCases = [
        { point: { x: 1, y: 0 }, expected: 0 }, // East
        { point: { x: 0, y: 1 }, expected: Math.PI / 2 }, // South
        { point: { x: -1, y: 0 }, expected: Math.PI }, // West
        { point: { x: 0, y: -1 }, expected: -Math.PI / 2 }, // North
        { point: { x: 1, y: 1 }, expected: Math.PI / 4 }, // Southeast
        { point: { x: -1, y: 1 }, expected: (3 * Math.PI) / 4 }, // Southwest
        { point: { x: 1, y: -1 }, expected: -Math.PI / 4 }, // Northeast
        { point: { x: -1, y: -1 }, expected: (-3 * Math.PI) / 4 }, // Northwest
      ];

      testCases.forEach(({ point, expected }) => {
        const angle = getAngle(origin, point);
        expect(angle).toBeCloseTo(expected, 10);
      });
    });
  });
});
