import React, { useRef, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { LeaderLine } from 'react-native-leader-line';

export default function App() {
  const [activeDemo, setActiveDemo] = useState(0);
  
  const demos = [
    { title: 'Path Types', component: PathTypesDemo },
    { title: 'Plug Styles', component: PlugStylesDemo },
    { title: 'Labels', component: LabelsDemo },
    { title: 'Interactive', component: InteractiveDemo },
  ];

  const CurrentDemo = demos[activeDemo].component;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Advanced Examples</Text>
      
      {/* Tab Navigation */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabs}>
        {demos.map((demo, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.tab, activeDemo === index && styles.activeTab]}
            onPress={() => setActiveDemo(index)}
          >
            <Text style={[styles.tabText, activeDemo === index && styles.activeTabText]}>
              {demo.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Current Demo */}
      <View style={styles.content}>
        <CurrentDemo />
      </View>
    </SafeAreaView>
  );
}

// Path Types Demo
const PathTypesDemo = () => {
  const centerRef = useRef(null);
  const topRef = useRef(null);
  const rightRef = useRef(null);
  const bottomRef = useRef(null);
  const leftRef = useRef(null);

  return (
    <View style={styles.demo}>
      <Text style={styles.demoTitle}>Different Path Types</Text>
      
      <View style={styles.demoArea}>
        <View ref={centerRef} style={[styles.box, styles.centerBox]}>
          <Text style={styles.boxText}>CENTER</Text>
        </View>
        
        <View ref={topRef} style={[styles.box, { top: 20, left: 120, backgroundColor: '#e74c3c' }]}>
          <Text style={styles.boxText}>STRAIGHT</Text>
        </View>
        
        <View ref={rightRef} style={[styles.box, { top: 80, right: 20, backgroundColor: '#3498db' }]}>
          <Text style={styles.boxText}>ARC</Text>
        </View>
        
        <View ref={bottomRef} style={[styles.box, { bottom: 20, left: 120, backgroundColor: '#2ecc71' }]}>
          <Text style={styles.boxText}>FLUID</Text>
        </View>
        
        <View ref={leftRef} style={[styles.box, { top: 80, left: 20, backgroundColor: '#f39c12' }]}>
          <Text style={styles.boxText}>MAGNET</Text>
        </View>

        <LeaderLine start={{ element: centerRef }} end={{ element: topRef }} path="straight" color="#e74c3c" strokeWidth={2} endPlug="arrow1" />
        <LeaderLine start={{ element: centerRef }} end={{ element: rightRef }} path="arc" curvature={0.3} color="#3498db" strokeWidth={2} endPlug="arrow2" />
        <LeaderLine start={{ element: centerRef }} end={{ element: bottomRef }} path="fluid" curvature={0.4} color="#2ecc71" strokeWidth={2} endPlug="arrow3" />
        <LeaderLine start={{ element: centerRef }} end={{ element: leftRef }} path="magnet" color="#f39c12" strokeWidth={2} endPlug="diamond" />
      </View>
    </View>
  );
};

// Plug Styles Demo
const PlugStylesDemo = () => {
  const startRef = useRef(null);
  const plugRefs = Array.from({ length: 5 }, () => useRef(null));
  const plugTypes = ['arrow1', 'arrow2', 'disc', 'square', 'diamond'];
  const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6'];

  return (
    <View style={styles.demo}>
      <Text style={styles.demoTitle}>Plug Types</Text>
      
      <View style={styles.demoArea}>
        <View ref={startRef} style={[styles.box, { top: 100, left: 20, backgroundColor: '#34495e' }]}>
          <Text style={styles.boxText}>SOURCE</Text>
        </View>
        
        {plugTypes.map((plugType, index) => (
          <View key={plugType}>
            <View 
              ref={plugRefs[index]} 
              style={[styles.box, { 
                top: 40 + index * 40, 
                right: 20, 
                backgroundColor: colors[index],
                width: 70,
                height: 30,
              }]}
            >
              <Text style={[styles.boxText, { fontSize: 10 }]}>{plugType.toUpperCase()}</Text>
            </View>
            
            <LeaderLine
              start={{ element: startRef }}
              end={{ element: plugRefs[index] }}
              color={colors[index]}
              strokeWidth={2}
              endPlug={plugType}
              startSocket="right"
              endSocket="left"
            />
          </View>
        ))}
      </View>
    </View>
  );
};

// Labels Demo
const LabelsDemo = () => {
  const box1Ref = useRef(null);
  const box2Ref = useRef(null);

  return (
    <View style={styles.demo}>
      <Text style={styles.demoTitle}>Multiple Labels</Text>
      
      <View style={styles.demoArea}>
        <View ref={box1Ref} style={[styles.box, { top: 60, left: 30, backgroundColor: '#e74c3c' }]}>
          <Text style={styles.boxText}>START</Text>
        </View>
        
        <View ref={box2Ref} style={[styles.box, { top: 120, right: 30, backgroundColor: '#3498db' }]}>
          <Text style={styles.boxText}>END</Text>
        </View>

        <LeaderLine
          start={{ element: box1Ref }}
          end={{ element: box2Ref }}
          color="#e74c3c"
          strokeWidth={3}
          endPlug="arrow1"
          startLabel={{
            text: "START",
            fontSize: 12,
            color: "#fff",
            backgroundColor: "#e74c3c",
            borderRadius: 4,
            padding: 4
          }}
          middleLabel={{
            text: "MIDDLE",
            fontSize: 10,
            color: "#fff",
            backgroundColor: "#f39c12",
            borderRadius: 4,
            padding: 4
          }}
          endLabel={{
            text: "END",
            fontSize: 12,
            color: "#fff",
            backgroundColor: "#3498db",
            borderRadius: 4,
            padding: 4
          }}
        />
      </View>
    </View>
  );
};

// Interactive Demo
const InteractiveDemo = () => {
  const [connections, setConnections] = useState([]);
  const [selectedBox, setSelectedBox] = useState(null);
  const boxes = Array.from({ length: 4 }, () => useRef(null));
  const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12'];

  const handleBoxPress = (index) => {
    if (selectedBox === null) {
      setSelectedBox(index);
    } else if (selectedBox !== index) {
      const newConnection = {
        id: Date.now(),
        start: selectedBox,
        end: index,
        color: colors[selectedBox],
      };
      setConnections(prev => [...prev, newConnection]);
      setSelectedBox(null);
    } else {
      setSelectedBox(null);
    }
  };

  const clearConnections = () => {
    setConnections([]);
    setSelectedBox(null);
  };

  return (
    <View style={styles.demo}>
      <Text style={styles.demoTitle}>Interactive Connections</Text>
      
      <TouchableOpacity style={styles.clearButton} onPress={clearConnections}>
        <Text style={styles.clearButtonText}>Clear All</Text>
      </TouchableOpacity>
      
      <View style={styles.demoArea}>
        {boxes.map((ref, index) => (
          <TouchableOpacity
            key={index}
            ref={ref}
            style={[
              styles.box,
              {
                backgroundColor: colors[index],
                top: 50 + Math.floor(index / 2) * 100,
                left: 50 + (index % 2) * 150,
                borderWidth: selectedBox === index ? 3 : 0,
                borderColor: '#fff',
              }
            ]}
            onPress={() => handleBoxPress(index)}
          >
            <Text style={styles.boxText}>{index + 1}</Text>
          </TouchableOpacity>
        ))}
        
        {connections.map((connection) => (
          <LeaderLine
            key={connection.id}
            start={{ element: boxes[connection.start] }}
            end={{ element: boxes[connection.end] }}
            color={connection.color}
            strokeWidth={3}
            endPlug="arrow1"
          />
        ))}
      </View>
      
      <Text style={styles.instruction}>
        {selectedBox !== null 
          ? `Box ${selectedBox + 1} selected. Tap another box to connect.`
          : 'Tap a box to start connecting.'
        }
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#2c3e50',
  },
  tabs: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tab: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginHorizontal: 5,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: '#3498db',
  },
  tabText: {
    fontSize: 16,
    color: '#7f8c8d',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#3498db',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  demo: {
    flex: 1,
    padding: 20,
  },
  demoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2c3e50',
  },
  demoArea: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    position: 'relative',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  box: {
    position: 'absolute',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 60,
    minHeight: 40,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  centerBox: {
    top: 100,
    left: 120,
    backgroundColor: '#34495e',
  },
  boxText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },
  clearButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignSelf: 'center',
    marginBottom: 15,
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  instruction: {
    marginTop: 15,
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});