import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
    areaAnchor,
    pointAnchor,
    useLeaderLineManager
} from '../../src';

/**
 * Complete demonstration of all migrated features from the original Leader Line library
 */
const CompleteMigratedFeaturesExample = () => {
  const { createLeaderLine, measureAllLines, removeAllLines, renderLines } = useLeaderLineManager();
  const [lines, setLines] = useState<any[]>([]);

  // References for demonstration
  const box1Ref = useRef(null);
  const box2Ref = useRef(null);
  const box3Ref = useRef(null);
  const box4Ref = useRef(null);
  const centerRef = useRef(null);

  useEffect(() => {
    const setupAdvancedLines = () => {
      removeAllLines();

      // 1. Point Anchor Example (from original library)
      const pointAnchorLine = createLeaderLine(
        pointAnchor(box1Ref, { x: 20, y: 10 }),
        centerRef,
        {
          color: '#e74c3c',
          strokeWidth: 3,
          startPlug: 'disc',
          endPlug: 'arrow2',
          startLabel: 'Point Anchor',
          middleLabel: 'CENTER',
          dropShadow: {
            enabled: true,
            dx: 3,
            dy: 3,
            blur: 2,
            color: 'rgba(231, 76, 60, 0.3)'
          }
        }
      );

      // 2. Area Anchor Example (from original library)
      const areaAnchorLine = createLeaderLine(
        areaAnchor(box2Ref, { x: 10, y: 10, width: 30, height: 20 }),
        centerRef,
        {
          color: '#3498db',
          strokeWidth: 4,
          path: 'fluid',
          curvature: 0.4,
          startPlug: 'square',
          endPlug: 'arrow3',
          endLabel: 'Area Anchor',
          captionLabel: 'Fluid Path',
          startSocketGravity: [50, -30],
          endSocketGravity: 'auto',
          gradient: {
            startColor: '#3498db',
            endColor: '#9b59b6'
          }
        }
      );

      // 3. Enhanced Path Types (magnet, grid)
      const magnetPathLine = createLeaderLine(
        box3Ref,
        centerRef,
        {
          color: '#2ecc71',
          strokeWidth: 3,
          path: {
            type: 'magnet',
            magnet: {
              side: 'auto',
              minDistance: 30
            }
          },
          startPlug: 'hand',
          endPlug: 'crosshair',
          startLabel: 'Magnet Path',
          pathLabel: 'Smart Routing',
          dash: {
            len: 8,
            gap: 4,
            animation: true
          }
        }
      );

      // 4. Grid Path with Socket Gravity
      const gridPathLine = createLeaderLine(
        box4Ref,
        centerRef,
        {
          color: '#f39c12',
          strokeWidth: 5,
          path: {
            type: 'grid',
            grid: {
              gridSize: 25,
              cornerRadius: 8
            }
          },
          startPlug: 'behind',
          endPlug: 'arrow1',
          startSocketGravity: [100, 0],
          endSocketGravity: [-80, -50],
          outline: {
            enabled: true,
            color: '#e67e22',
            width: 2,
            opacity: 0.7
          },
          endLabel: 'Grid Path',
          middleLabel: 'Outlined'
        }
      );

      // 5. Multiple Labels Example
      const multiLabelLine = createLeaderLine(
        { x: 50, y: 50 },
        { x: 350, y: 150 },
        {
          color: '#9b59b6',
          strokeWidth: 4,
          startPlug: 'disc',
          endPlug: 'square',
          startLabel: {
            text: 'START',
            fontSize: 14,
            color: '#fff',
            backgroundColor: '#9b59b6',
            borderRadius: 8,
            padding: 10,
            outlineColor: '#8e44ad',
            outlineWidth: 2
          },
          middleLabel: {
            text: 'MIDDLE',
            fontSize: 12,
            color: '#2c3e50',
            backgroundColor: '#ecf0f1',
            borderRadius: 6,
            padding: 8
          },
          endLabel: {
            text: 'END',
            fontSize: 14,
            color: '#fff',
            backgroundColor: '#e74c3c',
            borderRadius: 8,
            padding: 10
          },
          captionLabel: {
            text: 'Multi-Label Demo',
            fontSize: 16,
            color: '#34495e',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: 10,
            padding: 12,
            offset: [0, -40]
          },
          pathLabel: {
            text: 'Enhanced Labels',
            fontSize: 10,
            color: '#7f8c8d',
            backgroundColor: 'rgba(236, 240, 241, 0.8)',
            borderRadius: 4,
            padding: 6
          }
        }
      );

      setLines([pointAnchorLine, areaAnchorLine, magnetPathLine, gridPathLine, multiLabelLine]);
    };

    const timer = setTimeout(setupAdvancedLines, 500);
    return () => clearTimeout(timer);
  }, [createLeaderLine, removeAllLines]);

  // Dynamic property change examples (from original library)
  const changeLineProperties = () => {
    if (lines.length > 0) {
      // Change color dynamically
      lines[0].color = lines[0].color === '#e74c3c' ? '#9b59b6' : '#e74c3c';
      
      // Change size dynamically
      lines[1].size = lines[1].size === 4 ? 8 : 4;
      
      // Change socket gravity
      lines[2].startSocketGravity = lines[2].startSocketGravity === 'auto' ? [80, -40] : 'auto';
      
      // Change path type
      lines[3].path = lines[3].path.type === 'grid' ? 'fluid' : {
        type: 'grid',
        grid: { gridSize: 30, cornerRadius: 10 }
      };
      
      // Toggle dropShadow
      lines[0].dropShadow = !lines[0].dropShadow;
    }
  };

  const toggleVisibility = () => {
    lines.forEach((line, index) => {
      if (index % 2 === 0) {
        line.isVisible ? line.hide('fade') : line.show('draw');
      }
    });
  };

  const animateLines = () => {
    lines.forEach(line => {
      line.show('draw', { duration: 2000, timing: 'ease-in-out' });
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Complete Leader Line Migration</Text>
        <Text style={styles.subtitle}>All Original Library Features</Text>

        <View style={styles.demoArea}>
          {/* Central target */}
          <View ref={centerRef} style={[styles.box, styles.centerBox]}>
            <Text style={styles.boxText}>CENTER</Text>
            <Text style={styles.boxSubtext}>Target</Text>
          </View>

          {/* Source boxes */}
          <View ref={box1Ref} style={[styles.box, styles.box1]}>
            <Text style={styles.boxText}>POINT</Text>
            <Text style={styles.boxSubtext}>Anchor</Text>
          </View>

          <View ref={box2Ref} style={[styles.box, styles.box2]}>
            <Text style={styles.boxText}>AREA</Text>
            <Text style={styles.boxSubtext}>Anchor</Text>
          </View>

          <View ref={box3Ref} style={[styles.box, styles.box3]}>
            <Text style={styles.boxText}>MAGNET</Text>
            <Text style={styles.boxSubtext}>Path</Text>
          </View>

          <View ref={box4Ref} style={[styles.box, styles.box4]}>
            <Text style={styles.boxText}>GRID</Text>
            <Text style={styles.boxSubtext}>Path</Text>
          </View>

          {/* Render all leader lines */}
          {renderLines()}
        </View>

        <View style={styles.controls}>
          <TouchableOpacity style={styles.button} onPress={changeLineProperties}>
            <Text style={styles.buttonText}>Change Properties</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={toggleVisibility}>
            <Text style={styles.buttonText}>Toggle Visibility</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={animateLines}>
            <Text style={styles.buttonText}>Animate</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={measureAllLines}>
            <Text style={styles.buttonText}>Remeasure</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.featureList}>
          <Text style={styles.featureTitle}>✅ Migrated Features:</Text>
          <Text style={styles.featureItem}>• Point & Area Anchors</Text>
          <Text style={styles.featureItem}>• Socket Gravity (auto, number, [x,y])</Text>
          <Text style={styles.featureItem}>• Enhanced Plugs (disc, square, hand, crosshair, behind)</Text>
          <Text style={styles.featureItem}>• Advanced Paths (magnet, grid, fluid)</Text>
          <Text style={styles.featureItem}>• Multiple Labels (start, middle, end, caption, path)</Text>
          <Text style={styles.featureItem}>• Enhanced Drop Shadow</Text>
          <Text style={styles.featureItem}>• Outline Support</Text>
          <Text style={styles.featureItem}>• Dynamic Property Changes</Text>
          <Text style={styles.featureItem}>• Show/Hide Effects</Text>
          <Text style={styles.featureItem}>• Event System</Text>
          <Text style={styles.featureItem}>• Static Methods (getInstances, removeAll)</Text>
          <Text style={styles.featureItem}>• Original API Compatibility</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#2c3e50',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    color: '#7f8c8d',
  },
  demoArea: {
    height: 400,
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 24,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    position: 'relative',
  },
  box: {
    position: 'absolute',
    width: 80,
    height: 60,
    borderRadius: 8,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  centerBox: {
    top: 170,
    left: 160,
    backgroundColor: '#ecf0f1',
    borderColor: '#95a5a6',
  },
  box1: {
    top: 50,
    left: 50,
    backgroundColor: '#ffebee',
    borderColor: '#e74c3c',
  },
  box2: {
    top: 50,
    right: 50,
    backgroundColor: '#e3f2fd',
    borderColor: '#3498db',
  },
  box3: {
    bottom: 50,
    left: 50,
    backgroundColor: '#e8f5e8',
    borderColor: '#2ecc71',
  },
  box4: {
    bottom: 50,
    right: 50,
    backgroundColor: '#fef9e7',
    borderColor: '#f39c12',
  },
  boxText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  boxSubtext: {
    fontSize: 10,
    color: '#7f8c8d',
    marginTop: 2,
  },
  controls: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#3498db',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginVertical: 4,
    minWidth: 120,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
  },
  featureList: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#27ae60',
  },
  featureItem: {
    fontSize: 14,
    marginBottom: 4,
    color: '#2c3e50',
  },
});

export default CompleteMigratedFeaturesExample;