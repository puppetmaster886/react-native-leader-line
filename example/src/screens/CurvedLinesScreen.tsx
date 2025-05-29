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

export const CurvedLinesScreen: React.FC = () => {
  const { createElement, getConnectionPoints } = useLeaderLine();
  const [connections, setConnections] = useState<Array<{
    start: { x: number; y: number };
    end: { x: number; y: number };
    options: any;
    id: string;
  }>>([]);

  // Crear referencias para elementos
  const elements = ['A', 'B', 'C', 'D', 'E'].map(id => ({
    id,
    ref: createElement(id)
  }));

  const setupCurvedConnections = async () => {
    try {
      // Esperar a que todos los elementos se midan
      await Promise.all(elements.map(el => el.ref.measure()));

      const newConnections = [];

      // 1. Línea curva suave (arc)
      const conn1 = await getConnectionPoints('A', 'B', 'right', 'left');
      newConnections.push({
        ...conn1,
        options: {
          path: 'arc',
          color: '#e74c3c',
          strokeWidth: 3,
          curvature: 0.3,
          arrowSize: 10,
        },
        id: 'arc-line',
      });

      // 2. Línea fluida con gradiente
      const conn2 = await getConnectionPoints('B', 'C', 'bottom', 'top');
      newConnections.push({
        ...conn2,
        options: {
          path: 'fluid',
          strokeWidth: 4,
          curvature: 0.4,
          gradient: {
            start: '#3498db',
            end: '#9b59b6',
          },
          arrowSize: 12,
        },
        id: 'fluid-gradient',
      });

      // 3. Conexión magnética con sombra
      const conn3 = await getConnectionPoints('C', 'D', 'left', 'right');
      newConnections.push({
        ...conn3,
        options: {
          path: 'magnet',
          color: '#2ecc71',
          strokeWidth: 5,
          dropShadow: true,
          startMarker: true,
          endMarker: true,
          arrowSize: 14,
        },
        id: 'magnet-shadow',
      });

      // 4. Línea curva con línea punteada
      const conn4 = await getConnectionPoints('D', 'E', 'bottom', 'left');
      newConnections.push({
        ...conn4,
        options: {
          path: 'arc',
          color: '#f39c12',
          strokeWidth: 3,
          curvature: 0.6,
          dashArray: '10,5',
          arrowSize: 10,
        },
        id: 'dashed-curve',
      });

      // 5. Línea recta para comparación
      const conn5 = await getConnectionPoints('A', 'E', 'bottom', 'top');
      newConnections.push({
        ...conn5,
        options: {
          path: 'straight',
          color: '#34495e',
          strokeWidth: 2,
          arrowSize: 8,
          opacity: 0.7,
        },
        id: 'straight-comparison',
      });

      setConnections(newConnections);
    } catch (error) {
      console.error('Error setting up curved connections:', error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setupCurvedConnections();
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const refreshConnections = () => {
    setConnections([]);
    setTimeout(() => {
      setupCurvedConnections();
    }, 100);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Curved Lines & Effects Demo</Text>
        <Text style={styles.subtitle}>Arcos, curvas fluidas y efectos avanzados</Text>
        
        <TouchableOpacity style={styles.refreshButton} onPress={refreshConnections}>
          <Text style={styles.refreshText}>🔄 Refresh Curved Lines</Text>
        </TouchableOpacity>

        <View style={styles.demoArea}>
          {/* Elementos conectables */}
          {elements.map((element, index) => {
            const positions = [
              { top: 50, left: 50 },      // A
              { top: 80, right: 50 },     // B  
              { top: 200, right: 80 },    // C
              { bottom: 100, right: 50 }, // D
              { bottom: 50, left: 80 },   // E
            ];

            return (
              <View
                key={element.id}
                ref={element.ref.ref}
                style={[styles.element, positions[index]]}
              >
                <Text style={styles.elementText}>{element.id}</Text>
              </View>
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

        <View style={styles.legend}>
          <Text style={styles.legendTitle}>Tipos de Línea Demostrados:</Text>
          <Text style={styles.legendItem}>🔴 Arc - Curva suave básica</Text>
          <Text style={styles.legendItem}>🌈 Fluid - Curva fluida con gradiente</Text>
          <Text style={styles.legendItem}>🟢 Magnet - Conexión magnética con sombra</Text>
          <Text style={styles.legendItem}>🟠 Arc Dashed - Curva punteada</Text>
          <Text style={styles.legendItem}>⚫ Straight - Línea recta (comparación)</Text>
        </View>

        <View style={styles.features}>
          <Text style={styles.featuresTitle}>Nuevas Características:</Text>
          <Text style={styles.featureItem}>✅ 4 tipos de path: straight, arc, fluid, magnet</Text>
          <Text style={styles.featureItem}>✅ Curvatura automática y manual</Text>
          <Text style={styles.featureItem}>✅ Gradientes lineales</Text>
          <Text style={styles.featureItem}>✅ Sombras (drop shadow)</Text>
          <Text style={styles.featureItem}>✅ Compatibilidad total hacia atrás</Text>
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
    marginBottom: 5,
    color: '#343a40',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#6c757d',
    fontStyle: 'italic',
  },
  refreshButton: {
    backgroundColor: '#6f42c1',
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
  element: {
    position: 'absolute',
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 30,
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
  elementText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#343a40',
  },
  legend: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 15,
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
  features: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#343a40',
  },
  featureItem: {
    fontSize: 13,
    marginBottom: 3,
    color: '#28a745',
    fontWeight: '500',
  },
});