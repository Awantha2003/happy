import React, { useCallback, useEffect, useState, useRef, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { FloatingParticles } from './FloatingParticles';
import { BookPage } from './BookPage';
import { SurpriseReveal } from './SurpriseReveal';
import L1 from '../img/L1.jpg';
import L6 from '../img/L6.jpg';
import L12 from '../img/L12.jpg';
import L14 from '../img/L14.jpg';
import L15 from '../img/L15.jpg';
import L16 from '../img/L16.jpg';
interface Memory {
  photo: string;
  caption: string;
}
const memories: Memory[] = [
  {
    photo: L12,
    caption: 'Dancing in the rain, laughing at nothing... pure happiness 🌸'
  },
  {
    photo: L6,
    caption:
      'Our first adventure together... every moment felt like a dream ✨'
  },
  {
    photo: L1,
    caption: 'The day we first met... my heart knew before my mind did 💕'
  },
  {
    photo: L14,
    caption: 'Your smile is my favorite thing in this whole world 💗'
  },
  {
    photo: L15,
    caption: 'Every page with you becomes my favorite chapter 💞'
  },
  {
    photo: L16,
    caption: 'Happy Birthday, my love. Here is to forever with you 🎂💕'
  }];

export function MemoryBook() {
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mousePos, setMousePos] = useState({
    x: 0,
    y: 0
  });
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const bookRef = useRef<HTMLDivElement>(null);
  const totalPages = memories.length + 1;
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isBookOpen || isMobile) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 10; // max 5deg tilt
    const y = (clientY / innerHeight - 0.5) * -10;
    setMousePos({
      x,
      y
    });
  };
  const openBook = useCallback(() => {
    if (!isBookOpen) {
      setIsAnimating(true);
      setIsBookOpen(true);
      setTimeout(() => setIsAnimating(false), 1600);
    }
  }, [isBookOpen]);
  const nextPage = useCallback(() => {
    if (currentPage < totalPages - 1 && !isAnimating) {
      setIsAnimating(true);
      setCurrentPage((p) => p + 1);
      setTimeout(() => setIsAnimating(false), 900);
    }
  }, [currentPage, totalPages, isAnimating]);
  const prevPage = useCallback(() => {
    if (currentPage > 0 && !isAnimating) {
      setIsAnimating(true);
      setCurrentPage((p) => p - 1);
      setTimeout(() => setIsAnimating(false), 900);
    }
  }, [currentPage, isAnimating]);
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);
  const handleTouchEnd = useCallback(() => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;
    if (diff > threshold) nextPage(); else
      if (diff < -threshold) prevPage();
  }, [nextPage, prevPage]);
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        if (!isBookOpen) openBook(); else
          nextPage();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevPage();
      }
    },
    [isBookOpen, openBook, nextPage, prevPage]
  );
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center overflow-hidden wood-texture"
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1
      }}
      transition={{
        duration: 1.5
      }}
      onMouseMove={handleMouseMove}>

      <div className="vignette" />
      <FloatingParticles count={20} mode="dust" />

      {/* Warm overhead lighting */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '800px',
          height: '600px',
          background:
            'radial-gradient(ellipse, rgba(255, 220, 180, 0.15) 0%, rgba(212, 165, 116, 0.05) 40%, transparent 70%)',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
        aria-hidden="true" />


      {/* Book container */}
      <div
        ref={bookRef}
        className="book-perspective relative z-10"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        role="region"
        aria-label="Memory book"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}>

        <AnimatePresence mode="wait">
          {!isBookOpen /* BOOK COVER */ ?
            <motion.div
              key="cover"
              className="cursor-pointer relative"
              style={{
                width: isMobile ? '300px' : '480px',
                height: isMobile ? '400px' : '520px',
                transformStyle: 'preserve-3d'
              }}
              initial={{
                opacity: 0,
                scale: 0.85,
                rotateX: 15
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotateX: mousePos.y,
                rotateY: mousePos.x
              }}
              transition={{
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1]
              }}
              onClick={openBook}
              whileHover={{
                scale: 1.02
              }}
              whileTap={{
                scale: 0.98
              }}>

              {/* Deep Shadow */}
              <div
                className="absolute -bottom-6 left-2 right-2 h-12 rounded-full"
                style={{
                  background: 'rgba(0,0,0,0.6)',
                  filter: 'blur(15px)'
                }}
                aria-hidden="true" />


              {/* Page Edges (Right Side) */}
              <div
                className="absolute right-0 top-2 bottom-2 w-3 translate-x-full book-edge rounded-r-sm"
                style={{
                  transformOrigin: 'left',
                  transform: 'rotateY(20deg)',
                  boxShadow: 'inset 2px 0 5px rgba(0,0,0,0.2)'
                }} />


              {/* Book spine edge */}
              <div
                className="absolute left-0 top-0 bottom-0 w-8 rounded-l-lg z-20"
                style={{
                  background:
                    'linear-gradient(90deg, #5A1E3A 0%, #8B3A5A 40%, #7A2E4A 100%)',
                  boxShadow:
                    'inset -3px 0 6px rgba(0,0,0,0.4), inset 2px 0 4px rgba(255,255,255,0.1)'
                }}
                aria-hidden="true">

                {/* Spine ridges */}
                {[20, 40, 60, 80].map((top) =>
                  <div
                    key={top}
                    className="absolute w-full h-1 bg-black/20"
                    style={{
                      top: `${top}%`,
                      boxShadow: '0 1px 1px rgba(255,255,255,0.1)'
                    }} />

                )}
              </div>

              {/* Cover face */}
              <div
                className="leather-texture w-full h-full rounded-r-md rounded-l-sm flex flex-col items-center justify-center relative overflow-hidden z-10"
                style={{
                  boxShadow:
                    'inset 0 0 60px rgba(0,0,0,0.4), 0 0 20px rgba(0,0,0,0.5)'
                }}>

                {/* Gold border frame */}
                <div
                  className="absolute inset-5 rounded-md pointer-events-none"
                  style={{
                    border: '2px solid rgba(212, 165, 116, 0.6)',
                    boxShadow:
                      'inset 0 0 20px rgba(212, 165, 116, 0.2), 0 0 5px rgba(0,0,0,0.5)'
                  }}>

                  {/* Corner Ornaments */}
                  <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-[#D4A574]" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-[#D4A574]" />
                  <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-[#D4A574]" />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-[#D4A574]" />
                </div>

                <div
                  className="mb-6 text-3xl"
                  style={{
                    color: '#D4A574',
                    textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                  }}>

                  ❧
                </div>

                <h2
                  className={`${isMobile ? 'text-3xl' : 'text-4xl'} font-bold tracking-wide text-center px-8`}
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: '#D4A574',
                    textShadow:
                      '0 2px 4px rgba(0,0,0,0.6), 0 0 15px rgba(212, 165, 116, 0.3)'
                  }}>

                  Our Memories
                </h2>

                <div
                  className="w-32 h-px mt-6 mb-4"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent, #D4A574, transparent)'
                  }} />


                <p
                  className="text-sm tracking-widest uppercase"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    color: '#D4A574',
                    opacity: 0.8
                  }}>

                  Tap to open
                </p>

                <div
                  className="mt-6 text-3xl"
                  style={{
                    color: '#D4A574',
                    textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                    transform: 'rotate(180deg)'
                  }}>

                  ❧
                </div>
              </div>
            </motion.div> /* OPEN BOOK */ :

            <motion.div
              key="open-book"
              className="relative"
              style={{
                width: isMobile ? 'calc(100vw - 32px)' : '800px',
                maxWidth: '800px',
                height: isMobile ? '500px' : '540px'
              }}
              initial={{
                opacity: 0,
                scale: 0.9,
                rotateX: 15,
                y: 20
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotateX: 5,
                y: 0
              }}
              transition={{
                duration: 1.4,
                ease: [0.22, 1, 0.36, 1]
              }}>

              {/* Deep Book Shadow */}
              <div
                className="absolute -bottom-8 left-4 right-4 h-16 rounded-full"
                style={{
                  background: 'rgba(0,0,0,0.5)',
                  filter: 'blur(20px)'
                }}
                aria-hidden="true" />


              {/* Stacked Pages Edges (Left & Right) */}
              {!isMobile &&
                <>
                  <div className="absolute -left-2 top-2 bottom-2 w-2 book-edge rounded-l-sm shadow-md" />
                  <div className="absolute -right-2 top-2 bottom-2 w-2 book-edge rounded-r-sm shadow-md" />
                </>
              }

              {/* Book body */}
              <div
                className="w-full h-full rounded-md overflow-hidden relative"
                style={{
                  boxShadow:
                    '0 0 0 1px rgba(0,0,0,0.1), 0 10px 30px rgba(0,0,0,0.3)',
                  background: '#FFF8F2'
                }}>

                {/* Center Spine Crease */}
                {!isMobile &&
                  <div
                    className="absolute left-1/2 top-0 bottom-0 w-8 -translate-x-1/2 z-20"
                    style={{
                      background:
                        'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.1) 60%, transparent 100%)'
                    }}
                    aria-hidden="true" />

                }

                {/* Page content with 3D turn effect */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPage}
                    className="w-full h-full origin-left"
                    initial={{
                      opacity: 0,
                      rotateY: 90,
                      z: 50,
                      filter: 'brightness(0.8)'
                    }}
                    animate={{
                      opacity: 1,
                      rotateY: 0,
                      z: 0,
                      filter: 'brightness(1)'
                    }}
                    exit={{
                      opacity: 0,
                      rotateY: -90,
                      z: 50,
                      filter: 'brightness(0.5)'
                    }}
                    transition={{
                      duration: 0.8,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                    style={{
                      transformStyle: 'preserve-3d'
                    }}>

                    {/* Dynamic shadow during turn */}
                    <motion.div
                      className="absolute inset-0 z-30 pointer-events-none"
                      initial={{
                        background:
                          'linear-gradient(90deg, rgba(0,0,0,0.2) 0%, transparent 20%)'
                      }}
                      animate={{
                        background:
                          'linear-gradient(90deg, rgba(0,0,0,0) 0%, transparent 100%)'
                      }}
                      transition={{
                        duration: 0.8
                      }} />


                    {currentPage < memories.length ?
                      <BookPage
                        memory={memories[currentPage]}
                        pageNumber={currentPage + 1}
                        totalPages={memories.length}
                        isMobile={isMobile} /> :


                      <SurpriseReveal isMobile={isMobile} />
                    }
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between mt-8 px-4">
                <motion.button
                  onClick={prevPage}
                  disabled={currentPage === 0 || isAnimating}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full transition-all disabled:opacity-30 cursor-pointer disabled:cursor-default border border-[#D4A574]/30 bg-[#2b180d]/80 backdrop-blur-sm"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    color: '#D4A574'
                  }}
                  whileHover={
                    currentPage > 0 ?
                      {
                        backgroundColor: 'rgba(61, 35, 20, 0.9)',
                        scale: 1.05
                      } :
                      {}
                  }
                  whileTap={
                    currentPage > 0 ?
                      {
                        scale: 0.95
                      } :
                      {}
                  }>

                  <ChevronLeftIcon className="w-4 h-4" />
                  <span className="text-sm font-medium hidden sm:inline tracking-wider uppercase">
                    Previous
                  </span>
                </motion.button>

                {/* Page dots */}
                <div className="flex items-center gap-3">
                  {Array.from(
                    {
                      length: totalPages
                    },
                    (_, i) =>
                      <div
                        key={i}
                        className="rounded-full transition-all duration-300"
                        style={{
                          width: i === currentPage ? '24px' : '6px',
                          height: '6px',
                          backgroundColor:
                            i === currentPage ?
                              '#D4A574' :
                              'rgba(212, 165, 116, 0.3)',
                          boxShadow:
                            i === currentPage ?
                              '0 0 10px rgba(212, 165, 116, 0.5)' :
                              'none'
                        }} />


                  )}
                </div>

                <motion.button
                  onClick={nextPage}
                  disabled={currentPage >= totalPages - 1 || isAnimating}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full transition-all disabled:opacity-30 cursor-pointer disabled:cursor-default border border-[#D4A574]/30 bg-[#2b180d]/80 backdrop-blur-sm"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    color: '#D4A574'
                  }}
                  whileHover={
                    currentPage < totalPages - 1 ?
                      {
                        backgroundColor: 'rgba(61, 35, 20, 0.9)',
                        scale: 1.05
                      } :
                      {}
                  }
                  whileTap={
                    currentPage < totalPages - 1 ?
                      {
                        scale: 0.95
                      } :
                      {}
                  }>

                  <span className="text-sm font-medium hidden sm:inline tracking-wider uppercase">
                    Next
                  </span>
                  <ChevronRightIcon className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          }
        </AnimatePresence>
      </div>
    </motion.div>);

}
