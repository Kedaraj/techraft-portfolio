import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import pictureImg from '../assets/Portfolio/picture.png';

const Hero = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const glareRef = useRef(null);
  const spotlightRef = useRef(null);
  const contentRef = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      className="relative w-full min-h-screen bg-[#050505] overflow-x-hidden flex flex-col justify-between select-none"
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
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/90 backdrop-blur-xl border-b border-white/10 transition-all duration-300">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-3.5 flex items-center justify-between">
          <a 
            href="#home" 
            className="text-2xl md:text-3xl font-black text-red-600 tracking-wider flex items-center gap-1.5 hover:scale-105 transition-transform" 
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            TECHRAFT<span className="w-2 h-2 rounded-full bg-white inline-block"></span>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-widest text-white/80">
            <a href="#home" className="hover:text-red-500 transition-colors">Home</a>
            <a href="#about" className="hover:text-red-500 transition-colors">About</a>
            <a href="#expertise" className="hover:text-red-500 transition-colors">Expertise</a>
            <a href="#skills" className="hover:text-red-500 transition-colors">Skills</a>
            <a href="#projects" className="hover:text-red-500 transition-colors">Projects</a>
            <a href="#contact" className="hover:text-red-500 transition-colors">Contact</a>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="px-4 py-2 md:px-5 md:py-2 rounded bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(229,9,20,0.6)] hover:scale-105 active:scale-95"
            >
              Get In Touch
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white/80 hover:text-white p-1.5 rounded border border-white/20 focus:outline-none"
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
          <div className="md:hidden bg-[#0a0a0a] border-b border-white/10 px-6 py-6 flex flex-col gap-4 text-xs font-mono uppercase tracking-widest">
            <a href="#home" onClick={() => setMobileMenuOpen(false)} className="py-2 text-white/80 hover:text-red-500 border-b border-white/5">Home</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="py-2 text-white/80 hover:text-red-500 border-b border-white/5">About</a>
            <a href="#expertise" onClick={() => setMobileMenuOpen(false)} className="py-2 text-white/80 hover:text-red-500 border-b border-white/5">Expertise</a>
            <a href="#skills" onClick={() => setMobileMenuOpen(false)} className="py-2 text-white/80 hover:text-red-500 border-b border-white/5">Skills</a>
            <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="py-2 text-white/80 hover:text-red-500 border-b border-white/5">Projects</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="py-2 text-white/80 hover:text-red-500">Contact</a>
          </div>
        )}
      </header>

      {/* 1. Cinematic Background Gradient & Marquee */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/90 to-[#050505] z-0 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-[0.08]">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...developerRoles, ...developerRoles].map((role, idx) => (
              <span 
                key={idx} 
                className="text-[10vw] md:text-[8vw] font-black text-red-600 mx-6 uppercase tracking-tighter leading-none"
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
          background: 'radial-gradient(circle, rgba(229,9,20,0.35) 0%, rgba(229,9,20,0.1) 40%, transparent 70%)'
        }}
      ></div>

      {/* 3. Main Content Layer */}
      <div ref={contentRef} className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 flex-1 flex flex-col justify-between pt-24 md:pt-28 pb-10">
        
        {/* Top Netflix Cinematic Badge */}
        <div className="hero-anim-item flex items-center justify-between w-full pt-4">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded bg-black/80 backdrop-blur-2xl border border-red-600/40 text-xs font-mono uppercase tracking-widest text-white shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
            <span className="text-red-500 font-bold tracking-wider">NETFLIX DEVELOPER SERIES</span>
            <span className="text-white/40">|</span>
            <span className="text-white/80">SEASONS 2024 - 2026</span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-white/50 tracking-wider">
            <span className="px-2 py-0.5 border border-white/20 rounded bg-black/40">FULL-STACK 4K</span>
            <span className="px-2 py-0.5 border border-white/20 rounded bg-black/40">AI / ML CERTIFIED</span>
          </div>
        </div>

        {/* Main Center Cinematic Stage Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-12 my-auto py-6">
          
          {/* Left Side: Developer Story & Description (Spans 7 cols on desktop for spacious layout) */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-4 md:space-y-5 text-left">
            
            <div className="hero-anim-item flex items-center gap-3">
              <span className="px-2.5 py-0.5 bg-red-600 text-white font-black text-xs rounded tracking-widest shadow-[0_0_20px_rgba(229,9,20,0.8)] animate-pulse">TOP 1%</span>
              <span className="text-white/80 text-xs font-mono tracking-widest uppercase">Software Engineer & Systems Architect</span>
            </div>

            <h1 
              className="hero-anim-item text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[0.95]" 
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              TECHRAFT <br />
              <span className="netflix-gradient-text tracking-wide">
                DEV.ENGINE
              </span>
            </h1>

            <div className="hero-anim-item flex flex-wrap items-center gap-2 md:gap-3 text-xs font-mono text-red-400 font-bold">
              <span className="px-2 py-0.5 bg-red-500/10 border border-red-500/30 rounded text-red-500">99.9% Uptime</span>
              <span className="text-white/40">•</span>
              <span>React &bull; Node.js &bull; PostgreSQL</span>
              <span className="text-white/40">•</span>
              <span className="text-white/70">Docker &bull; Cloud</span>
            </div>

            <p className="hero-anim-item text-sm md:text-base text-white/80 font-light leading-relaxed max-w-xl">
              Architecting robust full-stack systems, building scalable multi-tenant SaaS platforms, and engineering cutting-edge AI integrations.
            </p>

            {/* Compact recognition pill */}
            <div className="hero-anim-item p-3.5 bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-xl max-w-lg">
              <h3 className="text-[10px] font-mono uppercase tracking-widest text-red-500 font-bold mb-1">
                Core Recognition &amp; Certifications
              </h3>
              <p className="text-xs text-white/75 leading-relaxed font-light">
                Flipkart GRiD 7.0 Semi-Finalist &bull; AlgoUniversity Tech Fellow &bull; GitHub Foundations Certified
              </p>
            </div>

            {/* Action Button Set */}
            <div className="hero-anim-item flex flex-wrap items-center gap-4 pt-1">
              <a
                href="#projects"
                className="px-7 py-3 bg-white text-black font-bold text-xs uppercase tracking-widest rounded hover:bg-red-600 hover:text-white transition-all duration-300 shadow-[0_10px_35px_rgba(255,255,255,0.3)] flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                View Projects
              </a>
              <a
                href="#contact"
                className="px-7 py-3 bg-neutral-900/80 text-white border border-white/20 font-bold text-xs uppercase tracking-widest rounded hover:bg-neutral-800 transition-all duration-300 shadow-xl backdrop-blur-md flex items-center gap-2 hover:scale-105 active:scale-95"
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
              {/* Cinematic Red Neon Back Glow */}
              <div className="absolute -inset-3 bg-gradient-to-r from-red-600/70 via-rose-600/40 to-purple-600/20 rounded-3xl blur-3xl opacity-90 group-hover:opacity-100 animate-pulse duration-1000"></div>
              
              {/* Poster Card with Glossy Sheen */}
              <div className="relative w-[260px] sm:w-[290px] md:w-[320px] p-3.5 bg-[#141414]/90 backdrop-blur-2xl rounded-2xl border border-red-600/40 shadow-[0_40px_80px_rgba(0,0,0,0.95)] overflow-hidden">
                
                {/* Dynamic Specular Glare Layer */}
                <div 
                  ref={glareRef}
                  className="absolute inset-[-50%] w-[200%] h-[200%] bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none transform-gpu z-40"
                ></div>

                {/* Netflix Series Tag */}
                <div className="absolute top-6 left-6 z-30 px-3 py-1 bg-red-600 text-white font-mono text-[10px] font-bold tracking-widest rounded shadow-xl">
                  FEATURED DEV
                </div>

                <img
                  src={pictureImg}
                  alt="Developer Portrait"
                  className="w-full h-[320px] sm:h-[350px] md:h-[380px] object-cover rounded-xl filter contrast-125 brightness-105 group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Cinematic Ticker */}
        <div className="hero-anim-item flex items-center justify-between text-xs font-mono text-white/50 tracking-widest uppercase pt-2">
          <span>ENGINEERED FOR SCALABILITY</span>
          <span>[ TECHRAFT RELEASE v2.6 ]</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;