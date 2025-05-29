import React, { useState } from 'react';
import {
    Alert,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { LeaderLine, useLeaderLine } from 'react-native-leader-line';

export const InteractiveScreen: React.FC = () => {
  const { createElement, getConnectionPoints } = useLeaderLine();
  const [selectedBoxes, setSelectedBoxes] = useState<string[]>([]);
  const [connections, setConnections] = useState<Array<{
    start: { x: number; y: number };
    end: { x: number; y: number };
    options: any;
    id: string;
  }>>([]);

  // Crear referencias para elementos interactivos
  const elements = ['A', 'B', 'C', 'D', 'E', 'F'].map(id => ({
    id,
    ref: createElement(id)
  }));

  const handleBoxPress = async (boxId: string) => {
    if (selectedBoxes.length === 0) {
      // Primera selección
      setSelectedBoxes([boxId]);
    } else if (selectedBoxes.length === 1) {
      // Segunda selección - crear conexión
      const startId = selectedBoxes[0];
      const endId = boxId;
      
      if (startId === endId) {
        Alert.alert('Error', 'Cannot connect a box to itself!');
        setSelectedBoxes([]);
        return;
      }

      try {
        await createElement(startId).measure();
        await createElement(endId).measure();
        
        const points = await getConnectionPoints(startId, endId, 'center', 'center');
        
        const newConnection = {
          ...points,
          options: {
            color: getRandomColor(),
            strokeWidth: Math.random() * 3 + 1,
            arrowSize: Math.random() * 6 + 6,
            dashArray: Math.random() > 0.5 ? '' : '5,5',
          },
          id: `${startId}-${endId}-${Date.now()}`,
        };
        
        setConnections(prev => [...prev, newConnection]);
        setSelectedBoxes([]);
        
      } catch (error) {
        Alert.alert('Error', 'Failed to create connection');
        setSelectedBoxes([]);
      }
    }
  };

  const clearConnections = () => {
    setConnections([]);
    setSelectedBoxes([]);
  };

  const getRandomColor = () => {
    const colors = ['#ff6b6b', '#4dabf7', '#51cf66', '#ff922b', '#9775fa', '#ffd43b'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const isBoxSelected = (boxId: string) => selectedBoxes.includes(boxId);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Interactive Connection Demo</Text>
      
      <Text style={styles.instructions}>
        Tap two boxes to create a connection between them!
      </Text>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.clearButton} onPress={clearConnections}>
          <Text style={styles.buttonText}>🗑️ Clear All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.demoArea}>
        {/* Grid de cajas interactivas */}
        {elements.map((element, index) => {
          const row = Math.floor(index / 3);
          const col = index % 3;
          const isSelected = isBoxSelected(element.id);
          
          return (
            <TouchableOpacity
              key={element.id}
              ref={element.ref.ref}
              style={[
                styles.interactiveBox,
                {
                  top: 50 + row * 120,
                  left: 50 + col * 100,
                },
                isSelected && styles.selectedBox,
              ]}
              onPress={() => handleBoxPress(element.id)}
            >
              <Text style={[styles.boxLabel, isSelected && styles.selectedText]}>
                {element.id}
              </Text>
              {isSelected && (
                <Text style={styles.selectedIndicator}>Selected!</Text>
              )}
            </TouchableOpacity>
          );
        })}

        {/* Renderizar todas las conexiones */}
        {connections.map((connection) => (
          <LeaderLine
            key={connection.id}
            start={connection.start}
            end={connection.end}
            options={connection.options}
          />
        ))}
      </View>

      <View style={styles.stats}>
        <Text style={styles.statsText}>
          Connections created: {connections.length}
        </Text>
        {selectedBoxes.length > 0 && (
          <Text style={styles.statsText}>
            Selected: {selectedBoxes[0]} → Tap another box to connect
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#343a40',
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#6c757d',
    fontStyle: 'italic',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  clearButton: {
    backgroundColor: '#dc3545',
    padding: 12,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  demoArea: {
    height: 300,
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  interactiveBox: {
    position: 'absolute',
    width: 80,
    height: 80,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#dee2e6',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  selectedBox: {
    borderColor: '#007bff',
    backgroundColor: '#e7f3ff',
  },
  boxLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#343a40',
  },
  selectedText: {
    color: '#007bff',
  },
  selectedIndicator: {
    fontSize: 10,
    color: '#007bff',
    marginTop: 4,
    fontWeight: '600',
  },
  stats: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statsText: {
    fontSize: 14,
    color: '#495057',
    textAlign: 'center',
    marginBottom: 4,
  },
});