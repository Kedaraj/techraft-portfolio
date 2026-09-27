import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import pictureImg from '../assets/Portfolio/picture.png';
import { useTheme } from '../context/ThemeContext';

const Hero = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const glareRef = useRef(null);
  const spotlightRef = useRef(null);
  const contentRef = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const developerRoles = [
    'FEATURE FILM // FULL-STACK ARCHITECT',
    'ORIGINAL SERIES // AI & ML SPECIALIST',
    'BLOCKBUSTER // DISTRIBUTED SYSTEMS',
    'ACCLAIMED // ALGORITHMIC PROBLEM SOLVER'
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const content = contentRef.current;
    if (!section || !card || !content) return;

    let ctx = gsap.context(() => {
      // --- GSAP CINEMATIC ENTRANCE ANIMATION ---
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        content.querySelectorAll('.hero-anim-item'),
        { y: 35, opacity: 0, filter: "blur(8px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.0, stagger: 0.1 }
      )
      .fromTo(
        card,
        { scale: 0.85, opacity: 0, rotationY: 20, rotationX: -10 },
        { scale: 1, opacity: 1, rotationY: 0, rotationX: 0, duration: 1.2, ease: "back.out(1.2)" },
        "-=0.7"
      );

      // --- MOUSE 3D TILT & GLOW EFFECTS ---
      const xTilt = gsap.quickTo(card, "rotationY", { duration: 0.35, ease: "power3.out" });
      const yTilt = gsap.quickTo(card, "rotationX", { duration: 0.35, ease: "power3.out" });
      const glareX = glareRef.current ? gsap.quickTo(glareRef.current, "x", { duration: 0.3, ease: "power2.out" }) : null;
      const glareY = glareRef.current ? gsap.quickTo(glareRef.current, "y", { duration: 0.3, ease: "power2.out" }) : null;

      const handleMouseMove = (e) => {
        const rect = section.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Update Section Spotlight position
        if (spotlightRef.current) {
          spotlightRef.current.style.transform = `translate3d(${x - 300}px, ${y - 300}px, 0)`;
        }

        // Card 3D Perspective Calculations
        if (card) {
          const cardRect = card.getBoundingClientRect();
          const cardCenterX = cardRect.left + cardRect.width / 2 - rect.left;
          const cardCenterY = cardRect.top + cardRect.height / 2 - rect.top;

          // Clamped tilt angles
          const rotateX = Math.max(-12, Math.min(12, -((y - cardCenterY) / (cardRect.height / 2)) * 12));
          const rotateY = Math.max(-12, Math.min(12, ((x - cardCenterX) / (cardRect.width / 2)) * 12));

          xTilt(rotateY);
          yTilt(rotateX);

          if (glareX && glareY) {
            glareX((x - cardRect.left) - cardRect.width / 2);
            glareY((y - cardRect.top) - cardRect.height / 2);
          }
        }
      };

      const handleMouseEnter = () => {
        if (spotlightRef.current) gsap.to(spotlightRef.current, { opacity: 1, duration: 0.3 });
      };

      const handleMouseLeave = () => {
        if (spotlightRef.current) gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3 });
        xTilt(0);
        yTilt(0);
      };

      section.addEventListener("mousemove", handleMouseMove, { passive: true });
      section.addEventListener("mouseenter", handleMouseEnter);
      section.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        section.removeEventListener("mousemove", handleMouseMove);
        section.removeEventListener("mouseenter", handleMouseEnter);
        section.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] overflow-x-hidden flex flex-col justify-between select-none transition-colors duration-300"
    >
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 35s linear infinite;
        }
      `}</style>

      {/* --- PERSISTENT GLASSMORPHIC NAVBAR --- */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg-card-glass)] backdrop-blur-xl border-b border-[var(--border-card)] transition-colors duration-300">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-3.5 flex items-center justify-between">
          <a 
            href="#home" 
            className="text-2xl md:text-3xl font-black tracking-wider flex items-center gap-1.5 hover:scale-105 transition-transform text-[var(--text-main)]" 
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            TECHRAFT<span className="w-2 h-2 rounded-full bg-[var(--accent)] inline-block"></span>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-widest text-[var(--text-secondary)]">
            <a href="#home" className="hover:text-[var(--text-main)] transition-colors">Home</a>
            <a href="#about" className="hover:text-[var(--text-main)] transition-colors">About</a>
            <a href="#expertise" className="hover:text-[var(--text-main)] transition-colors">Expertise</a>
            <a href="#skills" className="hover:text-[var(--text-main)] transition-colors">Skills</a>
            <a href="#projects" className="hover:text-[var(--text-main)] transition-colors">Projects</a>
            <a href="#contact" className="hover:text-[var(--text-main)] transition-colors">Contact</a>
          </nav>

          <div className="flex items-center gap-3">
            {/* Theme Toggle Button (Dark 🌙 / Light ☀️) */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-full border border-[var(--border-card)] bg-[var(--badge-bg)] text-[var(--text-main)] hover:border-[var(--border-card-hover)] transition-all flex items-center justify-center cursor-pointer shadow-sm hover:scale-105 active:scale-95"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                /* Sun Icon to switch to Light mode */
                <svg className="w-4 h-4 text-amber-200 fill-current" viewBox="0 0 24 24">
                  <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06c.39-.39.39-1.03 0-1.41s-1.02-.39-1.41 0z" />
                </svg>
              ) : (
                /* Moon Icon to switch to Dark mode */
                <svg className="w-4 h-4 text-neutral-800 fill-current" viewBox="0 0 24 24">
                  <path d="M12.3 2a10 10 0 0 0-.19 14 9.92 9.92 0 0 0 7.9 3.89c.19 0 .38 0 .57-.02A10 10 0 1 1 12.3 2z" />
                </svg>
              )}
            </button>

            <a
              href="#contact"
              className="px-4 py-2 md:px-5 md:py-2 rounded bg-[var(--accent)] text-[var(--accent-contrast)] font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-md hover:scale-105 active:scale-95"
            >
              Get In Touch
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-[var(--text-secondary)] hover:text-[var(--text-main)] p-1.5 rounded border border-[var(--border-card)] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[var(--bg-card)] border-b border-[var(--border-card)] px-6 py-6 flex flex-col gap-4 text-xs font-mono uppercase tracking-widest">
            <a href="#home" onClick={() => setMobileMenuOpen(false)} className="py-2 text-[var(--text-secondary)] hover:text-[var(--text-main)] border-b border-[var(--border-card)]">Home</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="py-2 text-[var(--text-secondary)] hover:text-[var(--text-main)] border-b border-[var(--border-card)]">About</a>
            <a href="#expertise" onClick={() => setMobileMenuOpen(false)} className="py-2 text-[var(--text-secondary)] hover:text-[var(--text-main)] border-b border-[var(--border-card)]">Expertise</a>
            <a href="#skills" onClick={() => setMobileMenuOpen(false)} className="py-2 text-[var(--text-secondary)] hover:text-[var(--text-main)] border-b border-[var(--border-card)]">Skills</a>
            <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="py-2 text-[var(--text-secondary)] hover:text-[var(--text-main)] border-b border-[var(--border-card)]">Projects</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="py-2 text-[var(--text-secondary)] hover:text-[var(--text-main)]">Contact</a>
          </div>
        )}
      </header>

      {/* 1. Background Marquee Watermark */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.05]">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...developerRoles, ...developerRoles].map((role, idx) => (
              <span 
                key={idx} 
                className="text-[10vw] md:text-[8vw] font-black text-[var(--text-main)] mx-6 uppercase tracking-tighter leading-none"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {role} &bull;
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Direct Mouse Tracking Spotlight Beam */}
      <div
        ref={spotlightRef}
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-10 opacity-0 blur-[90px] transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle, var(--spotlight) 0%, transparent 70%)'
        }}
      ></div>

      {/* 3. Main Content Layer */}
      <div ref={contentRef} className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 flex-1 flex flex-col justify-between pt-24 md:pt-28 pb-10">
        
        {/* Top Minimal Badge */}
        <div className="hero-anim-item flex items-center justify-between w-full pt-4">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[var(--badge-bg)] backdrop-blur-2xl border border-[var(--badge-border)] text-xs font-mono uppercase tracking-widest text-[var(--text-main)] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-ping"></span>
            <span className="font-bold tracking-wider">PORTFOLIO SERIES</span>
            <span className="opacity-40">|</span>
            <span className="opacity-80">SEASONS 2024 - 2026</span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] tracking-wider">
            <span className="px-2 py-0.5 border border-[var(--border-card)] rounded bg-[var(--badge-bg)]">FULL-STACK 4K</span>
            <span className="px-2 py-0.5 border border-[var(--border-card)] rounded bg-[var(--badge-bg)]">AI / ML CERTIFIED</span>
          </div>
        </div>

        {/* Main Center Stage Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-12 my-auto py-6">
          
          {/* Left Side: Developer Story & Description (Spans 7 cols on desktop) */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-4 md:space-y-5 text-left">
            
            <div className="hero-anim-item flex items-center gap-3">
              <span className="px-2.5 py-0.5 bg-[var(--accent)] text-[var(--accent-contrast)] font-black text-xs rounded tracking-widest shadow-sm">TOP 1%</span>
              <span className="text-[var(--text-secondary)] text-xs font-mono tracking-widest uppercase">Software Engineer & Systems Architect</span>
            </div>

            <h1 
              className="hero-anim-item text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[var(--text-main)] leading-[0.95]" 
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              TECHRAFT <br />
              <span className="monochrome-gradient-text tracking-wide">
                DEV.ENGINE
              </span>
            </h1>

            <div className="hero-anim-item flex flex-wrap items-center gap-2 md:gap-3 text-xs font-mono text-[var(--text-secondary)] font-bold">
              <span className="px-2 py-0.5 bg-[var(--badge-bg)] border border-[var(--border-card)] rounded text-[var(--text-main)]">99.9% Uptime</span>
              <span className="opacity-40">•</span>
              <span>React &bull; Node.js &bull; PostgreSQL</span>
              <span className="opacity-40">•</span>
              <span className="opacity-70">Docker &bull; Cloud</span>
            </div>

            <p className="hero-anim-item text-sm md:text-base text-[var(--text-secondary)] font-light leading-relaxed max-w-xl">
              Architecting robust full-stack systems, building scalable multi-tenant SaaS platforms, and engineering cutting-edge AI integrations.
            </p>

            {/* Compact recognition pill */}
            <div className="hero-anim-item p-3.5 bg-[var(--badge-bg)] backdrop-blur-xl border border-[var(--border-card)] rounded-xl max-w-lg">
              <h3 className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-main)] font-bold mb-1">
                Core Recognition &amp; Certifications
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-light">
                Flipkart GRiD 7.0 Semi-Finalist &bull; AlgoUniversity Tech Fellow &bull; GitHub Foundations Certified
              </p>
            </div>

            {/* Action Button Set */}
            <div className="hero-anim-item flex flex-wrap items-center gap-4 pt-1">
              <a
                href="#projects"
                className="px-7 py-3 bg-[var(--accent)] text-[var(--accent-contrast)] font-bold text-xs uppercase tracking-widest rounded hover:opacity-90 transition-all duration-300 shadow-md flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                View Projects
              </a>
              <a
                href="#contact"
                className="px-7 py-3 bg-[var(--bg-card)] text-[var(--text-main)] border border-[var(--border-card)] font-bold text-xs uppercase tracking-widest rounded hover:border-[var(--border-card-hover)] transition-all duration-300 shadow-sm backdrop-blur-md flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                Contact Me
              </a>
            </div>
          </div>

          {/* Right Side: Interactive 3D Holographic Tilt Developer Poster Frame */}
          <div className="lg:col-span-5 flex justify-center perspective-[1200px]">
            <div 
              ref={cardRef}
              className="relative group transform-gpu transition-transform duration-100 ease-out will-change-transform"
            >
              {/* Luxury Monochrome Ambient Glow */}
              <div className="absolute -inset-3 bg-gradient-to-r from-neutral-500/20 via-neutral-400/10 to-transparent rounded-3xl blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              {/* Poster Card with Glossy Sheen */}
              <div className="relative w-[260px] sm:w-[290px] md:w-[320px] p-3.5 bg-[var(--bg-card)] backdrop-blur-2xl rounded-2xl border border-[var(--border-card)] shadow-xl overflow-hidden transition-colors duration-300">
                
                {/* Dynamic Specular Glare Layer */}
                <div 
                  ref={glareRef}
                  className="absolute inset-[-50%] w-[200%] h-[200%] bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none transform-gpu z-40"
                ></div>

                {/* Series Tag */}
                <div className="absolute top-6 left-6 z-30 px-3 py-1 bg-[var(--accent)] text-[var(--accent-contrast)] font-mono text-[10px] font-bold tracking-widest rounded shadow-md">
                  FEATURED DEV
                </div>

                <img
                  src={pictureImg}
                  alt="Developer Portrait"
                  className="w-full h-[320px] sm:h-[350px] md:h-[380px] object-cover rounded-xl filter contrast-110 brightness-105 group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Ticker */}
        <div className="hero-anim-item flex items-center justify-between text-xs font-mono text-[var(--text-muted)] tracking-widest uppercase pt-2">
          <span>ENGINEERED FOR SCALABILITY</span>
          <span>[ TECHRAFT RELEASE v2.6 ]</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;