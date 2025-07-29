import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * AdvancedFeaturesTest - Pruebas avanzadas de react-native-leader-line
 *
 * Este componente prueba todas las características avanzadas de la librería:
 * - Diferentes tipos de paths (straight, arc, fluid, magnet, grid)
 * - Todos los tipos de plugs/marcadores
 * - Efectos avanzados (outline, shadow, dash, gradients)
 * - Animaciones
 * - Labels múltiples y estilizados
 * - Posicionamiento de sockets
 *
 * Uso:
 * import { AdvancedFeaturesTest } from 'react-native-leader-line/AdvancedFeaturesTest'
 */
import { useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Switch, } from 'react-native';
import { LeaderLine } from './src/index';
export const AdvancedFeaturesTest = () => {
    const [currentCategory, setCurrentCategory] = useState(0);
    const [showLines, setShowLines] = useState(true);
    const [enableAnimations, setEnableAnimations] = useState(false);
    const [currentSubTest, setCurrentSubTest] = useState(0);
    // Referencias para diferentes categorías de pruebas
    const pathRef1 = useRef(null);
    const pathRef2 = useRef(null);
    const plugRef1 = useRef(null);
    const plugRef2 = useRef(null);
    const effectRef1 = useRef(null);
    const effectRef2 = useRef(null);
    const labelRef1 = useRef(null);
    const labelRef2 = useRef(null);
    const socketRef1 = useRef(null);
    const socketRef2 = useRef(null);
    const categories = [
        {
            name: 'Tipos de Path',
            description: 'Prueba todos los tipos de líneas disponibles',
            tests: ['straight', 'arc', 'fluid', 'magnet', 'grid'],
        },
        {
            name: 'Tipos de Plugs',
            description: 'Prueba todos los marcadores/flechas disponibles',
            tests: ['arrow1', 'arrow2', 'arrow3', 'disc', 'square', 'diamond', 'crosshair', 'hand'],
        },
        {
            name: 'Efectos Visuales',
            description: 'Outline, shadows, dash patterns y gradientes',
            tests: ['outline', 'shadow', 'dash-static', 'dash-animated', 'combined'],
        },
        {
            name: 'Labels Avanzados',
            description: 'Labels múltiples con estilos personalizados',
            tests: ['all-labels', 'styled-labels', 'positioned-labels', 'background-labels'],
        },
        {
            name: 'Socket Positions',
            description: 'Diferentes puntos de conexión en elementos',
            tests: ['corners', 'sides', 'auto-detection', 'mixed-sockets'],
        },
    ];
    const renderPathTests = () => {
        const pathTypes = ['straight', 'arc', 'fluid', 'magnet', 'grid'];
        const currentPath = pathTypes[currentSubTest] || 'straight';
        return (_jsxs(_Fragment, { children: [_jsx(View, { ref: pathRef1, style: [styles.testBox, styles.blueBox, { top: 30, left: 50 }], children: _jsx(Text, { style: styles.boxText, children: "From" }) }), _jsx(View, { ref: pathRef2, style: [styles.testBox, styles.redBox, { top: 120, left: 200 }], children: _jsx(Text, { style: styles.boxText, children: "To" }) }), showLines && (_jsx(LeaderLine, { start: { element: pathRef1 }, end: { element: pathRef2 }, color: "#3498db", strokeWidth: 4, path: currentPath, curvature: 0.3, endPlug: "arrow1", startSocket: "right", endSocket: "left", animation: enableAnimations ? "draw" : undefined, testID: `path-${currentPath}` }))] }));
    };
    const renderPlugTests = () => {
        const plugTypes = ['arrow1', 'arrow2', 'arrow3', 'disc', 'square', 'diamond', 'crosshair', 'hand'];
        const currentPlug = plugTypes[currentSubTest] || 'arrow1';
        return (_jsxs(_Fragment, { children: [_jsx(View, { ref: plugRef1, style: [styles.testBox, styles.greenBox, { top: 40, left: 60 }], children: _jsx(Text, { style: styles.boxText, children: "Start" }) }), _jsx(View, { ref: plugRef2, style: [styles.testBox, styles.purpleBox, { top: 100, left: 180 }], children: _jsx(Text, { style: styles.boxText, children: "End" }) }), showLines && (_jsx(LeaderLine, { start: { element: plugRef1 }, end: { element: plugRef2 }, color: "#e74c3c", strokeWidth: 3, path: "arc", curvature: 0.2, startPlug: "disc", endPlug: currentPlug, startPlugSize: 12, endPlugSize: 15, startSocket: "right", endSocket: "left", animation: enableAnimations ? "fade" : undefined, testID: `plug-${currentPlug}` }))] }));
    };
    const renderEffectTests = () => {
        const effects = ['outline', 'shadow', 'dash-static', 'dash-animated', 'combined'];
        const currentEffect = effects[currentSubTest] || 'outline';
        let lineProps = {
            start: { element: effectRef1 },
            end: { element: effectRef2 },
            color: "#2ecc71",
            strokeWidth: 5,
            path: "fluid",
            curvature: 0.4,
            endPlug: "arrow2",
            startSocket: "bottom",
            endSocket: "top",
        };
        switch (currentEffect) {
            case 'outline':
                lineProps.outline = { enabled: true, color: "white", size: 3, opacity: 0.8 };
                break;
            case 'shadow':
                lineProps.dropShadow = { dx: 4, dy: 4, blur: 6, color: "rgba(0,0,0,0.4)", opacity: 0.6 };
                break;
            case 'dash-static':
                lineProps.dash = { pattern: "10,5", animation: false };
                break;
            case 'dash-animated':
                lineProps.dash = { pattern: "8,4", animation: true };
                break;
            case 'combined':
                lineProps.outline = { enabled: true, color: "yellow", size: 2 };
                lineProps.dropShadow = { dx: 3, dy: 3, blur: 4, color: "rgba(0,0,0,0.3)" };
                lineProps.dash = { pattern: "12,6", animation: true };
                break;
        }
        if (enableAnimations) {
            lineProps.animation = "bounce";
        }
        return (_jsxs(_Fragment, { children: [_jsx(View, { ref: effectRef1, style: [styles.testBox, styles.orangeBox, { top: 50, left: 70 }], children: _jsx(Text, { style: styles.boxText, children: "Source" }) }), _jsx(View, { ref: effectRef2, style: [styles.testBox, styles.tealBox, { top: 80, left: 190 }], children: _jsx(Text, { style: styles.boxText, children: "Target" }) }), showLines && (_jsx(LeaderLine, { ...lineProps, testID: `effect-${currentEffect}` }))] }));
    };
    const renderLabelTests = () => {
        const labelTypes = ['all-labels', 'styled-labels', 'positioned-labels', 'background-labels'];
        const currentLabelType = labelTypes[currentSubTest] || 'all-labels';
        let lineProps = {
            start: { element: labelRef1 },
            end: { element: labelRef2 },
            color: "#9b59b6",
            strokeWidth: 3,
            path: "arc",
            curvature: 0.25,
            endPlug: "arrow1",
            startSocket: "right",
            endSocket: "left",
        };
        switch (currentLabelType) {
            case 'all-labels':
                lineProps.startLabel = "Inicio";
                lineProps.middleLabel = "Medio";
                lineProps.endLabel = "Final";
                lineProps.captionLabel = "Título";
                lineProps.pathLabel = "Ruta";
                break;
            case 'styled-labels':
                lineProps.startLabel = {
                    text: "Start",
                    backgroundColor: "#e74c3c",
                    color: "white",
                    borderRadius: 6,
                    padding: 4,
                };
                lineProps.middleLabel = {
                    text: "Process",
                    backgroundColor: "#f39c12",
                    color: "white",
                    borderRadius: 8,
                    padding: 6,
                };
                lineProps.endLabel = {
                    text: "End",
                    backgroundColor: "#27ae60",
                    color: "white",
                    borderRadius: 6,
                    padding: 4,
                };
                break;
            case 'positioned-labels':
                lineProps.startLabel = {
                    text: "A",
                    backgroundColor: "#3498db",
                    color: "white",
                    borderRadius: 12,
                    padding: 8,
                    offset: [0, -25],
                };
                lineProps.endLabel = {
                    text: "B",
                    backgroundColor: "#e91e63",
                    color: "white",
                    borderRadius: 12,
                    padding: 8,
                    offset: [0, 25],
                };
                break;
            case 'background-labels':
                lineProps.middleLabel = {
                    text: "Custom Background",
                    backgroundColor: "rgba(52, 152, 219, 0.9)",
                    color: "white",
                    borderRadius: 15,
                    padding: 10,
                    fontSize: 16,
                };
                break;
        }
        if (enableAnimations) {
            lineProps.animation = "elastic";
        }
        return (_jsxs(_Fragment, { children: [_jsx(View, { ref: labelRef1, style: [styles.testBox, styles.yellowBox, { top: 60, left: 80 }], children: _jsx(Text, { style: styles.boxText, children: "From" }) }), _jsx(View, { ref: labelRef2, style: [styles.testBox, styles.pinkBox, { top: 90, left: 200 }], children: _jsx(Text, { style: styles.boxText, children: "To" }) }), showLines && (_jsx(LeaderLine, { ...lineProps, testID: `label-${currentLabelType}` }))] }));
    };
    const renderSocketTests = () => {
        const socketTypes = ['corners', 'sides', 'auto-detection', 'mixed-sockets'];
        const currentSocketType = socketTypes[currentSubTest] || 'corners';
        let startSocket = "center";
        let endSocket = "center";
        switch (currentSocketType) {
            case 'corners':
                startSocket = "top_right";
                endSocket = "bottom_left";
                break;
            case 'sides':
                startSocket = "right";
                endSocket = "left";
                break;
            case 'auto-detection':
                startSocket = "auto";
                endSocket = "auto";
                break;
            case 'mixed-sockets':
                startSocket = "bottom_right";
                endSocket = "top";
                break;
        }
        return (_jsxs(_Fragment, { children: [_jsx(View, { ref: socketRef1, style: [styles.testBox, styles.indigoBox, { top: 70, left: 90 }], children: _jsx(Text, { style: styles.boxText, children: "Socket 1" }) }), _jsx(View, { ref: socketRef2, style: [styles.testBox, styles.limeBox, { top: 110, left: 170 }], children: _jsx(Text, { style: styles.boxText, children: "Socket 2" }) }), showLines && (_jsx(LeaderLine, { start: { element: socketRef1 }, end: { element: socketRef2 }, color: "#8e44ad", strokeWidth: 4, path: "fluid", curvature: 0.3, endPlug: "arrow2", startSocket: startSocket, endSocket: endSocket, outline: { enabled: true, color: "white", size: 1 }, animation: enableAnimations ? "slide" : undefined, testID: `socket-${currentSocketType}` }))] }));
    };
    const renderCurrentTest = () => {
        switch (currentCategory) {
            case 0: return renderPathTests();
            case 1: return renderPlugTests();
            case 2: return renderEffectTests();
            case 3: return renderLabelTests();
            case 4: return renderSocketTests();
            default: return null;
        }
    };
    const currentCategoryData = categories[currentCategory];
    const maxSubTests = (currentCategoryData === null || currentCategoryData === void 0 ? void 0 : currentCategoryData.tests.length) || 1;
    return (_jsx(SafeAreaView, { style: styles.container, children: _jsxs(ScrollView, { style: styles.scrollView, children: [_jsxs(View, { style: styles.header, children: [_jsx(Text, { style: styles.title, children: "Pruebas Avanzadas - Leader Line" }), _jsxs(Text, { style: styles.subtitle, children: [currentCategoryData === null || currentCategoryData === void 0 ? void 0 : currentCategoryData.name, " (", currentSubTest + 1, "/", maxSubTests, ")"] }), _jsx(Text, { style: styles.description, children: currentCategoryData === null || currentCategoryData === void 0 ? void 0 : currentCategoryData.description })] }), _jsxs(View, { style: styles.controls, children: [_jsxs(View, { style: styles.switchRow, children: [_jsx(Text, { style: styles.switchLabel, children: "Mostrar L\u00EDneas:" }), _jsx(Switch, { value: showLines, onValueChange: setShowLines, trackColor: { false: "#767577", true: "#81b0ff" }, thumbColor: showLines ? "#f5dd4b" : "#f4f3f4" })] }), _jsxs(View, { style: styles.switchRow, children: [_jsx(Text, { style: styles.switchLabel, children: "Animaciones:" }), _jsx(Switch, { value: enableAnimations, onValueChange: setEnableAnimations, trackColor: { false: "#767577", true: "#81b0ff" }, thumbColor: enableAnimations ? "#f5dd4b" : "#f4f3f4" })] }), _jsxs(View, { style: styles.navigation, children: [_jsx(TouchableOpacity, { style: [styles.navButton, currentCategory === 0 && styles.disabledButton], onPress: () => {
                                        setCurrentCategory(Math.max(0, currentCategory - 1));
                                        setCurrentSubTest(0);
                                    }, disabled: currentCategory === 0, children: _jsx(Text, { style: styles.navButtonText, children: "\u2190 Categor\u00EDa" }) }), _jsx(TouchableOpacity, { style: [styles.navButton, currentSubTest === 0 && styles.disabledButton], onPress: () => setCurrentSubTest(Math.max(0, currentSubTest - 1)), disabled: currentSubTest === 0, children: _jsx(Text, { style: styles.navButtonText, children: "\u2190 Test" }) }), _jsxs(Text, { style: styles.categoryCounter, children: [currentCategory + 1, "/", categories.length] }), _jsx(TouchableOpacity, { style: [styles.navButton, currentSubTest === maxSubTests - 1 && styles.disabledButton], onPress: () => setCurrentSubTest(Math.min(maxSubTests - 1, currentSubTest + 1)), disabled: currentSubTest === maxSubTests - 1, children: _jsx(Text, { style: styles.navButtonText, children: "Test \u2192" }) }), _jsx(TouchableOpacity, { style: [styles.navButton, currentCategory === categories.length - 1 && styles.disabledButton], onPress: () => {
                                        setCurrentCategory(Math.min(categories.length - 1, currentCategory + 1));
                                        setCurrentSubTest(0);
                                    }, disabled: currentCategory === categories.length - 1, children: _jsx(Text, { style: styles.navButtonText, children: "Categor\u00EDa \u2192" }) })] })] }), _jsx(View, { style: styles.testArea, children: renderCurrentTest() }), _jsxs(View, { style: styles.info, children: [_jsx(Text, { style: styles.infoTitle, children: "Test Actual:" }), _jsxs(Text, { style: styles.infoText, children: ["\u2022 Categor\u00EDa: ", currentCategoryData === null || currentCategoryData === void 0 ? void 0 : currentCategoryData.name] }), _jsxs(Text, { style: styles.infoText, children: ["\u2022 Test: ", currentCategoryData === null || currentCategoryData === void 0 ? void 0 : currentCategoryData.tests[currentSubTest]] }), _jsxs(Text, { style: styles.infoText, children: ["\u2022 Animaciones: ", enableAnimations ? 'Activadas' : 'Desactivadas'] }), _jsxs(Text, { style: styles.infoText, children: ["\u2022 Estado: ", showLines ? 'Visible' : 'Oculto'] })] }), _jsxs(View, { style: styles.testDetails, children: [_jsx(Text, { style: styles.detailsTitle, children: "Detalles del Test:" }), _jsxs(Text, { style: styles.detailsText, children: ["Este test verifica: ", currentCategoryData === null || currentCategoryData === void 0 ? void 0 : currentCategoryData.tests[currentSubTest]] }), _jsxs(Text, { style: styles.detailsText, children: ["Categor\u00EDa ", currentCategory + 1, " de ", categories.length, " - Subcaso ", currentSubTest + 1, " de ", maxSubTests] })] })] }) }));
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
    controls: {
        padding: 20,
        backgroundColor: '#fff',
        marginTop: 10,
    },
    switchRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    switchLabel: {
        fontSize: 16,
        color: '#495057',
        fontWeight: '500',
    },
    navigation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    navButton: {
        backgroundColor: '#6c757d',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 6,
    },
    disabledButton: {
        backgroundColor: '#dee2e6',
    },
    navButtonText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '500',
    },
    categoryCounter: {
        fontSize: 16,
        fontWeight: '600',
        color: '#495057',
    },
    testArea: {
        margin: 20,
        padding: 40,
        backgroundColor: '#fff',
        borderRadius: 12,
        minHeight: 300,
        position: 'relative',
    },
    testBox: {
        width: 70,
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
    boxText: {
        color: '#fff',
        fontSize: 11,
        fontWeight: '600',
        textAlign: 'center',
    },
    blueBox: { backgroundColor: '#3498db' },
    redBox: { backgroundColor: '#e74c3c' },
    greenBox: { backgroundColor: '#2ecc71' },
    purpleBox: { backgroundColor: '#9b59b6' },
    orangeBox: { backgroundColor: '#f39c12' },
    tealBox: { backgroundColor: '#1abc9c' },
    yellowBox: { backgroundColor: '#f1c40f' },
    pinkBox: { backgroundColor: '#e91e63' },
    indigoBox: { backgroundColor: '#6c5ce7' },
    limeBox: { backgroundColor: '#a4de6c' },
    info: {
        margin: 20,
        marginTop: 0,
        padding: 15,
        backgroundColor: '#e8f4fd',
        borderRadius: 8,
    },
    infoTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2980b9',
        marginBottom: 8,
    },
    infoText: {
        fontSize: 14,
        color: '#34495e',
        marginBottom: 4,
    },
    testDetails: {
        margin: 20,
        marginTop: 0,
        padding: 15,
        backgroundColor: '#fff5f5',
        borderRadius: 8,
        marginBottom: 40,
    },
    detailsTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#c0392b',
        marginBottom: 8,
    },
    detailsText: {
        fontSize: 14,
        color: '#7f8c8d',
        marginBottom: 4,
    },
});
export default AdvancedFeaturesTest;
//# sourceMappingURL=AdvancedFeaturesTest.js.map