import React, { useEffect, useRef } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { LeaderLine } from '../src/components/LeaderLineClass';
import { useLeaderLineManager } from '../src/hooks/useLeaderLineManager';

export default function CompleteAPIExample() {
  const box1Ref = useRef(null);
  const box2Ref = useRef(null);
  const box3Ref = useRef(null);
  const box4Ref = useRef(null);

  const { createLeaderLine, renderLines, measureAllLines } = useLeaderLineManager();

  useEffect(() => {
    // Demostrar todas las funcionalidades migradas
    const setupAdvancedDemo = () => {
      // 1. Línea con setOptions y múltiples labels
      const line1 = createLeaderLine(box1Ref, box2Ref, {
        color: '#e74c3c',
        strokeWidth: 3,
        path: 'arc',
        startLabel: 'Start Point',
        middleLabel: {
          text: 'Data Flow',
          fontSize: 14,
          backgroundColor: '#fff3cd',
          borderRadius: 8,
          color: '#856404',
        },
        endLabel: 'End Point',
        gradient: {
          start: '#e74c3c',
          end: '#c0392b',
        },
      });

      // 2. Línea con plugs avanzados y outline
      const line2 = createLeaderLine(box2Ref, box3Ref, {
        color: '#3498db',
        strokeWidth: 4,
        startPlug: 'disc',
        endPlug: 'arrow1',
        startPlugColor: '#2980b9',
        endPlugColor: '#1abc9c',
        startPlugSize: 1.5,
        endPlugSize: 2,
        outline: {
          color: '#34495e',
          width: 2,
        },
        dash: {
          len: 10,
          gap: 5,
          animation: true,
        },
      });

      // 3. Línea con efectos avanzados
      const line3 = createLeaderLine(box3Ref, box4Ref, {
        color: '#9b59b6',
        strokeWidth: 3,
        path: 'fluid',
        glow: {
          color: '#8e44ad',
          width: 4,
          opacity: 0.6,
        },
        dropShadow: true,
        label: {
          text: 'Glowing Connection',
          color: '#ffffff',
          backgroundColor: '#8e44ad',
          borderRadius: 12,
          padding: 8,
        },
      });

      // 4. Demostrar setOptions después de crear
      setTimeout(() => {
        line1.setOptions({
          color: '#f39c12',
          strokeWidth: 5,
          middleLabel: {
            text: 'Updated!',
            fontSize: 16,
            backgroundColor: '#fff3e0',
            color: '#e65100',
          },
        });
      }, 2000);

      // 5. Demostrar animaciones avanzadas
      setTimeout(() => {
        line2.hide('draw', { duration: 500 });
        setTimeout(() => {
          line2.show('elastic', { duration: 800 });
        }, 600);
      }, 3000);

      // 6. Demostrar eventos
      line3.on('update', (data) => {
        console.log('Line 3 updated:', data);
      });

      line3.on('show', () => {
        console.log('Line 3 shown');
      });

      // 7. Cambios dinámicos con métodos individuales
      setTimeout(() => {
        line3
          .color('#e67e22')
          .size(6)
          .startPlug('square')
          .endPlug('hand')
          .startPlugColor('#d35400')
          .endPlugColor('#f39c12');
      }, 4000);
    };

    const timer = setTimeout(setupAdvancedDemo, 500);
    return () => clearTimeout(timer);
  }, [createLeaderLine]);

  const testAdvancedAnimations = () => {
    // Test all new animation effects
    measureAllLines();
  };

  const demonstrateInstanceManagement = () => {
    // Show instance management
    const allInstances = LeaderLine.getAllInstances();
    console.log(`Total instances: ${allInstances.length}`);
    
    allInstances.forEach((instance, index) => {
      setTimeout(() => {
        instance.animate({
          type: 'bounce',
          duration: 600,
        });
      }, index * 200);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Complete Leader-Line API</Text>
        <Text style={styles.subtitle}>
          Todas las funcionalidades de la librería original migradas
        </Text>

        <View style={styles.controls}>
          <TouchableOpacity style={styles.button} onPress={testAdvancedAnimations}>
            <Text style={styles.buttonText}>🎬 Advanced Animations</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={demonstrateInstanceManagement}>
            <Text style={styles.buttonText}>📊 Instance Management</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.demoArea}>
          {/* Render all lines */}
          {renderLines()}

          {/* Demo elements */}
          <View ref={box1Ref} style={[styles.box, styles.box1]}>
            <Text style={styles.boxText}>Multi-Label</Text>
            <Text style={styles.boxSubtext}>Start • Middle • End</Text>
          </View>

          <View ref={box2Ref} style={[styles.box, styles.box2]}>
            <Text style={styles.boxText}>Advanced Plugs</Text>
            <Text style={styles.boxSubtext}>Colors & Sizes</Text>
          </View>

          <View ref={box3Ref} style={[styles.box, styles.box3]}>
            <Text style={styles.boxText}>Visual Effects</Text>
            <Text style={styles.boxSubtext}>Glow & Shadow</Text>
          </View>

          <View ref={box4Ref} style={[styles.box, styles.box4]}>
            <Text style={styles.boxText}>Dynamic Updates</Text>
            <Text style={styles.boxSubtext}>setOptions()</Text>
          </View>
        </View>

        <View style={styles.info}>
          <Text style={styles.infoTitle}>🚀 Funcionalidades Migradas</Text>
          <Text style={styles.infoItem}>✅ setOptions() - Actualización eficiente</Text>
          <Text style={styles.infoItem}>✅ Múltiples labels (start, middle, end)</Text>
          <Text style={styles.infoItem}>✅ Plugs avanzados con colores y tamaños</Text>
          <Text style={styles.infoItem}>✅ Sistema de eventos completo</Text>
          <Text style={styles.infoItem}>✅ Animaciones avanzadas (bounce, elastic)</Text>
          <Text style={styles.infoItem}>✅ Gestión de instancias</Text>
          <Text style={styles.infoItem}>✅ Gradientes avanzados</Text>
          <Text style={styles.infoItem}>✅ Efectos visuales (glow, outline)</Text>
          <Text style={styles.infoItem}>✅ Attachments y anchors</Text>
          <Text style={styles.infoItem}>✅ API idéntica a la original</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#2c3e50',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#7f8c8d',
    fontStyle: 'italic',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 8,
  },
  button: {
    backgroundColor: '#3498db',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  demoArea: {
    height: 400,
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    position: 'relative',
  },
  box: {
    position: 'absolute',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    minWidth: 100,
    minHeight: 70,
  },
  box1: {
    top: 30,
    left: 20,
    borderColor: '#e74c3c',
    backgroundColor: '#fdf2f2',
  },
  box2: {
    top: 30,
    right: 20,
    borderColor: '#3498db',
    backgroundColor: '#ebf3fd',
  },
  box3: {
    bottom: 80,
    left: 20,
    borderColor: '#9b59b6',
    backgroundColor: '#f4f1f8',
  },
  box4: {
    bottom: 80,
    right: 20,
    borderColor: '#f39c12',
    backgroundColor: '#fef9e7',
  },
  boxText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
  },
  boxSubtext: {
    fontSize: 11,
    color: '#7f8c8d',
    textAlign: 'center',
    marginTop: 4,
  },
  info: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#2c3e50',
  },
  infoItem: {
    fontSize: 14,
    marginBottom: 6,
    color: '#27ae60',
    lineHeight: 20,
  },
});