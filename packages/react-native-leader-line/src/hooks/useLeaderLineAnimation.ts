import { useCallback, useEffect, useRef, useState } from "react";
import { Animated, Easing } from "react-native";
import { AnimationType } from "../types";

export interface UseLeaderLineAnimationProps {
  enabled?: boolean;
  type?: AnimationType;
  duration?: number;
  delay?: number;
  loop?: boolean;
  autoStart?: boolean;
  onComplete?: () => void;
}

export const useLeaderLineAnimation = ({
  enabled = false,
  type = "fade",
  duration = 300,
  delay = 0,
  loop = false,
  autoStart = true,
  onComplete,
}: UseLeaderLineAnimationProps) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const animate = useCallback(
    (toValue: number, customDuration?: number) => {
      setIsAnimating(true);

      const animation = Animated.timing(animatedValue, {
        toValue,
        duration: customDuration || duration,
        delay,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        useNativeDriver: false, // SVG doesn't support native driver
      });

      if (loop && toValue === 1) {
        Animated.loop(animation, { resetBeforeIteration: true }).start(() => {
          setIsAnimating(false);
          onComplete?.();
        });
      } else {
        animation.start(() => {
          setIsAnimating(false);
          setIsVisible(toValue === 1);
          onComplete?.();
        });
      }
    },
    [animatedValue, duration, delay, loop, onComplete]
  );

  const show = useCallback(
    (customDuration?: number) => {
      animate(1, customDuration);
    },
    [animate]
  );

  const hide = useCallback(
    (customDuration?: number) => {
      animate(0, customDuration);
    },
    [animate]
  );

  const toggle = useCallback(
    (customDuration?: number) => {
      animate(isVisible ? 0 : 1, customDuration);
    },
    [animate, isVisible]
  );

  // Auto-start animation
  useEffect(() => {
    if (enabled && autoStart) {
      show();
    }
  }, [enabled, autoStart, show]);

  // Generate animated styles based on animation type
  const getAnimatedStyle = useCallback(() => {
    switch (type) {
      case "fade":
        return {
          opacity: animatedValue,
        };

      case "scale":
        return {
          opacity: animatedValue,
          transform: [
            {
              scale: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0.3, 1],
              }),
            },
          ],
        };

      case "slide":
        return {
          opacity: animatedValue,
          transform: [
            {
              translateY: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              }),
            },
          ],
        };

      case "bounce":
        return {
          opacity: animatedValue,
          transform: [
            {
              scale: animatedValue.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0, 1.2, 1],
              }),
            },
          ],
        };

      case "draw":
        return {
          strokeDasharray: "100",
          strokeDashoffset: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [100, 0],
          }),
        };

      default:
        return {
          opacity: animatedValue,
        };
    }
  }, [type, animatedValue]);

  return {
    animatedValue,
    animatedStyle: getAnimatedStyle(),
    isAnimating,
    isVisible,
    show,
    hide,
    toggle,
  };
};
