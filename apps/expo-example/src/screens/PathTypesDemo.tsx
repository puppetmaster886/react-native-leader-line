import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LeaderLine } from 'react-native-leader-line';

const pathTypes = [
  { 
    type: 'straight' as const, 
    description: 'Direct line between points',
    color: '#3498db'
  },
  { 
    type: 'arc' as const, 
    description: 'Curved arc with adjustable curvature',
    color: '#e74c3c'
  },
  { 
    type: 'fluid' as const, 
    description: 'Smooth bezier curves for natural flow',
    color: '#2ecc71'
  },
  { 
    type: 'magnet' as const, 
    description: 'L-shaped path that follows horizontal/vertical preference',
    color: '#9b59b6'
  },
  { 
    type: 'grid' as const, 
    description: 'Grid-aligned path with right angles',
    color: '#f39c12'
  }
];

export default function PathTypesDemo() {
  const [selectedPath, setSelectedPath] = useState<string>('straight');
  const [curvature, setCurvature] = useState(0.2);

  const demoStartRef = useRef<View>(null);
  const demoEndRef = useRef<View>(null);

  // Refs for comparison grid
  const gridRefs = pathTypes.reduce((acc, { type }) => {
    acc[`${type}Start`] = useRef<View>(null);
    acc[`${type}End`] = useRef<View>(null);
    return acc;
  }, {} as Record<string, React.RefObject<View>>);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.description}>
        <Text style={styles.descriptionText}>
          Different path algorithms for drawing connections. Each path type has unique characteristics suitable for different use cases.
        </Text>
      </View>

      {/* Interactive Demo */}
      <View style={styles.interactiveSection}>
        <Text style={styles.sectionTitle}>Interactive Demo</Text>
        <View style={styles.demoContainer}>
          <View ref={demoStartRef} style={[styles.largeBox, styles.startBox]}>
            <Text style={styles.boxText}>Start</Text>
          </View>
          <View ref={demoEndRef} style={[styles.largeBox, styles.endBox]}>
            <Text style={styles.boxText}>End</Text>
          </View>
          <LeaderLine
            start={{ element: demoStartRef }}
            end={{ element: demoEndRef }}
            path={selectedPath as any}
            color={pathTypes.find(p => p.type === selectedPath)?.color || '#3498db'}
            strokeWidth={3}
            curvature={selectedPath === 'arc' || selectedPath === 'fluid' ? curvature : undefined}
          />
        </View>

        {/* Path Type Selector */}
        <View style={styles.selectorContainer}>
          {pathTypes.map(({ type, color }) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.selectorButton,
                selectedPath === type && styles.selectedButton,
                { borderColor: color }
              ]}
              onPress={() => setSelectedPath(type)}
            >
              <Text style={[
                styles.selectorText,
                selectedPath === type && { color }
              ]}>
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Curvature Control for arc and fluid */}
        {(selectedPath === 'arc' || selectedPath === 'fluid') && (
          <View style={styles.curvatureControl}>
            <Text style={styles.curvatureLabel}>Curvature: {curvature.toFixed(2)}</Text>
            <View style={styles.curvatureButtons}>
              <TouchableOpacity
                style={styles.curvatureButton}
                onPress={() => setCurvature(Math.max(0, curvature - 0.1))}
              >
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.curvatureButton}
                onPress={() => setCurvature(Math.min(1, curvature + 0.1))}
              >
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={styles.codeSnippet}>
          <Text style={styles.code}>{`<LeaderLine
  start={{ element: startRef }}
  end={{ element: endRef }}
  path="${selectedPath}"${(selectedPath === 'arc' || selectedPath === 'fluid') ? `
  curvature={${curvature.toFixed(1)}}` : ''}
  color="${pathTypes.find(p => p.type === selectedPath)?.color}"
  strokeWidth={3}
/>`}</Text>
        </View>
      </View>

      {/* Comparison Grid */}
      <View style={styles.comparisonSection}>
        <Text style={styles.sectionTitle}>Path Types Comparison</Text>
        {pathTypes.map(({ type, description, color }) => (
          <View key={type} style={styles.pathExample}>
            <View style={styles.pathHeader}>
              <Text style={[styles.pathTitle, { color }]}>{type.toUpperCase()}</Text>
              <Text style={styles.pathDescription}>{description}</Text>
            </View>
            <View style={styles.miniDemo}>
              <View 
                ref={gridRefs[`${type}Start`]} 
                style={[styles.miniBox, { backgroundColor: color, top: 20, left: 20 }]}
              />
              <View 
                ref={gridRefs[`${type}End`]} 
                style={[styles.miniBox, { backgroundColor: color, bottom: 20, right: 20 }]}
              />
              <LeaderLine
                start={{ element: gridRefs[`${type}Start`] }}
                end={{ element: gridRefs[`${type}End`] }}
                path={type}
                color={color}
                strokeWidth={2}
              />
            </View>
          </View>
        ))}
      </View>

      <View style={styles.tips}>
        <Text style={styles.tipsTitle}>When to use each path type:</Text>
        <Text style={styles.tipText}>• <Text style={styles.bold}>straight</Text>: Simple, direct connections</Text>
        <Text style={styles.tipText}>• <Text style={styles.bold}>arc</Text>: Elegant curves for aesthetic appeal</Text>
        <Text style={styles.tipText}>• <Text style={styles.bold}>fluid</Text>: Natural, organic connections</Text>
        <Text style={styles.tipText}>• <Text style={styles.bold}>magnet</Text>: Clean L-shaped paths for diagrams</Text>
        <Text style={styles.tipText}>• <Text style={styles.bold}>grid</Text>: Structured layouts and flowcharts</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  description: {
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  descriptionText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
  },
  interactiveSection: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c3e50',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  demoContainer: {
    height: 300,
    backgroundColor: 'white',
    marginHorizontal: 16,
    borderRadius: 10,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  largeBox: {
    position: 'absolute',
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  startBox: {
    backgroundColor: '#34495e',
    top: 40,
    left: 40,
  },
  endBox: {
    backgroundColor: '#34495e',
    bottom: 40,
    right: 40,
  },
  boxText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  selectorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 16,
    marginTop: 16,
  },
  selectorButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 2,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedButton: {
    backgroundColor: '#f0f0f0',
  },
  selectorText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7f8c8d',
  },
  curvatureControl: {
    marginHorizontal: 16,
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  curvatureLabel: {
    fontSize: 16,
    color: '#34495e',
  },
  curvatureButtons: {
    flexDirection: 'row',
  },
  curvatureButton: {
    width: 40,
    height: 40,
    backgroundColor: '#3498db',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  codeSnippet: {
    marginHorizontal: 16,
    marginTop: 16,
    padding: 12,
    backgroundColor: '#2c3e50',
    borderRadius: 8,
  },
  code: {
    color: '#ecf0f1',
    fontSize: 12,
    fontFamily: 'monospace',
    lineHeight: 18,
  },
  comparisonSection: {
    marginTop: 32,
  },
  pathExample: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  pathHeader: {
    marginBottom: 8,
  },
  pathTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  pathDescription: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  miniDemo: {
    height: 120,
    backgroundColor: 'white',
    borderRadius: 8,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  miniBox: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 6,
  },
  tips: {
    margin: 16,
    padding: 16,
    backgroundColor: '#ecf0f1',
    borderRadius: 8,
    marginBottom: 32,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 12,
  },
  tipText: {
    fontSize: 14,
    color: '#34495e',
    marginVertical: 3,
    lineHeight: 20,
  },
  bold: {
    fontWeight: '600',
  },
});