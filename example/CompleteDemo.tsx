import React, { useRef, useState } from 'react';
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { LeaderLine } from '../src';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface DemoSection {
  title: string;
  description: string;
  component: React.ComponentType;
}

interface Connection {
  id: number;
  start: number;
  end: number;
  color: string;
}

// ==================== BASIC ARROWS DEMO ====================
const BasicArrowsDemo = () => {
  const startRef = useRef(null);
  const endRef = useRef(null);
  const topRef = useRef(null);
  const bottomRef = useRef(null);

  return (
    <View style={styles.demoContainer}>
      <Text style={styles.sectionTitle}>Flechas Básicas</Text>
      <Text style={styles.sectionDesc}>Diferentes tipos de conectores básicos</Text>
      
      <View style={styles.canvasArea}>
        {/* Elementos a conectar */}
        <View ref={startRef} style={[styles.box, styles.leftBox, { backgroundColor: '#e74c3c' }]}>
          <Text style={styles.boxText}>INICIO</Text>
        </View>
        
        <View ref={endRef} style={[styles.box, styles.rightBox, { backgroundColor: '#3498db' }]}>
          <Text style={styles.boxText}>FIN</Text>
        </View>
        
        <View ref={topRef} style={[styles.box, styles.topBox, { backgroundColor: '#2ecc71' }]}>
          <Text style={styles.boxText}>ARRIBA</Text>
        </View>
        
        <View ref={bottomRef} style={[styles.box, styles.bottomBox, { backgroundColor: '#f39c12' }]}>
          <Text style={styles.boxText}>ABAJO</Text>
        </View>

        {/* Líneas conectoras */}
        <LeaderLine
          start={{ element: startRef }}
          end={{ element: endRef }}
          color="#e74c3c"
          strokeWidth={3}
          endPlug="arrow1"
          startSocket="right"
          endSocket="left"
        />
        
        <LeaderLine
          start={{ element: topRef }}
          end={{ element: bottomRef }}
          color="#2ecc71"
          strokeWidth={2}
          endPlug="arrow2"
          startSocket="bottom"
          endSocket="top"
          dash="5,3"
        />
      </View>
    </View>
  );
};

// ==================== PATH TYPES DEMO ====================
const PathTypesDemo = () => {
  const box1Ref = useRef(null);
  const box2Ref = useRef(null);
  const box3Ref = useRef(null);
  const box4Ref = useRef(null);
  const centerRef = useRef(null);

  return (
    <View style={styles.demoContainer}>
      <Text style={styles.sectionTitle}>Tipos de Trayectorias</Text>
      <Text style={styles.sectionDesc}>Straight, Arc, Fluid, Magnet, Grid</Text>
      
      <View style={styles.canvasArea}>
        <View ref={centerRef} style={[styles.box, styles.centerBox, { backgroundColor: '#6c757d' }]}>
          <Text style={styles.boxText}>CENTRO</Text>
        </View>
        
        <View ref={box1Ref} style={[styles.box, { top: 30, left: 30, backgroundColor: '#e74c3c' }]}>
          <Text style={styles.boxText}>STRAIGHT</Text>
        </View>
        
        <View ref={box2Ref} style={[styles.box, { top: 30, right: 30, backgroundColor: '#3498db' }]}>
          <Text style={styles.boxText}>ARC</Text>
        </View>
        
        <View ref={box3Ref} style={[styles.box, { bottom: 30, left: 30, backgroundColor: '#2ecc71' }]}>
          <Text style={styles.boxText}>FLUID</Text>
        </View>
        
        <View ref={box4Ref} style={[styles.box, { bottom: 30, right: 30, backgroundColor: '#f39c12' }]}>
          <Text style={styles.boxText}>MAGNET</Text>
        </View>

        {/* Diferentes tipos de trayectorias */}
        <LeaderLine
          start={{ element: centerRef }}
          end={{ element: box1Ref }}
          path="straight"
          color="#e74c3c"
          strokeWidth={2}
          endPlug="arrow1"
        />
        
        <LeaderLine
          start={{ element: centerRef }}
          end={{ element: box2Ref }}
          path="arc"
          curvature={0.3}
          color="#3498db"
          strokeWidth={2}
          endPlug="arrow2"
        />
        
        <LeaderLine
          start={{ element: centerRef }}
          end={{ element: box3Ref }}
          path="fluid"
          curvature={0.5}
          color="#2ecc71"
          strokeWidth={2}
          endPlug="arrow3"
        />
        
        <LeaderLine
          start={{ element: centerRef }}
          end={{ element: box4Ref }}
          path="magnet"
          color="#f39c12"
          strokeWidth={2}
          endPlug="diamond"
        />
      </View>
    </View>
  );
};

// ==================== PLUGS AND MARKERS DEMO ====================
const PlugsAndMarkersDemo = () => {
  const boxes = Array.from({ length: 8 }, () => useRef(null));

  const plugTypes = [
    { name: 'arrow1', color: '#e74c3c' },
    { name: 'arrow2', color: '#3498db' },
    { name: 'arrow3', color: '#2ecc71' },
    { name: 'disc', color: '#f39c12' },
    { name: 'square', color: '#9b59b6' },
    { name: 'diamond', color: '#1abc9c' },
    { name: 'hand', color: '#e67e22' },
    { name: 'crosshair', color: '#34495e' },
  ];

  return (
    <View style={styles.demoContainer}>
      <Text style={styles.sectionTitle}>Tipos de Marcadores</Text>
      <Text style={styles.sectionDesc}>Arrow1, Arrow2, Arrow3, Disc, Square, Diamond, Hand, Crosshair</Text>
      
      <ScrollView style={styles.canvasArea} showsVerticalScrollIndicator={false}>
        {plugTypes.map((plug, index) => (
          <View key={plug.name} style={styles.plugRow}>
            <View 
              ref={boxes[index]} 
              style={[styles.plugBox, { backgroundColor: plug.color }]}
            >
              <Text style={styles.plugText}>{plug.name.toUpperCase()}</Text>
            </View>
            
            <View style={[styles.plugBox, { backgroundColor: '#f8f9fa', marginLeft: 200 }]}>
              <Text style={styles.plugText}>TARGET</Text>
            </View>
            
            <LeaderLine
              start={{ element: boxes[index] }}
              end={{ point: { x: 280, y: 60 + index * 80 } }}
              color={plug.color}
              strokeWidth={3}
              endPlug={plug.name as any}
              startSocket="right"
              endSocket="left"
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

// ==================== STYLES AND EFFECTS DEMO ====================
const StylesAndEffectsDemo = () => {
  const sourceRef = useRef(null);
  const target1Ref = useRef(null);
  const target2Ref = useRef(null);
  const target3Ref = useRef(null);
  const target4Ref = useRef(null);

  return (
    <View style={styles.demoContainer}>
      <Text style={styles.sectionTitle}>Estilos y Efectos</Text>
      <Text style={styles.sectionDesc}>Outline, Drop Shadow, Dash, Opacity</Text>
      
      <View style={styles.canvasArea}>
        <View ref={sourceRef} style={[styles.box, styles.centerBox, { backgroundColor: '#6c757d' }]}>
          <Text style={styles.boxText}>FUENTE</Text>
        </View>
        
        <View ref={target1Ref} style={[styles.box, { top: 30, left: 30, backgroundColor: '#e74c3c' }]}>
          <Text style={styles.boxText}>OUTLINE</Text>
        </View>
        
        <View ref={target2Ref} style={[styles.box, { top: 30, right: 30, backgroundColor: '#3498db' }]}>
          <Text style={styles.boxText}>SHADOW</Text>
        </View>
        
        <View ref={target3Ref} style={[styles.box, { bottom: 30, left: 30, backgroundColor: '#2ecc71' }]}>
          <Text style={styles.boxText}>DASH</Text>
        </View>
        
        <View ref={target4Ref} style={[styles.box, { bottom: 30, right: 30, backgroundColor: '#f39c12' }]}>
          <Text style={styles.boxText}>OPACITY</Text>
        </View>

        {/* Línea con outline */}
        <LeaderLine
          start={{ element: sourceRef }}
          end={{ element: target1Ref }}
          color="#e74c3c"
          strokeWidth={3}
          endPlug="arrow1"
          outline={{ enabled: true, color: "#000", width: 2 }}
        />
        
        {/* Línea con sombra */}
        <LeaderLine
          start={{ element: sourceRef }}
          end={{ element: target2Ref }}
          color="#3498db"
          strokeWidth={3}
          endPlug="arrow2"
          dropShadow={{ dx: 3, dy: 3, blur: 3, color: "rgba(0,0,0,0.3)" }}
        />
        
        {/* Línea punteada */}
        <LeaderLine
          start={{ element: sourceRef }}
          end={{ element: target3Ref }}
          color="#2ecc71"
          strokeWidth={3}
          endPlug="arrow3"
          dash="10,5,2,5"
        />
        
        {/* Línea con opacidad */}
        <LeaderLine
          start={{ element: sourceRef }}
          end={{ element: target4Ref }}
          color="#f39c12"
          strokeWidth={3}
          endPlug="diamond"
          opacity={0.5}
        />
      </View>
    </View>
  );
};

// ==================== LABELS DEMO ====================
const LabelsDemo = () => {
  const box1Ref = useRef(null);
  const box2Ref = useRef(null);
  const box3Ref = useRef(null);

  return (
    <View style={styles.demoContainer}>
      <Text style={styles.sectionTitle}>Etiquetas y Labels</Text>
      <Text style={styles.sectionDesc}>Start, Middle, End, Caption, Path Labels</Text>
      
      <View style={styles.canvasArea}>
        <View ref={box1Ref} style={[styles.box, { top: 50, left: 30, backgroundColor: '#e74c3c' }]}>
          <Text style={styles.boxText}>INICIO</Text>
        </View>
        
        <View ref={box2Ref} style={[styles.box, { top: 150, right: 30, backgroundColor: '#3498db' }]}>
          <Text style={styles.boxText}>FIN</Text>
        </View>
        
        <View ref={box3Ref} style={[styles.box, { bottom: 50, left: SCREEN_WIDTH / 2 - 40, backgroundColor: '#2ecc71' }]}>
          <Text style={styles.boxText}>EXTRA</Text>
        </View>

        {/* Línea con múltiples labels */}
        <LeaderLine
          start={{ element: box1Ref }}
          end={{ element: box2Ref }}
          color="#e74c3c"
          strokeWidth={3}
          endPlug="arrow1"
          startLabel={{
            text: "INICIO",
            fontSize: 12,
            color: "#fff",
            backgroundColor: "#e74c3c",
            borderRadius: 4,
            padding: 4
          }}
          middleLabel={{
            text: "MEDIO",
            fontSize: 10,
            color: "#fff",
            backgroundColor: "#f39c12",
            borderRadius: 4,
            padding: 4
          }}
          endLabel={{
            text: "FIN",
            fontSize: 12,
            color: "#fff",
            backgroundColor: "#3498db",
            borderRadius: 4,
            padding: 4
          }}
        />
        
        {/* Línea con caption */}
        <LeaderLine
          start={{ element: box2Ref }}
          end={{ element: box3Ref }}
          color="#2ecc71"
          strokeWidth={2}
          endPlug="arrow2"
          captionLabel={{
            text: "Conexión Secundaria",
            fontSize: 14,
            color: "#2ecc71",
            backgroundColor: "#d5f4e6",
            borderRadius: 6,
            padding: 6
          }}
        />
      </View>
    </View>
  );
};

// ==================== INTERACTIVE DEMO ====================
const InteractiveDemo = () => {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedBox, setSelectedBox] = useState<number | null>(null);
  const boxes = Array.from({ length: 6 }, () => useRef(null));

  const boxColors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c'];

  const handleBoxPress = (index: number) => {
    if (selectedBox === null) {
      setSelectedBox(index);
    } else if (selectedBox !== index) {
      // Crear nueva conexión
      const newConnection: Connection = {
        id: Date.now(),
        start: selectedBox,
        end: index,
        color: boxColors[selectedBox],
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
    <View style={styles.demoContainer}>
      <Text style={styles.sectionTitle}>Demo Interactivo</Text>
      <Text style={styles.sectionDesc}>Toca las cajas para crear conexiones</Text>
      
      <TouchableOpacity style={styles.clearButton} onPress={clearConnections}>
        <Text style={styles.clearButtonText}>Limpiar Conexiones</Text>
      </TouchableOpacity>
      
      <View style={styles.canvasArea}>
        {boxes.map((ref, index) => (
          <TouchableOpacity
            key={index}
            ref={ref}
            style={[
              styles.interactiveBox,
              {
                backgroundColor: boxColors[index],
                top: 50 + (index % 3) * 100,
                left: 50 + Math.floor(index / 3) * 120,
                borderWidth: selectedBox === index ? 4 : 2,
                borderColor: selectedBox === index ? '#fff' : 'transparent',
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
            startSocket="center"
            endSocket="center"
          />
        ))}
      </View>
      
      <Text style={styles.instructionText}>
        {selectedBox !== null 
          ? `Caja ${selectedBox + 1} seleccionada. Toca otra caja para conectar.`
          : 'Toca una caja para empezar una conexión.'
        }
      </Text>
    </View>
  );
};

// ==================== MAIN DEMO COMPONENT ====================
const CompleteDemo = () => {
  const [activeSection, setActiveSection] = useState(0);

  const demoSections: DemoSection[] = [
    {
      title: 'Flechas Básicas',
      description: 'Conectores simples entre elementos',
      component: BasicArrowsDemo,
    },
    {
      title: 'Trayectorias',
      description: 'Diferentes tipos de paths',
      component: PathTypesDemo,
    },
    {
      title: 'Marcadores',
      description: 'Tipos de plugs y markers',
      component: PlugsAndMarkersDemo,
    },
    {
      title: 'Estilos',
      description: 'Efectos visuales y estilos',
      component: StylesAndEffectsDemo,
    },
    {
      title: 'Etiquetas',
      description: 'Labels y texto en las líneas',
      component: LabelsDemo,
    },
    {
      title: 'Interactivo',
      description: 'Demo interactivo',
      component: InteractiveDemo,
    },
  ];

  const CurrentDemo = demoSections[activeSection].component;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>React Native Leader Line</Text>
        <Text style={styles.headerSubtitle}>Demo Completo - Todas las Funcionalidades</Text>
      </View>

      {/* Tab Navigation */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.tabContainer}
        contentContainerStyle={styles.tabContent}
      >
        {demoSections.map((section, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.tab,
              activeSection === index && styles.activeTab
            ]}
            onPress={() => setActiveSection(index)}
          >
            <Text style={[
              styles.tabText,
              activeSection === index && styles.activeTabText
            ]}>
              {section.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Content */}
      <View style={styles.content}>
        <CurrentDemo />
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {demoSections[activeSection].description}
        </Text>
      </View>
    </SafeAreaView>
  );
};

// ==================== STYLES ====================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#343a40',
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#adb5bd',
  },
  tabContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6',
  },
  tabContent: {
    paddingHorizontal: 10,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: 'transparent',
  },
  activeTab: {
    backgroundColor: '#007bff',
  },
  tabText: {
    fontSize: 14,
    color: '#6c757d',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  footer: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#dee2e6',
  },
  footerText: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  demoContainer: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: 8,
  },
  sectionDesc: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 20,
  },
  canvasArea: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    position: 'relative',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
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
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  leftBox: {
    top: 100,
    left: 30,
  },
  rightBox: {
    top: 100,
    right: 30,
  },
  topBox: {
    top: 30,
    left: SCREEN_WIDTH / 2 - 80,
  },
  bottomBox: {
    bottom: 30,
    left: SCREEN_WIDTH / 2 - 80,
  },
  centerBox: {
    top: 120,
    left: SCREEN_WIDTH / 2 - 80,
  },
  boxText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  plugRow: {
    height: 80,
    marginBottom: 10,
    position: 'relative',
  },
  plugBox: {
    position: 'absolute',
    top: 10,
    left: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 80,
    minHeight: 40,
  },
  plugText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff',
  },
  clearButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignSelf: 'center',
    marginBottom: 10,
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  interactiveBox: {
    position: 'absolute',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  instructionText: {
    marginTop: 20,
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default CompleteDemo;