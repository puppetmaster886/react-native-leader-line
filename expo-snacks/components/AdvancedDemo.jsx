/**
 * React Native Leader Line - Advanced Features Demo
 * 
 * This component demonstrates advanced features of react-native-leader-line
 * including different path types, complex styling, labels, and animations.
 * 
 * Features shown:
 * - Multiple path types (straight, arc, fluid)
 * - Advanced styling (outlines, shadows, dash patterns)
 * - Labels and text positioning
 * - Multiple plug types
 * - Complex layouts
 */

import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

// Import the LeaderLine component from the real library
import { LeaderLine } from 'react-native-leader-line';

const AdvancedDemo = () => {
  const [currentDemo, setCurrentDemo] = useState('paths');
  
  // Refs for different demos
  const pathRefs = {
    straight1: useRef(null),
    straight2: useRef(null),
    arc1: useRef(null),
    arc2: useRef(null),
    fluid1: useRef(null),
    fluid2: useRef(null),
  };

  const styleRefs = {
    outline1: useRef(null),
    outline2: useRef(null),
    dash1: useRef(null),
    dash2: useRef(null),
    shadow1: useRef(null),
    shadow2: useRef(null),
  };

  const labelRefs = {
    label1: useRef(null),
    label2: useRef(null),
    label3: useRef(null),
    label4: useRef(null),
  };

  const renderPathDemo = () => (
    <View style={styles.demoSection}>
      <Text style={styles.demoTitle}>Path Types</Text>
      
      {/* Straight Path */}
      <View style={styles.pathContainer}>
        <Text style={styles.pathLabel}>Straight Path</Text>
        <View style={styles.pathDemo}>
          <View ref={pathRefs.straight1} style={[styles.node, styles.blueNode]}>
            <Text style={styles.nodeText}>A</Text>
          </View>
          <View ref={pathRefs.straight2} style={[styles.node, styles.greenNode, { right: 20, top: 20 }]}>
            <Text style={styles.nodeText}>B</Text>
          </View>
          <LeaderLine
            start={{ element: pathRefs.straight1 }}
            end={{ element: pathRefs.straight2 }}
            path="straight"
            color="#007AFF"
            strokeWidth={3}
            endPlug="arrow1"
          />
        </View>
      </View>

      {/* Arc Path */}
      <View style={styles.pathContainer}>
        <Text style={styles.pathLabel}>Arc Path (curvature: 0.3)</Text>
        <View style={styles.pathDemo}>
          <View ref={pathRefs.arc1} style={[styles.node, styles.purpleNode]}>
            <Text style={styles.nodeText}>C</Text>
          </View>
          <View ref={pathRefs.arc2} style={[styles.node, styles.orangeNode, { right: 20, top: 20 }]}>
            <Text style={styles.nodeText}>D</Text>
          </View>
          <LeaderLine
            start={{ element: pathRefs.arc1 }}
            end={{ element: pathRefs.arc2 }}
            path="arc"
            curvature={0.3}
            color="#AF52DE"
            strokeWidth={3}
            endPlug="arrow2"
          />
        </View>
      </View>

      {/* Fluid Path */}
      <View style={styles.pathContainer}>
        <Text style={styles.pathLabel}>Fluid Path (smooth curves)</Text>
        <View style={styles.pathDemo}>
          <View ref={pathRefs.fluid1} style={[styles.node, styles.redNode]}>
            <Text style={styles.nodeText}>E</Text>
          </View>
          <View ref={pathRefs.fluid2} style={[styles.node, styles.tealNode, { right: 20, top: 20 }]}>
            <Text style={styles.nodeText}>F</Text>
          </View>
          <LeaderLine
            start={{ element: pathRefs.fluid1 }}
            end={{ element: pathRefs.fluid2 }}
            path="fluid"
            color="#FF3B30"
            strokeWidth={3}
            endPlug="arrow3"
          />
        </View>
      </View>

      <View style={styles.codeExample}>
        <Text style={styles.codeText}>
{`// Different path types
<LeaderLine path="straight" />
<LeaderLine path="arc" curvature={0.3} />
<LeaderLine path="fluid" />`}
        </Text>
      </View>
    </View>
  );

  const renderStyleDemo = () => (
    <View style={styles.demoSection}>
      <Text style={styles.demoTitle}>Advanced Styling</Text>
      
      {/* Outline */}
      <View style={styles.pathContainer}>
        <Text style={styles.pathLabel}>Outline</Text>
        <View style={styles.pathDemo}>
          <View ref={styleRefs.outline1} style={[styles.node, styles.blueNode]}>
            <Text style={styles.nodeText}>Out</Text>
          </View>
          <View ref={styleRefs.outline2} style={[styles.node, styles.greenNode, { right: 20, top: 20 }]}>
            <Text style={styles.nodeText}>Line</Text>
          </View>
          <LeaderLine
            start={{ element: styleRefs.outline1 }}
            end={{ element: styleRefs.outline2 }}
            color="#007AFF"
            strokeWidth={4}
            endPlug="arrow1"
            outline={{ enabled: true, color: "white", size: 2 }}
          />
        </View>
      </View>

      {/* Dash Pattern */}
      <View style={styles.pathContainer}>
        <Text style={styles.pathLabel}>Dash Pattern</Text>
        <View style={styles.pathDemo}>
          <View ref={styleRefs.dash1} style={[styles.node, styles.purpleNode]}>
            <Text style={styles.nodeText}>Dash</Text>
          </View>
          <View ref={styleRefs.dash2} style={[styles.node, styles.orangeNode, { right: 20, top: 20 }]}>
            <Text style={styles.nodeText}>Line</Text>
          </View>
          <LeaderLine
            start={{ element: styleRefs.dash1 }}
            end={{ element: styleRefs.dash2 }}
            color="#AF52DE"
            strokeWidth={3}
            endPlug="disc"
            dash={{ pattern: "8,4", animation: true }}
          />
        </View>
      </View>

      {/* Drop Shadow */}
      <View style={styles.pathContainer}>
        <Text style={styles.pathLabel}>Drop Shadow</Text>
        <View style={styles.pathDemo}>
          <View ref={styleRefs.shadow1} style={[styles.node, styles.redNode]}>
            <Text style={styles.nodeText}>Drop</Text>
          </View>
          <View ref={styleRefs.shadow2} style={[styles.node, styles.tealNode, { right: 20, top: 20 }]}>
            <Text style={styles.nodeText}>Shadow</Text>
          </View>
          <LeaderLine
            start={{ element: styleRefs.shadow1 }}
            end={{ element: styleRefs.shadow2 }}
            color="#FF3B30"
            strokeWidth={4}
            endPlug="square"
            dropShadow={{ dx: 2, dy: 2, blur: 4, color: "rgba(0,0,0,0.3)" }}
          />
        </View>
      </View>

      <View style={styles.codeExample}>
        <Text style={styles.codeText}>
{`// Advanced styling
<LeaderLine
  outline={{ enabled: true, color: "white", size: 2 }}
  dash={{ pattern: "8,4", animation: true }}
  dropShadow={{ dx: 2, dy: 2, blur: 4 }}
/>`}
        </Text>
      </View>
    </View>
  );

  const renderLabelDemo = () => (
    <View style={styles.demoSection}>
      <Text style={styles.demoTitle}>Labels & Text</Text>
      
      <View style={styles.pathContainer}>
        <Text style={styles.pathLabel}>Multiple Labels</Text>
        <View style={styles.pathDemo}>
          <View ref={labelRefs.label1} style={[styles.node, styles.blueNode]}>
            <Text style={styles.nodeText}>Start</Text>
          </View>
          <View ref={labelRefs.label2} style={[styles.node, styles.greenNode, { right: 20, top: 20 }]}>
            <Text style={styles.nodeText}>End</Text>
          </View>
          <LeaderLine
            start={{ element: labelRefs.label1 }}
            end={{ element: labelRefs.label2 }}
            color="#007AFF"
            strokeWidth={3}
            endPlug="arrow1"
            startLabel="Begin"
            middleLabel="Process"
            endLabel="Complete"
          />
        </View>
      </View>

      <View style={styles.pathContainer}>
        <Text style={styles.pathLabel}>Custom Label Styling</Text>
        <View style={styles.pathDemo}>
          <View ref={labelRefs.label3} style={[styles.node, styles.purpleNode]}>
            <Text style={styles.nodeText}>From</Text>
          </View>
          <View ref={labelRefs.label4} style={[styles.node, styles.orangeNode, { right: 20, top: 20 }]}>
            <Text style={styles.nodeText}>To</Text>
          </View>
          <LeaderLine
            start={{ element: labelRefs.label3 }}
            end={{ element: labelRefs.label4 }}
            color="#AF52DE"
            strokeWidth={3}
            endPlug="arrow2"
            path="arc"
            curvature={0.2}
            middleLabel={{
              text: "Transfer",
              fontSize: 12,
              color: "white",
              backgroundColor: "#AF52DE",
              borderRadius: 4,
              padding: 4
            }}
          />
        </View>
      </View>

      <View style={styles.codeExample}>
        <Text style={styles.codeText}>
{`// Labels
<LeaderLine
  startLabel="Begin"
  middleLabel="Process"
  endLabel="Complete"
  middleLabel={{
    text: "Custom",
    fontSize: 12,
    color: "white",
    backgroundColor: "#AF52DE"
  }}
/>`}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>🚀 Advanced Features</Text>
        <Text style={styles.subtitle}>Explore powerful styling options</Text>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, currentDemo === 'paths' && styles.activeTab]}
          onPress={() => setCurrentDemo('paths')}
        >
          <Text style={[styles.tabText, currentDemo === 'paths' && styles.activeTabText]}>
            Paths
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, currentDemo === 'styles' && styles.activeTab]}
          onPress={() => setCurrentDemo('styles')}
        >
          <Text style={[styles.tabText, currentDemo === 'styles' && styles.activeTabText]}>
            Styling
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, currentDemo === 'labels' && styles.activeTab]}
          onPress={() => setCurrentDemo('labels')}
        >
          <Text style={[styles.tabText, currentDemo === 'labels' && styles.activeTabText]}>
            Labels
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {currentDemo === 'paths' && renderPathDemo()}
        {currentDemo === 'styles' && renderStyleDemo()}
        {currentDemo === 'labels' && renderLabelDemo()}

        {/* Plugin Types Reference */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎪 Plug Types Reference</Text>
          
          <View style={styles.plugGrid}>
            <View style={styles.plugItem}>
              <Text style={styles.plugName}>arrow1</Text>
              <Text style={styles.plugDesc}>Sharp arrow</Text>
            </View>
            <View style={styles.plugItem}>
              <Text style={styles.plugName}>arrow2</Text>
              <Text style={styles.plugDesc}>Standard arrow</Text>
            </View>
            <View style={styles.plugItem}>
              <Text style={styles.plugName}>arrow3</Text>
              <Text style={styles.plugDesc}>Wide arrow</Text>
            </View>
            <View style={styles.plugItem}>
              <Text style={styles.plugName}>disc</Text>
              <Text style={styles.plugDesc}>Filled circle</Text>
            </View>
            <View style={styles.plugItem}>
              <Text style={styles.plugName}>square</Text>
              <Text style={styles.plugDesc}>Filled square</Text>
            </View>
            <View style={styles.plugItem}>
              <Text style={styles.plugName}>none</Text>
              <Text style={styles.plugDesc}>No marker</Text>
            </View>
          </View>
        </View>

        {/* Socket Positions Reference */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎯 Socket Positions</Text>
          
          <View style={styles.socketGrid}>
            <View style={styles.socketItem}>
              <Text style={styles.socketName}>auto</Text>
              <Text style={styles.socketDesc}>Best position</Text>
            </View>
            <View style={styles.socketItem}>
              <Text style={styles.socketName}>center</Text>
              <Text style={styles.socketDesc}>Element center</Text>
            </View>
            <View style={styles.socketItem}>
              <Text style={styles.socketName}>top</Text>
              <Text style={styles.socketDesc}>Top edge</Text>
            </View>
            <View style={styles.socketItem}>
              <Text style={styles.socketName}>right</Text>
              <Text style={styles.socketDesc}>Right edge</Text>
            </View>
            <View style={styles.socketItem}>
              <Text style={styles.socketName}>bottom</Text>
              <Text style={styles.socketDesc}>Bottom edge</Text>
            </View>
            <View style={styles.socketItem}>
              <Text style={styles.socketName}>left</Text>
              <Text style={styles.socketDesc}>Left edge</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            🎨 Explore endless styling possibilities!
          </Text>
          <Text style={styles.footerSubtext}>
            Mix and match different options to create unique line designs
          </Text>
        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6c757d',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6c757d',
  },
  activeTabText: {
    color: '#007AFF',
  },
  scrollView: {
    flex: 1,
  },
  demoSection: {
    padding: 16,
  },
  demoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 16,
    textAlign: 'center',
  },
  pathContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pathLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 12,
  },
  pathDemo: {
    height: 100,
    position: 'relative',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 12,
  },
  node: {
    position: 'absolute',
    width: 60,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    top: 10,
    left: 20,
  },
  nodeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  blueNode: { backgroundColor: '#007AFF' },
  greenNode: { backgroundColor: '#34C759' },
  purpleNode: { backgroundColor: '#AF52DE' },
  orangeNode: { backgroundColor: '#FF9500' },
  redNode: { backgroundColor: '#FF3B30' },
  tealNode: { backgroundColor: '#5AC8FA' },
  codeExample: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  codeText: {
    fontFamily: 'Courier',
    fontSize: 11,
    color: '#495057',
    lineHeight: 14,
  },
  section: {
    margin: 16,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 16,
    textAlign: 'center',
  },
  plugGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  plugItem: {
    width: '48%',
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  plugName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  plugDesc: {
    fontSize: 12,
    color: '#6c757d',
    textAlign: 'center',
  },
  socketGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  socketItem: {
    width: '30%',
    backgroundColor: '#f8f9fa',
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  socketName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#AF52DE',
    marginBottom: 2,
  },
  socketDesc: {
    fontSize: 10,
    color: '#6c757d',
    textAlign: 'center',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    margin: 16,
    borderRadius: 12,
  },
  footerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    textAlign: 'center',
    marginBottom: 8,
  },
  footerSubtext: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
  },
});

export default AdvancedDemo;