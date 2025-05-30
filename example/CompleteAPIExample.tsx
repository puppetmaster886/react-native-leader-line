import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useLeaderLineManager } from '../src/hooks/useLeaderLineManager';

export default function CompleteAPIExample() {
  const box1Ref = useRef(null);
  const box2Ref = useRef(null);
  const box3Ref = useRef(null);
  const box4Ref = useRef(null);
  const centerRef = useRef(null);

  const { createLeaderLine, renderLines, measureAllLines } = useLeaderLineManager();
  const [lines, setLines] = useState<any[]>([]);
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    // Demonstrate all migrated functionalities
    const setupAdvancedDemo = () => {
      // 1. Line with setOptions and multiple labels
      const line1 = createLeaderLine(box1Ref, centerRef, {
        color: '#e74c3c',
        strokeWidth: 3,
        path: 'arc',
        startLabel: 'Data Source',
        middleLabel: {
          text: 'Processing Flow',
          fontSize: 14,
          backgroundColor: '#fff3cd',
          borderRadius: 8,
          color: '#856404',
        },
        endLabel: 'Output',
        startSocket: 'right',
        endSocket: 'left',
      });

      // 2. Line with gradient and outline
      const line2 = createLeaderLine(box2Ref, centerRef, {
        color: '#3498db',
        strokeWidth: 4,
        path: 'straight',
        outline: { enabled: true, color: 'white', size: 2 },
        dropShadow: { dx: 2, dy: 2, blur: 4, color: 'rgba(0,0,0,0.3)' },
        endPlug: 'arrow2',
        startSocket: 'bottom',
        endSocket: 'top',
      });

      // 3. Dashed line with custom plugs
      const line3 = createLeaderLine(box3Ref, centerRef, {
        color: '#2ecc71',
        strokeWidth: 3,
        dash: { pattern: '8,4', animation: true },
        startPlug: 'disc',
        endPlug: 'arrow1',
        startPlugSize: 8,
        endPlugSize: 12,
        startSocket: 'left',
        endSocket: 'right',
      });

      // 4. Line with path label and curved path
      const line4 = createLeaderLine(box4Ref, centerRef, {
        color: '#9b59b6',
        strokeWidth: 2,
        path: 'arc',
        curvature: 0.4,
        pathLabel: 'Curved Connection',
        captionLabel: 'Demo Line',
        startSocket: 'top',
        endSocket: 'bottom',
      });

      setLines([line1, line2, line3, line4]);
    };

    // Wait for layout to complete
    const timer = setTimeout(setupAdvancedDemo, 300);
    return () => clearTimeout(timer);
  }, [createLeaderLine]);

  // Demonstrate dynamic property changes
  const animateLines = () => {
    if (lines.length === 0) return;

    const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6'];
    const nextStep = (animationStep + 1) % colors.length;
    
    lines.forEach((line, index) => {
      // Change colors dynamically
      line.color = colors[nextStep];
      
      // Change line width
      line.size = 2 + (nextStep * 2);
      
      // Toggle different plug types
      const plugTypes = ['none', 'arrow1', 'arrow2', 'disc', 'square'];
      line.endPlug = plugTypes[nextStep];
    });

    setAnimationStep(nextStep);
  };

  const toggleVisibility = () => {
    lines.forEach((line, index) => {
      if (index % 2 === 0) {
        line.show('fade');
      } else {
        line.hide('fade');
      }
    });
  };

  const resetLines = () => {
    lines.forEach(line => {
      line.setOptions({
        color: '#e74c3c',
        size: 3,
        endPlug: 'arrow1',
      });
      line.show();
    });
    setAnimationStep(0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>React Native Leader Line</Text>
        <Text style={styles.subtitle}>Complete API Demonstration</Text>
        
        <View style={styles.controls}>
          <TouchableOpacity style={styles.button} onPress={animateLines}>
            <Text style={styles.buttonText}>Animate</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={toggleVisibility}>
            <Text style={styles.buttonText}>Toggle</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={resetLines}>
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.demoArea}>
          {/* Corner boxes */}
          <View ref={box1Ref} style={[styles.box, styles.topLeft, { backgroundColor: '#e74c3c' }]}>
            <Text style={styles.boxText}>Source 1</Text>
          </View>

          <View ref={box2Ref} style={[styles.box, styles.topRight, { backgroundColor: '#3498db' }]}>
            <Text style={styles.boxText}>Source 2</Text>
          </View>

          <View ref={box3Ref} style={[styles.box, styles.bottomLeft, { backgroundColor: '#2ecc71' }]}>
            <Text style={styles.boxText}>Source 3</Text>
          </View>

          <View ref={box4Ref} style={[styles.box, styles.bottomRight, { backgroundColor: '#9b59b6' }]}>
            <Text style={styles.boxText}>Source 4</Text>
          </View>

          {/* Center target */}
          <View ref={centerRef} style={[styles.centerBox]}>
            <Text style={styles.centerText}>Processing Center</Text>
          </View>

          {/* Render all lines */}
          {renderLines()}
        </View>

        <View style={styles.features}>
          <Text style={styles.featuresTitle}>Featured Capabilities:</Text>
          <Text style={styles.feature}>✅ Multiple label types (start, middle, end, caption, path)</Text>
          <Text style={styles.feature}>✅ Dynamic property updates (color, size, plugs)</Text>
          <Text style={styles.feature}>✅ Path types: straight, arc with curvature</Text>
          <Text style={styles.feature}>✅ Advanced styling: outlines, shadows, gradients</Text>
          <Text style={styles.feature}>✅ Animations: show/hide with effects</Text>
          <Text style={styles.feature}>✅ Socket positioning and gravity</Text>
          <Text style={styles.feature}>✅ Dashed lines with animation</Text>
          <Text style={styles.feature}>✅ Custom plug types and sizes</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

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
    marginBottom: 20,
    color: '#7f8c8d',
    fontStyle: 'italic',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#3498db',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  demoArea: {
    height: 400,
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 20,
    position: 'relative',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  box: {
    position: 'absolute',
    width: 80,
    height: 60,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  topLeft: {
    top: 30,
    left: 30,
  },
  topRight: {
    top: 30,
    right: 30,
  },
  bottomLeft: {
    bottom: 30,
    left: 30,
  },
  bottomRight: {
    bottom: 30,
    right: 30,
  },
  centerBox: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -60 }, { translateY: -40 }],
    width: 120,
    height: 80,
    backgroundColor: '#f39c12',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  boxText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },
  centerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  features: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#2c3e50',
  },
  feature: {
    fontSize: 14,
    marginBottom: 6,
    color: '#495057',
    lineHeight: 20,
  },
});