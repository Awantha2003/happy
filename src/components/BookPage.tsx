import React, { useEffect, useState, lazy, memo } from 'react';
import { motion } from 'framer-motion';
interface Memory {
  photo: string;
  caption: string;
}
interface BookPageProps {
  memory: Memory;
  pageNumber: number;
  totalPages: number;
  isMobile: boolean;
}
export function BookPage({
  memory,
  pageNumber,
  totalPages,
  isMobile
}: BookPageProps) {
  const [displayedCaption, setDisplayedCaption] = useState('');
  // Typewriter effect
  useEffect(() => {
    setDisplayedCaption('');
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedCaption(memory.caption.slice(0, i + 1));
      i++;
      if (i >= memory.caption.length) clearInterval(interval);
    }, 40); // 40ms per character
    return () => clearInterval(interval);
  }, [memory.caption, pageNumber]);
  if (isMobile) {
    return (
      <div className="w-full flex flex-col items-center gap-6 px-4 py-6 page-texture paper-ruled relative h-full overflow-y-auto">
        <div
          className="coffee-stain"
          style={{
            top: '-20px',
            right: '-20px'
          }} />
        

        {/* Polaroid Photo */}
        <motion.div
          className="relative w-full max-w-xs mt-4"
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.6,
            ease: 'easeOut'
          }}>
          
          <div
            className="polaroid"
            style={{
              transform: `rotate(${pageNumber % 2 === 0 ? -2 : 2}deg)`
            }}>
            
            <img
              src={memory.photo}
              alt={`Memory ${pageNumber}`}
              className="w-full aspect-[4/3] object-cover"
              loading="lazy" />
            
            <p
              className="text-center mt-3 text-xs text-gray-400"
              style={{
                fontFamily: "'Dancing Script', cursive"
              }}>
              
              Our Memory
            </p>
          </div>
        </motion.div>

        {/* Caption */}
        <motion.div
          className="text-center max-w-xs mt-4"
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          transition={{
            duration: 0.6,
            delay: 0.3
          }}>
          
          <p
            className="text-xl leading-relaxed mb-3 min-h-[80px]"
            style={{
              fontFamily: "'Dancing Script', cursive",
              color: '#8B6F6F'
            }}>
            
            {displayedCaption}
            {displayedCaption.length < memory.caption.length &&
            <span className="cursor-blink">|</span>
            }
          </p>
          <p
            className="text-sm mt-4"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: '#C8A2C8'
            }}>
            
            {pageNumber} of {totalPages}
          </p>
        </motion.div>
      </div>);

  }
  // Desktop two-page spread
  return (
    <div className="w-full h-full flex">
      {/* Left page — Photo */}
      <div
        className="w-1/2 h-full page-texture flex items-center justify-center p-8 relative"
        style={{
          borderRight: '1px solid rgba(200, 180, 170, 0.4)',
          boxShadow: 'inset -8px 0 20px rgba(0,0,0,0.06)'
        }}>
        
        <div
          className="coffee-stain"
          style={{
            bottom: '10%',
            left: '5%'
          }} />
        

        <motion.div
          className="relative"
          initial={{
            opacity: 0,
            scale: 0.9,
            rotate: -3
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: pageNumber % 2 === 0 ? -2 : 1.5
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1]
          }}>
          
          {/* Corner Pin */}
          <div
            className="absolute -top-2 left-1/2 -translate-x-1/2 z-10 w-3 h-3 rounded-full bg-gray-300 shadow-sm"
            style={{
              background: 'radial-gradient(circle at 30% 30%, #fff, #999)'
            }} />
          

          <div className="polaroid max-w-[260px]">
            <img
              src={memory.photo}
              alt={`Memory ${pageNumber}`}
              className="w-full aspect-[4/3] object-cover"
              loading="lazy" />
            
            <p
              className="text-center mt-4 text-sm text-gray-400"
              style={{
                fontFamily: "'Dancing Script', cursive"
              }}>
              
              Our Memory
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right page — Caption */}
      <div
        className="w-1/2 h-full page-texture paper-ruled flex flex-col items-center justify-center p-8 relative"
        style={{
          boxShadow: 'inset 8px 0 20px rgba(0,0,0,0.04)'
        }}>
        
        <motion.div
          className="relative text-center max-w-[260px]"
          initial={{
            opacity: 0,
            y: 15
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.7,
            delay: 0.2,
            ease: 'easeOut'
          }}>
          
          {/* Small heart doodle */}
          <div
            className="mb-6 text-2xl"
            style={{
              color: '#E8A0BF',
              opacity: 0.6
            }}
            aria-hidden="true">
            
            ♥
          </div>

          <p
            className="text-xl md:text-2xl leading-relaxed mb-6 min-h-[120px] text-left"
            style={{
              fontFamily: "'Dancing Script', cursive",
              color: '#8B6F6F'
            }}>
            
            {displayedCaption}
            {displayedCaption.length < memory.caption.length &&
            <span className="cursor-blink font-sans text-[#E8A0BF]">|</span>
            }
          </p>

          {/* Decorative line */}
          <div
            className="w-16 h-px mx-auto mb-4"
            style={{
              backgroundColor: '#D4A574',
              opacity: 0.4
            }}
            aria-hidden="true" />
          

          <p
            className="text-sm tracking-wider"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: '#C8A2C8',
              fontWeight: 500
            }}>
            
            {pageNumber} of {totalPages}
          </p>
        </motion.div>
      </div>
    </div>);

}
/* Final birthday page component */
interface FinalPageProps {
  isMobile: boolean;
}
export function FinalPage({ isMobile }: FinalPageProps) {
  const hearts = Array.from(
    {
      length: 15
    },
    (_, i) => ({
      id: i,
      left: `${10 + Math.random() * 80}%`,
      delay: Math.random() * 4,
      duration: 3 + Math.random() * 4,
      size: 12 + Math.random() * 20
    })
  );
  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center relative overflow-hidden page-texture ${isMobile ? 'px-6 py-10' : 'px-12'}`}
      style={{
        boxShadow: 'inset 0 0 40px rgba(0,0,0,0.05)'
      }}>
      
      {/* Floating hearts */}
      {hearts.map((h) =>
      <div
        key={h.id}
        className="absolute pointer-events-none"
        style={{
          left: h.left,
          bottom: '-20px',
          fontSize: `${h.size}px`,
          color: '#E8A0BF',
          opacity: 0.6,
          animationName: 'floatHeart',
          animationDuration: `${h.duration}s`,
          animationDelay: `${h.delay}s`,
          animationIterationCount: 'infinite',
          animationTimingFunction: 'ease-in-out'
        }}
        aria-hidden="true">
        
          ♥
        </div>
      )}

      <motion.div
        className="relative z-10 text-center"
        initial={{
          opacity: 0,
          y: 30
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1]
        }}>
        
        <motion.div
          className="text-4xl mb-6"
          initial={{
            scale: 0
          }}
          animate={{
            scale: 1
          }}
          transition={{
            duration: 0.6,
            delay: 0.3,
            type: 'spring',
            stiffness: 200
          }}>
          
          🎂
        </motion.div>

        <h2
          className={`font-bold mb-6 ${isMobile ? 'text-2xl' : 'text-3xl md:text-4xl'}`}
          style={{
            fontFamily: "'Playfair Display', serif",
            color: '#B8956A',
            textShadow: '0 2px 20px rgba(212, 165, 116, 0.3)'
          }}>
          
          Happy Birthday, My Love
        </h2>

        <div
          className="w-20 h-px mx-auto mb-6"
          style={{
            background:
            'linear-gradient(90deg, transparent, #D4A574, transparent)'
          }}
          aria-hidden="true" />
        

        <p
          className={`leading-relaxed max-w-md mx-auto ${isMobile ? 'text-lg' : 'text-xl md:text-2xl'}`}
          style={{
            fontFamily: "'Dancing Script', cursive",
            color: '#8B6F6F'
          }}>
          
          Every moment with you is a gift I never want to stop unwrapping. You
          make my world brighter, warmer, and infinitely more beautiful. Here's
          to another year of us — of laughter, love, and everything in between.
        </p>

        <motion.p
          className="mt-8 text-xl"
          style={{
            fontFamily: "'Dancing Script', cursive",
            color: '#E8A0BF'
          }}
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          transition={{
            delay: 1.5,
            duration: 1
          }}>
          
          Forever yours 💕
        </motion.p>
      </motion.div>
    </div>);

}