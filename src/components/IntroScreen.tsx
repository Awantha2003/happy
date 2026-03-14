import React from 'react';
import { motion } from 'framer-motion';
import { HeartIcon, SparklesIcon } from 'lucide-react';
import { FloatingParticles } from './FloatingParticles';
interface IntroScreenProps {
  onComplete: () => void;
}
export function IntroScreen({ onComplete }: IntroScreenProps) {
  const titleWords = 'A little surprise is waiting for you...'.split(' ');
  return (
    <motion.div
      className="intro-gradient fixed inset-0 flex items-center justify-center z-50 overflow-hidden"
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1
      }}
      exit={{
        opacity: 0,
        scale: 1.1,
        filter: 'blur(10px)',
        transition: {
          duration: 1.2,
          ease: [0.4, 0, 0.2, 1]
        }
      }}>
      
      {/* Cinematic Overlays */}
      <div className="vignette" />
      <div className="light-ray" />
      <div className="light-ray" />

      <FloatingParticles count={10} mode="bokeh" />
      <FloatingParticles count={45} mode="sparkle" />

      {/* Soft radial glow behind content */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
          'radial-gradient(ellipse at center, rgba(242, 181, 212, 0.3) 0%, transparent 60%)'
        }}
        aria-hidden="true" />
      

      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-lg"
        initial={{
          opacity: 0,
          y: 30
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.3
        }}>
        
        {/* Decorative icon cluster */}
        <motion.div
          className="flex items-center gap-2 mb-8"
          initial={{
            opacity: 0,
            scale: 0.5
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          transition={{
            duration: 0.8,
            delay: 0.6,
            ease: 'easeOut'
          }}>
          
          <SparklesIcon
            className="w-5 h-5"
            style={{
              color: '#C9A96E'
            }} />
          
          <HeartIcon
            className="w-7 h-7"
            style={{
              color: '#E8A0BF'
            }}
            fill="#E8A0BF" />
          
          <SparklesIcon
            className="w-5 h-5"
            style={{
              color: '#C9A96E'
            }} />
          
        </motion.div>

        {/* Main title - Staggered */}
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight mb-4 flex flex-wrap justify-center gap-x-2"
          style={{
            fontFamily: "'Playfair Display', serif",
            color: '#A0506E',
            textShadow: '0 2px 20px rgba(232, 160, 191, 0.3)'
          }}>
          
          {titleWords.map((word, i) =>
          <motion.span
            key={i}
            initial={{
              opacity: 0,
              y: 20,
              filter: 'blur(4px)'
            }}
            animate={{
              opacity: 1,
              y: 0,
              filter: 'blur(0px)'
            }}
            transition={{
              duration: 0.8,
              delay: 0.8 + i * 0.15,
              ease: [0.22, 1, 0.36, 1]
            }}>
            
              {word}
            </motion.span>
          )}
        </h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg sm:text-xl mb-12"
          style={{
            fontFamily: "'Dancing Script', cursive",
            color: '#C8A2C8'
          }}
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          transition={{
            duration: 1,
            delay: 2.2
          }}>
          
          Made with all my love 💕
        </motion.p>

        {/* CTA Button */}
        <motion.button
          onClick={onComplete}
          className="btn-glow relative px-10 py-4 rounded-full text-white font-medium text-lg cursor-pointer border-0 outline-none"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.15rem',
            fontWeight: 600,
            letterSpacing: '0.03em',
            background:
            'linear-gradient(135deg, #D4A574 0%, #E8A0BF 50%, #C8A2C8 100%)'
          }}
          initial={{
            opacity: 0,
            y: 40,
            scale: 0.9
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1
          }}
          transition={{
            duration: 0.8,
            delay: 2.8,
            type: 'spring',
            bounce: 0.4
          }}
          whileHover={{
            scale: 1.06,
            boxShadow:
            '0 0 40px rgba(212, 165, 116, 0.5), 0 0 80px rgba(232, 160, 191, 0.3)'
          }}
          whileTap={{
            scale: 0.97
          }}>
          
          Open Your Surprise ✨
        </motion.button>

        {/* Decorative dots below button */}
        <motion.div
          className="flex items-center gap-3 mt-10"
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 0.5
          }}
          transition={{
            duration: 1,
            delay: 3.2
          }}>
          
          {[4, 3, 2, 3, 4].map((size, i) =>
          <div
            key={i}
            className="rounded-full"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: '#D4A574',
              opacity: i === 2 ? 0.8 : 0.4
            }} />

          )}
        </motion.div>
      </motion.div>
    </motion.div>);

}