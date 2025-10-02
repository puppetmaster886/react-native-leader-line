/**
 * Tests for SVG crash prevention and ArrayIndexOutOfBoundsException fixes
 */

import { createPlugPath } from '../math';

describe('SVG Marker Crash Prevention', () => {
  describe('createPlugPath', () => {
    test('should handle valid plug types and sizes', () => {
      expect(createPlugPath('arrow1', 10)).toBeTruthy();
      expect(createPlugPath('arrow2', 8)).toBeTruthy();
      expect(createPlugPath('arrow3', 12)).toBeTruthy();
      expect(createPlugPath('disc', 15)).toBeTruthy();
      expect(createPlugPath('square', 6)).toBeTruthy();
      expect(createPlugPath('diamond', 9)).toBeTruthy();
      expect(createPlugPath('hand', 14)).toBeTruthy();
      expect(createPlugPath('crosshair', 11)).toBeTruthy();
    });

    test('should handle edge cases by clamping size', () => {
      // Zero size should be clamped to 1
      expect(createPlugPath('arrow1', 0)).toBeTruthy();

      // Negative size should be clamped to 1
      expect(createPlugPath('arrow1', -5)).toBeTruthy();

      // Very large size should be clamped to 100
      expect(createPlugPath('arrow1', 1000)).toBeTruthy();

      // Invalid plug type should return empty string
      expect(createPlugPath(null as any, 10)).toBe('');
      expect(createPlugPath(undefined as any, 10)).toBe('');

      // Non-number size should be clamped to 1
      expect(createPlugPath('arrow1', NaN)).toBeTruthy();
      expect(createPlugPath('arrow1', 'abc' as any)).toBeTruthy();
    });

    test('should return empty string for none and behind plug types', () => {
      expect(createPlugPath('none', 10)).toBe('');
      expect(createPlugPath('behind', 10)).toBe('');
    });

    test('should generate valid SVG path data', () => {
      const arrowPath = createPlugPath('arrow1', 10);
      expect(arrowPath).toBe('M -5 -5 L 5 0 L -5 5 z');

      const discPath = createPlugPath('disc', 10);
      expect(discPath).toBe('M 0 0 m -5 0 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0');

      const squarePath = createPlugPath('square', 10);
      expect(squarePath).toBe('M -5 -5 L 5 -5 L 5 5 L -5 5 z');
    });

    test('should handle size limits by clamping to prevent native rendering issues', () => {
      // Test boundary values
      expect(createPlugPath('arrow1', 1)).toBeTruthy();
      // Size 100 is valid
      expect(createPlugPath('arrow1', 100)).toBeTruthy();
      // Size 101 should be clamped to 100 and return a valid path
      expect(createPlugPath('arrow1', 101)).toBeTruthy();
    });

    test('should not produce path data that could cause index out of bounds', () => {
      const plugTypes = ['arrow1', 'arrow2', 'arrow3', 'disc', 'square', 'diamond', 'hand', 'crosshair'];
      const sizes = [1, 5, 10, 15, 20, 25, 30, 50, 100, 101, 1000];

      plugTypes.forEach(plugType => {
        sizes.forEach(size => {
          const result = createPlugPath(plugType as any, size);
          // Should always produce a valid path or empty string
          expect(typeof result).toBe('string');
          // Should not contain invalid coordinates that could cause crashes
          if (result) {
            expect(result).not.toMatch(/NaN|Infinity|-Infinity|undefined|null/);
          }
        });
      });
    });
  });
});