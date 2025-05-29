import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { LeaderLine, useLeaderLine } from 'react-native-leader-line';

const { width: screenWidth } = Dimensions.get('window');

interface Connection {
  start: { x: number; y: number };
  end: { x: number; y: number };
  options: {
    color: string;
    strokeWidth: number;
    arrowSize: number;
    dashArray?: string;
    startMarker?: boolean;
    endMarker?: boolean;
  };
  id: string;
}

export const CompleteFunctionalExample: React.FC = () => {
  const { createElement, getConnectionPoints } = useLeaderLine();
  const [connections, setConnections] = useState<Connection[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Crear elementos referenciables
  const startBox = createElement('start');
  const centerBox = createElement('center');
  const endBox = createElement('end');
  const topBox = createElement('top');
  const bottomBox = createElement('bottom');

  const setupConnections = async () => {
    try {
      setIsLoading(true);
      
      // Esperar a que todos los elementos se midan
      await Promise.all([
        startBox.measure(),
        centerBox.measure(),
        endBox.measure(),
        topBox.measure(),
        bottomBox.measure(),
      ]);

      const newConnections: Connection[] = [];

      // Conexión 1: Start -> Center (flecha roja sólida)
      const conn1 = await getConnectionPoints('start', 'center', 'right', 'left');
      newConnections.push({
        ...conn1,
        options: {
          color: '#e74c3c',
          strokeWidth: 3,
          arrowSize: 12,
        },
        id: 'start-center',
      });

      // Conexión 2: Center -> End (flecha azul punteada)
      const conn2 = await getConnectionPoints('center', 'end', 'right', 'left');
      newConnections.push({
        ...conn2,
        options: {
          color: '#3498db',
          strokeWidth: 2,
          arrowSize: 10,
          dashArray: '8,4',
        },
        id: 'center-end',
      });

      // Conexión 3: Top -> Center (flecha verde con doble punta)
      const conn3 = await getConnectionPoints('top', 'center', 'bottom', 'top');
      newConnections.push({
        ...conn3,
        options: {
          color: '#2ecc71',
          strokeWidth: 4,
          arrowSize: 14,
          startMarker: true,
          endMarker: true,
        },
        id: 'top-center',
      });

      // Conexión 4: Center -> Bottom (flecha naranja gruesa)
      const conn4 = await getConnectionPoints('center', 'bottom', 'bottom', 'top');
      newConnections.push({
        ...conn4,
        options: {
          color: '#f39c12',
          strokeWidth: 5,
          arrowSize: 16,
        },
        id: 'center-bottom',
      });

      setConnections(newConnections);
      setIsLoading(false);
    } catch (error) {
      console.error('Error setting up connections:', error);
      setIsLoading(false);
    }
  };

  const clearConnections = () => {
    setConnections([]);
  };

  const regenerateConnections = () => {
    clearConnections();
    setTimeout(() => {
      setupConnections();
    }, 100);
  };

  useEffect(() => {
    // Dar tiempo para que el layout se complete
    const timer = setTimeout(() => {
      setupConnections();
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>React Native Leader Line</Text>
        <Text style={styles.subtitle}>Ejemplo Funcional Completo</Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity 
          style={[styles.button, styles.primaryButton]} 
          onPress={regenerateConnections}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? '⏳ Cargando...' : '🔄 Regenerar Flechas'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.secondaryButton]} 
          onPress={clearConnections}
        >
          <Text style={[styles.buttonText, styles.secondaryButtonText]}>
            🗑️ Limpiar
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.demoArea}>
        {/* Caja Superior */}
        <View ref={topBox.ref} style={[styles.box, styles.topBox]}>
          <Text style={styles.boxText}>TOP</Text>
          <Text style={styles.boxSubtext}>↓ Verde doble</Text>
        </View>

        {/* Caja Izquierda */}
        <View ref={startBox.ref} style={[styles.box, styles.startBox]}>
          <Text style={styles.boxText}>START</Text>
          <Text style={styles.boxSubtext}>→ Roja sólida</Text>
        </View>

        {/* Caja Central */}
        <View ref={centerBox.ref} style={[styles.box, styles.centerBox]}>
          <Text style={styles.boxText}>CENTER</Text>
          <Text style={styles.boxSubtext}>Hub</Text>
        </View>

        {/* Caja Derecha */}
        <View ref={endBox.ref} style={[styles.box, styles.endBox]}>
          <Text style={styles.boxText}>END</Text>
          <Text style={styles.boxSubtext}>← Azul punteada</Text>
        </View>

        {/* Caja Inferior */}
        <View ref={bottomBox.ref} style={[styles.box, styles.bottomBox]}>
          <Text style={styles.boxText}>BOTTOM</Text>
          <Text style={styles.boxSubtext}>↑ Naranja gruesa</Text>
        </View>

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

      <View style={styles.info}>
        <Text style={styles.infoTitle}>Estado:</Text>
        <Text style={styles.infoText}>
          {isLoading 
            ? '⏳ Midiendo elementos y creando conexiones...' 
            : `✅ ${connections.length} flechas creadas exitosamente`
          }
        </Text>
        
        <View style={styles.legend}>
          <Text style={styles.legendTitle}>Tipos de Flecha:</Text>
          <Text style={styles.legendItem}>🔴 Roja sólida (grosor 3)</Text>
          <Text style={styles.legendItem}>🔵 Azul punteada (grosor 2)</Text>
          <Text style={styles.legendItem}>🟢 Verde doble punta (grosor 4)</Text>
          <Text style={styles.legendItem}>🟠 Naranja gruesa (grosor 5)</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#343a40',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#adb5bd',
    fontStyle: 'italic',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#007bff',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#dc3545',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  secondaryButtonText: {
    color: '#dc3545',
  },
  demoArea: {
    height: 400,
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  box: {
    position: 'absolute',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 80,
    minHeight: 60,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  topBox: {
    top: 30,
    left: screenWidth / 2 - 60,
    borderColor: '#2ecc71',
    backgroundColor: '#d5f4e6',
  },
  startBox: {
    top: 120,
    left: 30,
    borderColor: '#e74c3c',
    backgroundColor: '#fdf2f2',
  },
  centerBox: {
    top: 170,
    left: screenWidth / 2 - 60,
    borderColor: '#6c757d',
    backgroundColor: '#f8f9fa',
    minWidth: 100,
    minHeight: 80,
  },
  endBox: {
    top: 120,
    right: 30,
    borderColor: '#3498db',
    backgroundColor: '#ebf3fd',
  },
  bottomBox: {
    bottom: 30,
    left: screenWidth / 2 - 60,
    borderColor: '#f39c12',
    backgroundColor: '#fef5e7',
  },
  boxText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: 2,
  },
  boxSubtext: {
    fontSize: 10,
    color: '#6c757d',
    textAlign: 'center',
  },
  info: {
    marginHorizontal: 20,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: '#495057',
    marginBottom: 12,
  },
  legend: {
    borderTopWidth: 1,
    borderTopColor: '#dee2e6',
    paddingTop: 12,
  },
  legendTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#343a40',
    marginBottom: 6,
  },
  legendItem: {
    fontSize: 12,
    color: '#6c757d',
    marginBottom: 2,
  },
});

export default CompleteFunctionalExample;