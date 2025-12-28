import { motion, useScroll, useTransform } from 'framer-motion';
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

  // Rotation 3D au scroll - tourne de -15deg à +15deg
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-12, 0, 12]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [5, 0, -5]);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        style={{ rotateY, rotateX }}
        className="will-change-transform"
      >
        {/* iPhone Frame */}
        <div className="relative mx-auto w-[280px] md:w-[320px]">
          {/* Phone body */}
          <div className="relative bg-[#1a1a1a] rounded-[3rem] p-3 shadow-2xl border border-[#333]">
            {/* Dynamic Island */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-full z-20" />

            {/* Screen */}
            <div className="relative rounded-[2.5rem] overflow-hidden bg-black aspect-[9/19.5]">
              {/* Status bar simulation */}
              <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-black/50 to-transparent z-10" />

              {/* Screenshot */}
              <img
                src={screenshot}
                alt="App screenshot"
                className="w-full h-full object-cover object-top"
              />

              {/* Bottom home indicator */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[100px] h-[5px] bg-white/30 rounded-full" />
            </div>
          </div>

          {/* Glow effect */}
          <div className="absolute inset-0 -z-10 bg-accent/20 blur-3xl rounded-full scale-75 opacity-50" />
        </div>
      </motion.div>
    </div>
  );
}
