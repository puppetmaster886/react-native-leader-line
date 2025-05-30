import { Animated } from "react-native";
import { AnimationOptions, AnimationType, TimingFunction } from "../types";
interface UseLeaderLineAnimationOptions {
    duration?: number;
    easing?: TimingFunction;
}
export declare const useLeaderLineAnimation: (options?: UseLeaderLineAnimationOptions) => {
    show: (animationType?: AnimationType, animationOptions?: AnimationOptions) => Promise<void>;
    hide: (animationType?: AnimationType, animationOptions?: AnimationOptions) => Promise<void>;
    pulse: (cycles?: number, animationOptions?: AnimationOptions) => Promise<void>;
    shake: (intensity?: number, animationOptions?: AnimationOptions) => Promise<void>;
    bounce: (animationOptions?: AnimationOptions) => Promise<void>;
    elastic: (animationOptions?: AnimationOptions) => Promise<void>;
    morphPath: (fromPath: string, toPath: string, animationOptions?: AnimationOptions) => Promise<void>;
    reset: () => void;
    resetToVisible: () => void;
    animatedStyles: {
        opacity: Animated.Value;
        transform: ({
            scale: Animated.Value;
            translateX?: undefined;
            translateY?: undefined;
            rotate?: undefined;
        } | {
            translateX: Animated.Value;
            scale?: undefined;
            translateY?: undefined;
            rotate?: undefined;
        } | {
            translateY: Animated.Value;
            scale?: undefined;
            translateX?: undefined;
            rotate?: undefined;
        } | {
            rotate: Animated.AnimatedInterpolation<string | number>;
            scale?: undefined;
            translateX?: undefined;
            translateY?: undefined;
        })[];
    };
    strokeDashOffsetValue: Animated.Value;
    opacity: Animated.Value;
    scale: Animated.Value;
    rotation: Animated.Value;
    strokeDashOffset: Animated.Value;
    translateX: Animated.Value;
    translateY: Animated.Value;
};
export {};
