import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';

interface PhoneMockupProps {
  screenshot: string;
  className?: string;
}

export default function PhoneMockup({ screenshot, className = '' }: PhoneMockupProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Rotation 3D basée sur le scroll avec des valeurs plus subtiles
  const rawRotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-60, 0, 60]);
  const rawRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [4, 0, -4]);

  // Ajout de spring pour des mouvements plus fluides
  const rotateY = useSpring(rawRotateY, { stiffness: 100, damping: 30 });
  const rotateX = useSpring(rawRotateX, { stiffness: 100, damping: 30 });

  // Légère translation verticale basée sur le scroll
  const rawY = useTransform(scrollYProgress, [0, 0.5, 1], [20, 0, -20]);
  const y = useSpring(rawY, { stiffness: 100, damping: 30 });

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ perspective: '1200px' }}
    >
      <motion.div
        style={{ rotateY, rotateX, y }}
        className="will-change-transform"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Floating animation wrapper */}
        <motion.div
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {/* iPhone Frame - responsive with max-width for very small screens */}
          <div className="relative mx-auto w-full max-w-[260px] sm:max-w-[280px] md:max-w-[320px]">
            {/* Phone body */}
            <div className="relative bg-[#1a1a1a] rounded-[2.5rem] sm:rounded-[3rem] p-2.5 sm:p-3 shadow-2xl border border-[#333]">
              {/* Dynamic Island */}
              <div className="absolute top-3 sm:top-4 left-1/2 -translate-x-1/2 w-[80px] sm:w-[100px] h-[22px] sm:h-[28px] bg-black rounded-full z-20" />

              {/* Screen */}
              <div className="relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden bg-black aspect-[9/19.5]">
                {/* Status bar simulation */}
                <div className="absolute top-0 left-0 right-0 h-10 sm:h-12 bg-gradient-to-b from-black/50 to-transparent z-10" />

                {/* Screenshot */}
                <img
                  src={screenshot}
                  alt="App screenshot"
                  className="w-full h-full object-cover object-top"
                />

                {/* Bottom home indicator */}
                <div className="absolute bottom-1.5 sm:bottom-2 left-1/2 -translate-x-1/2 w-[80px] sm:w-[100px] h-[4px] sm:h-[5px] bg-white/30 rounded-full" />
              </div>
            </div>

            {/* Glow effect with animation */}
            <motion.div
              className="absolute inset-0 -z-10 bg-accent/20 blur-3xl rounded-full"
              animate={{
                scale: [0.7, 0.8, 0.7],
                opacity: [0.4, 0.6, 0.4],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
