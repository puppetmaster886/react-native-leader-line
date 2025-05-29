import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { LeaderLine } from 'react-native-leader-line';

export const OutlineExamplesScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Outline Examples</Text>
      
      {/* Basic Outline */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Basic Line Outline</Text>
        <View style={styles.demo}>
          <View style={[styles.box, styles.startBox]}>
            <Text>Start</Text>
          </View>
          <View style={[styles.box, styles.endBox]}>
            <Text>End</Text>
          </View>
          
          <LeaderLine
            start={{ x: 100, y: 50 }}
            end={{ x: 250, y: 50 }}
            color="#ff6b6b"
            strokeWidth={4}
            outline={true}
            outlineColor="auto"
            outlineSize={2}
          />
        </View>
      </View>

      {/* Custom Outline Colors */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. Custom Outline Colors</Text>
        <View style={styles.demo}>
          <View style={[styles.box, styles.startBox]}>
            <Text>Blue Line</Text>
          </View>
          <View style={[styles.box, styles.endBox]}>
            <Text>White Outline</Text>
          </View>
          
          <LeaderLine
            start={{ x: 100, y: 50 }}
            end={{ x: 250, y: 50 }}
            color="#4ecdc4"
            strokeWidth={6}
            outline={{
              enabled: true,
              color: "#ffffff",
              width: 3,
              opacity: 0.9
            }}
          />
        </View>
      </View>

      {/* Plug Outlines */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. Plug Outlines</Text>
        <View style={styles.demo}>
          <View style={[styles.box, styles.startBox]}>
            <Text>Outlined Plugs</Text>
          </View>
          <View style={[styles.box, styles.endBox]}>
            <Text>Different Colors</Text>
          </View>
          
          <LeaderLine
            start={{ x: 100, y: 50 }}
            end={{ x: 250, y: 50 }}
            color="#9b59b6"
            strokeWidth={4}
            startPlug="disc"
            endPlug="arrow1"
            startPlugSize={12}
            endPlugSize={15}
            startPlugOutline={{
              enabled: true,
              color: "#e74c3c",
              width: 2
            }}
            endPlugOutline={{
              enabled: true,
              color: "#f39c12",
              width: 2
            }}
          />
        </View>
      </View>

      {/* Complex Outline with Path Types */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>4. Fluid Path with Outline</Text>
        <View style={styles.demo}>
          <View style={[styles.box, styles.startBox]}>
            <Text>Fluid</Text>
          </View>
          <View style={[styles.box, styles.endBox]}>
            <Text>Outlined</Text>
          </View>
          
          <LeaderLine
            start={{ x: 100, y: 50 }}
            end={{ x: 250, y: 80 }}
            color="#e67e22"
            strokeWidth={5}
            path={{
              type: "fluid",
              fluid: {
                cornerRadius: 15
              }
            }}
            outline={{
              enabled: true,
              color: "#2c3e50",
              width: 3
            }}
            endPlug="arrow2"
            endPlugOutline={true}
          />
        </View>
      </View>

      {/* Multiple Lines with Different Outlines */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>5. Multiple Outline Styles</Text>
        <View style={styles.demo}>
          <View style={[styles.box, { position: 'absolute', top: 20, left: 50 }]}>
            <Text>Hub</Text>
          </View>
          <View style={[styles.box, { position: 'absolute', top: 20, right: 50 }]}>
            <Text>A</Text>
          </View>
          <View style={[styles.box, { position: 'absolute', bottom: 20, right: 50 }]}>
            <Text>B</Text>
          </View>
          <View style={[styles.box, { position: 'absolute', bottom: 20, left: 50 }]}>
            <Text>C</Text>
          </View>
          
          {/* Line to A - Red with black outline */}
          <LeaderLine
            start={{ x: 100, y: 40 }}
            end={{ x: 250, y: 40 }}
            color="#e74c3c"
            strokeWidth={3}
            outline={{
              enabled: true,
              color: "#000000",
              width: 1
            }}
            endPlug="arrow1"
          />
          
          {/* Line to B - Green with white outline */}
          <LeaderLine
            start={{ x: 100, y: 40 }}
            end={{ x: 250, y: 100 }}
            color="#27ae60"
            strokeWidth={3}
            outline={{
              enabled: true,
              color: "#ffffff",
              width: 2
            }}
            path="arc"
            curvature={0.3}
            endPlug="disc"
          />
          
          {/* Line to C - Blue with yellow outline */}
          <LeaderLine
            start={{ x: 100, y: 40 }}
            end={{ x: 100, y: 100 }}
            color="#3498db"
            strokeWidth={3}
            outline={{
              enabled: true,
              color: "#f1c40f",
              width: 2
            }}
            endPlug="square"
            endPlugOutline={{
              enabled: true,
              color: "#e74c3c",
              width: 1
            }}
          />
        </View>
      </View>

      {/* Dashed Lines with Outline */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>6. Dashed Lines with Outline</Text>
        <View style={styles.demo}>
          <View style={[styles.box, styles.startBox]}>
            <Text>Dashed</Text>
          </View>
          <View style={[styles.box, styles.endBox]}>
            <Text>Outlined</Text>
          </View>
          
          <LeaderLine
            start={{ x: 100, y: 50 }}
            end={{ x: 250, y: 50 }}
            color="#8e44ad"
            strokeWidth={4}
            dash={{
              len: 8,
              gap: 4
            }}
            outline={{
              enabled: true,
              color: "#ffffff",
              width: 2,
              opacity: 0.8
            }}
            endPlug="diamond"
            endPlugOutline={true}
          />
        </View>
      </View>

      {/* Auto Outline Colors Demo */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>7. Auto Outline Colors</Text>
        <Text style={styles.description}>
          When outline color is set to "auto", it automatically picks contrasting colors
        </Text>
        <View style={styles.demo}>
          {/* Light color with auto outline (should be dark) */}
          <LeaderLine
            start={{ x: 50, y: 30 }}
            end={{ x: 200, y: 30 }}
            color="#f8f9fa"
            strokeWidth={6}
            outline={{
              enabled: true,
              color: "auto",
              width: 2
            }}
          />
          
          {/* Dark color with auto outline (should be light) */}
          <LeaderLine
            start={{ x: 50, y: 60 }}
            end={{ x: 200, y: 60 }}
            color="#212529"
            strokeWidth={6}
            outline={{
              enabled: true,
              color: "auto",
              width: 2
            }}
          />
          
          {/* Colored line with auto outline (should be darker) */}
          <LeaderLine
            start={{ x: 50, y: 90 }}
            end={{ x: 200, y: 90 }}
            color="#fd7e14"
            strokeWidth={6}
            outline={{
              enabled: true,
              color: "auto",
              width: 2
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#2c3e50',
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 30,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#2c3e50',
  },
  description: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 10,
    fontStyle: 'italic',
  },
  demo: {
    height: 120,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    position: 'relative',
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  box: {
    padding: 8,
    backgroundColor: '#ffffff',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ced4da',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  startBox: {
    top: 20,
    left: 20,
  },
  endBox: {
    top: 20,
    right: 20,
  },
});

export default OutlineExamplesScreen;