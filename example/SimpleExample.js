import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { LeaderLine, useLeaderLine } from 'react-native-leader-line';

export default function SimpleExample() {
  const { createElement, getConnectionPoints } = useLeaderLine();
  const [connection, setConnection] = useState(null);

  // Crear referencias para dos cajas
  const boxA = createElement('boxA');
  const boxB = createElement('boxB');

  const createConnection = async () => {
    try {
      // Medir las cajas
      await boxA.measure();
      await boxB.measure();
      
      // Obtener puntos de conexión
      const points = await getConnectionPoints('boxA', 'boxB', 'right', 'left');
      
      // Configurar la flecha
      setConnection({
        start: points.start,
        end: points.end,
        options: {
          color: '#ff6b6b',
          strokeWidth: 3,
          arrowSize: 10,
        },
      });
    } catch (error) {
      console.error('Error creating connection:', error);
    }
  };

  useEffect(() => {
    // Crear conexión después de que el layout esté listo
    const timer = setTimeout(createConnection, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Prueba Simple de Leader Line</Text>
      
      <TouchableOpacity style={styles.refreshButton} onPress={createConnection}>
        <Text style={styles.refreshText}>🔄 Recrear Flecha</Text>
      </TouchableOpacity>

      <View style={styles.demoArea}>
        {/* Caja A */}
        <View ref={boxA.ref} style={[styles.box, styles.boxA]}>
          <Text style={styles.boxText}>Caja A</Text>
        </View>

        {/* Caja B */}
        <View ref={boxB.ref} style={[styles.box, styles.boxB]}>
          <Text style={styles.boxText}>Caja B</Text>
        </View>

        {/* Flecha conectando A y B */}
        {connection && (
          <LeaderLine
            start={connection.start}
            end={connection.end}
            options={connection.options}
          />
        )}
      </View>

      <View style={styles.info}>
        <Text style={styles.infoText}>
          {connection ? '✅ Flecha creada exitosamente!' : '⏳ Creando flecha...'}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  refreshButton: {
    backgroundColor: '#007bff',
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
    height: 300,
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  box: {
    position: 'absolute',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  boxA: {
    width: 100,
    height: 80,
    top: 50,
    left: 30,
    borderColor: '#ff6b6b',
    backgroundColor: '#ffe0e0',
  },
  boxB: {
    width: 100,
    height: 80,
    top: 150,
    right: 30,
    borderColor: '#4dabf7',
    backgroundColor: '#e0f0ff',
  },
  boxText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  info: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  infoText: {
    fontSize: 16,
    color: '#666',
  },
});