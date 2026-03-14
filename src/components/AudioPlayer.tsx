import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MusicIcon, PauseIcon, PlayIcon } from 'lucide-react';
import birthdaySong from '../img/Happy Birthday My Love  - Friz Love.mp3';

export function AudioPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [showControls, setShowControls] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const audioUrl = birthdaySong;

    useEffect(() => {
        // Attempt to auto-play (browsers often block this until user interaction)
        if (audioRef.current) {
            audioRef.current.volume = 0.4;
            let playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.then(_ => {
                    setIsPlaying(true);
                }).catch(error => {
                    // Auto-play was prevented
                    console.log("Autoplay prevented. User needs to interact first.");
                });
            }
        }
    }, []);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div
            className="fixed bottom-6 right-6 z-50 rounded-full"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
        >
            <audio ref={audioRef} src={audioUrl} loop />

            <div className="relative flex items-center justify-end">
                <AnimatePresence>
                    {showControls && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="mr-3 bg-[#1F1225]/80 backdrop-blur-md px-4 py-2 rounded-full border border-[#D4A574]/30"
                        >
                            <p style={{ fontFamily: "'Dancing Script', cursive", color: '#E8A0BF' }} className="text-sm whitespace-nowrap">
                                {isPlaying ? "Playing birthday song..." : "Play birthday song"}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    onClick={togglePlay}
                    className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-[#D4A574] to-[#B8956A] text-white shadow-lg border-2 border-[#1F1225]"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    animate={isPlaying ? {
                        boxShadow: [
                            "0 0 10px rgba(212,165,116,0.3)",
                            "0 0 20px rgba(212,165,116,0.6)",
                            "0 0 10px rgba(212,165,116,0.3)"
                        ]
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    {isPlaying ? <MusicIcon size={20} className="animate-pulse" /> : <PlayIcon size={20} fill="currentColor" />}
                </motion.button>
            </div>
        </div>
    );
}
