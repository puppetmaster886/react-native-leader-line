import React, { useRef } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LeaderLine } from 'react-native-leader-line';

function App(): JSX.Element {
  const startRef = useRef<View>(null);
  const endRef = useRef<View>(null);
  const multiStart = useRef<View>(null);
  const multiEnd1 = useRef<View>(null);
  const multiEnd2 = useRef<View>(null);

  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.backgroundStyle}>
        
        <View style={styles.header}>
          <Text style={styles.title}>React Native Leader Line</Text>
          <Text style={styles.subtitle}>Bare React Native App (No Expo)</Text>
        </View>

        {/* Basic Example */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Connection</Text>
          <View style={styles.demo}>
            <View ref={startRef} style={[styles.box, styles.blueBox]}>
              <Text style={styles.boxText}>Start</Text>
            </View>
            <View ref={endRef} style={[styles.box, styles.redBox]}>
              <Text style={styles.boxText}>End</Text>
            </View>
            <LeaderLine
              start={{ element: startRef }}
              end={{ element: endRef }}
              color="#3498db"
              strokeWidth={3}
              path="arc"
            />
          </View>
        </View>

        {/* Multiple Lines Example */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Multiple Connections</Text>
          <View style={styles.demo}>
            <View ref={multiStart} style={[styles.box, styles.greenBox, { left: 40, top: 80 }]}>
              <Text style={styles.boxText}>Source</Text>
            </View>
            <View ref={multiEnd1} style={[styles.box, styles.purpleBox, { right: 40, top: 40 }]}>
              <Text style={styles.boxText}>Target 1</Text>
            </View>
            <View ref={multiEnd2} style={[styles.box, styles.orangeBox, { right: 40, bottom: 40 }]}>
              <Text style={styles.boxText}>Target 2</Text>
            </View>
            
            <LeaderLine
              start={{ element: multiStart }}
              end={{ element: multiEnd1 }}
              color="#2ecc71"
              strokeWidth={2}
              path="fluid"
              startLabel="Data"
            />
            <LeaderLine
              start={{ element: multiStart }}
              end={{ element: multiEnd2 }}
              color="#e67e22"
              strokeWidth={2}
              path="magnet"
              startLabel="Flow"
            />
          </View>
        </View>

        {/* Fixed Points Example */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fixed Point Connection</Text>
          <View style={styles.demo}>
            <LeaderLine
              start={{ point: { x: 50, y: 50 } }}
              end={{ point: { x: 250, y: 150 } }}
              color="#e74c3c"
              strokeWidth={4}
              path="grid"
              middleLabel="Fixed Path"
              startPlug="disc"
              endPlug="arrow2"
            />
            <View style={[styles.point, { top: 50, left: 50 }]} />
            <View style={[styles.point, { top: 150, left: 250 }]} />
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            This example demonstrates that react-native-leader-line works
            perfectly in bare React Native apps without Expo.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  header: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  section: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c3e50',
    marginHorizontal: 20,
    marginBottom: 12,
  },
  demo: {
    height: 200,
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 10,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  box: {
    position: 'absolute',
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  blueBox: {
    backgroundColor: '#3498db',
    top: 65,
    left: 50,
  },
  redBox: {
    backgroundColor: '#e74c3c',
    top: 65,
    right: 50,
  },
  greenBox: {
    backgroundColor: '#2ecc71',
  },
  purpleBox: {
    backgroundColor: '#9b59b6',
  },
  orangeBox: {
    backgroundColor: '#e67e22',
  },
  boxText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  point: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#e74c3c',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default App;