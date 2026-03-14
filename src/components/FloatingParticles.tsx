import React, { useMemo } from 'react';
interface ParticleConfig {
  id: number;
  left: string;
  size: number;
  delay: string;
  duration: string;
  driftX: string;
  floatY: string;
  color: string;
  opacity: number;
}
interface FloatingParticlesProps {
  count?: number;
  mode?: 'sparkle' | 'dust' | 'bokeh';
  colors?: string[];
}
export function FloatingParticles({
  count = 35,
  mode = 'sparkle',
  colors
}: FloatingParticlesProps) {
  const defaultSparkleColors = [
  'rgba(212, 165, 116, 0.8)',
  'rgba(255, 255, 255, 0.9)',
  'rgba(232, 160, 191, 0.7)',
  'rgba(242, 181, 212, 0.6)',
  'rgba(201, 169, 110, 0.7)',
  'rgba(255, 218, 185, 0.6)'];

  const defaultDustColors = [
  'rgba(212, 165, 116, 0.3)',
  'rgba(255, 240, 230, 0.4)',
  'rgba(232, 160, 191, 0.25)',
  'rgba(255, 255, 255, 0.35)'];

  const defaultBokehColors = [
  'rgba(212, 165, 116, 0.4)',
  'rgba(232, 160, 191, 0.3)',
  'rgba(200, 162, 200, 0.3)',
  'rgba(255, 218, 185, 0.3)'];

  const particleColors =
  colors || (
  mode === 'sparkle' ?
  defaultSparkleColors :
  mode === 'bokeh' ?
  defaultBokehColors :
  defaultDustColors);
  const particles = useMemo<ParticleConfig[]>(() => {
    const actualCount = mode === 'bokeh' ? Math.min(count, 15) : count; // Fewer particles for bokeh
    return Array.from(
      {
        length: actualCount
      },
      (_, i) => {
        const isSparkle = mode === 'sparkle';
        const isBokeh = mode === 'bokeh';
        let size = Math.random() * 3 + 1;
        if (isSparkle) size = Math.random() * 5 + 2;
        if (isBokeh) size = Math.random() * 60 + 30; // Large orbs
        let duration = Math.random() * 15 + 10;
        if (isSparkle) duration = Math.random() * 8 + 6;
        if (isBokeh) duration = Math.random() * 20 + 15; // Very slow
        let opacity = Math.random() * 0.4 + 0.1;
        if (isSparkle) opacity = Math.random() * 0.6 + 0.4;
        if (isBokeh) opacity = Math.random() * 0.15 + 0.05; // Very subtle
        return {
          id: i,
          left: `${Math.random() * 100}%`,
          size,
          delay: `${Math.random() * duration}s`,
          duration: `${duration}s`,
          driftX: `${(Math.random() - 0.5) * (isBokeh ? 150 : 80)}px`,
          floatY: isSparkle ?
          '-100vh' :
          `${(Math.random() - 0.5) * (isBokeh ? 200 : 120)}px`,
          color:
          particleColors[Math.floor(Math.random() * particleColors.length)],
          opacity
        };
      }
    );
  }, [count, mode, particleColors]);
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true">
      
      {particles.map((p) => {
        const isBokeh = mode === 'bokeh';
        const isSparkle = mode === 'sparkle';
        return (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: p.left,
              bottom: isSparkle ? '-10px' : `${Math.random() * 100}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              boxShadow: isSparkle ?
              `0 0 ${p.size * 2}px ${p.color}, 0 0 ${p.size * 4}px ${p.color}` :
              isBokeh ?
              `0 0 ${p.size}px ${p.color}` :
              `0 0 ${p.size}px ${p.color}`,
              filter: isBokeh ? `blur(${p.size * 0.2}px)` : 'none',
              animationName: isSparkle ?
              'floatUp' :
              isBokeh ?
              'bokehFloat' :
              'floatGentle',
              animationDuration: p.duration,
              animationDelay: p.delay,
              animationIterationCount: 'infinite',
              animationTimingFunction: 'ease-in-out',
              opacity: isBokeh ? 0 : p.opacity,
              ['--drift-x' as string]: p.driftX,
              ['--float-y' as string]: p.floatY,
              ['--target-opacity' as string]: p.opacity
            }} />);


      })}
    </div>);

}