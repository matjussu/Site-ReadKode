import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

interface Screenshot {
  src: string;
  alt: string;
}

interface PhoneCarouselProps {
  screenshots: Screenshot[];
}

export default function PhoneCarousel({ screenshots }: PhoneCarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(2);
  const [isMobile, setIsMobile] = useState(false);
  const total = screenshots.length;

  // Detect mobile for responsive offsets
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Swipe gesture handling
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX;
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;

    if (diff > threshold) {
      // Swipe left - next
      setSelectedIndex((prev) => (prev + 1) % total);
    } else if (diff < -threshold) {
      // Swipe right - previous
      setSelectedIndex((prev) => (prev - 1 + total) % total);
    }
  };

  const handleClick = (index: number) => {
    if (index !== selectedIndex) {
      setSelectedIndex(index);
    }
  };

  // Calculer la position visuelle pour un index donné (avec wrap-around)
  const getVisualPosition = (index: number) => {
    let diff = index - selectedIndex;

    // Wrap around pour le carrousel infini
    if (diff > Math.floor(total / 2)) diff -= total;
    if (diff < -Math.floor(total / 2)) diff += total;

    return diff;
  };

  // Styles selon la position visuelle - responsive offsets
  const getStyles = (visualPos: number) => {
    const absPos = Math.abs(visualPos);
    const offset = isMobile ? 150 : 230;
    const outerOffset = isMobile ? 130 : 210;

    if (absPos === 0) {
      return { scale: 1.1, zIndex: 30, opacity: 1, x: 0 };
    } else if (absPos === 1) {
      return { scale: 1, zIndex: 20, opacity: 0.9, x: visualPos * offset };
    } else {
      return { scale: 0.9, zIndex: 10, opacity: 0.7, x: visualPos * outerOffset };
    }
  };

  return (
    <div
      className="relative flex items-center justify-center py-8 min-h-[450px] sm:min-h-[500px] md:min-h-[600px]"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative flex items-center justify-center">
        {screenshots.map((screenshot, index) => {
          const visualPos = getVisualPosition(index);
          const styles = getStyles(visualPos);
          const isCenter = visualPos === 0;
          const isVisible = Math.abs(visualPos) <= 2;

          if (!isVisible) return null;

          return (
            <motion.div
              key={index}
              className="absolute cursor-pointer"
              animate={{
                scale: styles.scale,
                zIndex: styles.zIndex,
                opacity: styles.opacity,
                x: styles.x,
              }}
              transition={{
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              onClick={() => handleClick(index)}
              whileHover={!isCenter ? { scale: styles.scale * 1.05 } : {}}
            >
              {/* Responsive phone size */}
              <div className="w-[140px] sm:w-[160px] md:w-[200px] lg:w-[220px]">
                {/* Phone frame */}
                <div className="relative bg-[#1a1a1a] rounded-[1.25rem] sm:rounded-[1.5rem] md:rounded-[2.5rem] p-1 sm:p-1.5 md:p-2 shadow-2xl border border-[#333]">
                  {/* Dynamic Island */}
                  <div className="absolute top-1 sm:top-1.5 md:top-3 left-1/2 -translate-x-1/2 w-[40px] sm:w-[50px] md:w-[70px] h-[12px] sm:h-[14px] md:h-[18px] bg-black rounded-full z-20" />

                  {/* Screen */}
                  <div className="relative rounded-[1rem] sm:rounded-[1.25rem] md:rounded-[2rem] overflow-hidden bg-black aspect-[9/19.5]">
                    <img
                      src={screenshot.src}
                      alt={screenshot.alt}
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                      draggable={false}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation indicators with larger touch targets */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-1">
        {screenshots.map((_, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className="p-3 -m-2 touch-manipulation"
            aria-label={`View screenshot ${index + 1}`}
          >
            <span
              className={`block w-2.5 h-2.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                index === selectedIndex
                  ? 'bg-accent w-6 sm:w-6'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
