import React, { useRef, useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useLeaderLineManager } from '../src/hooks/useLeaderLineManager';

export const AdvancedFeaturesDemo: React.FC = () => {
  const containerRef = useRef<View>(null);
  const element1Ref = useRef<View>(null);
  const element2Ref = useRef<View>(null);
  const element3Ref = useRef<View>(null);
  const element4Ref = useRef<View>(null);

  const [currentDemo, setCurrentDemo] = useState<string>('labels');

  const {
    createLeaderLine,
    renderLines,
    removeAllLines,
    showAllLines,
    hideAllLines,
    animateSequentially,
    pulseAllLines,
    getStats,
  } = useLeaderLineManager({
    autoRedraw: true,
    containerRef,
    defaultAnimationDuration: 500,
  });

  // Demo functions for each feature
  const demoLabels = () => {
    removeAllLines();
    
    // Basic label
    createLeaderLine(element1Ref, element2Ref, {
      color: '#4CAF50',
      strokeWidth: 3,
      path: 'arc',
      label: {
        text: 'Connection 1',
        fontSize: 14,
        color: '#2E7D32',
        backgroundColor: '#E8F5E8',
        borderRadius: 8,
        position: 'middle',
      },
    });

    // Label with offset
    createLeaderLine(element2Ref, element3Ref, {
      color: '#FF9800',
      strokeWidth: 2,
      path: 'fluid',
      label: {
        text: 'Data Flow',
        fontSize: 12,
        color: '#E65100',
        backgroundColor: '#FFF3E0',
        borderRadius: 6,
        position: 'middle',
        offset: 20,
        angle: 45,
      },
    });

    // Multiple labels
    createLeaderLine(element3Ref, element4Ref, {
      color: '#9C27B0',
      strokeWidth: 2,
      path: 'straight',
      label: {
        text: 'Process',
        fontSize: 13,
        color: '#4A148C',
        backgroundColor: '#F3E5F5',
        borderRadius: 4,
        position: 'start',
      },
    });

    createLeaderLine(element4Ref, element1Ref, {
      color: '#F44336',
      strokeWidth: 3,
      path: 'magnet',
      label: {
        text: 'Result',
        fontSize: 14,
        color: '#B71C1C',
        backgroundColor: '#FFEBEE',
        borderRadius: 8,
        position: 'end',
        fontWeight: 'bold',
      },
    });
  };

  const demoPlugTypes = () => {
    removeAllLines();
    
    // Different arrow types
    createLeaderLine(element1Ref, element2Ref, {
      color: '#2196F3',
      strokeWidth: 3,
      startPlug: 'circle',
      endPlug: 'arrow1',
      path: 'straight',
    });

    createLeaderLine(element2Ref, element3Ref, {
      color: '#4CAF50',
      strokeWidth: 3,
      startPlug: 'square',
      endPlug: 'arrow2',
      path: 'arc',
    });

    createLeaderLine(element3Ref, element4Ref, {
      color: '#FF9800',
      strokeWidth: 3,
      startPlug: 'diamond',
      endPlug: 'arrow3',
      path: 'fluid',
    });

    createLeaderLine(element4Ref, element1Ref, {
      color: '#9C27B0',
      strokeWidth: 3,
      startPlug: 'disc',
      endPlug: 'behind',
      path: 'magnet',
    });
  };

  const demoGridPath = () => {
    removeAllLines();
    
    // Grid/circuit-style connections
    createLeaderLine(element1Ref, element3Ref, {
      color: '#607D8B',
      strokeWidth: 2,
      path: 'grid',
      endPlug: 'square',
      label: {
        text: 'Circuit A',
        fontSize: 11,
        color: '#263238',
        backgroundColor: '#ECEFF1',
      },
    });

    createLeaderLine(element2Ref, element4Ref, {
      color: '#795548',
      strokeWidth: 2,
      path: 'grid',
      endPlug: 'diamond',
      label: {
        text: 'Circuit B',
        fontSize: 11,
        color: '#3E2723',
        backgroundColor: '#EFEBE9',
      },
    });
  };

  const demoEffects = () => {
    removeAllLines();
    
    // Drop shadow effect
    createLeaderLine(element1Ref, element2Ref, {
      color: '#E91E63',
      strokeWidth: 4,
      path: 'arc',
      dropShadow: true,
      label: {
        text: 'With Shadow',
        color: '#880E4F',
      },
    });

    // Glow effect
    createLeaderLine(element2Ref, element3Ref, {
      color: '#00BCD4',
      strokeWidth: 3,
      path: 'fluid',
      glow: {
        color: '#00E5FF',
        width: 6,
        opacity: 0.7,
      },
      label: {
        text: 'Glowing',
        color: '#006064',
      },
    });

    // Outline effect
    createLeaderLine(element3Ref, element4Ref, {
      color: '#FFEB3B',
      strokeWidth: 3,
      path: 'magnet',
      outline: {
        color: '#FF6F00',
        width: 2,
      },
      label: {
        text: 'Outlined',
        color: '#F57F17',
      },
    });

    // Advanced gradient
    createLeaderLine(element4Ref, element1Ref, {
      strokeWidth: 4,
      path: 'arc',
      gradient: {
        type: 'linear',
        angle: 45,
        stops: [
          { offset: 0, color: '#FF5722', opacity: 1 },
          { offset: 0.5, color: '#FF9800', opacity: 0.8 },
          { offset: 1, color: '#FFC107', opacity: 1 },
        ],
      },
      label: {
        text: 'Gradient',
        color: '#E65100',
      },
    });
  };

  const demoDashAnimations = () => {
    removeAllLines();
    
    // Animated dashes
    createLeaderLine(element1Ref, element2Ref, {
      color: '#3F51B5',
      strokeWidth: 3,
      path: 'straight',
      dash: {
        len: 8,
        gap: 4,
        animation: true,
        speed: 2,
      },
      label: {
        text: 'Animated Dash',
        color: '#1A237E',
      },
    });

    createLeaderLine(element2Ref, element3Ref, {
      color: '#8BC34A',
      strokeWidth: 3,
      path: 'arc',
      dash: {
        len: 12,
        gap: 8,
        animation: true,
        speed: 1,
      },
    });

    createLeaderLine(element3Ref, element4Ref, {
      color: '#FF5722',
      strokeWidth: 3,
      path: 'fluid',
      dash: {
        len: 6,
        gap: 6,
        animation: true,
        speed: 3,
      },
    });
  };

  const demoAnimations = async () => {
    removeAllLines();
    
    // Create lines hidden initially
    createLeaderLine(element1Ref, element2Ref, {
      color: '#E91E63',
      strokeWidth: 3,
      path: 'arc',
      hide: true,
      label: { text: 'Animated 1' },
    });

    createLeaderLine(element2Ref, element3Ref, {
      color: '#9C27B0',
      strokeWidth: 3,
      path: 'fluid',
      hide: true,
      label: { text: 'Animated 2' },
    });

    createLeaderLine(element3Ref, element4Ref, {
      color: '#673AB7',
      strokeWidth: 3,
      path: 'magnet',
      hide: true,
      label: { text: 'Animated 3' },
    });

    // Show with sequential animation
    await animateSequentially('fade', 200);
    
    // Wait then pulse all
    setTimeout(async () => {
      await pulseAllLines(2);
    }, 1000);
  };

  const demos = {
    labels: { name: 'Labels', action: demoLabels },
    plugs: { name: 'Plug Types', action: demoPlugTypes },
    grid: { name: 'Grid Path', action: demoGridPath },
    effects: { name: 'Visual Effects', action: demoEffects },
    dash: { name: 'Dash Animations', action: demoDashAnimations },
    animations: { name: 'Animations', action: demoAnimations },
  };

  const showStats = () => {
    const stats = getStats();
    Alert.alert(
      'Line Statistics',
      `Total Lines: ${stats.totalLines}
Visible: ${stats.visibleLines}
Hidden: ${stats.hiddenLines}
Measured: ${stats.measuredLines}
Unmeasured: ${stats.unmeasuredLines}`
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Advanced LeaderLine Features</Text>
      
      {/* Demo selector */}
      <View style={styles.demoSelector}>
        {Object.entries(demos).map(([key, demo]) => (
          <TouchableOpacity
            key={key}
            style={[
              styles.demoButton,
              currentDemo === key && styles.demoButtonActive,
            ]}
            onPress={() => {
              setCurrentDemo(key);
              demo.action();
            }}
          >
            <Text
              style={[
                styles.demoButtonText,
                currentDemo === key && styles.demoButtonTextActive,
              ]}
            >
              {demo.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Control buttons */}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton} onPress={showStats}>
          <Text style={styles.controlButtonText}>Stats</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => showAllLines('fade')}
        >
          <Text style={styles.controlButtonText}>Show All</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => hideAllLines('fade')}
        >
          <Text style={styles.controlButtonText}>Hide All</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.controlButton} onPress={removeAllLines}>
          <Text style={styles.controlButtonText}>Clear</Text>
        </TouchableOpacity>
      </View>

      {/* Demo area */}
      <View ref={containerRef} style={styles.demoArea}>
        {/* Connection elements */}
        <View ref={element1Ref} style={[styles.element, styles.element1]}>
          <Text style={styles.elementText}>A</Text>
        </View>

        <View ref={element2Ref} style={[styles.element, styles.element2]}>
          <Text style={styles.elementText}>B</Text>
        </View>

        <View ref={element3Ref} style={[styles.element, styles.element3]}>
          <Text style={styles.elementText}>C</Text>
        </View>

        <View ref={element4Ref} style={[styles.element, styles.element4]}>
          <Text style={styles.elementText}>D</Text>
        </View>

        {/* Render all leader lines */}
        {renderLines()}
      </View>

      {/* Feature descriptions */}
      <View style={styles.description}>
        <Text style={styles.descriptionTitle}>
          Current Demo: {demos[currentDemo as keyof typeof demos]?.name}
        </Text>
        <Text style={styles.descriptionText}>
          {currentDemo === 'labels' && 'Labels can be positioned anywhere on the line with custom styling, backgrounds, and rotation.'}
          {currentDemo === 'plugs' && 'Various plug types including arrows, circles, squares, diamonds, and more.'}
          {currentDemo === 'grid' && 'Grid path type creates circuit-diagram style right-angle connections.'}
          {currentDemo === 'effects' && 'Visual effects including drop shadows, glow, outlines, and advanced gradients.'}
          {currentDemo === 'dash' && 'Animated dashed lines with customizable patterns and speeds.'}
          {currentDemo === 'animations' && 'Sequential animations and effects like pulse, fade, slide, and draw.'}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  demoSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  demoButton: {
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    margin: 4,
  },
  demoButtonActive: {
    backgroundColor: '#2196F3',
  },
  demoButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  demoButtonTextActive: {
    color: 'white',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  controlButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  controlButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  demoArea: {
    height: 400,
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    position: 'relative',
  },
  element: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  element1: {
    backgroundColor: '#FF5722',
    top: 50,
    left: 50,
  },
  element2: {
    backgroundColor: '#4CAF50',
    top: 50,
    right: 50,
  },
  element3: {
    backgroundColor: '#2196F3',
    bottom: 50,
    right: 50,
  },
  element4: {
    backgroundColor: '#FF9800',
    bottom: 50,
    left: 50,
  },
  elementText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    backgroundColor: 'white',
    margin: 20,
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});