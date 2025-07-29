/**
 * React Native Leader Line - Real-world Examples
 * 
 * This component demonstrates practical, real-world use cases for react-native-leader-line
 * including workflow diagrams, network visualizations, onboarding flows, and more.
 * 
 * Examples shown:
 * - Workflow/Process diagrams
 * - Network topology visualization
 * - Tutorial/Onboarding highlights
 * - Data flow representations
 * - Interactive dashboard connections
 */

import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { LeaderLine } from 'react-native-leader-line';

const RealWorldDemo = () => {
  const [currentExample, setCurrentExample] = useState('workflow');
  
  // Workflow example refs
  const workflowRefs = {
    start: useRef(null),
    process: useRef(null),
    decision: useRef(null),
    end: useRef(null),
  };

  // Network example refs
  const networkRefs = {
    server: useRef(null),
    router: useRef(null),
    client1: useRef(null),
    client2: useRef(null),
  };

  // Tutorial example refs
  const tutorialRefs = {
    feature1: useRef(null),
    feature2: useRef(null),
    feature3: useRef(null),
  };

  const renderWorkflowExample = () => (
    <View style={styles.exampleContainer}>
      <Text style={styles.exampleTitle}>📊 Workflow Diagram</Text>
      <Text style={styles.exampleDescription}>
        Visualize business processes and decision flows
      </Text>

      <View style={styles.workflowContainer}>
        {/* Start */}
        <View ref={workflowRefs.start} style={[styles.workflowNode, styles.startNode]}>
          <Text style={styles.nodeText}>Start</Text>
        </View>

        {/* Process */}
        <View ref={workflowRefs.process} style={[styles.workflowNode, styles.processNode]}>
          <Text style={styles.nodeText}>Process Data</Text>
        </View>

        {/* Decision */}
        <View ref={workflowRefs.decision} style={[styles.workflowNode, styles.decisionNode]}>
          <Text style={styles.nodeText}>Valid?</Text>
        </View>

        {/* End */}
        <View ref={workflowRefs.end} style={[styles.workflowNode, styles.endNode]}>
          <Text style={styles.nodeText}>Complete</Text>
        </View>

        {/* Workflow Lines */}
        <LeaderLine
          start={{ element: workflowRefs.start }}
          end={{ element: workflowRefs.process }}
          color="#007AFF"
          strokeWidth={2}
          endPlug="arrow1"
        />
        
        <LeaderLine
          start={{ element: workflowRefs.process }}
          end={{ element: workflowRefs.decision }}
          color="#007AFF"
          strokeWidth={2}
          endPlug="arrow1"
        />
        
        <LeaderLine
          start={{ element: workflowRefs.decision }}
          end={{ element: workflowRefs.end }}
          color="#34C759"
          strokeWidth={2}
          endPlug="arrow1"
          middleLabel="Yes"
        />
      </View>

      <View style={styles.useCaseList}>
        <Text style={styles.useCaseTitle}>Use Cases:</Text>
        <Text style={styles.useCaseItem}>• Business process modeling</Text>
        <Text style={styles.useCaseItem}>• Decision trees</Text>
        <Text style={styles.useCaseItem}>• Approval workflows</Text>
        <Text style={styles.useCaseItem}>• Data processing pipelines</Text>
      </View>
    </View>
  );

  const renderNetworkExample = () => (
    <View style={styles.exampleContainer}>
      <Text style={styles.exampleTitle}>🌐 Network Topology</Text>
      <Text style={styles.exampleDescription}>
        Show connections between network components
      </Text>

      <View style={styles.networkContainer}>
        {/* Server */}
        <View ref={networkRefs.server} style={[styles.networkNode, styles.serverNode]}>
          <Text style={styles.nodeText}>Server</Text>
        </View>

        {/* Router */}
        <View ref={networkRefs.router} style={[styles.networkNode, styles.routerNode]}>
          <Text style={styles.nodeText}>Router</Text>
        </View>

        {/* Clients */}
        <View ref={networkRefs.client1} style={[styles.networkNode, styles.clientNode1]}>
          <Text style={styles.nodeText}>Client 1</Text>
        </View>

        <View ref={networkRefs.client2} style={[styles.networkNode, styles.clientNode2]}>
          <Text style={styles.nodeText}>Client 2</Text>
        </View>

        {/* Network Lines */}
        <LeaderLine
          start={{ element: networkRefs.server }}
          end={{ element: networkRefs.router }}
          color="#FF9500"
          strokeWidth={3}
          endPlug="disc"
          startPlug="disc"
          middleLabel="Fiber"
        />
        
        <LeaderLine
          start={{ element: networkRefs.router }}
          end={{ element: networkRefs.client1 }}
          color="#AF52DE"
          strokeWidth={2}
          endPlug="arrow2"
          path="arc"
          curvature={0.2}
        />
        
        <LeaderLine
          start={{ element: networkRefs.router }}
          end={{ element: networkRefs.client2 }}
          color="#AF52DE"
          strokeWidth={2}
          endPlug="arrow2"
          path="arc"
          curvature={-0.2}
        />
      </View>

      <View style={styles.useCaseList}>
        <Text style={styles.useCaseTitle}>Use Cases:</Text>
        <Text style={styles.useCaseItem}>• Network diagrams</Text>
        <Text style={styles.useCaseItem}>• System architecture</Text>
        <Text style={styles.useCaseItem}>• IoT device connections</Text>
        <Text style={styles.useCaseItem}>• Data flow visualization</Text>
      </View>
    </View>
  );

  const renderTutorialExample = () => (
    <View style={styles.exampleContainer}>
      <Text style={styles.exampleTitle}>🎓 Tutorial Highlights</Text>
      <Text style={styles.exampleDescription}>
        Guide users through app features with callouts
      </Text>

      <View style={styles.tutorialContainer}>
        {/* Mock App Interface */}
        <View style={styles.mockInterface}>
          <View ref={tutorialRefs.feature1} style={[styles.mockButton, styles.feature1]}>
            <Text style={styles.buttonText}>Menu</Text>
          </View>

          <View ref={tutorialRefs.feature2} style={[styles.mockButton, styles.feature2]}>
            <Text style={styles.buttonText}>Search</Text>
          </View>

          <View ref={tutorialRefs.feature3} style={[styles.mockButton, styles.feature3]}>
            <Text style={styles.buttonText}>Profile</Text>
          </View>
        </View>

        {/* Tutorial Callouts */}
        <LeaderLine
          start={{ element: tutorialRefs.feature1 }}
          end={{ point: { x: 50, y: 180 } }}
          color="#007AFF"
          strokeWidth={2}
          endPlug="arrow1"
          path="arc"
          curvature={0.3}
        />

        <LeaderLine
          start={{ element: tutorialRefs.feature2 }}
          end={{ point: { x: 200, y: 180 } }}
          color="#34C759"
          strokeWidth={2}
          endPlug="arrow1"
          path="straight"
        />

        <LeaderLine
          start={{ element: tutorialRefs.feature3 }}
          end={{ point: { x: 350, y: 180 } }}
          color="#FF3B30"
          strokeWidth={2}
          endPlug="arrow1"
          path="arc"
          curvature={-0.3}
        />

        {/* Callout Text */}
        <View style={[styles.callout, { left: 10, top: 185 }]}>
          <Text style={styles.calloutText}>Tap to open navigation</Text>
        </View>

        <View style={[styles.callout, { left: 140, top: 185 }]}>
          <Text style={styles.calloutText}>Find anything quickly</Text>
        </View>

        <View style={[styles.callout, { right: 10, top: 185 }]}>
          <Text style={styles.calloutText}>Access your settings</Text>
        </View>
      </View>

      <View style={styles.useCaseList}>
        <Text style={styles.useCaseTitle}>Use Cases:</Text>
        <Text style={styles.useCaseItem}>• App onboarding</Text>
        <Text style={styles.useCaseItem}>• Feature highlights</Text>
        <Text style={styles.useCaseItem}>• Interactive tutorials</Text>
        <Text style={styles.useCaseItem}>• Contextual help</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>🌍 Real World Examples</Text>
        <Text style={styles.subtitle}>Practical applications in production apps</Text>
      </View>

      {/* Example Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, currentExample === 'workflow' && styles.activeTab]}
          onPress={() => setCurrentExample('workflow')}
        >
          <Text style={[styles.tabText, currentExample === 'workflow' && styles.activeTabText]}>
            Workflow
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, currentExample === 'network' && styles.activeTab]}
          onPress={() => setCurrentExample('network')}
        >
          <Text style={[styles.tabText, currentExample === 'network' && styles.activeTabText]}>
            Network
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, currentExample === 'tutorial' && styles.activeTab]}
          onPress={() => setCurrentExample('tutorial')}
        >
          <Text style={[styles.tabText, currentExample === 'tutorial' && styles.activeTabText]}>
            Tutorial
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {currentExample === 'workflow' && renderWorkflowExample()}
        {currentExample === 'network' && renderNetworkExample()}
        {currentExample === 'tutorial' && renderTutorialExample()}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            🌍 Endless possibilities for real-world applications!
          </Text>
          <Text style={styles.footerSubtext}>
            These examples show just a few ways to use leader lines in production apps
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
  exampleContainer: {
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
  exampleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 8,
  },
  exampleDescription: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 20,
  },
  workflowContainer: {
    height: 200,
    position: 'relative',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 20,
  },
  workflowNode: {
    position: 'absolute',
    width: 80,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startNode: {
    backgroundColor: '#34C759',
    top: 20,
    left: 20,
  },
  processNode: {
    backgroundColor: '#007AFF',
    top: 80,
    left: 120,
  },
  decisionNode: {
    backgroundColor: '#FF9500',
    top: 140,
    left: 220,
  },
  endNode: {
    backgroundColor: '#FF3B30',
    top: 80,
    right: 20,
  },
  networkContainer: {
    height: 180,
    position: 'relative',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 20,
  },
  networkNode: {
    position: 'absolute',
    width: 70,
    height: 35,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serverNode: {
    backgroundColor: '#FF3B30',
    top: 20,
    left: 20,
  },
  routerNode: {
    backgroundColor: '#FF9500',
    top: 70,
    left: 150,
  },
  clientNode1: {
    backgroundColor: '#007AFF',
    top: 20,
    right: 20,
  },
  clientNode2: {
    backgroundColor: '#007AFF',
    top: 120,
    right: 20,
  },
  tutorialContainer: {
    height: 240,
    position: 'relative',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 20,
  },
  mockInterface: {
    height: 120,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    margin: 10,
    position: 'relative',
  },
  mockButton: {
    position: 'absolute',
    width: 60,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007AFF',
  },
  feature1: {
    top: 20,
    left: 20,
  },
  feature2: {
    top: 20,
    left: '50%',
    marginLeft: -30,
  },
  feature3: {
    top: 20,
    right: 20,
  },
  callout: {
    position: 'absolute',
    backgroundColor: '#212529',
    padding: 8,
    borderRadius: 6,
    maxWidth: 120,
  },
  calloutText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
  nodeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 10,
    textAlign: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 10,
  },
  useCaseList: {
    marginTop: 16,
  },
  useCaseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 8,
  },
  useCaseItem: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 4,
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

export default RealWorldDemo;