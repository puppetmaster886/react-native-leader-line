import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Text, View } from 'react-native';

// Asegúrate de tener instalada esta librería

// Crear un componente SVG simple usando solo React Native para evitar conflictos
const SimpleSVG = ({ width, height, style, children }) => (
  <View style={[{ width, height, position: 'relative' }, style]}>{children}</View>
);

const SimplePath = ({ d, stroke, strokeWidth, fill, opacity, strokeDasharray }) => {
  // Para simplificar, vamos a crear líneas básicas usando View
  // Esto es una implementación temporal hasta resolver el conflicto de SVG
  return (
    <View
      style={{
        position: 'absolute',
        backgroundColor: stroke || '#000',
        opacity: opacity || 1,
        // Implementación básica - en producción necesitaríamos una librería SVG externa
      }}
    />
  );
};

import { useMultipleLabels } from '../hooks/useMultipleLabels';
import {
  areaAnchor,
  calculateConnectionPoints,
  calculatePathBoundingBoxWithOutline,
  generateEnhancedPathData,
  mouseHoverAnchor,
  normalizeOutlineOptions,
  pointAnchor,
} from '../utils/math';

export const LeaderLine = ({
  start,
  end,
  startSocket = 'center',
  endSocket = 'center',
  color = '#ff6b6b',
  strokeWidth = 2,
  opacity = 1,
  path = 'straight',
  curvature = 0.2,
  startPlug = 'none',
  endPlug = 'arrow1',
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
  console.log('🎨 LeaderLine render - Start:', !!start, 'End:', !!end, 'Color:', color);

  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);
  const [svgBounds, setSvgBounds] = useState({
    x: 0,
    y: 0,
    width: 400,
    height: 300,
  });

  // Calculate connection points
  useEffect(() => {
    const calculatePoints = async () => {
      var _a, _b;
      if (
        ((_a = start.element) === null || _a === void 0 ? void 0 : _a.current) &&
        ((_b = end.element) === null || _b === void 0 ? void 0 : _b.current)
      ) {
        console.log('🎯 Calculating points from elements...');
        // Pasar containerRef desde las props start/end
        const containerRef = start.containerRef || end.containerRef;
        const points = await calculateConnectionPoints(
          start.element.current,
          end.element.current,
          startSocket,
          endSocket,
          containerRef, // ← Nuevo parámetro
        );
        if (points) {
          console.log('✅ Points calculated:', points);
          setStartPoint(points.start);
          setEndPoint(points.end);
        } else {
          console.log('❌ Failed to calculate points');
        }
      } else if (start.point && end.point) {
        console.log('🎯 Using direct points:', start.point, end.point);
        setStartPoint(start.point);
        setEndPoint(end.point);
      } else {
        console.log('⚠️ No valid start/end configuration');
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
    [startLabel, middleLabel, endLabel, captionLabel, pathLabel],
  );
  const { labelRenderData } = useMultipleLabels(startPoint, endPoint, labels);

  // Update SVG bounds when points change
  useEffect(() => {
    if (startPoint && endPoint) {
      const pathType = typeof path === 'string' ? path : path.type;
      const normalizedMainOutline = normalizeOutlineOptions(outline);
      const newBounds = calculatePathBoundingBoxWithOutline(
        startPoint,
        endPoint,
        pathType,
        curvature,
        strokeWidth,
        normalizedMainOutline,
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
    if (!startPoint || !endPoint) return '';
    return generateEnhancedPathData(startPoint, endPoint, path, curvature);
  }, [startPoint, endPoint, path, curvature]);

  // Render simple line using React Native Views
  const renderSimpleLine = useCallback(() => {
    if (!startPoint || !endPoint) {
      console.log('🚫 renderSimpleLine: No points available');
      return null;
    }

    const dx = endPoint.x - startPoint.x;
    const dy = endPoint.y - startPoint.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

    // Calcular el punto medio para centrar la línea correctamente
    const centerX = startPoint.x + dx / 2;
    const centerY = startPoint.y + dy / 2;

    console.log(
      `📏 renderSimpleLine: start(${startPoint.x},${startPoint.y}) end(${endPoint.x},${
        endPoint.y
      }) center(${centerX.toFixed(1)},${centerY.toFixed(1)}) distance:${distance.toFixed(1)} angle:${angle.toFixed()}°`,
    );

    return (
      <View
        key={`line-${Date.now()}`}
        style={{
          position: 'absolute',
          left: centerX - distance / 2, // ← Centrar horizontalmente
          top: centerY - Math.max(strokeWidth, 4) / 2, // ← Centrar verticalmente
          width: distance,
          height: Math.max(strokeWidth, 4), // ← Altura más visible
          backgroundColor: color,
          opacity: opacity,
          transform: [{ rotate: `${angle}deg` }],
          zIndex: 1000,
          // DEBUG: agregar borde para ver mejor
          borderWidth: 1,
          borderColor: 'black',
        }}
      />
    );
  }, [startPoint, endPoint, strokeWidth, color, opacity]);

  // Render arrow at end point
  const renderArrow = useCallback(() => {
    if (!endPoint || endPlug === 'none') {
      console.log('🚫 renderArrow: No endpoint or no plug needed');
      return null;
    }

    const dx = endPoint.x - startPoint.x;
    const dy = endPoint.y - startPoint.y;
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
    const arrowSize = Math.max(endPlugSize, 8);
    const arrowColor = endPlugColor || color;

    // Calcular la posición del triángulo basada en la dirección de la línea
    const angleRad = Math.atan2(dy, dx);
    const arrowOffsetX = Math.cos(angleRad) * (arrowSize * 0.5);
    const arrowOffsetY = Math.sin(angleRad) * (arrowSize * 0.5);

    console.log(
      `🏹 renderArrow: pos(${endPoint.x},${endPoint.y}) angle:${angle.toFixed(1)}° size:${endPlugSize} type:${endPlug}`,
    );

    // Diferentes tipos de plugs
    switch (endPlug) {
      case 'arrow1':
        // Flecha triangular básica - ajustar posición según dirección
        return (
          <View
            style={{
              position: 'absolute',
              left: endPoint.x - arrowOffsetX - arrowSize / 2,
              top: endPoint.y - arrowOffsetY - arrowSize / 2,
              width: 0,
              height: 0,
              borderTopWidth: arrowSize / 2,
              borderBottomWidth: arrowSize / 2,
              borderLeftWidth: arrowSize,
              borderTopColor: 'transparent',
              borderBottomColor: 'transparent',
              borderLeftColor: arrowColor,
              transform: [{ rotate: `${angle}deg` }],
              zIndex: 1001,
            }}
          />
        );

      case 'arrow2':
        // Flecha más ancha
        return (
          <View
            style={{
              position: 'absolute',
              left: endPoint.x - arrowOffsetX - arrowSize * 0.6,
              top: endPoint.y - arrowOffsetY - arrowSize * 0.7,
              width: 0,
              height: 0,
              borderTopWidth: arrowSize * 0.7,
              borderBottomWidth: arrowSize * 0.7,
              borderLeftWidth: arrowSize * 1.2,
              borderTopColor: 'transparent',
              borderBottomColor: 'transparent',
              borderLeftColor: arrowColor,
              transform: [{ rotate: `${angle}deg` }],
              zIndex: 1001,
            }}
          />
        );

      case 'arrow3':
        // Flecha estilizada con línea
        return (
          <View style={{ position: 'absolute', zIndex: 1001 }}>
            {/* Línea de la flecha */}
            <View
              style={{
                position: 'absolute',
                left: endPoint.x - arrowOffsetX - arrowSize,
                top: endPoint.y - arrowOffsetY - 1,
                width: arrowSize,
                height: 2,
                backgroundColor: arrowColor,
                transform: [{ rotate: `${angle}deg` }],
              }}
            />
            {/* Punta de la flecha */}
            <View
              style={{
                position: 'absolute',
                left: endPoint.x - arrowOffsetX - arrowSize * 0.4,
                top: endPoint.y - arrowOffsetY - arrowSize * 0.4,
                width: 0,
                height: 0,
                borderTopWidth: arrowSize * 0.4,
                borderBottomWidth: arrowSize * 0.4,
                borderLeftWidth: arrowSize * 0.8,
                borderTopColor: 'transparent',
                borderBottomColor: 'transparent',
                borderLeftColor: arrowColor,
                transform: [{ rotate: `${angle}deg` }],
              }}
            />
          </View>
        );

      case 'disc':
        // Círculo - centrado en el punto final
        return (
          <View
            style={{
              position: 'absolute',
              left: endPoint.x - arrowSize / 2,
              top: endPoint.y - arrowSize / 2,
              width: arrowSize,
              height: arrowSize,
              backgroundColor: arrowColor,
              borderRadius: arrowSize / 2,
              zIndex: 1001,
            }}
          />
        );

      case 'square':
        // Cuadrado - centrado en el punto final
        return (
          <View
            style={{
              position: 'absolute',
              left: endPoint.x - arrowSize / 2,
              top: endPoint.y - arrowSize / 2,
              width: arrowSize,
              height: arrowSize,
              backgroundColor: arrowColor,
              transform: [{ rotate: `${angle}deg` }],
              zIndex: 1001,
            }}
          />
        );

      case 'diamond':
        // Diamante (cuadrado rotado 45°) - centrado en el punto final
        return (
          <View
            style={{
              position: 'absolute',
              left: endPoint.x - arrowSize / 2,
              top: endPoint.y - arrowSize / 2,
              width: arrowSize,
              height: arrowSize,
              backgroundColor: arrowColor,
              transform: [{ rotate: '45deg' }],
              zIndex: 1001,
            }}
          />
        );

      default:
        return null;
    }
  }, [startPoint, endPoint, endPlug, endPlugSize, endPlugColor, color]);

  // Render arrow at start point
  const renderStartArrow = useCallback(() => {
    if (!startPoint || startPlug === 'none') {
      console.log('🚫 renderStartArrow: No startpoint or no plug needed');
      return null;
    }

    const dx = endPoint.x - startPoint.x;
    const dy = endPoint.y - startPoint.y;
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI + 180; // +180 para invertir la dirección
    const arrowSize = Math.max(startPlugSize, 8);
    const arrowColor = startPlugColor || color;

    // Calcular la posición del triángulo basada en la dirección de la línea (invertida para inicio)
    const angleRad = Math.atan2(dy, dx) + Math.PI; // +PI para invertir dirección
    const arrowOffsetX = Math.cos(angleRad) * (arrowSize * 0.5);
    const arrowOffsetY = Math.sin(angleRad) * (arrowSize * 0.5);

    console.log(
      `🏹 renderStartArrow: pos(${startPoint.x},${startPoint.y}) angle:${angle.toFixed(
        1,
      )}° size:${startPlugSize} type:${startPlug}`,
    );

    // Diferentes tipos de plugs para el inicio
    switch (startPlug) {
      case 'arrow1':
        return (
          <View
            style={{
              position: 'absolute',
              left: startPoint.x - arrowOffsetX - arrowSize / 2,
              top: startPoint.y - arrowOffsetY - arrowSize / 2,
              width: 0,
              height: 0,
              borderTopWidth: arrowSize / 2,
              borderBottomWidth: arrowSize / 2,
              borderLeftWidth: arrowSize,
              borderTopColor: 'transparent',
              borderBottomColor: 'transparent',
              borderLeftColor: arrowColor,
              transform: [{ rotate: `${angle}deg` }],
              zIndex: 1001,
            }}
          />
        );

      case 'arrow2':
        return (
          <View
            style={{
              position: 'absolute',
              left: startPoint.x - arrowOffsetX - arrowSize * 0.6,
              top: startPoint.y - arrowOffsetY - arrowSize * 0.7,
              width: 0,
              height: 0,
              borderTopWidth: arrowSize * 0.7,
              borderBottomWidth: arrowSize * 0.7,
              borderLeftWidth: arrowSize * 1.2,
              borderTopColor: 'transparent',
              borderBottomColor: 'transparent',
              borderLeftColor: arrowColor,
              transform: [{ rotate: `${angle}deg` }],
              zIndex: 1001,
            }}
          />
        );

      case 'arrow3':
        return (
          <View style={{ position: 'absolute', zIndex: 1001 }}>
            <View
              style={{
                position: 'absolute',
                left: startPoint.x - arrowOffsetX - arrowSize,
                top: startPoint.y - arrowOffsetY - 1,
                width: arrowSize,
                height: 2,
                backgroundColor: arrowColor,
                transform: [{ rotate: `${angle}deg` }],
              }}
            />
            <View
              style={{
                position: 'absolute',
                left: startPoint.x - arrowOffsetX - arrowSize * 0.4,
                top: startPoint.y - arrowOffsetY - arrowSize * 0.4,
                width: 0,
                height: 0,
                borderTopWidth: arrowSize * 0.4,
                borderBottomWidth: arrowSize * 0.4,
                borderLeftWidth: arrowSize * 0.8,
                borderTopColor: 'transparent',
                borderBottomColor: 'transparent',
                borderLeftColor: arrowColor,
                transform: [{ rotate: `${angle}deg` }],
              }}
            />
          </View>
        );

      case 'disc':
        // Círculo - centrado en el punto inicial
        return (
          <View
            style={{
              position: 'absolute',
              left: startPoint.x - arrowSize / 2,
              top: startPoint.y - arrowSize / 2,
              width: arrowSize,
              height: arrowSize,
              backgroundColor: arrowColor,
              borderRadius: arrowSize / 2,
              zIndex: 1001,
            }}
          />
        );

      case 'square':
        // Cuadrado - centrado en el punto inicial
        return (
          <View
            style={{
              position: 'absolute',
              left: startPoint.x - arrowSize / 2,
              top: startPoint.y - arrowSize / 2,
              width: arrowSize,
              height: arrowSize,
              backgroundColor: arrowColor,
              transform: [{ rotate: `${angle}deg` }],
              zIndex: 1001,
            }}
          />
        );

      case 'diamond':
        // Diamante (cuadrado rotado 45°) - centrado en el punto inicial
        return (
          <View
            style={{
              position: 'absolute',
              left: startPoint.x - arrowSize / 2,
              top: startPoint.y - arrowSize / 2,
              width: arrowSize,
              height: arrowSize,
              backgroundColor: arrowColor,
              transform: [{ rotate: '45deg' }],
              zIndex: 1001,
            }}
          />
        );

      default:
        return null;
    }
  }, [startPoint, endPoint, startPlug, startPlugSize, startPlugColor, color]);

  // Render multiple labels
  const renderMultipleLabels = useCallback(() => {
    return labelRenderData.map(({ key, config, position }) => {
      const labelStyle = {
        position: 'absolute',
        left: position.x - 50, // Center horizontally
        top: position.y - 15, // Center vertically
        backgroundColor: config.backgroundColor,
        borderRadius: config.borderRadius,
        padding: typeof config.padding === 'number' ? config.padding : 4,
        minWidth: 30,
        alignItems: 'center',
        justifyContent: 'center',
      };
      return (
        <View key={key} style={labelStyle}>
          <Text
            style={{
              fontSize: config.fontSize,
              fontFamily: config.fontFamily,
              color: config.color,
              textAlign: 'center',
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
    console.log('🚫 LeaderLine: No points, not rendering');
    return children ? <View style={style}>{children}</View> : null;
  }

  console.log(
    `🎨 LeaderLine: Rendering line with points start(${startPoint.x},${startPoint.y}) end(${endPoint.x},${endPoint.y})`,
  );

  return (
    <View
      style={[
        {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 999,
          pointerEvents: 'none',
        },
        style,
      ]}
    >
      {/* Render simple line and arrow using React Native Views */}
      {renderSimpleLine()}
      {renderArrow()}
      {renderStartArrow()}

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
