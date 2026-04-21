import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useRef, useEffect } from 'react';

interface PhoneMockupProps {
  screenshot: string;
  className?: string;
}

export default function PhoneMockup({ screenshot, className = '' }: PhoneMockupProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll-based 3D (existant)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const scrollRotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-60, 0, 60]);
  const scrollRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [4, 0, -4]);
  const scrollY = useTransform(scrollYProgress, [0, 0.5, 1], [20, 0, -20]);

  // Mousemove parallax — layer additionnel (±8° range)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const mouseRotateY = useTransform(mouseX, [-1, 1], [-8, 8]);
  const mouseRotateX = useTransform(mouseY, [-1, 1], [6, -6]);

  // Combine scroll + mouse (somme des deux sources)
  const rotateY = useSpring(useTransform([scrollRotateY, mouseRotateY], ([s, m]: any) => s + m), {
    stiffness: 120,
    damping: 25,
  });
  const rotateX = useSpring(useTransform([scrollRotateX, mouseRotateX], ([s, m]: any) => s + m), {
    stiffness: 120,
    damping: 25,
  });
  const y = useSpring(scrollY, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const mq = typeof window !== 'undefined' ? window.matchMedia('(pointer: fine)') : null;
    if (!mq || !mq.matches) return;

    const handleMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      mouseX.set((e.clientX / w) * 2 - 1);
      mouseY.set((e.clientY / h) * 2 - 1);
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, [mouseX, mouseY]);

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
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="relative mx-auto w-full max-w-[260px] sm:max-w-[280px] md:max-w-[320px]">
            <div className="relative bg-[#1a1a1a] rounded-[2.5rem] sm:rounded-[3rem] p-2.5 sm:p-3 shadow-[0_25px_80px_-12px_rgba(0,0,0,0.8)] border border-[#333]">
              <div className="absolute top-3 sm:top-4 left-1/2 -translate-x-1/2 w-[80px] sm:w-[100px] h-[22px] sm:h-[28px] bg-black rounded-full z-20" />

              <div className="relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden bg-black aspect-[9/19.5]">
                <div className="absolute top-0 left-0 right-0 h-10 sm:h-12 bg-gradient-to-b from-black/50 to-transparent z-10" />

                <img
                  src={screenshot}
                  alt="App screenshot"
                  className="w-full h-full object-cover object-top"
                />

                <div className="absolute bottom-1.5 sm:bottom-2 left-1/2 -translate-x-1/2 w-[80px] sm:w-[100px] h-[4px] sm:h-[5px] bg-white/30 rounded-full" />
              </div>
            </div>

            <motion.div
              className="absolute inset-0 -z-10 bg-accent/20 blur-3xl rounded-full"
              animate={{ scale: [0.7, 0.85, 0.7], opacity: [0.4, 0.65, 0.4] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
