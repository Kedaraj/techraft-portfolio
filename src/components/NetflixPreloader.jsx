import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

// Synthesizes the iconic cinematic Netflix-style "Ta-Dum" bass chord using Web Audio API
const playCinematicChime = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    const now = ctx.currentTime;

    // Sub-bass hit
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(55, now); // A1 note
    osc1.frequency.exponentialRampToValueAtTime(32, now + 1.2);
    gain1.gain.setValueAtTime(0.4, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 1.2);

    // Warm cinematic cello harmonics
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(110, now);
    osc2.frequency.exponentialRampToValueAtTime(82, now + 1.4);
    gain2.gain.setValueAtTime(0.25, now);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 1.4);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now);
    osc2.stop(now + 1.4);
  } catch {
    // Audio autoplay restrictions gracefully handled
  }
};

const NetflixPreloader = ({ onComplete }) => {
  const preloaderRef = useRef(null);
  const contentRef = useRef(null);
  const lettersRef = useRef([]);
  const [completed, setCompleted] = useState(false);

  const finish = () => {
    if (completed) return;
    setCompleted(true);
    if (onComplete) onComplete();
  };

  useEffect(() => {
    // Attempt audio chime
    playCinematicChime();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: finish
      });

      tl.set(preloaderRef.current, { autoAlpha: 1 })
        .fromTo(
          lettersRef.current,
          { y: 40, opacity: 0, scale: 0.8, filter: "blur(10px)" },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.6,
            stagger: 0.06,
            ease: "power4.out"
          }
        )
        .to(contentRef.current, {
          scale: 1.08,
          opacity: 0,
          filter: "blur(14px)",
          duration: 0.5,
          ease: "power2.in",
          delay: 0.5
        })
        .to(preloaderRef.current, {
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut"
        });
    }, preloaderRef);

    return () => ctx.revert();
  }, [onComplete]);

  const brandName = "TECHRAFT";

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[99999] bg-[#050505] flex flex-col items-center justify-center select-none overflow-hidden"
    >
      {/* Cinematic Center Content */}
      <div ref={contentRef} className="flex flex-col items-center gap-5">
        {/* Glowing Cinema Light Indicator */}
        <div className="relative flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.9)] animate-ping absolute"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.9)]"></div>
        </div>

        {/* Cinematic Studio Title */}
        <div className="flex items-center overflow-hidden">
          {brandName.split("").map((letter, i) => (
            <span
              key={i}
              ref={(el) => (lettersRef.current[i] = el)}
              className="text-4xl md:text-6xl font-black uppercase text-white tracking-[0.25em] drop-shadow-[0_0_30px_rgba(255,255,255,0.6)] inline-block"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              {letter}
            </span>
          ))}
        </div>

        <p className="text-[10px] md:text-xs font-mono uppercase tracking-[0.4em] text-white/50">
          STUDIOS // PORTFOLIO SERIES
        </p>
      </div>

      {/* Skip Button */}
      <button
        type="button"
        onClick={finish}
        className="absolute bottom-8 text-[11px] font-mono uppercase tracking-widest text-white/40 hover:text-white transition-colors px-4 py-1.5 rounded-full border border-white/10 hover:border-white/40 bg-black/40 backdrop-blur-md cursor-pointer"
      >
        Skip Intro &rarr;
      </button>
    </div>
  );
};

export default NetflixPreloader;