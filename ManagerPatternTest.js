import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * ManagerPatternTest - Pruebas del hook useLeaderLineManager
 *
 * Este componente prueba el patrón Manager para control programático de líneas:
 * - Creación dinámica de líneas
 * - Actualización en tiempo real
 * - Eliminación de líneas
 * - Manejo de múltiples líneas simultáneas
 * - Batch updates y performance
 * - Show/hide individual lines
 *
 * Uso:
 * import { ManagerPatternTest } from 'react-native-leader-line/ManagerPatternTest'
 */
import { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Alert, } from 'react-native';
import { LeaderLine, useLeaderLineManager } from './src/index';
export const ManagerPatternTest = () => {
    const manager = useLeaderLineManager();
    const [selectedElements, setSelectedElements] = useState([]);
    const [autoMode, setAutoMode] = useState(false);
    // Referencias para elementos conectables
    const elementRefs = {
        A: useRef(null),
        B: useRef(null),
        C: useRef(null),
        D: useRef(null),
        E: useRef(null),
        F: useRef(null),
    };
    // Auto-demo que crea y actualiza líneas automáticamente
    useEffect(() => {
        if (!autoMode)
            return;
        const interval = setInterval(() => {
            const elements = Object.keys(elementRefs);
            const randomStart = elements[Math.floor(Math.random() * elements.length)];
            const randomEnd = elements[Math.floor(Math.random() * elements.length)];
            if (randomStart !== randomEnd) {
                const lineId = `auto-${randomStart}-${randomEnd}`;
                const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c'];
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                if (manager.hasLine(lineId)) {
                    // Update existing line
                    manager.updateLine(lineId, {
                        color: randomColor,
                        strokeWidth: Math.floor(Math.random() * 5) + 2,
                    });
                }
                else {
                    // Create new line
                    manager.createLine(lineId, {
                        start: { element: elementRefs[randomStart] },
                        end: { element: elementRefs[randomEnd] },
                        color: randomColor,
                        strokeWidth: Math.floor(Math.random() * 4) + 2,
                        endPlug: 'arrow1',
                        path: 'arc',
                        curvature: Math.random() * 0.5,
                    });
                }
            }
        }, 2000);
        return () => clearInterval(interval);
    }, [autoMode, manager]);
    const handleElementPress = (elementId) => {
        if (selectedElements.includes(elementId)) {
            setSelectedElements(selectedElements.filter(id => id !== elementId));
        }
        else if (selectedElements.length < 2) {
            setSelectedElements([...selectedElements, elementId]);
        }
        else {
            // Replace first element if already have 2 selected
            setSelectedElements([selectedElements[1], elementId]);
        }
    };
    const createConnection = () => {
        if (selectedElements.length !== 2) {
            Alert.alert('Error', 'Selecciona exactamente 2 elementos para conectar');
            return;
        }
        const [start, end] = selectedElements;
        const lineId = `manual-${start}-${end}`;
        if (manager.hasLine(lineId)) {
            Alert.alert('Info', 'Ya existe una conexión entre estos elementos');
            return;
        }
        manager.createLine(lineId, {
            start: { element: elementRefs[start] },
            end: { element: elementRefs[end] },
            color: '#e74c3c',
            strokeWidth: 3,
            endPlug: 'arrow1',
            path: 'fluid',
            curvature: 0.3,
            startLabel: start,
            endLabel: end,
            middleLabel: {
                text: `${start}→${end}`,
                backgroundColor: '#3498db',
                color: 'white',
                borderRadius: 6,
                padding: 4,
            }
        });
        setSelectedElements([]);
    };
    const updateAllLines = () => {
        const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6'];
        const updates = manager.lines.map(line => ({
            id: line.id,
            props: {
                color: colors[Math.floor(Math.random() * colors.length)],
                strokeWidth: Math.floor(Math.random() * 4) + 2,
                curvature: Math.random() * 0.5,
            }
        }));
        manager.updateMultipleLines(updates);
    };
    const clearAllLines = () => {
        manager.clearAll();
        setSelectedElements([]);
    };
    const hideRandomLine = () => {
        const visibleLines = manager.lines.filter(line => (line.props.opacity || 1) > 0);
        if (visibleLines.length > 0) {
            const randomLine = visibleLines[Math.floor(Math.random() * visibleLines.length)];
            manager.hideLine(randomLine.id);
        }
    };
    const showAllLines = () => {
        manager.lines.forEach(line => {
            manager.showLine(line.id);
        });
    };
    const removeRandomLine = () => {
        if (manager.lines.length > 0) {
            const randomLine = manager.lines[Math.floor(Math.random() * manager.lines.length)];
            manager.removeLine(randomLine.id);
        }
    };
    const metrics = manager.getPerformanceMetrics();
    return (_jsx(SafeAreaView, { style: styles.container, children: _jsxs(ScrollView, { style: styles.scrollView, children: [_jsxs(View, { style: styles.header, children: [_jsx(Text, { style: styles.title, children: "Manager Pattern Test" }), _jsx(Text, { style: styles.subtitle, children: "Hook useLeaderLineManager - Control Program\u00E1tico" }), _jsx(Text, { style: styles.description, children: "Prueba la creaci\u00F3n, actualizaci\u00F3n y eliminaci\u00F3n din\u00E1mica de l\u00EDneas" })] }), _jsxs(View, { style: styles.metrics, children: [_jsx(Text, { style: styles.metricsTitle, children: "Performance Metrics:" }), _jsxs(Text, { style: styles.metricsText, children: ["\u2022 Total l\u00EDneas: ", metrics.totalLines] }), _jsxs(Text, { style: styles.metricsText, children: ["\u2022 Updates en cola: ", metrics.queuedUpdates] }), _jsxs(Text, { style: styles.metricsText, children: ["\u2022 Manager inicializado: ", manager.isInitialized ? 'Sí' : 'No'] }), _jsxs(Text, { style: styles.metricsText, children: ["\u2022 Elementos seleccionados: ", selectedElements.length, "/2"] })] }), _jsxs(View, { style: styles.controls, children: [_jsx(TouchableOpacity, { style: [styles.button, styles.primaryButton], onPress: createConnection, disabled: selectedElements.length !== 2, children: _jsxs(Text, { style: styles.buttonText, children: ["Crear Conexi\u00F3n (", selectedElements.length, "/2)"] }) }), _jsxs(View, { style: styles.buttonRow, children: [_jsx(TouchableOpacity, { style: [styles.button, styles.secondaryButton], onPress: updateAllLines, disabled: manager.lines.length === 0, children: _jsx(Text, { style: styles.buttonText, children: "Update All" }) }), _jsx(TouchableOpacity, { style: [styles.button, styles.warningButton], onPress: clearAllLines, disabled: manager.lines.length === 0, children: _jsx(Text, { style: styles.buttonText, children: "Clear All" }) })] }), _jsxs(View, { style: styles.buttonRow, children: [_jsx(TouchableOpacity, { style: [styles.button, styles.infoButton], onPress: hideRandomLine, disabled: manager.lines.length === 0, children: _jsx(Text, { style: styles.buttonText, children: "Hide Random" }) }), _jsx(TouchableOpacity, { style: [styles.button, styles.successButton], onPress: showAllLines, disabled: manager.lines.length === 0, children: _jsx(Text, { style: styles.buttonText, children: "Show All" }) })] }), _jsx(TouchableOpacity, { style: [styles.button, styles.dangerButton], onPress: removeRandomLine, disabled: manager.lines.length === 0, children: _jsx(Text, { style: styles.buttonText, children: "Remove Random" }) }), _jsx(TouchableOpacity, { style: [styles.button, autoMode ? styles.dangerButton : styles.successButton], onPress: () => setAutoMode(!autoMode), children: _jsx(Text, { style: styles.buttonText, children: autoMode ? 'Stop Auto Demo' : 'Start Auto Demo' }) })] }), _jsxs(View, { style: styles.testArea, children: [Object.entries(elementRefs).map(([id, ref]) => {
                            const isSelected = selectedElements.includes(id);
                            const positions = {
                                A: { top: 20, left: 50 },
                                B: { top: 20, left: 200 },
                                C: { top: 20, left: 350 },
                                D: { top: 150, left: 50 },
                                E: { top: 150, left: 200 },
                                F: { top: 150, left: 350 },
                            };
                            return (_jsx(TouchableOpacity, { ref: ref, style: [
                                    styles.element,
                                    positions[id],
                                    isSelected && styles.selectedElement,
                                ], onPress: () => handleElementPress(id), children: _jsx(Text, { style: [styles.elementText, isSelected && styles.selectedElementText], children: id }) }, id));
                        }), manager.lines.map((lineData) => (_jsx(LeaderLine, { ...lineData.props, testID: `managed-line-${lineData.id}` }, lineData.id)))] }), _jsxs(View, { style: styles.linesList, children: [_jsxs(Text, { style: styles.linesTitle, children: ["L\u00EDneas Activas (", manager.lines.length, "):"] }), manager.lines.length === 0 ? (_jsx(Text, { style: styles.noLinesText, children: "No hay l\u00EDneas creadas" })) : (manager.lines.map((line, index) => (_jsxs(View, { style: styles.lineItem, children: [_jsxs(Text, { style: styles.lineId, children: [index + 1, ". ", line.id] }), _jsxs(Text, { style: styles.lineProps, children: ["Color: ", line.props.color || 'default', " | Stroke: ", line.props.strokeWidth || 2, " | Opacity: ", line.props.opacity || 1] }), _jsxs(View, { style: styles.lineActions, children: [_jsx(TouchableOpacity, { style: styles.miniButton, onPress: () => manager.hideLine(line.id), children: _jsx(Text, { style: styles.miniButtonText, children: "Hide" }) }), _jsx(TouchableOpacity, { style: styles.miniButton, onPress: () => manager.showLine(line.id), children: _jsx(Text, { style: styles.miniButtonText, children: "Show" }) }), _jsx(TouchableOpacity, { style: [styles.miniButton, styles.miniDangerButton], onPress: () => manager.removeLine(line.id), children: _jsx(Text, { style: styles.miniButtonText, children: "\u00D7" }) })] })] }, line.id))))] }), _jsxs(View, { style: styles.instructions, children: [_jsx(Text, { style: styles.instructionsTitle, children: "Instrucciones:" }), _jsx(Text, { style: styles.instructionsText, children: "1. Toca elementos para seleccionarlos (m\u00E1ximo 2)" }), _jsx(Text, { style: styles.instructionsText, children: "2. Presiona \"Crear Conexi\u00F3n\" para conectar elementos seleccionados" }), _jsx(Text, { style: styles.instructionsText, children: "3. Usa los botones para manipular l\u00EDneas existentes" }), _jsx(Text, { style: styles.instructionsText, children: "4. \"Auto Demo\" crea y actualiza l\u00EDneas autom\u00E1ticamente" }), _jsx(Text, { style: styles.instructionsText, children: "5. Observa las m\u00E9tricas de performance en tiempo real" })] })] }) }));
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
        color: '#8e44ad',
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        color: '#6c757d',
    },
    metrics: {
        margin: 20,
        padding: 15,
        backgroundColor: '#e8f5e8',
        borderRadius: 8,
    },
    metricsTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#27ae60',
        marginBottom: 8,
    },
    metricsText: {
        fontSize: 14,
        color: '#2d5a3d',
        marginBottom: 2,
    },
    controls: {
        padding: 20,
        backgroundColor: '#fff',
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 8,
        marginBottom: 10,
        alignItems: 'center',
    },
    primaryButton: {
        backgroundColor: '#3498db',
    },
    secondaryButton: {
        backgroundColor: '#6c757d',
    },
    successButton: {
        backgroundColor: '#27ae60',
    },
    warningButton: {
        backgroundColor: '#f39c12',
    },
    dangerButton: {
        backgroundColor: '#e74c3c',
    },
    infoButton: {
        backgroundColor: '#17a2b8',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    testArea: {
        margin: 20,
        padding: 30,
        backgroundColor: '#fff',
        borderRadius: 12,
        minHeight: 250,
        position: 'relative',
    },
    element: {
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#34495e',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#2c3e50',
    },
    selectedElement: {
        backgroundColor: '#e74c3c',
        borderColor: '#c0392b',
        transform: [{ scale: 1.1 }],
    },
    elementText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    selectedElementText: {
        color: '#fff',
    },
    linesList: {
        margin: 20,
        marginTop: 0,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 8,
    },
    linesTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2c3e50',
        marginBottom: 10,
    },
    noLinesText: {
        fontSize: 14,
        color: '#6c757d',
        fontStyle: 'italic',
        textAlign: 'center',
        paddingVertical: 20,
    },
    lineItem: {
        backgroundColor: '#f8f9fa',
        padding: 10,
        borderRadius: 6,
        marginBottom: 8,
    },
    lineId: {
        fontSize: 14,
        fontWeight: '600',
        color: '#2c3e50',
        marginBottom: 4,
    },
    lineProps: {
        fontSize: 12,
        color: '#6c757d',
        marginBottom: 8,
    },
    lineActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    miniButton: {
        backgroundColor: '#6c757d',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        marginLeft: 6,
    },
    miniDangerButton: {
        backgroundColor: '#e74c3c',
    },
    miniButtonText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '500',
    },
    instructions: {
        margin: 20,
        marginTop: 0,
        padding: 15,
        backgroundColor: '#fff3cd',
        borderRadius: 8,
        marginBottom: 40,
    },
    instructionsTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#856404',
        marginBottom: 8,
    },
    instructionsText: {
        fontSize: 14,
        color: '#856404',
        marginBottom: 4,
    },
});
export default ManagerPatternTest;
//# sourceMappingURL=ManagerPatternTest.js.map