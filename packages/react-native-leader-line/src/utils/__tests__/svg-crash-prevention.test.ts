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

    test('should handle edge cases that could cause ArrayIndexOutOfBoundsException', () => {
      // Zero size
      expect(createPlugPath('arrow1', 0)).toBe('');
      
      // Negative size
      expect(createPlugPath('arrow1', -5)).toBe('');
      
      // Very large size (potential for array bounds issues)
      expect(createPlugPath('arrow1', 1000)).toBe('');
      
      // Invalid plug type
      expect(createPlugPath(null as any, 10)).toBe('');
      expect(createPlugPath(undefined as any, 10)).toBe('');
      expect(createPlugPath('' as any, 10)).toBe('');
      
      // Non-number size
      expect(createPlugPath('arrow1', NaN)).toBe('');
      expect(createPlugPath('arrow1', 'abc' as any)).toBe('');
    });

    test('should return empty string for none and behind plug types', () => {
      expect(createPlugPath('none', 10)).toBe('');
      expect(createPlugPath('behind', 10)).toBe('');
    });

    test('should generate valid SVG path data', () => {
      const arrowPath = createPlugPath('arrow1', 10);
      expect(arrowPath).toMatch(/^M\s+[\d\s.]+L[\d\s.]+z$/);
      
      const discPath = createPlugPath('disc', 10);
      expect(discPath).toMatch(/^M\s+[\d\s.]+m[\d\s.-]+a[\d\s.]+$/);
      
      const squarePath = createPlugPath('square', 10);
      expect(squarePath).toMatch(/^M\s+[\d\s.]+L[\d\s.]+z$/);
    });

    test('should handle size limits to prevent native rendering issues', () => {
      // Test boundary values
      expect(createPlugPath('arrow1', 1)).toBeTruthy();
      expect(createPlugPath('arrow1', 100)).toBe(''); // Should reject too large values
      expect(createPlugPath('arrow1', 101)).toBe(''); // Should reject too large values
    });

    test('should not produce path data that could cause index out of bounds', () => {
      const plugTypes = ['arrow1', 'arrow2', 'arrow3', 'disc', 'square', 'diamond', 'hand', 'crosshair'];
      const sizes = [1, 5, 10, 15, 20, 25, 30, 50, 100];
      
      plugTypes.forEach(plugType => {
        sizes.forEach(size => {
          const result = createPlugPath(plugType as any, size);
          if (size <= 100) {
            // Should produce valid path or empty string
            expect(typeof result).toBe('string');
            // Should not contain invalid coordinates that could cause crashes
            if (result) {
              expect(result).not.toMatch(/NaN|Infinity|-Infinity|undefined|null/);
            }
          } else {
            // Should return empty string for invalid sizes
            expect(result).toBe('');
          }
        });
      });
    });
  });
});