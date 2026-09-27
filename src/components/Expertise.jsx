import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const expertiseData = [
  {
    number: "01",
    title: "Frontend Engineering",
    text: "Crafting responsive, high-fidelity user interfaces with React, modern JavaScript, Tailwind CSS, and buttery smooth GSAP motion interactions.",
    tag: "UI / UX & INTERACTION",
  },
  {
    number: "02",
    title: "Backend Architecture",
    text: "Architecting secure REST APIs, enterprise authentication pipelines, and scalable database schemas across PostgreSQL and MongoDB.",
    tag: "API & ARCHITECTURE",
  },
  {
    number: "03",
    title: "AI & Machine Learning",
    text: "Integrating production-grade LLM workflows, predictive machine learning pipelines, and computer vision systems backed by AWS AI certification.",
    tag: "INTELLIGENCE & ML",
  },
  {
    number: "04",
    title: "Cloud & DevOps Infrastructure",
    text: "Deploying resilient, containerized multi-tenant services using Docker, GitHub Actions CI/CD workflows, and optimized cloud hosting.",
    tag: "DEVOPS & CLOUD",
  }
];

const Expertise = () => {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean);
    if (!cards.length) return;

    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        cards.forEach((card, index) => {
          if (index === cards.length - 1) return; // Keep the top-most card fully focused

          gsap.to(card, {
            scale: 0.94 - index * 0.02,
            y: -12 - index * 6,
            filter: "blur(4px)",
            opacity: 0.5,
            scrollTrigger: {
              trigger: card,
              start: `top ${90 + index * 20}px`,
              end: "bottom top",
              scrub: true,
            }
          });
        });
      });
    }, containerRef);

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
      id="expertise"
      ref={containerRef}
      className="relative w-full bg-[var(--bg-main)] text-[var(--text-main)] py-24 md:py-32 px-6 md:px-12 select-none overflow-hidden transition-colors duration-300"
    >
      {/* Monochrome Ambient Glow */}
      <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] bg-neutral-500/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto w-full space-y-12">
        
        {/* Compact Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--badge-bg)] backdrop-blur-xl border border-[var(--badge-border)] text-xs font-mono uppercase tracking-widest text-[var(--text-main)] shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-ping"></span>
              <span className="font-bold">EPISODE 02</span>
              <span className="opacity-40">|</span>
              <span>CORE COMPETENCIES</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight text-[var(--text-main)]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              DIRECTOR'S CUT <br />
              <span className="monochrome-gradient-text">
                TECHNICAL CAPABILITIES.
              </span>
            </h2>
          </div>
          <p className="text-[var(--text-secondary)] text-xs md:text-sm font-light leading-relaxed max-w-xs">
            Merging full-stack engineering, scalable microservices, and AI integrations into production-ready platforms.
          </p>
        </div>

        {/* 1-on-1 Stacking Container */}
        <div className="relative flex flex-col gap-6 md:gap-8 pb-12">
          {expertiseData.map((item, index) => (
            <div
              key={index}
              ref={addToRefs}
              onMouseMove={handleCardMouseMove}
              className="md:sticky w-full p-6 md:p-8 rounded-2xl bg-[var(--bg-card)] backdrop-blur-2xl border border-[var(--border-card)] shadow-lg flex flex-col justify-between min-h-[220px] md:min-h-[240px] transform-gpu transition-all overflow-hidden group hover:border-[var(--border-card-hover)]"
              style={{
                zIndex: index + 1,
                top: `${90 + index * 16}px`
              }}
            >
              {/* Dynamic Mouse Spotlight Highlight */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                style={{
                  background: 'radial-gradient(350px circle at var(--mouse-x) var(--mouse-y), var(--spotlight), transparent 70%)'
                }}
              ></div>

              {/* Top Accent Stripe */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-60 z-10"></div>

              {/* Card Header Top */}
              <div className="flex items-center justify-between w-full mb-4 relative z-10">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--text-secondary)] px-2.5 py-0.5 rounded-full bg-[var(--badge-bg)] border border-[var(--border-card)]">
                  {item.tag}
                </span>
                <span className="text-2xl md:text-3xl font-mono font-black text-[var(--text-main)] opacity-20">
                  {item.number}
                </span>
              </div>

              {/* Card Body */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center my-auto relative z-10">
                <div className="lg:col-span-5">
                  <h3 className="text-2xl md:text-3xl font-black text-[var(--text-main)] tracking-tight leading-snug">
                    {item.title}
                  </h3>
                </div>
                <div className="lg:col-span-7">
                  <p className="text-xs md:text-sm text-[var(--text-secondary)] font-light leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>

              {/* Subtle Corner Dot */}
              <div className="absolute bottom-4 right-4 w-1.5 h-1.5 rounded-full bg-[var(--accent)] opacity-60 group-hover:opacity-100 transition-all z-10"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Expertise;