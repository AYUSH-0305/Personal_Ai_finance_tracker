import { useEffect, useState } from 'react';

export const useAnimatedNumber = (
  targetValue: number,
  duration: number = 1000,
  startDelay: number = 0
) => {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let startTime: number;
      let animationId: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth animation
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const value = Math.floor(targetValue * easeOutCubic);
        
        setCurrentValue(value);

        if (progress < 1) {
          animationId = requestAnimationFrame(animate);
        }
      };

      animationId = requestAnimationFrame(animate);

      return () => {
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
      };
    }, startDelay);

    return () => clearTimeout(timeout);
  }, [targetValue, duration, startDelay]);

  return currentValue;
};