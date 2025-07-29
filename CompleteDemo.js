import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
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
import { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, } from 'react-native';
// Import all test components
import BasicTestComponent from './BasicTestComponent';
import AdvancedFeaturesTest from './AdvancedFeaturesTest';
import ManagerPatternTest from './ManagerPatternTest';
import PerformanceTest from './PerformanceTest';
export const CompleteDemo = () => {
    const [currentSection, setCurrentSection] = useState('overview');
    const sections = [
        {
            id: 'basic',
            title: 'Pruebas Básicas',
            description: 'Funcionalidad fundamental de la librería: líneas simples, paths, plugs y labels básicos.',
            component: BasicTestComponent,
            difficulty: 'Básico',
            features: ['Líneas straight/arc/fluid', 'Plugs básicos', 'Labels simples', 'Sockets básicos'],
        },
        {
            id: 'advanced',
            title: 'Características Avanzadas',
            description: 'Funcionalidades avanzadas: efectos visuales, animaciones, labels estilizados.',
            component: AdvancedFeaturesTest,
            difficulty: 'Intermedio',
            features: ['Todos los path types', 'Todos los plug types', 'Efectos (outline, shadow, dash)', 'Labels avanzados', 'Socket positioning'],
        },
        {
            id: 'manager',
            title: 'Patrón Manager',
            description: 'Control programático con useLeaderLineManager: creación dinámica y batch operations.',
            component: ManagerPatternTest,
            difficulty: 'Intermedio',
            features: ['Hook useLeaderLineManager', 'Creación dinámica', 'Batch updates', 'Show/hide individual', 'Performance metrics'],
        },
        {
            id: 'performance',
            title: 'Pruebas de Performance',
            description: 'Stress testing con múltiples líneas, medición de FPS y optimización de renders.',
            component: PerformanceTest,
            difficulty: 'Avanzado',
            features: ['Stress test 50+ líneas', 'FPS monitoring', 'Batch operations', 'Memory optimization', 'Update performance'],
        },
    ];
    const renderOverview = () => (_jsxs(ScrollView, { style: styles.overviewContainer, children: [_jsxs(View, { style: styles.heroSection, children: [_jsx(Text, { style: styles.heroTitle, children: "React Native Leader Line" }), _jsx(Text, { style: styles.heroSubtitle, children: "Port completo de la librer\u00EDa leader-line para React Native" }), _jsxs(View, { style: styles.heroStats, children: [_jsxs(View, { style: styles.statItem, children: [_jsx(Text, { style: styles.statNumber, children: "4" }), _jsx(Text, { style: styles.statLabel, children: "Test Suites" })] }), _jsxs(View, { style: styles.statItem, children: [_jsx(Text, { style: styles.statNumber, children: "15+" }), _jsx(Text, { style: styles.statLabel, children: "Path Types" })] }), _jsxs(View, { style: styles.statItem, children: [_jsx(Text, { style: styles.statNumber, children: "8+" }), _jsx(Text, { style: styles.statLabel, children: "Plug Types" })] }), _jsxs(View, { style: styles.statItem, children: [_jsx(Text, { style: styles.statNumber, children: "100%" }), _jsx(Text, { style: styles.statLabel, children: "TypeScript" })] })] })] }), _jsxs(View, { style: styles.featuresSection, children: [_jsx(Text, { style: styles.sectionTitle, children: "\u2728 Caracter\u00EDsticas Principales" }), _jsxs(View, { style: styles.featureGrid, children: [_jsxs(View, { style: styles.featureCard, children: [_jsx(Text, { style: styles.featureIcon, children: "\uD83C\uDFAF" }), _jsx(Text, { style: styles.featureTitle, children: "API Dual" }), _jsx(Text, { style: styles.featureDescription, children: "Componente funcional + Hook manager para m\u00E1xima flexibilidad" })] }), _jsxs(View, { style: styles.featureCard, children: [_jsx(Text, { style: styles.featureIcon, children: "\u26A1" }), _jsx(Text, { style: styles.featureTitle, children: "Performance" }), _jsx(Text, { style: styles.featureDescription, children: "Optimizado para m\u00F3viles con batch updates y throttling" })] }), _jsxs(View, { style: styles.featureCard, children: [_jsx(Text, { style: styles.featureIcon, children: "\uD83C\uDFA8" }), _jsx(Text, { style: styles.featureTitle, children: "Estilizaci\u00F3n" }), _jsx(Text, { style: styles.featureDescription, children: "Efectos avanzados: outline, shadows, dash patterns, gradientes" })] }), _jsxs(View, { style: styles.featureCard, children: [_jsx(Text, { style: styles.featureIcon, children: "\uD83C\uDFF7\uFE0F" }), _jsx(Text, { style: styles.featureTitle, children: "Labels" }), _jsx(Text, { style: styles.featureDescription, children: "M\u00FAltiples labels con backgrounds y posicionamiento personalizado" })] })] })] }), _jsxs(View, { style: styles.usageSection, children: [_jsx(Text, { style: styles.sectionTitle, children: "\uD83D\uDE80 C\u00F3mo usar este demo" }), _jsxs(View, { style: styles.stepsContainer, children: [_jsxs(View, { style: styles.step, children: [_jsx(View, { style: styles.stepNumber, children: _jsx(Text, { style: styles.stepNumberText, children: "1" }) }), _jsxs(View, { style: styles.stepContent, children: [_jsx(Text, { style: styles.stepTitle, children: "Navegaci\u00F3n" }), _jsx(Text, { style: styles.stepDescription, children: "Usa los botones de abajo para navegar entre diferentes test suites" })] })] }), _jsxs(View, { style: styles.step, children: [_jsx(View, { style: styles.stepNumber, children: _jsx(Text, { style: styles.stepNumberText, children: "2" }) }), _jsxs(View, { style: styles.stepContent, children: [_jsx(Text, { style: styles.stepTitle, children: "Interacci\u00F3n" }), _jsx(Text, { style: styles.stepDescription, children: "Cada test tiene controles interactivos para probar diferentes configuraciones" })] })] }), _jsxs(View, { style: styles.step, children: [_jsx(View, { style: styles.stepNumber, children: _jsx(Text, { style: styles.stepNumberText, children: "3" }) }), _jsxs(View, { style: styles.stepContent, children: [_jsx(Text, { style: styles.stepTitle, children: "Observaci\u00F3n" }), _jsx(Text, { style: styles.stepDescription, children: "Observa c\u00F3mo se comportan las l\u00EDneas con diferentes propiedades y configuraciones" })] })] })] })] }), _jsxs(View, { style: styles.integrationSection, children: [_jsx(Text, { style: styles.sectionTitle, children: "\uD83D\uDD17 Integraci\u00F3n en tu App" }), _jsxs(View, { style: styles.codeBlock, children: [_jsx(Text, { style: styles.codeTitle, children: "1. Instalaci\u00F3n:" }), _jsx(Text, { style: styles.codeText, children: "npm install react-native-leader-line react-native-svg" })] }), _jsxs(View, { style: styles.codeBlock, children: [_jsx(Text, { style: styles.codeTitle, children: "2. Uso b\u00E1sico:" }), _jsx(Text, { style: styles.codeText, children: `import { LeaderLine } from 'react-native-leader-line';

<LeaderLine
  start={{ element: startRef }}
  end={{ element: endRef }}
  color="#3498db"
  strokeWidth={3}
  endPlug="arrow1"
/>` })] }), _jsxs(View, { style: styles.codeBlock, children: [_jsx(Text, { style: styles.codeTitle, children: "3. Uso avanzado (Manager):" }), _jsx(Text, { style: styles.codeText, children: `import { useLeaderLineManager } from 'react-native-leader-line';

const manager = useLeaderLineManager();

manager.createLine('my-line', {
  start: { element: startRef },
  end: { element: endRef },
  color: "red"
});` })] })] })] }));
    const renderCurrentSection = () => {
        if (currentSection === 'overview') {
            return renderOverview();
        }
        const section = sections.find(s => s.id === currentSection);
        if (!section)
            return renderOverview();
        const Component = section.component;
        return _jsx(Component, {});
    };
    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'Básico': return '#27ae60';
            case 'Intermedio': return '#f39c12';
            case 'Avanzado': return '#e74c3c';
            default: return '#6c757d';
        }
    };
    return (_jsxs(SafeAreaView, { style: styles.container, children: [_jsx(View, { style: styles.navigation, children: _jsxs(ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, children: [_jsx(TouchableOpacity, { style: [
                                styles.navButton,
                                currentSection === 'overview' && styles.activeNavButton
                            ], onPress: () => setCurrentSection('overview'), children: _jsx(Text, { style: [
                                    styles.navButtonText,
                                    currentSection === 'overview' && styles.activeNavButtonText
                                ], children: "\uD83D\uDCCB Overview" }) }), sections.map((section) => (_jsxs(TouchableOpacity, { style: [
                                styles.navButton,
                                currentSection === section.id && styles.activeNavButton
                            ], onPress: () => setCurrentSection(section.id), children: [_jsx(Text, { style: [
                                        styles.navButtonText,
                                        currentSection === section.id && styles.activeNavButtonText
                                    ], children: section.title }), _jsx(View, { style: [
                                        styles.difficultyBadge,
                                        { backgroundColor: getDifficultyColor(section.difficulty) }
                                    ], children: _jsx(Text, { style: styles.difficultyText, children: section.difficulty }) })] }, section.id)))] }) }), currentSection !== 'overview' && (_jsx(View, { style: styles.sectionInfo, children: (() => {
                    const section = sections.find(s => s.id === currentSection);
                    if (!section)
                        return null;
                    return (_jsxs(_Fragment, { children: [_jsx(Text, { style: styles.sectionInfoTitle, children: section.title }), _jsx(Text, { style: styles.sectionInfoDescription, children: section.description }), _jsx(View, { style: styles.featuresRow, children: section.features.map((feature, index) => (_jsx(View, { style: styles.featureBadge, children: _jsx(Text, { style: styles.featureBadgeText, children: feature }) }, index))) })] }));
                })() })), _jsx(View, { style: styles.content, children: renderCurrentSection() })] }));
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    navigation: {
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e9ecef',
        paddingVertical: 10,
    },
    navButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginHorizontal: 4,
        borderRadius: 8,
        backgroundColor: '#f8f9fa',
        minWidth: 120,
        alignItems: 'center',
    },
    activeNavButton: {
        backgroundColor: '#3498db',
    },
    navButtonText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#495057',
        textAlign: 'center',
        marginBottom: 4,
    },
    activeNavButtonText: {
        color: '#fff',
    },
    difficultyBadge: {
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 10,
        minWidth: 60,
        alignItems: 'center',
    },
    difficultyText: {
        fontSize: 10,
        fontWeight: '600',
        color: '#fff',
    },
    sectionInfo: {
        backgroundColor: '#fff',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e9ecef',
    },
    sectionInfoTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2c3e50',
        marginBottom: 4,
    },
    sectionInfoDescription: {
        fontSize: 14,
        color: '#6c757d',
        marginBottom: 8,
    },
    featuresRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    featureBadge: {
        backgroundColor: '#e9ecef',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        marginRight: 6,
        marginBottom: 4,
    },
    featureBadgeText: {
        fontSize: 12,
        color: '#495057',
        fontWeight: '500',
    },
    content: {
        flex: 1,
    },
    overviewContainer: {
        flex: 1,
    },
    heroSection: {
        backgroundColor: '#fff',
        padding: 30,
        alignItems: 'center',
    },
    heroTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 8,
        textAlign: 'center',
    },
    heroSubtitle: {
        fontSize: 16,
        color: '#6c757d',
        textAlign: 'center',
        marginBottom: 24,
    },
    heroStats: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    statItem: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#3498db',
    },
    statLabel: {
        fontSize: 12,
        color: '#6c757d',
        marginTop: 4,
    },
    featuresSection: {
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#2c3e50',
        marginBottom: 16,
    },
    featureGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    featureCard: {
        width: '48%',
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        alignItems: 'center',
    },
    featureIcon: {
        fontSize: 24,
        marginBottom: 8,
    },
    featureTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2c3e50',
        marginBottom: 4,
        textAlign: 'center',
    },
    featureDescription: {
        fontSize: 12,
        color: '#6c757d',
        textAlign: 'center',
        lineHeight: 16,
    },
    usageSection: {
        padding: 20,
        backgroundColor: '#fff',
    },
    stepsContainer: {
        marginTop: 8,
    },
    step: {
        flexDirection: 'row',
        marginBottom: 16,
        alignItems: 'flex-start',
    },
    stepNumber: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#3498db',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    stepNumberText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    stepContent: {
        flex: 1,
    },
    stepTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2c3e50',
        marginBottom: 4,
    },
    stepDescription: {
        fontSize: 14,
        color: '#6c757d',
        lineHeight: 20,
    },
    integrationSection: {
        padding: 20,
        backgroundColor: '#f8f9fa',
        marginBottom: 20,
    },
    codeBlock: {
        backgroundColor: '#2c3e50',
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
    },
    codeTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#3498db',
        marginBottom: 8,
    },
    codeText: {
        fontSize: 12,
        color: '#ecf0f1',
        fontFamily: 'Courier',
        lineHeight: 16,
    },
});
// Export default para máxima compatibilidad
export default CompleteDemo;
// Export alternativo para casos de compatibilidad extrema
export const CompleteDemoComponent = CompleteDemo;
//# sourceMappingURL=CompleteDemo.js.map