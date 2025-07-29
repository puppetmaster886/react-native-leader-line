import React, { useRef } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { LeaderLine } from 'react-native-leader-line';

const pathTypes = ['straight', 'arc', 'fluid', 'magnet', 'grid'] as const;

export default function PathTypesDemo() {
  const refs = pathTypes.reduce((acc, type) => {
    acc[`${type}Start`] = useRef<View>(null);
    acc[`${type}End`] = useRef<View>(null);
    return acc;
  }, {} as Record<string, React.RefObject<View>>);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.description}>
        <Text style={styles.descriptionText}>
          Different path algorithms for drawing connections between elements.
        </Text>
      </View>

      {pathTypes.map((pathType) => (
        <View key={pathType} style={styles.demoSection}>
          <Text style={styles.sectionTitle}>{pathType.toUpperCase()}</Text>
          <View style={styles.demo}>
            <View 
              ref={refs[`${pathType}Start`]} 
              style={[styles.box, styles.startBox]}
            >
              <Text style={styles.boxText}>A</Text>
            </View>

            <View 
              ref={refs[`${pathType}End`]} 
              style={[styles.box, styles.endBox]}
            >
              <Text style={styles.boxText}>B</Text>
            </View>

            <LeaderLine
              start={{ element: refs[`${pathType}Start`] }}
              end={{ element: refs[`${pathType}End`] }}
              path={pathType}
              color="#e74c3c"
              strokeWidth={2}
            />
          </View>
        </View>
      ))}

      <View style={styles.info}>
        <Text style={styles.infoTitle}>Path Types:</Text>
        <Text style={styles.infoText}>• straight: Direct line</Text>
        <Text style={styles.infoText}>• arc: Curved path</Text>
        <Text style={styles.infoText}>• fluid: Smooth bezier curves</Text>
        <Text style={styles.infoText}>• magnet: Magnetic field-like path</Text>
        <Text style={styles.infoText}>• grid: Grid-aligned path</Text>
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
  demoSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginLeft: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  demo: {
    height: 150,
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
  box: {
    position: 'absolute',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  startBox: {
    backgroundColor: '#3498db',
    top: 50,
    left: 30,
  },
  endBox: {
    backgroundColor: '#2ecc71',
    top: 50,
    right: 30,
  },
  boxText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  info: {
    margin: 16,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#2c3e50',
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 6,
    lineHeight: 20,
  },
});