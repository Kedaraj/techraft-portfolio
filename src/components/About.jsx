import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let ctx = gsap.context(() => {
      // Filter out null cards
      const validCards = cardRefs.current.filter(Boolean);

      // --- Cinematic Stagger Entrance on Scroll ---
      gsap.fromTo(
        validCards,
        { y: 60, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: "power4.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] py-28 md:py-36 px-6 md:px-12 flex flex-col justify-center select-none overflow-hidden transition-colors duration-300"
    >
      {/* Background Monochrome Ambient Glows */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-neutral-500/5 rounded-full blur-[160px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-neutral-400/5 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto w-full space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--badge-bg)] backdrop-blur-2xl border border-[var(--badge-border)] text-xs font-mono uppercase tracking-widest text-[var(--text-main)] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-ping"></span>
            <span className="font-bold">EPISODE 01</span>
            <span className="opacity-40">|</span>
            <span className="opacity-80">ABOUT THE ARCHITECT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[var(--text-main)]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            EPISODE SYNOPSIS <br />
            <span className="monochrome-gradient-text">
              ORIGIN &amp; VISION.
            </span>
          </h2>
        </div>

        {/* Bento Grid Layout with Interactive Mouse Light Tracking */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Card 1: Bio & Academic Core (Span 7) */}
          <div
            ref={addToRefs}
            onMouseMove={handleCardMouseMove}
            className="md:col-span-7 p-6 sm:p-8 md:p-10 bg-[var(--bg-card)] backdrop-blur-2xl border border-[var(--border-card)] rounded-[2rem] shadow-lg flex flex-col justify-between relative group hover:border-[var(--border-card-hover)] transition-all duration-500 overflow-hidden"
          >
            {/* Real-time mouse hover spotlight highlight */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), var(--spotlight), transparent 70%)'
              }}
            ></div>

            <div className="absolute top-0 right-0 p-8 text-[var(--text-main)] opacity-[0.06] font-mono text-7xl font-black pointer-events-none select-none">
              01
            </div>
            
            <div className="space-y-4 relative z-10">
              <h3 className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] font-bold">Cast &amp; Background</h3>
              <p className="text-base sm:text-lg md:text-xl font-medium text-[var(--text-main)] leading-relaxed">
                Operating under <span className="font-bold border-b border-[var(--accent)] pb-0.5">TECHRAFT</span>, specializing in Artificial Intelligence, Distributed Systems, and Modern Full-Stack Architecture.
              </p>
              <p className="text-sm md:text-base text-[var(--text-secondary)] font-light leading-relaxed">
                My technical narrative bridges rigorous algorithmic problem-solving with scalable software design, translating complex backend logic into seamless, high-performance user experiences.
              </p>
            </div>
            
            <div className="pt-6 flex flex-wrap gap-2 relative z-10">
              <span className="px-3.5 py-1.5 rounded-full bg-[var(--badge-bg)] border border-[var(--border-card)] text-xs font-mono text-[var(--text-secondary)]">AI &amp; ML</span>
              <span className="px-3.5 py-1.5 rounded-full bg-[var(--badge-bg)] border border-[var(--border-card)] text-xs font-mono text-[var(--text-secondary)]">Full-Stack Development</span>
              <span className="px-3.5 py-1.5 rounded-full bg-[var(--badge-bg)] border border-[var(--border-card)] text-xs font-mono text-[var(--text-secondary)]">System Architecture</span>
            </div>
          </div>

          {/* Card 2: Fellowships & Achievements (Span 5) */}
          <div
            ref={addToRefs}
            onMouseMove={handleCardMouseMove}
            className="md:col-span-5 p-6 sm:p-8 md:p-10 bg-[var(--bg-card)] backdrop-blur-2xl border border-[var(--border-card)] rounded-[2rem] shadow-lg flex flex-col justify-between relative group hover:border-[var(--border-card-hover)] transition-all duration-500 overflow-hidden"
          >
            {/* Real-time mouse hover spotlight highlight */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), var(--spotlight), transparent 70%)'
              }}
            ></div>

            <div className="absolute top-0 right-0 p-8 text-[var(--text-main)] opacity-[0.06] font-mono text-7xl font-black pointer-events-none select-none">
              02
            </div>
            
            <div className="space-y-4 relative z-10">
              <h3 className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] font-bold">Milestones &amp; Accolades</h3>
              <ul className="space-y-3.5 text-sm text-[var(--text-secondary)] font-light">
                <li className="flex items-start gap-2.5">
                  <span className="text-[var(--text-main)] font-bold">&#8250;</span>
                  <span>National Semi-Finalist in <strong className="text-[var(--text-main)]">Flipkart GRiD 7.0</strong> competition.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[var(--text-main)] font-bold">&#8250;</span>
                  <span>Member of the elite <strong className="text-[var(--text-main)]">AlgoUniversity Tech Fellowship</strong> for advanced algorithms.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[var(--text-main)] font-bold">&#8250;</span>
                  <span>Certified <strong className="text-[var(--text-main)]">GitHub Foundations</strong> &amp; <strong className="text-[var(--text-main)]">AWS Certified AI Practitioner</strong>.</span>
                </li>
              </ul>
            </div>
            
            <div className="pt-6 font-mono text-xs text-[var(--text-muted)] relative z-10">
              // SEASON_01 HIGHLIGHTS
            </div>
          </div>

          {/* Card 3: Technical Ecosystem (Span 12) */}
          <div
            ref={addToRefs}
            onMouseMove={handleCardMouseMove}
            className="md:col-span-12 p-6 sm:p-8 md:p-10 bg-[var(--bg-card)] backdrop-blur-2xl border border-[var(--border-card)] rounded-[2rem] shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 hover:border-[var(--border-card-hover)] transition-all duration-500 overflow-hidden relative group"
          >
            {/* Real-time mouse hover spotlight highlight */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'radial-gradient(500px circle at var(--mouse-x) var(--mouse-y), var(--spotlight), transparent 70%)'
              }}
            ></div>

            <div className="space-y-1.5 text-left relative z-10">
              <h3 className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] font-bold">Production Tech Stack</h3>
              <p className="text-base md:text-lg font-semibold text-[var(--text-main)]">Equipped with industry-grade instruments for robust scaling.</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-2.5 relative z-10">
              {['React', 'Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Docker', 'JavaScript'].map((tech, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 rounded-full bg-[var(--badge-bg)] border border-[var(--border-card)] text-xs font-mono uppercase tracking-wider text-[var(--text-main)] hover:border-[var(--border-card-hover)] hover:scale-105 transition-all"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;