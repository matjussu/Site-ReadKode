import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface CounterAnimationProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export default function CounterAnimation({
  value,
  suffix = '',
  prefix = '',
  duration = 2,
  className = '',
}: CounterAnimationProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [hasHydrated, setHasHydrated] = useState(false);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const spring = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  });

  const display = useTransform(spring, (current) =>
    Math.round(current).toLocaleString()
  );

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  useEffect(() => {
    if (isInView && hasHydrated) {
      spring.set(value);
    }
  }, [isInView, spring, value, hasHydrated]);

  // Before hydration, show the final value to avoid flash
  if (!hasHydrated) {
    return (
      <span ref={ref} className={className}>
        {prefix}
        <span>{value.toLocaleString()}</span>
        {suffix}
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}
