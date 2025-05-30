import { useCallback, useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
export const useLeaderLineAnimation = (options = {}) => {
    const opacity = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(0)).current;
    const strokeDashOffset = useRef(new Animated.Value(0)).current;
    const rotation = useRef(new Animated.Value(0)).current;
    const translateX = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(0)).current;
    const getEasing = useCallback((timingFunction) => {
        switch (timingFunction) {
            case "linear":
                return Easing.linear;
            case "ease-in":
                return Easing.in(Easing.ease);
            case "ease-out":
                return Easing.out(Easing.ease);
            case "ease-in-out":
                return Easing.inOut(Easing.ease);
            case "ease":
            default:
                return Easing.ease;
        }
    }, []);
    // Enhanced show method with more animation types
    const show = useCallback((animationType = "fade", animationOptions) => {
        const duration = (animationOptions === null || animationOptions === void 0 ? void 0 : animationOptions.duration) || options.duration || 300;
        const easing = getEasing((animationOptions === null || animationOptions === void 0 ? void 0 : animationOptions.timing) || options.easing || "ease");
        const delay = (animationOptions === null || animationOptions === void 0 ? void 0 : animationOptions.delay) || 0;
        return new Promise((resolve) => {
            const animations = [];
            switch (animationType) {
                case "fade":
                    animations.push(Animated.timing(opacity, {
                        toValue: 1,
                        duration,
                        easing,
                        delay,
                        useNativeDriver: true,
                    }));
                    break;
                case "slide":
                    scale.setValue(0);
                    opacity.setValue(1);
                    animations.push(Animated.spring(scale, {
                        toValue: 1,
                        tension: 100,
                        friction: 8,
                        delay,
                        useNativeDriver: true,
                    }));
                    break;
                case "draw":
                    opacity.setValue(1);
                    strokeDashOffset.setValue(1000); // Start with offset that hides the line
                    animations.push(Animated.timing(strokeDashOffset, {
                        toValue: 0,
                        duration,
                        easing,
                        delay,
                        useNativeDriver: false, // strokeDashOffset doesn't support native driver
                    }));
                    break;
                case "scale":
                    opacity.setValue(1);
                    scale.setValue(0);
                    animations.push(Animated.spring(scale, {
                        toValue: 1,
                        tension: 150,
                        friction: 6,
                        delay,
                        useNativeDriver: true,
                    }));
                    break;
                default:
                    // Custom animation or fallback
                    opacity.setValue(1);
                    scale.setValue(1);
                    break;
            }
            if (animations.length > 0) {
                Animated.parallel(animations).start(() => {
                    resolve();
                });
            }
            else {
                resolve();
            }
        });
    }, [opacity, scale, strokeDashOffset, options, getEasing]);
    const hide = useCallback((animationType = "fade", animationOptions) => {
        const duration = (animationOptions === null || animationOptions === void 0 ? void 0 : animationOptions.duration) || options.duration || 300;
        const easing = getEasing((animationOptions === null || animationOptions === void 0 ? void 0 : animationOptions.timing) || options.easing || "ease");
        const delay = (animationOptions === null || animationOptions === void 0 ? void 0 : animationOptions.delay) || 0;
        return new Promise((resolve) => {
            const animations = [];
            switch (animationType) {
                case "fade":
                    animations.push(Animated.timing(opacity, {
                        toValue: 0,
                        duration,
                        easing,
                        delay,
                        useNativeDriver: true,
                    }));
                    break;
                case "slide":
                    animations.push(Animated.spring(scale, {
                        toValue: 0,
                        tension: 100,
                        friction: 8,
                        delay,
                        useNativeDriver: true,
                    }));
                    break;
                case "draw":
                    animations.push(Animated.timing(strokeDashOffset, {
                        toValue: -1000, // Move offset to hide the line
                        duration,
                        easing,
                        delay,
                        useNativeDriver: false,
                    }));
                    break;
                case "scale":
                    animations.push(Animated.spring(scale, {
                        toValue: 0,
                        tension: 150,
                        friction: 6,
                        delay,
                        useNativeDriver: true,
                    }));
                    break;
            }
            if (animations.length > 0) {
                Animated.parallel(animations).start(() => {
                    resolve();
                });
            }
            else {
                resolve();
            }
        });
    }, [opacity, scale, strokeDashOffset, options, getEasing]);
    const pulse = useCallback((cycles = 3, animationOptions) => {
        const duration = (animationOptions === null || animationOptions === void 0 ? void 0 : animationOptions.duration) || 200;
        return new Promise((resolve) => {
            const animations = [];
            for (let i = 0; i < cycles; i++) {
                animations.push(Animated.sequence([
                    Animated.timing(scale, {
                        toValue: 1.2,
                        duration: duration / 2,
                        easing: Easing.ease,
                        useNativeDriver: true,
                    }),
                    Animated.timing(scale, {
                        toValue: 1,
                        duration: duration / 2,
                        easing: Easing.ease,
                        useNativeDriver: true,
                    }),
                ]));
            }
            Animated.sequence(animations).start(() => {
                resolve();
            });
        });
    }, [scale]);
    const shake = useCallback((intensity = 10, animationOptions) => {
        const duration = (animationOptions === null || animationOptions === void 0 ? void 0 : animationOptions.duration) || 500;
        return new Promise((resolve) => {
            const shakeAnimation = Animated.sequence([
                Animated.timing(rotation, {
                    toValue: intensity,
                    duration: duration / 8,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(rotation, {
                    toValue: -intensity,
                    duration: duration / 4,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(rotation, {
                    toValue: intensity / 2,
                    duration: duration / 4,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(rotation, {
                    toValue: -intensity / 2,
                    duration: duration / 4,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(rotation, {
                    toValue: 0,
                    duration: duration / 8,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
            ]);
            shakeAnimation.start(() => {
                resolve();
            });
        });
    }, [rotation]);
    // New animation effects from original library
    const bounce = useCallback((animationOptions) => {
        const duration = (animationOptions === null || animationOptions === void 0 ? void 0 : animationOptions.duration) || 600;
        return new Promise((resolve) => {
            Animated.sequence([
                Animated.timing(translateY, {
                    toValue: -20,
                    duration: duration / 4,
                    easing: Easing.out(Easing.quad),
                    useNativeDriver: true,
                }),
                Animated.timing(translateY, {
                    toValue: 0,
                    duration: duration / 4,
                    easing: Easing.in(Easing.bounce),
                    useNativeDriver: true,
                }),
                Animated.timing(translateY, {
                    toValue: -10,
                    duration: duration / 4,
                    easing: Easing.out(Easing.quad),
                    useNativeDriver: true,
                }),
                Animated.timing(translateY, {
                    toValue: 0,
                    duration: duration / 4,
                    easing: Easing.in(Easing.bounce),
                    useNativeDriver: true,
                }),
            ]).start(() => {
                resolve();
            });
        });
    }, [translateY]);
    const elastic = useCallback((animationOptions) => {
        const duration = (animationOptions === null || animationOptions === void 0 ? void 0 : animationOptions.duration) || 800;
        return new Promise((resolve) => {
            scale.setValue(0);
            opacity.setValue(1);
            Animated.spring(scale, {
                toValue: 1,
                tension: 40,
                friction: 3,
                useNativeDriver: true,
            }).start(() => {
                resolve();
            });
        });
    }, [scale, opacity]);
    const morphPath = useCallback((fromPath, toPath, animationOptions) => {
        const duration = (animationOptions === null || animationOptions === void 0 ? void 0 : animationOptions.duration) || 500;
        // For React Native, we'd need to use react-native-reanimated for path morphing
        // This is a simplified version that shows the concept
        return new Promise((resolve) => {
            // Path morphing would require more advanced animation libraries
            setTimeout(resolve, duration);
        });
    }, []);
    const reset = useCallback(() => {
        opacity.setValue(0);
        scale.setValue(0);
        strokeDashOffset.setValue(0);
        rotation.setValue(0);
        translateX.setValue(0);
        translateY.setValue(0);
    }, [opacity, scale, strokeDashOffset, rotation, translateX, translateY]);
    const resetToVisible = useCallback(() => {
        opacity.setValue(1);
        scale.setValue(1);
        strokeDashOffset.setValue(0);
        rotation.setValue(0);
        translateX.setValue(0);
        translateY.setValue(0);
    }, [opacity, scale, strokeDashOffset, rotation, translateX, translateY]);
    // Auto-initialize to visible state
    useEffect(() => {
        resetToVisible();
    }, [resetToVisible]);
    // Enhanced animated styles
    const animatedStyles = {
        opacity,
        transform: [
            { scale },
            { translateX },
            { translateY },
            {
                rotate: rotation.interpolate({
                    inputRange: [-360, 360],
                    outputRange: ["-360deg", "360deg"],
                }),
            },
        ],
    };
    // For SVG path strokeDashoffset (not supported by native driver)
    const strokeDashOffsetValue = strokeDashOffset;
    return {
        show,
        hide,
        pulse,
        shake,
        bounce,
        elastic,
        morphPath,
        reset,
        resetToVisible,
        animatedStyles,
        strokeDashOffsetValue,
        // Individual animated values for custom animations
        opacity,
        scale,
        rotation,
        strokeDashOffset,
        translateX,
        translateY,
    };
};
