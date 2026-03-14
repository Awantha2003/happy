import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartIcon, StarIcon, GiftIcon, SparklesIcon } from 'lucide-react';
import { FloatingParticles } from './FloatingParticles';

interface SurpriseRevealProps {
  isMobile: boolean;
}

export function SurpriseReveal({ isMobile }: SurpriseRevealProps) {
  const [stage, setStage] = useState<'box' | 'exploding' | 'letter'>('box');
  const [clickCount, setClickCount] = useState(0);

  const handleBoxClick = () => {
    if (clickCount < 2) {
      setClickCount(prev => prev + 1);
    } else {
      setStage('exploding');
      setTimeout(() => setStage('letter'), 1500);
    }
  };

  const boxShakeHover = {
    rotate: [0, -5, 5, -5, 5, 0],
    transition: { duration: 0.4 }
  };

  const letterLines = [
    "To the girl who holds my entire heart,",
    "Every moment with you feels like magic.",
    "Your smile is my favorite sight (Sight 👁️)",
    "Your laugh is my favorite song (Sound 🎵)",
    "Your hand in mine feels like home (Touch ✋)",
    "This is just the beginning of your surprise...",
    "Get ready for the best Birthday Journey! 🎉",
    "I love you endlessly. 💕"
  ];

  return (
    <div className={`w-full h-full flex flex-col items-center justify-center relative overflow-hidden page-texture ${isMobile ? 'px-4 py-8' : 'px-12'}`}
      style={{ boxShadow: 'inset 0 0 40px rgba(0,0,0,0.05)' }}>
      
      <AnimatePresence mode="wait">
        {stage !== 'letter' ? (
          <motion.div
            key="gift-box"
            className="flex flex-col items-center relative z-20"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5, filter: 'blur(10px)', transition: { duration: 1 } }}
          >
            <motion.h2 
              className={`font-semibold mb-8 ${isMobile ? 'text-2xl' : 'text-4xl'}`}
              style={{ fontFamily: "'Playfair Display', serif", color: '#B8956A' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              One Final Surprise...
            </motion.h2>

            <motion.div
              onClick={handleBoxClick}
              className="cursor-pointer relative"
              whileHover={boxShakeHover}
              animate={
                clickCount > 0 && stage === 'box' ? {
                  scale: [1, 1.1, 0.9, 1.1, 1],
                  rotate: [0, -10, 10, -10, 10, 0],
                } : {}
              }
              transition={{ duration: 0.5 }}
            >
              {/* Glowing aura */}
              <div className="absolute inset-0 bg-[#E8A0BF] rounded-full blur-[40px] opacity-40 animate-pulse" />
              
              <div className="bg-gradient-to-br from-[#D4A574] to-[#B8956A] p-8 rounded-2xl shadow-2xl border-4 border-[#FFF8F2] relative z-10 flex items-center justify-center">
                <GiftIcon size={isMobile ? 80 : 120} color="#FFF8F2" style={{ filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.3))' }} />
                
                {/* Ribbon overlay effect using basic shapes */}
                <div className="absolute top-0 bottom-0 w-8 bg-[#E8A0BF]/80 drop-shadow-md backdrop-blur-sm" />
                <div className="absolute left-0 right-0 h-8 bg-[#E8A0BF]/80 drop-shadow-md backdrop-blur-sm" />
              </div>

              {clickCount === 0 && (
                <motion.p 
                  className="text-center mt-6 text-[#8B6F6F] text-xl"
                  style={{ fontFamily: "'Dancing Script', cursive" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  Tap to open ✨
                </motion.p>
              )}
              {clickCount > 0 && clickCount < 2 && (
                <motion.p 
                  className="text-center mt-6 text-[#E8A0BF] text-xl font-bold"
                  style={{ fontFamily: "'Dancing Script', cursive" }}
                >
                  Keep tapping! 💖
                </motion.p>
              )}
            </motion.div>

            {stage === 'exploding' && (
              <motion.div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
                {/* Magic explosion particles */}
                {Array.from({ length: 30 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                    animate={{
                      opacity: 0,
                      scale: Math.random() * 2 + 1,
                      x: (Math.random() - 0.5) * 600,
                      y: (Math.random() - 0.5) * 600,
                      rotate: Math.random() * 360
                    }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                  >
                    {i % 3 === 0 ? <HeartIcon fill="#E8A0BF" color="#E8A0BF" size={24} /> : 
                     i % 3 === 1 ? <StarIcon fill="#D4A574" color="#D4A574" size={20} /> : 
                     <SparklesIcon color="#FFF8F2" size={28} />}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="letter"
            className="flex flex-col items-center justify-center w-full max-w-lg relative z-30"
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, type: 'spring' }}
          >
            {/* Elegant Letter Container */}
            <div className="w-full bg-[#FFFDF9] rounded-sm p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-[#E8DCC4] relative">
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none rounded-sm">
                <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-[#D4A574]/40" />
                <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[#D4A574]/40" />
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#E8A0BF]/10 rounded-full blur-[20px]" />
              </div>

              <FloatingParticles count={15} mode="sparkle" />

              <div className="text-center mb-8 relative z-10">
                <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", color: '#8B3A5A' }}>
                  Happy Birthday
                </h1>
                <div className="w-24 h-[2px] mx-auto bg-gradient-to-r from-transparent via-[#D4A574] to-transparent" />
              </div>

              <div className="space-y-4 text-center relative z-10">
                {letterLines.map((line, index) => (
                  <motion.p
                    key={index}
                    className={`text-xl md:text-2xl ${index >= letterLines.length - 2 ? 'font-bold text-[#E8A0BF]' : 'text-[#8B6F6F]'}`}
                    style={{ fontFamily: "'Dancing Script', cursive", lineHeight: '1.6' }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.4, duration: 0.8 }}
                  >
                    {line}
                  </motion.p>
                ))}
              </div>

              <motion.div 
                className="mt-10 flex justify-center"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 4, duration: 0.8, type: 'spring' }}
              >
                <div className="w-16 h-16 rounded-full bg-[#8B3A5A] flex items-center justify-center shadow-lg border-2 border-[#D4A574]">
                   <HeartIcon size={32} color="#FFF8F2" fill="#E8A0BF" />
                </div>
              </motion.div>
            </div>
            
            {/* Interactive "Accept Journey" Button */}
            <motion.button
              className="mt-8 px-10 py-4 rounded-full text-white font-semibold text-lg drop-shadow-xl"
              style={{
                background: 'linear-gradient(135deg, #8B3A5A 0%, #D4A574 100%)',
                fontFamily: "'Playfair Display', serif"
              }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(212,165,116,0.6)' }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 5.5, duration: 1 }}
              onClick={() => {
                alert("This is just the start! I have an entire day planned for you. Dress nice, and let's go! ❤️");
              }}
            >
              Start My Birthday Journey 🌟
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
