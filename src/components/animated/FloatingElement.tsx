import { motion } from 'framer-motion';
import { useState, useEffect, type ReactNode } from 'react';

interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  distance?: number;
  delay?: number;
}

export default function FloatingElement({
  children,
  className = '',
  duration = 6,
  distance = 20,
  delay = 0,
}: FloatingElementProps) {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  // Before hydration, show content without animation
  if (!hasHydrated) {
    return (
      <div className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ y: 0 }}
      animate={{
        y: [-distance / 2, distance / 2, -distance / 2],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
