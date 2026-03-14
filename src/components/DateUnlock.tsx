import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LockIcon, UnlockIcon } from 'lucide-react';
import { FloatingParticles } from './FloatingParticles';
interface DateUnlockProps {
  onUnlock: () => void;
}
export function DateUnlock({ onUnlock }: DateUnlockProps) {
  const [dd, setDd] = useState('');
  const [mm, setMm] = useState('');
  const yyyy = '2003';
  const [error, setError] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const ddRef = useRef<HTMLInputElement>(null);
  const mmRef = useRef<HTMLInputElement>(null);
  // Auto-focus first input on mount
  useEffect(() => {
    ddRef.current?.focus();
  }, []);
  const handleDdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 2);
    setDd(val);
    setError(false);
    if (val.length === 2) mmRef.current?.focus();
  };
  const handleMmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 2);
    setMm(val);
    setError(false);
    if (val.length === 0) ddRef.current?.focus();
  };
  const handleUnlock = () => {
    // Target date: March 15, 2003 (15/03/2003)
    if (dd === '15' && mm === '03' && yyyy === '2003') {
      setIsUnlocking(true);
      // Dramatic sequence before calling onUnlock
      setTimeout(() => {
        onUnlock();
      }, 3000);
    } else {
      setError(true);
      // Reset error state after shake
      setTimeout(() => setError(false), 600);
    }
  };
  const isFilled = dd.length === 2 && mm.length === 2;
  return (
    <motion.div
      className="unlock-gradient fixed inset-0 flex items-center justify-center z-50 overflow-hidden"
      exit={{
        opacity: 0,
        transition: {
          duration: 1.5
        }
      }}>
      
      <FloatingParticles count={12} mode="bokeh" />
      <FloatingParticles
        count={25}
        mode="dust"
        colors={['rgba(212, 165, 116, 0.5)']} />
      

      {/* Dramatic Golden Burst on Unlock */}
      <AnimatePresence>
        {isUnlocking &&
        <motion.div
          className="absolute inset-0 z-40 pointer-events-none"
          initial={{
            opacity: 0,
            scale: 0
          }}
          animate={{
            opacity: 1,
            scale: 2
          }}
          transition={{
            duration: 2,
            ease: 'easeIn'
          }}
          style={{
            background:
            'radial-gradient(circle at center, rgba(255,245,238,1) 0%, rgba(212,165,116,0.8) 30%, transparent 70%)'
          }}>
          
            <motion.h1
            className="absolute inset-0 flex items-center justify-center text-5xl md:text-7xl text-white font-bold text-center"
            style={{
              fontFamily: "'Playfair Display', serif",
              textShadow: '0 0 30px rgba(212,165,116,0.8)'
            }}
            initial={{
              opacity: 0,
              scale: 0.8
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            transition={{
              delay: 1,
              duration: 1.5
            }}>
            
              For You, My Love ✨
            </motion.h1>
          </motion.div>
        }
      </AnimatePresence>

      <motion.div
        className="relative z-10 flex flex-col items-center px-6 w-full max-w-md"
        animate={
        isUnlocking ?
        {
          opacity: 0,
          scale: 1.1,
          filter: 'blur(10px)'
        } :
        {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)'
        }
        }
        transition={{
          duration: 1.5
        }}>
        
        <motion.div
          animate={
          isUnlocking ?
          {
            scale: 1.5,
            rotate: 360
          } :
          {
            scale: 1,
            rotate: 0
          }
          }
          transition={{
            duration: 1,
            ease: 'easeInOut'
          }}
          className="mb-6">
          
          {isUnlocking ?
          <UnlockIcon
            className="w-10 h-10 text-[#D4A574]"
            style={{
              filter: 'drop-shadow(0 0 15px rgba(212,165,116,0.8))'
            }} /> :


          <LockIcon className="w-8 h-8 text-[#D4A574] opacity-80" />
          }
        </motion.div>

        <motion.h1
          className="text-3xl md:text-4xl font-semibold mb-3 text-center"
          style={{
            fontFamily: "'Playfair Display', serif",
            color: '#D4A574'
          }}
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 1
          }}>
          
          A Secret Awaits...
        </motion.h1>

        <motion.p
          className="text-xl mb-12 text-center"
          style={{
            fontFamily: "'Dancing Script', cursive",
            color: '#D4B2D8'
          }}
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          transition={{
            duration: 1,
            delay: 0.3
          }}>
          
          Enter your special date to unlock
        </motion.p>

        <motion.div
          className="flex items-center justify-center gap-2 md:gap-4 mb-8 w-full"
          animate={
          error ?
          {
            x: [-10, 10, -10, 10, 0]
          } :
          {}
          }
          transition={{
            duration: 0.4
          }}>
          
          <input
            ref={ddRef}
            type="text"
            value={dd}
            onChange={handleDdChange}
            placeholder="DD"
            className="w-16 md:w-20 text-center text-3xl md:text-4xl bg-transparent border-b-2 border-[#D4A574]/40 focus:border-[#D4A574] outline-none transition-colors pb-2"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: '#D4A574'
            }} />
          
          <span className="text-2xl text-[#D4A574]/40 font-light">/</span>
          <input
            ref={mmRef}
            type="text"
            value={mm}
            onChange={handleMmChange}
            placeholder="MM"
            className="w-16 md:w-20 text-center text-3xl md:text-4xl bg-transparent border-b-2 border-[#D4A574]/40 focus:border-[#D4A574] outline-none transition-colors pb-2"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: '#D4A574'
            }} />
          
          <span className="text-2xl text-[#D4A574]/40 font-light">/</span>
          <input
            type="text"
            value={yyyy}
            readOnly
            aria-label="Year"
            className="w-24 md:w-28 text-center text-3xl md:text-4xl bg-transparent border-b-2 border-[#D4A574]/40 outline-none pb-2 cursor-default"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: '#D4A574'
            }} />
          
        </motion.div>

        <div className="h-8 mb-8">
          <AnimatePresence>
            {error &&
            <motion.p
              initial={{
                opacity: 0,
                y: -10
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              exit={{
                opacity: 0
              }}
              className="text-lg text-center"
              style={{
                fontFamily: "'Dancing Script', cursive",
                color: '#E8A0BF'
              }}>
              
                Not quite... try your birthday, my love 💕
              </motion.p>
            }
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {isFilled && !isUnlocking &&
          <motion.button
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            exit={{
              opacity: 0,
              scale: 0.9
            }}
            onClick={handleUnlock}
            className="btn-glow px-10 py-4 rounded-full text-white font-medium text-lg cursor-pointer border-0 outline-none"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              background: 'linear-gradient(135deg, #D4A574 0%, #B8956A 100%)'
            }}
            whileHover={{
              scale: 1.05
            }}
            whileTap={{
              scale: 0.95
            }}>
            
              Unlock My Surprise 🔓
            </motion.button>
          }
        </AnimatePresence>
      </motion.div>
    </motion.div>);

}
