import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const spotlightRef = useRef(null);

  useEffect(() => {
    // Only disable custom cursor on pure touch-only devices without a pointer/mouse
    const isTouchOnly = window.matchMedia && window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (isTouchOnly) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const spotlight = spotlightRef.current;

    if (!dot || !ring) return;

    // Apply cursor-none class to html/body when custom cursor is active
    document.documentElement.classList.add('has-custom-cursor');

    gsap.set([dot, ring], { scale: 0.8, opacity: 0, transformOrigin: "50% 50%" });

    const xToDot = gsap.quickTo(dot, "x", { duration: 0.05, ease: "power2.out" });
    const yToDot = gsap.quickTo(dot, "y", { duration: 0.05, ease: "power2.out" });
    
    const xToRing = gsap.quickTo(ring, "x", { duration: 0.15, ease: "power3.out" });
    const yToRing = gsap.quickTo(ring, "y", { duration: 0.15, ease: "power3.out" });

    let isVisible = false;

    const showCursor = () => {
      if (!isVisible) {
        isVisible = true;
        gsap.to([dot, ring], { opacity: 1, scale: 1, duration: 0.2, ease: "power2.out" });
        if (spotlight) gsap.to(spotlight, { opacity: 1, duration: 0.25 });
      }
    };

    const handleMouseMove = (e) => {
      showCursor();

      const x = e.clientX;
      const y = e.clientY;

      const dotSize = 10;
      const ringSize = 44;

      xToDot(x - dotSize / 2);
      yToDot(y - dotSize / 2);
      xToRing(x - ringSize / 2);
      yToRing(y - ringSize / 2);

      if (spotlight) {
        spotlight.style.transform = `translate3d(${x - 350}px, ${y - 350}px, 0)`;
      }

      // Check if hovering over an interactive element
      const target = e.target;
      if (target && target.closest && target.closest('a, button, input, textarea, select, [role="button"], .clickable')) {
        gsap.to(ring, { 
          scale: 1.5, 
          duration: 0.2, 
          overwrite: "auto" 
        });
      } else {
        gsap.to(ring, { 
          scale: 1, 
          duration: 0.2, 
          overwrite: "auto" 
        });
      }
    };

    const handleMouseEnter = () => {
      showCursor();
    };

    const handleMouseLeave = () => {
      isVisible = false;
      gsap.to([dot, ring], { opacity: 0, scale: 0.5, duration: 0.25, ease: "power2.inOut" });
      if (spotlight) gsap.to(spotlight, { opacity: 0, duration: 0.25 });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Global Mouse Follower Spotlight Beam */}
      <div
        ref={spotlightRef}
        className="fixed top-0 left-0 w-[700px] h-[700px] rounded-full pointer-events-none z-[9998] opacity-0 blur-[100px] transition-opacity duration-300 transform-gpu"
        style={{
          background: 'radial-gradient(circle, var(--spotlight) 0%, transparent 70%)',
          willChange: 'transform'
        }}
      ></div>

      {/* Global Custom Cursor Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[99999] pointer-events-none w-2.5 h-2.5 rounded-full transform-gpu transition-colors duration-200"
        style={{ 
          backgroundColor: 'var(--cursor-dot)',
          boxShadow: 'var(--cursor-shadow)',
          willChange: 'transform' 
        }}
      ></div>

      {/* Global Custom Cursor Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[99999] pointer-events-none w-11 h-11 border rounded-full flex items-center justify-center backdrop-blur-[1px] transform-gpu transition-colors duration-200"
        style={{ 
          borderColor: 'var(--cursor-ring)',
          willChange: 'transform' 
        }}
      ></div>
    </>
  );
};

export default CustomCursor;