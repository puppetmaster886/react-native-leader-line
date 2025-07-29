/**
 * CompleteDemo - Demo interactivo completo de react-native-leader-line
 *
 * Este componente es un showcase completo de todas las funcionalidades:
 * - Galería interactiva de todos los tests
 * - Playground para experimentar con propiedades
 * - Ejemplos de casos de uso reales
 * - Documentación interactiva
 * - Comparación con la librería original leader-line
 *
 * Uso:
 * import { CompleteDemo } from 'react-native-leader-line/CompleteDemo'
 */

import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Import all test components
import AdvancedFeaturesTest from "./AdvancedFeaturesTest";
import BasicTestComponent from "./BasicTestComponent";
import ManagerPatternTest from "./ManagerPatternTest";
import PerformanceTest from "./PerformanceTest";

// Import version for debugging
import { LIBRARY_VERSION } from "./src/version";

interface DemoSection {
  id: string;
  title: string;
  description: string;
  component: React.ComponentType;
  difficulty: "Básico" | "Intermedio" | "Avanzado";
  features: string[];
}

export const CompleteDemo = (): React.ReactElement => {
  const [currentSection, setCurrentSection] = useState<string>("overview");

  const sections: DemoSection[] = [
    {
      id: "basic",
      title: "Pruebas Básicas",
      description:
        "Funcionalidad fundamental de la librería: líneas simples, paths, plugs y labels básicos.",
      component: BasicTestComponent,
      difficulty: "Básico",
      features: [
        "Líneas straight/arc/fluid",
        "Plugs básicos",
        "Labels simples",
        "Sockets básicos",
      ],
    },
    {
      id: "advanced",
      title: "Características Avanzadas",
      description:
        "Funcionalidades avanzadas: efectos visuales, animaciones, labels estilizados.",
      component: AdvancedFeaturesTest,
      difficulty: "Intermedio",
      features: [
        "Todos los path types",
        "Todos los plug types",
        "Efectos (outline, shadow, dash)",
        "Labels avanzados",
        "Socket positioning",
      ],
    },
    {
      id: "manager",
      title: "Patrón Manager",
      description:
        "Control programático con useLeaderLineManager: creación dinámica y batch operations.",
      component: ManagerPatternTest,
      difficulty: "Intermedio",
      features: [
        "Hook useLeaderLineManager",
        "Creación dinámica",
        "Batch updates",
        "Show/hide individual",
        "Performance metrics",
      ],
    },
    {
      id: "performance",
      title: "Pruebas de Performance",
      description:
        "Stress testing con múltiples líneas, medición de FPS y optimización de renders.",
      component: PerformanceTest,
      difficulty: "Avanzado",
      features: [
        "Stress test 50+ líneas",
        "FPS monitoring",
        "Batch operations",
        "Memory optimization",
        "Update performance",
      ],
    },
  ];

  const renderOverview = () => (
    <ScrollView style={styles.overviewContainer}>
      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>React Native Leader Line</Text>
        <Text style={styles.heroSubtitle}>
          Port completo de la librería leader-line para React Native
        </Text>
        nueva version 2.0.0
        <View style={styles.heroStats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>4</Text>
            <Text style={styles.statLabel}>Test Suites</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>15+</Text>
            <Text style={styles.statLabel}>Path Types</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>8+</Text>
            <Text style={styles.statLabel}>Plug Types</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>100%</Text>
            <Text style={styles.statLabel}>TypeScript</Text>
          </View>
        </View>
      </View>

      <View style={styles.featuresSection}>
        <Text style={styles.sectionTitle}>✨ Características Principales</Text>
        <View style={styles.featureGrid}>
          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>🎯</Text>
            <Text style={styles.featureTitle}>API Dual</Text>
            <Text style={styles.featureDescription}>
              Componente funcional + Hook manager para máxima flexibilidad
            </Text>
          </View>
          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>⚡</Text>
            <Text style={styles.featureTitle}>Performance</Text>
            <Text style={styles.featureDescription}>
              Optimizado para móviles con batch updates y throttling
            </Text>
          </View>
          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>🎨</Text>
            <Text style={styles.featureTitle}>Estilización</Text>
            <Text style={styles.featureDescription}>
              Efectos avanzados: outline, shadows, dash patterns, gradientes
            </Text>
          </View>
          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>🏷️</Text>
            <Text style={styles.featureTitle}>Labels</Text>
            <Text style={styles.featureDescription}>
              Múltiples labels con backgrounds y posicionamiento personalizado
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.usageSection}>
        <Text style={styles.sectionTitle}>🚀 Cómo usar este demo</Text>
        <View style={styles.stepsContainer}>
          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Navegación</Text>
              <Text style={styles.stepDescription}>
                Usa los botones de abajo para navegar entre diferentes test
                suites
              </Text>
            </View>
          </View>
          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Interacción</Text>
              <Text style={styles.stepDescription}>
                Cada test tiene controles interactivos para probar diferentes
                configuraciones
              </Text>
            </View>
          </View>
          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Observación</Text>
              <Text style={styles.stepDescription}>
                Observa cómo se comportan las líneas con diferentes propiedades
                y configuraciones
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.integrationSection}>
        <Text style={styles.sectionTitle}>🔗 Integración en tu App</Text>
        <View style={styles.codeBlock}>
          <Text style={styles.codeTitle}>1. Instalación:</Text>
          <Text style={styles.codeText}>
            npm install react-native-leader-line react-native-svg
          </Text>
        </View>
        <View style={styles.codeBlock}>
          <Text style={styles.codeTitle}>2. Uso básico:</Text>
          <Text style={styles.codeText}>
            {`import { LeaderLine } from 'react-native-leader-line';

<LeaderLine
  start={{ element: startRef }}
  end={{ element: endRef }}
  color="#3498db"
  strokeWidth={3}
  endPlug="arrow1"
/>`}
          </Text>
        </View>
        <View style={styles.codeBlock}>
          <Text style={styles.codeTitle}>3. Uso avanzado (Manager):</Text>
          <Text style={styles.codeText}>
            {`import { useLeaderLineManager } from 'react-native-leader-line';

const manager = useLeaderLineManager();

manager.createLine('my-line', {
  start: { element: startRef },
  end: { element: endRef },
  color: "red"
});`}
          </Text>
        </View>
      </View>
    </ScrollView>
  );

  const renderCurrentSection = () => {
    if (currentSection === "overview") {
      return renderOverview();
    }

    const section = sections.find((s) => s.id === currentSection);
    if (!section) return renderOverview();

    const Component = section.component;
    return <Component />;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Básico":
        return "#27ae60";
      case "Intermedio":
        return "#f39c12";
      case "Avanzado":
        return "#e74c3c";
      default:
        return "#6c757d";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Navigation */}
      <View style={styles.navigation}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[
              styles.navButton,
              currentSection === "overview" && styles.activeNavButton,
            ]}
            onPress={() => setCurrentSection("overview")}
          >
            <Text
              style={[
                styles.navButtonText,
                currentSection === "overview" && styles.activeNavButtonText,
              ]}
            >
              📋 Overview
            </Text>
          </TouchableOpacity>

          {sections.map((section) => (
            <TouchableOpacity
              key={section.id}
              style={[
                styles.navButton,
                currentSection === section.id && styles.activeNavButton,
              ]}
              onPress={() => setCurrentSection(section.id)}
            >
              <Text
                style={[
                  styles.navButtonText,
                  currentSection === section.id && styles.activeNavButtonText,
                ]}
              >
                {section.title}
              </Text>
              <View
                style={[
                  styles.difficultyBadge,
                  { backgroundColor: getDifficultyColor(section.difficulty) },
                ]}
              >
                <Text style={styles.difficultyText}>{section.difficulty}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Current Section Info */}
      {currentSection !== "overview" && (
        <View style={styles.sectionInfo}>
          {(() => {
            const section = sections.find((s) => s.id === currentSection);
            if (!section) return null;

            return (
              <>
                <Text style={styles.sectionInfoTitle}>{section.title}</Text>
                <Text style={styles.sectionInfoDescription}>
                  {section.description}
                </Text>
                <View style={styles.featuresRow}>
                  {section.features.map((feature, index) => (
                    <View key={index} style={styles.featureBadge}>
                      <Text style={styles.featureBadgeText}>{feature}</Text>
                    </View>
                  ))}
                </View>
              </>
            );
          })()}
        </View>
      )}

      {/* Content */}
      <View style={styles.content}>{renderCurrentSection()}</View>

      {/* Floating Version Indicator */}
      <View style={styles.versionIndicator}>
        <Text style={styles.versionText}>Debug v{LIBRARY_VERSION}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  navigation: {
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
    paddingVertical: 10,
  },
  navButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 8,
    backgroundColor: "#f8f9fa",
    minWidth: 120,
    alignItems: "center",
  },
  activeNavButton: {
    backgroundColor: "#3498db",
  },
  navButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#495057",
    textAlign: "center",
    marginBottom: 4,
  },
  activeNavButtonText: {
    color: "#fff",
  },
  difficultyBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 60,
    alignItems: "center",
  },
  difficultyText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#fff",
  },
  sectionInfo: {
    backgroundColor: "#fff",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  sectionInfoTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 4,
  },
  sectionInfoDescription: {
    fontSize: 14,
    color: "#6c757d",
    marginBottom: 8,
  },
  featuresRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  featureBadge: {
    backgroundColor: "#e9ecef",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 4,
  },
  featureBadgeText: {
    fontSize: 12,
    color: "#495057",
    fontWeight: "500",
  },
  content: {
    flex: 1,
  },
  overviewContainer: {
    flex: 1,
  },
  heroSection: {
    backgroundColor: "#fff",
    padding: 30,
    alignItems: "center",
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 8,
    textAlign: "center",
  },
  heroSubtitle: {
    fontSize: 16,
    color: "#6c757d",
    textAlign: "center",
    marginBottom: 24,
  },
  heroStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3498db",
  },
  statLabel: {
    fontSize: 12,
    color: "#6c757d",
    marginTop: 4,
  },
  featuresSection: {
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 16,
  },
  featureGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  featureCard: {
    width: "48%",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: "center",
  },
  featureIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 4,
    textAlign: "center",
  },
  featureDescription: {
    fontSize: 12,
    color: "#6c757d",
    textAlign: "center",
    lineHeight: 16,
  },
  usageSection: {
    padding: 20,
    backgroundColor: "#fff",
  },
  stepsContainer: {
    marginTop: 8,
  },
  step: {
    flexDirection: "row",
    marginBottom: 16,
    alignItems: "flex-start",
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#3498db",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  stepNumberText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    color: "#6c757d",
    lineHeight: 20,
  },
  integrationSection: {
    padding: 20,
    backgroundColor: "#f8f9fa",
    marginBottom: 20,
  },
  codeBlock: {
    backgroundColor: "#2c3e50",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  codeTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#3498db",
    marginBottom: 8,
  },
  codeText: {
    fontSize: 12,
    color: "#ecf0f1",
    fontFamily: "Courier",
    lineHeight: 16,
  },
  versionIndicator: {
    position: "absolute",
    top: 50,
    right: 16,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    zIndex: 1000,
  },
  versionText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
  },
});

// Export default para máxima compatibilidad
export default CompleteDemo;

// Export alternativo para casos de compatibilidad extrema
export const CompleteDemoComponent = CompleteDemo;
