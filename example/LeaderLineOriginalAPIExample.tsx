import React, { useEffect, useRef, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useLeaderLineManager } from 'react-native-leader-line';

// Ejemplo usando la nueva API similar a LeaderLine original
export const LeaderLineOriginalAPIExample: React.FC = () => {
  const { createLeaderLine, renderLines, measureAllLines } = useLeaderLineManager();
  const [lines, setLines] = useState<any[]>([]);

  // Referencias a elementos
  const box1Ref = useRef<View>(null);
  const box2Ref = useRef<View>(null);
  const box3Ref = useRef<View>(null);
  const centerRef = useRef<View>(null);

  useEffect(() => {
    const setupLines = () => {
      // Crear líneas usando la API similar a la original
      const line1 = createLeaderLine(box1Ref, centerRef, {
        color: '#e74c3c',
        strokeWidth: 3,
        startSocket: 'right',
        endSocket: 'left',
      });

      const line2 = createLeaderLine(box2Ref, centerRef, {
        color: '#3498db',
        strokeWidth: 2,
        dashArray: '8,4',
        startSocket: 'bottom',
        endSocket: 'top',
      });

      const line3 = createLeaderLine(box3Ref, centerRef, {
        color: '#2ecc71',
        strokeWidth: 4,
        startMarker: true,
        endMarker: true,
        startSocket: 'left',
        endSocket: 'right',
      });

      setLines([line1, line2, line3]);
    };

    // Esperar a que el layout esté completo
    const timer = setTimeout(setupLines, 300);
    return () => clearTimeout(timer);
  }, [createLeaderLine]);

  const changeLine1Color = () => {
    if (lines[0]) {
      // Cambiar propiedades dinámicamente como en la API original
      lines[0].color = lines[0].color === '#e74c3c' ? '#9b59b6' : '#e74c3c';
    }
  };

  const changeLine2Style = () => {
    if (lines[1]) {
      // Cambiar grosor dinámicamente
      lines[1].size = lines[1].size === 2 ? 6 : 2;
    }
  };

  const toggleLine3Visibility = () => {
    if (lines[2]) {
      // Mostrar/ocultar línea como en la API original
      if (lines[2].isVisible) {
        lines[2].hide();
      } else {
        lines[2].show();
      }
    }
  };

  const remeasureAll = () => {
    measureAllLines();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>LeaderLine Original API Style</Text>
      <Text style={styles.subtitle}>
        API similar a la librería web original
      </Text>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.button} onPress={changeLine1Color}>
          <Text style={styles.buttonText}>🔴 Change Line 1 Color</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={changeLine2Style}>
          <Text style={styles.buttonText}>🔵 Change Line 2 Size</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={toggleLine3Visibility}>
          <Text style={styles.buttonText}>🟢 Toggle Line 3</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={remeasureAll}>
          <Text style={styles.buttonText}>🔄 Remeasure</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.demoArea}>
        {/* Elementos conectables */}
        <View ref={box1Ref} style={[styles.box, styles.box1]}>
          <Text style={styles.boxText}>Box 1</Text>
          <Text style={styles.boxSubtext}>Dynamic color</Text>
        </View>

        <View ref={box2Ref} style={[styles.box, styles.box2]}>
          <Text style={styles.boxText}>Box 2</Text>
          <Text style={styles.boxSubtext}>Dynamic size</Text>
        </View>

        <View ref={box3Ref} style={[styles.box, styles.box3]}>
          <Text style={styles.boxText}>Box 3</Text>
          <Text style={styles.boxSubtext}>Show/Hide</Text>
        </View>

        <View ref={centerRef} style={[styles.box, styles.centerBox]}>
          <Text style={styles.boxText}>Center</Text>
          <Text style={styles.boxSubtext}>Hub</Text>
        </View>

        {/* Renderizar todas las líneas */}
        {renderLines()}
      </View>

      <View style={styles.info}>
        <Text style={styles.infoTitle}>Características de la API Original:</Text>
        <Text style={styles.infoItem}>✅ line.color = 'red' (cambio dinámico)</Text>
        <Text style={styles.infoItem}>✅ line.size = 4 (cambio de grosor)</Text>
        <Text style={styles.infoItem}>✅ line.show() / line.hide()</Text>
        <Text style={styles.infoItem}>✅ Medición automática</Text>
        <Text style={styles.infoItem}>✅ API familiar para usuarios web</Text>
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
    marginBottom: 5,
    color: '#343a40',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    color: '#6c757d',
    fontStyle: 'italic',
  },
  controls: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 8,
  },
  button: {
    backgroundColor: '#007bff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
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
  box1: {
    width: 80,
    height: 60,
    top: 30,
    left: 20,
    borderColor: '#e74c3c',
    backgroundColor: '#fdf2f2',
  },
  box2: {
    width: 80,
    height: 60,
    top: 20,
    left: 120,
    borderColor: '#3498db',
    backgroundColor: '#ebf3fd',
  },
  box3: {
    width: 80,
    height: 60,
    top: 30,
    right: 20,
    borderColor: '#2ecc71',
    backgroundColor: '#d5f4e6',
  },
  centerBox: {
    width: 90,
    height: 70,
    top: 150,
    left: 115,
    borderColor: '#6c757d',
    backgroundColor: '#f8f9fa',
  },
  boxText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#343a40',
  },
  boxSubtext: {
    fontSize: 10,
    color: '#6c757d',
    textAlign: 'center',
    marginTop: 2,
  },
  info: {
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
    marginBottom: 8,
    color: '#343a40',
  },
  infoItem: {
    fontSize: 13,
    marginBottom: 3,
    color: '#495057',
  },
});

export default LeaderLineOriginalAPIExample;