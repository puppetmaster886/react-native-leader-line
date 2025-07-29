import {
  Fragment as _Fragment,
  jsx as _jsx,
  jsxs as _jsxs,
} from "react/jsx-runtime";
/**
 * BasicTestComponent - Pruebas b�sicas de la librer�a react-native-leader-line
 *
 * Este componente est� dise�ado para ser integrado en una app React Native
 * para testing manual de la funcionalidad b�sica de la librer�a.
 *
 * Uso:
 * 1. npm link esta librer�a en tu app React Native
 * 2. import { BasicTestComponent } from 'react-native-leader-line/BasicTestComponent'
 * 3. Renderiza <BasicTestComponent /> en tu app
 */
import { useCallback, useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LeaderLine } from "./src/index";
export const BasicTestComponent = () => {
  const [showLines, setShowLines] = useState(true);
  const [currentTest, setCurrentTest] = useState(0);
  const [layoutReady, setLayoutReady] = useState(false);
  // Referencias para elementos de prueba
  const startRef1 = useRef(null);
  const endRef1 = useRef(null);
  const startRef2 = useRef(null);
  const endRef2 = useRef(null);
  const startRef3 = useRef(null);
  const endRef3 = useRef(null);
  const startRef4 = useRef(null);
  const endRef4 = useRef(null);

  // Log component state changes
  console.log("[LEADER_LINE_DEBUG] BasicTestComponent render:", {
    showLines,
    currentTest,
    timestamp: new Date().toISOString(),
  });

  // Log ref availability
  console.log("[LEADER_LINE_DEBUG] Refs availability:", {
    startRef1: !!startRef1.current,
    endRef1: !!endRef1.current,
    startRef2: !!startRef2.current,
    endRef2: !!endRef2.current,
    startRef3: !!startRef3.current,
    endRef3: !!endRef3.current,
    startRef4: !!startRef4.current,
    endRef4: !!endRef4.current,
  });

  // Log React Native version and environment info
  useEffect(() => {
    console.log("[LEADER_LINE_DEBUG] React Native Environment Info:", {
      Platform: require("react-native").Platform,
      Dimensions: require("react-native").Dimensions.get("window"),
      timestamp: new Date().toISOString(),
    });
  }, []);

  // Track when refs become available
  useEffect(() => {
    const checkRefs = () => {
      const currentRefs = {
        startRef1: !!startRef1.current,
        endRef1: !!endRef1.current,
        startRef2: !!startRef2.current,
        endRef2: !!endRef2.current,
        startRef3: !!startRef3.current,
        endRef3: !!endRef3.current,
        startRef4: !!startRef4.current,
        endRef4: !!endRef4.current,
      };
      console.log("[LEADER_LINE_DEBUG] Refs status in useEffect:", currentRefs);
    };

    // Check immediately
    checkRefs();

    // Check again after a short delay to catch layout completion
    const timer = setTimeout(checkRefs, 100);
    return () => clearTimeout(timer);
  }, [currentTest, showLines]);

  // Handler for layout events
  const handleElementLayout = useCallback(
    (elementName) => {
      console.log(`[LEADER_LINE_DEBUG] Element ${elementName} laid out`);
      console.log(
        `[LEADER_LINE_DEBUG] Current layoutReady state: ${layoutReady}`
      );
      // Reset layout ready to false, then set to true after a delay
      setLayoutReady(false);
      setTimeout(() => {
        console.log("[LEADER_LINE_DEBUG] Setting layoutReady to true");
        setLayoutReady(true);
      }, 100);
    },
    [layoutReady]
  );
  const tests = [
    {
      name: "L�nea B�sica Straight",
      description: "Conexi�n simple entre dos elementos",
    },
    {
      name: "L�nea Arc con Arrow",
      description: "L�nea curva con flecha al final",
    },
    {
      name: "L�nea con Outline y Shadow",
      description: "L�nea con efectos visuales",
    },
    {
      name: "L�nea con Labels",
      description: "L�nea con etiquetas en start, middle y end",
    },
  ];
  const renderTest = () => {
    console.log(
      "[LEADER_LINE_DEBUG] renderTest called for currentTest:",
      currentTest
    );
    console.log("[LEADER_LINE_DEBUG] BasicTestComponent states:", {
      showLines,
      layoutReady,
      currentTest,
      willRenderLeaderLine: showLines && layoutReady,
    });
    switch (currentTest) {
      case 0:
        console.log("[LEADER_LINE_DEBUG] Rendering test 0 (basic line)");
        return _jsxs(_Fragment, {
          children: [
            _jsx(View, {
              ref: startRef1,
              style: [styles.box, styles.blueBox],
              onLayout: (event) => {
                console.log(
                  "[LEADER_LINE_DEBUG] Test 0 - Start element layout:",
                  event.nativeEvent.layout
                );
                handleElementLayout("startRef1");
              },
              children: _jsx(Text, {
                style: styles.boxText,
                children: "Inicio",
              }),
            }),
            _jsx(View, {
              ref: endRef1,
              style: [styles.box, styles.redBox, { marginLeft: 200 }],
              onLayout: (event) => {
                console.log(
                  "[LEADER_LINE_DEBUG] Test 0 - End element layout:",
                  event.nativeEvent.layout
                );
                handleElementLayout("endRef1");
              },
              children: _jsx(Text, {
                style: styles.boxText,
                children: "Final",
              }),
            }),
            showLines &&
              _jsx(LeaderLine, {
                start: { element: startRef1 },
                end: { element: endRef1 },
                color: "#3498db",
                strokeWidth: 3,
                path: "straight",
                testID: "basic-line",
              }),
            showLines &&
              _jsx(LeaderLine, {
                start: { point: { x: 0, y: 0 } },
                end: { point: { x: 3000, y: 3000 } },
                color: "#FF0000",
                strokeWidth: 10,
                path: "straight",
                testID: "test-diagonal-line",
              }),
          ],
        });
      case 1:
        return _jsxs(_Fragment, {
          children: [
            _jsx(View, {
              ref: startRef2,
              style: [styles.box, styles.greenBox],
              children: _jsx(Text, {
                style: styles.boxText,
                children: "Start",
              }),
            }),
            _jsx(View, {
              ref: endRef2,
              style: [
                styles.box,
                styles.purpleBox,
                { marginLeft: 150, marginTop: 80 },
              ],
              children: _jsx(Text, { style: styles.boxText, children: "End" }),
            }),
            showLines &&
              _jsx(LeaderLine, {
                start: { element: startRef2 },
                end: { element: endRef2 },
                color: "#e74c3c",
                strokeWidth: 4,
                path: "arc",
                curvature: 0.3,
                endPlug: "arrow1",
                startSocket: "right",
                endSocket: "left",
                testID: "arc-line",
              }),
          ],
        });
      case 2:
        return _jsxs(_Fragment, {
          children: [
            _jsx(View, {
              ref: startRef3,
              style: [styles.box, styles.orangeBox],
              children: _jsx(Text, {
                style: styles.boxText,
                children: "Source",
              }),
            }),
            _jsx(View, {
              ref: endRef3,
              style: [
                styles.box,
                styles.tealBox,
                { marginLeft: 120, marginTop: 120 },
              ],
              children: _jsx(Text, {
                style: styles.boxText,
                children: "Target",
              }),
            }),
            showLines &&
              _jsx(LeaderLine, {
                start: { element: startRef3 },
                end: { element: endRef3 },
                color: "#2ecc71",
                strokeWidth: 5,
                path: "fluid",
                curvature: 0.4,
                endPlug: "arrow2",
                outline: { enabled: true, color: "white", size: 2 },
                dropShadow: { dx: 3, dy: 3, blur: 5, color: "rgba(0,0,0,0.3)" },
                startSocket: "bottom",
                endSocket: "top",
                testID: "styled-line",
              }),
          ],
        });
      case 3:
        return _jsxs(_Fragment, {
          children: [
            _jsx(View, {
              ref: startRef4,
              style: [styles.box, styles.yellowBox],
              children: _jsx(Text, { style: styles.boxText, children: "From" }),
            }),
            _jsx(View, {
              ref: endRef4,
              style: [
                styles.box,
                styles.pinkBox,
                { marginLeft: 180, marginTop: 60 },
              ],
              children: _jsx(Text, { style: styles.boxText, children: "To" }),
            }),
            showLines &&
              _jsx(LeaderLine, {
                start: { element: startRef4 },
                end: { element: endRef4 },
                color: "#9b59b6",
                strokeWidth: 3,
                path: "arc",
                curvature: 0.25,
                endPlug: "arrow1",
                startLabel: "Inicio",
                middleLabel: {
                  text: "Proceso",
                  backgroundColor: "#f39c12",
                  color: "white",
                  borderRadius: 8,
                  padding: 6,
                },
                endLabel: "Fin",
                startSocket: "right",
                endSocket: "left",
                testID: "labeled-line",
              }),
          ],
        });
      default:
        return null;
    }
  };
  return _jsx(SafeAreaView, {
    style: styles.container,
    onLayout: (event) => {
      console.log(
        "[LEADER_LINE_DEBUG] SafeAreaView layout:",
        event.nativeEvent.layout
      );
      console.log(
        "[LEADER_LINE_DEBUG] Container hierarchy offsets - SafeAreaView:",
        {
          x: event.nativeEvent.layout.x,
          y: event.nativeEvent.layout.y,
          cumulativeOffset: { x: 0, y: 0 }
        }
      );
    },
    children: _jsxs(ScrollView, {
      style: styles.scrollView,
      onLayout: (event) => {
        console.log(
          "[LEADER_LINE_DEBUG] ScrollView layout:",
          event.nativeEvent.layout
        );
        console.log(
          "[LEADER_LINE_DEBUG] Container hierarchy offsets - ScrollView:",
          {
            x: event.nativeEvent.layout.x,
            y: event.nativeEvent.layout.y,
            cumulativeFromSafeArea: { x: event.nativeEvent.layout.x, y: event.nativeEvent.layout.y }
          }
        );
      },
      onScroll: (event) => {
        console.log("[LEADER_LINE_DEBUG] ScrollView scroll offset:", {
          x: event.nativeEvent.contentOffset.x,
          y: event.nativeEvent.contentOffset.y,
        });
      },
      children: [
        _jsxs(View, {
          style: styles.header,
          children: [
            _jsx(Text, {
              style: styles.title,
              children: "React Native Leader Line - Pruebas B\uFFFDsicas",
            }),
            _jsxs(Text, {
              style: styles.subtitle,
              children: [
                "Test ",
                currentTest + 1,
                " de ",
                tests.length,
                ": ",
                tests[currentTest].name,
              ],
            }),
            _jsx(Text, {
              style: styles.description,
              children: tests[currentTest].description,
            }),
          ],
        }),
        _jsxs(View, {
          style: styles.controls,
          children: [
            _jsx(TouchableOpacity, {
              style: styles.button,
              onPress: () => setShowLines(!showLines),
              children: _jsx(Text, {
                style: styles.buttonText,
                children: showLines ? "Ocultar L�neas" : "Mostrar L�neas",
              }),
            }),
            _jsxs(View, {
              style: styles.testSelector,
              children: [
                _jsx(TouchableOpacity, {
                  style: [
                    styles.navButton,
                    currentTest === 0 && styles.disabledButton,
                  ],
                  onPress: () => setCurrentTest(Math.max(0, currentTest - 1)),
                  disabled: currentTest === 0,
                  children: _jsx(Text, {
                    style: styles.navButtonText,
                    children: "\uFFFD Anterior",
                  }),
                }),
                _jsxs(Text, {
                  style: styles.testCounter,
                  children: [currentTest + 1, " / ", tests.length],
                }),
                _jsx(TouchableOpacity, {
                  style: [
                    styles.navButton,
                    currentTest === tests.length - 1 && styles.disabledButton,
                  ],
                  onPress: () =>
                    setCurrentTest(Math.min(tests.length - 1, currentTest + 1)),
                  disabled: currentTest === tests.length - 1,
                  children: _jsx(Text, {
                    style: styles.navButtonText,
                    children: "Siguiente \uFFFD",
                  }),
                }),
              ],
            }),
          ],
        }),
        _jsx(View, {
          style: styles.testArea,
          onLayout: (event) => {
            console.log(
              "[LEADER_LINE_DEBUG] TestArea layout:",
              event.nativeEvent.layout
            );
            console.log(
              "[LEADER_LINE_DEBUG] Container hierarchy offsets - TestArea:",
              {
                x: event.nativeEvent.layout.x,
                y: event.nativeEvent.layout.y,
                margin: 20,
                padding: 30,
                totalOffset: { 
                  x: event.nativeEvent.layout.x + 20 + 30, 
                  y: event.nativeEvent.layout.y + 20 + 30 
                }
              }
            );
          },
          children: renderTest(),
        }),
        _jsxs(View, {
          style: styles.info,
          children: [
            _jsx(Text, {
              style: styles.infoTitle,
              children: "Estado del Test:",
            }),
            _jsxs(Text, {
              style: styles.infoText,
              children: ['" L\uFFFDneas visibles: ', showLines ? "S�" : "No"],
            }),
            _jsxs(Text, {
              style: styles.infoText,
              children: ['" Test actual: ', tests[currentTest].name],
            }),
            _jsxs(Text, {
              style: styles.infoText,
              children: [
                '" Componentes: ',
                currentTest === 0
                  ? 2
                  : currentTest === 1
                  ? 2
                  : currentTest === 2
                  ? 2
                  : 2,
                " elementos conectados",
              ],
            }),
          ],
        }),
        _jsxs(View, {
          style: styles.instructions,
          children: [
            _jsx(Text, {
              style: styles.instructionsTitle,
              children: "Instrucciones:",
            }),
            _jsx(Text, {
              style: styles.instructionsText,
              children:
                "1. Verifica que las l\uFFFDneas se dibujen correctamente entre los elementos",
            }),
            _jsx(Text, {
              style: styles.instructionsText,
              children:
                '2. Prueba el bot\uFFFDn "Ocultar/Mostrar L\uFFFDneas" para verificar la funcionalidad',
            }),
            _jsx(Text, {
              style: styles.instructionsText,
              children:
                "3. Navega entre los diferentes tests usando los botones",
            }),
            _jsx(Text, {
              style: styles.instructionsText,
              children:
                "4. Observa los diferentes estilos, paths y efectos en cada test",
            }),
          ],
        }),
      ],
    }),
  });
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#3498db",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#6c757d",
  },
  controls: {
    padding: 20,
    backgroundColor: "#fff",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#3498db",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  testSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navButton: {
    backgroundColor: "#6c757d",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 6,
  },
  disabledButton: {
    backgroundColor: "#dee2e6",
  },
  navButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  testCounter: {
    fontSize: 16,
    fontWeight: "600",
    color: "#495057",
  },
  testArea: {
    margin: 20,
    padding: 30,
    backgroundColor: "#fff",
    borderRadius: 12,
    minHeight: 250,
    position: "relative",
  },
  box: {
    width: 80,
    height: 60,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  boxText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
  blueBox: { backgroundColor: "#3498db", top: 20, left: 20 },
  redBox: { backgroundColor: "#e74c3c", top: 20 },
  greenBox: { backgroundColor: "#2ecc71", top: 30, left: 30 },
  purpleBox: { backgroundColor: "#9b59b6", top: 30 },
  orangeBox: { backgroundColor: "#f39c12", top: 40, left: 40 },
  tealBox: { backgroundColor: "#1abc9c", top: 40 },
  yellowBox: { backgroundColor: "#f1c40f", top: 50, left: 50 },
  pinkBox: { backgroundColor: "#e91e63", top: 50 },
  info: {
    margin: 20,
    marginTop: 0,
    padding: 15,
    backgroundColor: "#e8f5e8",
    borderRadius: 8,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#27ae60",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: "#2d5a3d",
    marginBottom: 4,
  },
  instructions: {
    margin: 20,
    marginTop: 0,
    padding: 15,
    backgroundColor: "#fff3cd",
    borderRadius: 8,
    marginBottom: 40,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#856404",
    marginBottom: 8,
  },
  instructionsText: {
    fontSize: 14,
    color: "#856404",
    marginBottom: 4,
  },
});
export default BasicTestComponent;
//# sourceMappingURL=BasicTestComponent.js.map
