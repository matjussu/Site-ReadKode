import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect, type ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.6,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-50px' });
  const [hasHydrated, setHasHydrated] = useState(false);
  const [wasInViewOnMount, setWasInViewOnMount] = useState(false);

  useEffect(() => {
    // Check if element is already in view when hydrating
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      setWasInViewOnMount(isVisible);
    }
    setHasHydrated(true);
  }, []);

  const directionOffset = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
    none: {},
  };

  // Before hydration, show content immediately (no animation)
  if (!hasHydrated) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  // If element was already visible on mount, skip the initial animation
  // to prevent the flash of invisible content
  const shouldAnimate = !wasInViewOnMount;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={shouldAnimate ? {
        opacity: 0,
        ...directionOffset[direction],
      } : false}
      animate={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      transition={shouldAnimate && !isInView ? {
        duration: 0,
      } : {
        duration,
        delay: shouldAnimate ? delay : 0,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
