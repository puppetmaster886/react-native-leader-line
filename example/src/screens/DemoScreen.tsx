import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { LeaderLine, useLeaderLine } from 'react-native-leader-line';

export const DemoScreen: React.FC = () => {
  const { createElement, getConnectionPoints } = useLeaderLine();
  const [connections, setConnections] = useState<Array<{
    start: { x: number; y: number };
    end: { x: number; y: number };
    options: any;
  }>>([]);

  // Crear referencias para los elementos
  const box1 = createElement('box1');
  const box2 = createElement('box2');
  const box3 = createElement('box3');
  const box4 = createElement('box4');
  const centerBox = createElement('center');

  const setupConnections = async () => {
    try {
      // Esperar a que todos los elementos se midan
      await Promise.all([
        box1.measure(),
        box2.measure(),
        box3.measure(),
        box4.measure(),
        centerBox.measure(),
      ]);

      // Crear diferentes tipos de conexiones
      const newConnections = [];

      // Conexión 1: Box1 a Center (flecha roja)
      const conn1 = await getConnectionPoints('box1', 'center', 'right', 'left');
      newConnections.push({
        ...conn1,
        options: {
          color: '#ff6b6b',
          strokeWidth: 3,
          arrowSize: 10,
        },
      });

      // Conexión 2: Box2 a Center (flecha azul con línea punteada)
      const conn2 = await getConnectionPoints('box2', 'center', 'bottom', 'top');
      newConnections.push({
        ...conn2,
        options: {
          color: '#4dabf7',
          strokeWidth: 2,
          arrowSize: 8,
          dashArray: '10,5',
        },
      });

      // Conexión 3: Box3 a Center (flecha verde con doble punta)
      const conn3 = await getConnectionPoints('box3', 'center', 'left', 'right');
      newConnections.push({
        ...conn3,
        options: {
          color: '#51cf66',
          strokeWidth: 4,
          arrowSize: 12,
          startMarker: true,
          endMarker: true,
        },
      });

      // Conexión 4: Box4 a Center (flecha naranja)
      const conn4 = await getConnectionPoints('box4', 'center', 'top', 'bottom');
      newConnections.push({
        ...conn4,
        options: {
          color: '#ff922b',
          strokeWidth: 2,
          arrowSize: 9,
          opacity: 0.8,
        },
      });

      setConnections(newConnections);
    } catch (error) {
      console.error('Error setting up connections:', error);
    }
  };

  useEffect(() => {
    // Usar un timeout para asegurar que el layout esté completo
    const timer = setTimeout(() => {
      setupConnections();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const refreshConnections = () => {
    setConnections([]);
    setTimeout(() => {
      setupConnections();
    }, 50);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>React Native Leader Line Demo</Text>
        
        <TouchableOpacity style={styles.refreshButton} onPress={refreshConnections}>
          <Text style={styles.refreshText}>🔄 Refresh Connections</Text>
        </TouchableOpacity>

        <View style={styles.demoArea}>
          {/* Elemento Central */}
          <View ref={centerBox.ref} style={[styles.box, styles.centerBox]}>
            <Text style={styles.boxText}>Center</Text>
          </View>

          {/* Cajas Conectoras */}
          <View ref={box1.ref} style={[styles.box, styles.box1]}>
            <Text style={styles.boxText}>Box 1</Text>
            <Text style={styles.socketText}>→ Red Arrow</Text>
          </View>

          <View ref={box2.ref} style={[styles.box, styles.box2]}>
            <Text style={styles.boxText}>Box 2</Text>
            <Text style={styles.socketText}>↓ Blue Dashed</Text>
          </View>

          <View ref={box3.ref} style={[styles.box, styles.box3]}>
            <Text style={styles.boxText}>Box 3</Text>
            <Text style={styles.socketText}>← Green Double</Text>
          </View>

          <View ref={box4.ref} style={[styles.box, styles.box4]}>
            <Text style={styles.boxText}>Box 4</Text>
            <Text style={styles.socketText}>↑ Orange</Text>
          </View>

          {/* Renderizar todas las conexiones */}
          {connections.map((connection, index) => (
            <LeaderLine
              key={index}
              start={connection.start}
              end={connection.end}
              options={connection.options}
            />
          ))}
        </View>

        <View style={styles.legend}>
          <Text style={styles.legendTitle}>Arrow Types Demonstrated:</Text>
          <Text style={styles.legendItem}>🔴 Solid red arrow (thick)</Text>
          <Text style={styles.legendItem}>🔵 Dashed blue arrow</Text>
          <Text style={styles.legendItem}>🟢 Double-headed green arrow</Text>
          <Text style={styles.legendItem}>🟠 Semi-transparent orange arrow</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#343a40',
  },
  refreshButton: {
    backgroundColor: '#6c757d',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  refreshText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  demoArea: {
    height: 400,
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  box: {
    position: 'absolute',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  centerBox: {
    width: 80,
    height: 80,
    top: 160,
    left: 160,
    borderColor: '#495057',
    backgroundColor: '#e9ecef',
  },
  box1: {
    width: 100,
    height: 60,
    top: 50,
    left: 20,
    borderColor: '#ff6b6b',
  },
  box2: {
    width: 100,
    height: 60,
    top: 20,
    left: 150,
    borderColor: '#4dabf7',
  },
  box3: {
    width: 100,
    height: 60,
    top: 50,
    right: 20,
    borderColor: '#51cf66',
  },
  box4: {
    width: 100,
    height: 60,
    bottom: 50,
    left: 150,
    borderColor: '#ff922b',
  },
  boxText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#343a40',
  },
  socketText: {
    fontSize: 10,
    color: '#6c757d',
    marginTop: 2,
  },
  legend: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  legendTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#343a40',
  },
  legendItem: {
    fontSize: 14,
    marginBottom: 4,
    color: '#495057',
  },
});