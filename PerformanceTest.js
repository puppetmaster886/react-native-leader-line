import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * PerformanceTest - Pruebas de rendimiento para react-native-leader-line
 *
 * Este componente evalúa el rendimiento de la librería con múltiples líneas:
 * - Stress test con 50+ líneas simultáneas
 * - Medición de FPS durante animaciones
 * - Memory usage monitoring
 * - Batch operations performance
 * - Update frequency testing
 * - Rendering optimization verification
 *
 * Uso:
 * import { PerformanceTest } from 'react-native-leader-line/PerformanceTest'
 */
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Dimensions, } from 'react-native';
import { LeaderLine, useLeaderLineManager } from './src/index';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
export const PerformanceTest = () => {
    const manager = useLeaderLineManager({ batchUpdates: true });
    const [testMode, setTestMode] = useState('idle');
    const [elementCount, setElementCount] = useState(10);
    const [lineCount, setLineCount] = useState(0);
    const [metrics, setMetrics] = useState({
        renderTime: 0,
        updateTime: 0,
        memoryUsage: 0,
        fps: 60,
        totalLines: 0,
        visibleLines: 0,
    });
    // Referencias dinámicas para elementos
    const elementRefs = useRef([]);
    const performanceTimer = useRef(null);
    const frameCount = useRef(0);
    const lastFrameTime = useRef(Date.now());
    // Crear referencias dinámicamente
    useEffect(() => {
        elementRefs.current = Array.from({ length: elementCount }, () => React.createRef());
    }, [elementCount]);
    // Monitor FPS
    useEffect(() => {
        const measureFPS = () => {
            frameCount.current++;
            const now = Date.now();
            if (now - lastFrameTime.current >= 1000) {
                const fps = frameCount.current;
                setMetrics(prev => ({ ...prev, fps }));
                frameCount.current = 0;
                lastFrameTime.current = now;
            }
            if (testMode !== 'idle') {
                requestAnimationFrame(measureFPS);
            }
        };
        if (testMode !== 'idle') {
            requestAnimationFrame(measureFPS);
        }
        return () => {
            frameCount.current = 0;
        };
    }, [testMode]);
    // Actualizar métricas del manager
    useEffect(() => {
        const managerMetrics = manager.getPerformanceMetrics();
        setMetrics(prev => ({
            ...prev,
            totalLines: managerMetrics.totalLines,
            visibleLines: manager.lines.filter(line => (line.props.opacity || 1) > 0).length,
        }));
    }, [manager.lines.length]);
    const generateRandomPosition = useCallback(() => {
        return {
            top: Math.random() * 400 + 50,
            left: Math.random() * (screenWidth - 150) + 50,
        };
    }, []);
    const generateRandomColor = useCallback(() => {
        const colors = [
            '#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6',
            '#1abc9c', '#34495e', '#e67e22', '#95a5a6', '#16a085'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }, []);
    const runStressTest = useCallback(async () => {
        setTestMode('stress');
        const startTime = Date.now();
        // Crear múltiples líneas conectando elementos aleatoriamente
        const linesToCreate = Math.min(elementCount * 3, 100); // Máximo 100 líneas
        for (let i = 0; i < linesToCreate; i++) {
            const startIndex = Math.floor(Math.random() * elementCount);
            const endIndex = Math.floor(Math.random() * elementCount);
            if (startIndex !== endIndex) {
                manager.createLine(`stress-${i}`, {
                    start: { element: elementRefs.current[startIndex] },
                    end: { element: elementRefs.current[endIndex] },
                    color: generateRandomColor(),
                    strokeWidth: Math.random() * 4 + 1,
                    path: Math.random() > 0.5 ? 'arc' : 'straight',
                    curvature: Math.random() * 0.5,
                    endPlug: 'arrow1',
                    opacity: 0.8,
                });
            }
        }
        const renderTime = Date.now() - startTime;
        setMetrics(prev => ({ ...prev, renderTime }));
        setLineCount(linesToCreate);
    }, [elementCount, manager, generateRandomColor]);
    const runAnimationTest = useCallback(() => {
        setTestMode('animation');
        // Crear líneas con diferentes animaciones
        const animationTypes = ['draw', 'fade', 'bounce', 'scale', 'elastic'];
        for (let i = 0; i < Math.min(elementCount, 20); i++) {
            const startIndex = i;
            const endIndex = (i + 1) % elementCount;
            const animationType = animationTypes[i % animationTypes.length];
            manager.createLine(`anim-${i}`, {
                start: { element: elementRefs.current[startIndex] },
                end: { element: elementRefs.current[endIndex] },
                color: generateRandomColor(),
                strokeWidth: 3,
                path: 'fluid',
                curvature: 0.3,
                endPlug: 'arrow2',
                animation: animationType,
                animationDuration: 1000 + Math.random() * 2000,
                animationLoop: true,
                animationLoopCount: 3,
            });
        }
    }, [elementCount, manager, generateRandomColor]);
    const runUpdateTest = useCallback(() => {
        setTestMode('updates');
        // Crear líneas base
        for (let i = 0; i < Math.min(elementCount / 2, 25); i++) {
            const startIndex = i * 2;
            const endIndex = (i * 2 + 1) % elementCount;
            manager.createLine(`update-${i}`, {
                start: { element: elementRefs.current[startIndex] },
                end: { element: elementRefs.current[endIndex] },
                color: generateRandomColor(),
                strokeWidth: 2,
                path: 'arc',
                endPlug: 'arrow1',
            });
        }
        // Actualizar líneas continuamente
        const updateInterval = setInterval(() => {
            const startTime = Date.now();
            const updates = manager.lines.map(line => ({
                id: line.id,
                props: {
                    color: generateRandomColor(),
                    strokeWidth: Math.random() * 5 + 1,
                    curvature: Math.random() * 0.6,
                    opacity: 0.7 + Math.random() * 0.3,
                }
            }));
            manager.updateMultipleLines(updates);
            const updateTime = Date.now() - startTime;
            setMetrics(prev => ({ ...prev, updateTime }));
        }, 100);
        // Detener después de 10 segundos
        setTimeout(() => {
            clearInterval(updateInterval);
            setTestMode('idle');
        }, 10000);
    }, [elementCount, manager, generateRandomColor]);
    const clearAllTests = useCallback(() => {
        setTestMode('idle');
        manager.clearAll();
        setLineCount(0);
        setMetrics(prev => ({
            ...prev,
            renderTime: 0,
            updateTime: 0,
            totalLines: 0,
            visibleLines: 0,
        }));
    }, [manager]);
    const renderElements = () => {
        return elementRefs.current.map((ref, index) => {
            const position = generateRandomPosition();
            const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6'];
            const color = colors[index % colors.length];
            return (_jsx(View, { ref: ref, style: [
                    styles.performanceElement,
                    {
                        backgroundColor: color,
                        ...position,
                    }
                ], children: _jsx(Text, { style: styles.elementText, children: index + 1 }) }, index));
        });
    };
    return (_jsx(SafeAreaView, { style: styles.container, children: _jsxs(ScrollView, { style: styles.scrollView, children: [_jsxs(View, { style: styles.header, children: [_jsx(Text, { style: styles.title, children: "Performance Test" }), _jsx(Text, { style: styles.subtitle, children: "Pruebas de rendimiento y estr\u00E9s" }), _jsx(Text, { style: styles.description, children: "Eval\u00FAa el performance con m\u00FAltiples l\u00EDneas y operaciones intensivas" })] }), _jsxs(View, { style: styles.metricsPanel, children: [_jsx(Text, { style: styles.metricsTitle, children: "M\u00E9tricas en Tiempo Real:" }), _jsxs(View, { style: styles.metricsGrid, children: [_jsxs(View, { style: styles.metricItem, children: [_jsx(Text, { style: styles.metricLabel, children: "FPS" }), _jsx(Text, { style: [styles.metricValue, metrics.fps < 30 && styles.metricWarning], children: metrics.fps })] }), _jsxs(View, { style: styles.metricItem, children: [_jsx(Text, { style: styles.metricLabel, children: "L\u00EDneas Totales" }), _jsx(Text, { style: styles.metricValue, children: metrics.totalLines })] }), _jsxs(View, { style: styles.metricItem, children: [_jsx(Text, { style: styles.metricLabel, children: "L\u00EDneas Visibles" }), _jsx(Text, { style: styles.metricValue, children: metrics.visibleLines })] }), _jsxs(View, { style: styles.metricItem, children: [_jsx(Text, { style: styles.metricLabel, children: "Render Time" }), _jsxs(Text, { style: [styles.metricValue, metrics.renderTime > 100 && styles.metricWarning], children: [metrics.renderTime, "ms"] })] }), _jsxs(View, { style: styles.metricItem, children: [_jsx(Text, { style: styles.metricLabel, children: "Update Time" }), _jsxs(Text, { style: [styles.metricValue, metrics.updateTime > 50 && styles.metricWarning], children: [metrics.updateTime, "ms"] })] }), _jsxs(View, { style: styles.metricItem, children: [_jsx(Text, { style: styles.metricLabel, children: "Test Mode" }), _jsx(Text, { style: styles.metricValue, children: testMode })] })] })] }), _jsxs(View, { style: styles.controls, children: [_jsxs(View, { style: styles.configRow, children: [_jsxs(Text, { style: styles.configLabel, children: ["Elementos: ", elementCount] }), _jsxs(View, { style: styles.configButtons, children: [_jsx(TouchableOpacity, { style: styles.configButton, onPress: () => setElementCount(Math.max(5, elementCount - 5)), disabled: testMode !== 'idle', children: _jsx(Text, { style: styles.configButtonText, children: "-5" }) }), _jsx(TouchableOpacity, { style: styles.configButton, onPress: () => setElementCount(Math.min(50, elementCount + 5)), disabled: testMode !== 'idle', children: _jsx(Text, { style: styles.configButtonText, children: "+5" }) })] })] }), _jsx(TouchableOpacity, { style: [styles.button, styles.dangerButton], onPress: runStressTest, disabled: testMode !== 'idle', children: _jsxs(Text, { style: styles.buttonText, children: ["\uD83D\uDD25 Stress Test (", elementCount, " elementos)"] }) }), _jsx(TouchableOpacity, { style: [styles.button, styles.warningButton], onPress: runAnimationTest, disabled: testMode !== 'idle', children: _jsx(Text, { style: styles.buttonText, children: "\u26A1 Animation Test" }) }), _jsx(TouchableOpacity, { style: [styles.button, styles.infoButton], onPress: runUpdateTest, disabled: testMode !== 'idle', children: _jsx(Text, { style: styles.buttonText, children: "\uD83D\uDD04 Update Performance Test" }) }), _jsx(TouchableOpacity, { style: [styles.button, styles.secondaryButton], onPress: clearAllTests, disabled: testMode !== 'idle' && testMode !== 'stress', children: _jsx(Text, { style: styles.buttonText, children: "\uD83E\uDDF9 Clear All & Reset" }) })] }), _jsxs(View, { style: styles.testArea, children: [renderElements(), manager.lines.map((lineData) => (_jsx(LeaderLine, { ...lineData.props, testID: `perf-line-${lineData.id}` }, lineData.id)))] }), _jsxs(View, { style: styles.resultsPanel, children: [_jsx(Text, { style: styles.resultsTitle, children: "Resultados del Test:" }), testMode === 'idle' && metrics.totalLines === 0 && (_jsx(Text, { style: styles.resultText, children: "Selecciona un test para comenzar las pruebas de performance" })), metrics.totalLines > 0 && (_jsxs(_Fragment, { children: [_jsxs(Text, { style: styles.resultText, children: ["\u2705 Se crearon ", metrics.totalLines, " l\u00EDneas exitosamente"] }), _jsxs(Text, { style: styles.resultText, children: ["\uD83D\uDCCA Tiempo de renderizado: ", metrics.renderTime, "ms"] }), _jsxs(Text, { style: styles.resultText, children: ["\uD83C\uDFAF FPS promedio: ", metrics.fps, " (", metrics.fps >= 30 ? 'Bueno' : 'Necesita optimización', ")"] }), metrics.updateTime > 0 && (_jsxs(Text, { style: styles.resultText, children: ["\uD83D\uDD04 Tiempo de actualizaci\u00F3n: ", metrics.updateTime, "ms"] }))] })), testMode === 'stress' && (_jsx(Text, { style: styles.resultText, children: "\uD83D\uDD25 Stress test en progreso... Monitoreando FPS y render time" })), testMode === 'animation' && (_jsx(Text, { style: styles.resultText, children: "\u26A1 Test de animaciones activo... Observa los efectos de performance" })), testMode === 'updates' && (_jsx(Text, { style: styles.resultText, children: "\uD83D\uDD04 Test de updates en progreso... Mediremos batch performance por 10 segundos" }))] }), _jsxs(View, { style: styles.recommendations, children: [_jsx(Text, { style: styles.recommendationsTitle, children: "Recomendaciones de Performance:" }), _jsxs(Text, { style: styles.recommendationText, children: ["\u2022 FPS ", '<', " 30: Reduce el n\u00FAmero de l\u00EDneas o usa batch updates"] }), _jsxs(Text, { style: styles.recommendationText, children: ["\u2022 Render time ", '>', " 100ms: Considera optimizar el n\u00FAmero de elementos"] }), _jsxs(Text, { style: styles.recommendationText, children: ["\u2022 Update time ", '>', " 50ms: Usa el patr\u00F3n de batch updates del manager"] }), _jsx(Text, { style: styles.recommendationText, children: "\u2022 Para 50+ l\u00EDneas: Activa optimizeUpdates y ajusta updateThreshold" })] })] }) }));
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    scrollView: {
        flex: 1,
    },
    header: {
        padding: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e9ecef',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#e74c3c',
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        color: '#6c757d',
    },
    metricsPanel: {
        margin: 20,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderLeftWidth: 4,
        borderLeftColor: '#3498db',
    },
    metricsTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2c3e50',
        marginBottom: 12,
    },
    metricsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    metricItem: {
        width: '48%',
        marginBottom: 10,
    },
    metricLabel: {
        fontSize: 12,
        color: '#6c757d',
        marginBottom: 2,
    },
    metricValue: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2c3e50',
    },
    metricWarning: {
        color: '#e74c3c',
    },
    controls: {
        padding: 20,
        backgroundColor: '#fff',
    },
    configRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e9ecef',
    },
    configLabel: {
        fontSize: 16,
        fontWeight: '500',
        color: '#495057',
    },
    configButtons: {
        flexDirection: 'row',
    },
    configButton: {
        backgroundColor: '#6c757d',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 4,
        marginLeft: 8,
    },
    configButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 8,
        marginBottom: 10,
        alignItems: 'center',
    },
    dangerButton: {
        backgroundColor: '#e74c3c',
    },
    warningButton: {
        backgroundColor: '#f39c12',
    },
    infoButton: {
        backgroundColor: '#17a2b8',
    },
    secondaryButton: {
        backgroundColor: '#6c757d',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    testArea: {
        margin: 20,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 12,
        minHeight: 500,
        position: 'relative',
    },
    performanceElement: {
        position: 'absolute',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#fff',
    },
    elementText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    resultsPanel: {
        margin: 20,
        marginTop: 0,
        padding: 15,
        backgroundColor: '#e8f5e8',
        borderRadius: 8,
    },
    resultsTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#27ae60',
        marginBottom: 8,
    },
    resultText: {
        fontSize: 14,
        color: '#2d5a3d',
        marginBottom: 4,
    },
    recommendations: {
        margin: 20,
        marginTop: 0,
        padding: 15,
        backgroundColor: '#fff3cd',
        borderRadius: 8,
        marginBottom: 40,
    },
    recommendationsTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#856404',
        marginBottom: 8,
    },
    recommendationText: {
        fontSize: 14,
        color: '#856404',
        marginBottom: 4,
    },
});
export default PerformanceTest;
//# sourceMappingURL=PerformanceTest.js.map