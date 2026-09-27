import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  { 
    title: 'Frontend Engineering', 
    desc: 'Crafting responsive, high-fidelity user interfaces using React, JavaScript, HTML5, modern CSS3, and buttery smooth GSAP motion interactions.', 
    tag: 'UI / INTERACTION',
    number: '01',
    skills: ['React', 'JavaScript', 'Tailwind CSS', 'HTML5', 'CSS3', 'GSAP', 'Next.js'] 
  },
  { 
    title: 'Backend & Databases', 
    desc: 'Building secure REST APIs, enterprise authentication pipelines, high-concurrency microservices, and optimized database architectures across SQL and NoSQL.', 
    tag: 'ARCHITECTURE',
    number: '02',
    skills: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'REST APIs', 'JWT', 'SQL Optimization'] 
  },
  { 
    title: 'AI & Machine Learning', 
    desc: 'Integrating production-grade LLM workflows, predictive machine learning pipelines, natural language processing, and computer vision systems.', 
    tag: 'INTELLIGENCE',
    number: '03',
    skills: ['NLP', 'Generative AI', 'Computer Vision', 'LLMs', 'AWS AI', 'Python', 'Model Evaluation'] 
  },
  { 
    title: 'Cloud & DevOps', 
    desc: 'Deploying and scaling resilient multi-tenant systems using Docker containers, automated GitHub Actions CI/CD workflows, and optimized cloud infrastructure.', 
    tag: 'INFRASTRUCTURE',
    number: '04',
    skills: ['Docker', 'GitHub Actions', 'CI/CD Pipelines', 'Render', 'AWS', 'Linux', 'Vercel'] 
  },
  { 
    title: 'Algorithmic Problem Solving', 
    desc: 'Mastery of advanced data structures, dynamic programming, graph theory, and high-efficiency algorithmic optimization across competitive platforms.', 
    tag: 'COMPETITIVE',
    number: '05',
    skills: ['Data Structures', 'Algorithms', 'LeetCode', 'CodeChef', 'Dynamic Programming', 'Graph Theory'] 
  },
  { 
    title: 'Tools & Ecosystem', 
    desc: 'Equipped with industry-grade engineering instruments for version control, productivity extensions, and robust full-stack developer tooling.', 
    tag: 'PRODUCTIVITY',
    number: '06',
    skills: ['Git', 'GitHub', 'Chrome APIs', 'VS Code', 'Postman', 'Vite', 'Figma'] 
  },
];

const Skills = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const bgRefs = useRef([]);
  const textRefs = useRef([]);

  // Lag-free mobile scroll listener throttled with requestAnimationFrame
  const handleScroll = (e) => {
    if (window.innerWidth >= 769) return;
    const container = e.target;
    const center = container.scrollLeft + container.offsetWidth / 2;
    
    let activeIdx = 0;
    let minDiff = Infinity;
    
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const diff = Math.abs(cardCenter - center);
      if (diff < minDiff) {
        minDiff = diff;
        activeIdx = i;
      }
    });

    cardsRef.current.forEach((card, i) => {
      if (card) {
        card.style.transform = i === activeIdx ? 'scale(1)' : 'scale(0.92)';
        card.style.opacity = i === activeIdx ? '1' : '0.65';
      }
    });

    bgRefs.current.forEach((bg, i) => {
      if (bg) bg.style.opacity = i === activeIdx ? '1' : '0';
    });
    
    textRefs.current.forEach((txt, i) => {
      if (txt) txt.style.opacity = i === activeIdx ? '0.05' : '0';
    });
  };

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add("(min-width: 769px)", () => {
        const updateCards = (p) => {
          // Dynamic radius and spread based on page width
          const w = window.innerWidth;
          const radius = Math.min(2200, Math.max(1400, w * 1.3));
          const angleSpread = w > 1400 ? 17 : 20;

          cardsRef.current.forEach((card, i) => {
            if (!card) return;
            const offset = i - p;
            
            const angle = offset * angleSpread;
            const rad = (angle * Math.PI) / 180;
            
            const x = Math.sin(rad) * radius;
            const y = radius - Math.cos(rad) * radius; 
            const z = -Math.abs(offset) * 60; 
            
            const scale = Math.max(0.45, 1 - Math.abs(offset) * 0.14);
            const rotateZ = angle; 
            const opacity = Math.max(0.08, 1 - Math.abs(offset) * 0.32);
            const zIndex = Math.round(100 - Math.abs(offset) * 10);

            // High performance GPU transform
            gsap.set(card, {
              x: x,
              y: y,
              z: z,
              scale: scale,
              rotationZ: rotateZ,
              opacity: opacity,
              zIndex: zIndex,
              force3D: true,
            });
          });

          bgRefs.current.forEach((bg, i) => {
            if (!bg) return;
            const itemOpacity = Math.max(0, 1 - Math.abs(i - p) * 1.2);
            gsap.set(bg, { opacity: itemOpacity });
          });

          textRefs.current.forEach((txt, i) => {
            if (!txt) return;
            const itemOpacity = Math.max(0, 1 - Math.abs(i - p) * 1.2);
            gsap.set(txt, { opacity: itemOpacity * 0.05 });
          });
        };

        updateCards(0);

        // Responsive, lag-free ScrollTrigger:
        // scrub: 0.1 gives INSTANT zero-delay response to user scrolling
        // end: +=240% allows swift, effortless navigation without feeling stuck
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "+=250%", 
          pin: true,
          scrub: 0.1,
          anticipatePin: 1,
          fastScrollEnd: true,
          onUpdate: (self) => {
            const p = self.progress * (skillCategories.length - 1);
            updateCards(p);
          }
        });
      });

      mm.add("(max-width: 768px)", () => {
        cardsRef.current.forEach((card, i) => {
          if (card) {
            gsap.set(card, { clearProps: "x,y,z,rotation,scale,opacity,position" });
            card.style.transform = i === 0 ? 'scale(1)' : 'scale(0.92)';
            card.style.opacity = i === 0 ? '1' : '0.65';
          }
        });
        
        bgRefs.current.forEach((bg, i) => {
          if (bg) {
            gsap.set(bg, { clearProps: "all" });
            bg.style.opacity = i === 0 ? '1' : '0';
          }
        });
        
        textRefs.current.forEach((txt, i) => {
          if (txt) {
            gsap.set(txt, { clearProps: "all" });
            txt.style.opacity = i === 0 ? '0.05' : '0';
          }
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="skills"
      ref={sectionRef} 
      className="relative w-full h-screen bg-[var(--bg-main)] text-[var(--text-main)] overflow-hidden flex items-center justify-center md:[perspective:1200px] select-none transition-colors duration-300"
    >
      {/* Dynamic Background Vignettes */}
      {skillCategories.map((_, i) => (
        <div 
          key={i}
          ref={el => bgRefs.current[i] = el}
          className="absolute inset-0 z-0 pointer-events-none opacity-0 bg-gradient-to-tr from-[var(--bg-main)] via-[var(--bg-surface)] to-[var(--bg-main)] transition-opacity duration-200"
        />
      ))}

      {/* Massive Background Typography that scales according to page size */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none overflow-hidden">
        {skillCategories.map((_, i) => (
          <h1 
            key={`text-${i}`}
            ref={el => textRefs.current[i] = el}
            className="absolute text-[26vw] md:text-[22vw] lg:text-[19vw] font-black uppercase text-[var(--text-main)] leading-none tracking-tighter select-none pointer-events-none"
            style={{ 
               fontFamily: "'Bebas Neue', sans-serif",
               opacity: i === 0 ? 0.05 : 0 
            }}
          >
            SKILLS
          </h1>
        ))}
      </div>

      {/* Top Episode Indicator */}
      <div className="absolute top-6 md:top-8 left-6 md:left-12 z-20 pointer-events-none flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--badge-bg)] backdrop-blur-xl border border-[var(--badge-border)] text-xs font-mono uppercase tracking-widest text-[var(--text-main)] shadow-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-ping"></span>
        <span className="font-bold">EPISODE 03</span>
        <span className="opacity-40">|</span>
        <span>SKILL MATRIX</span>
      </div>

      {/* 3D Curved Cylindrical Carousel Wheel Container */}
      <div 
        className="relative w-full h-full flex md:items-center md:justify-center z-10 md:[transform-style:preserve-3d] overflow-x-auto overflow-y-hidden md:overflow-visible snap-x snap-mandatory scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] items-center px-[8vw] md:px-0 gap-6 md:gap-0 touch-pan-x"
        onScroll={handleScroll}
      >
        {skillCategories.map((category, i) => (
          <div 
            key={i}
            ref={el => cardsRef.current[i] = el}
            className="md:absolute relative shrink-0 snap-center w-[85vw] sm:w-[440px] md:w-[500px] lg:w-[560px] xl:w-[620px] h-[500px] sm:h-[530px] md:h-[560px] lg:h-[580px] rounded-[2rem] p-7 sm:p-9 md:p-11 lg:p-12 bg-[var(--bg-card)] backdrop-blur-2xl border border-[var(--border-card)] flex flex-col justify-between overflow-hidden group shadow-2xl hover:border-[var(--border-card-hover)] transition-colors duration-300 will-change-transform"
          >
            {/* Massive Number Watermark */}
            <div 
              className="absolute top-2 right-6 text-7xl sm:text-8xl md:text-9xl font-black font-mono text-[var(--text-main)] opacity-[0.06] pointer-events-none select-none"
            >
              {category.number}
            </div>

            {/* Top Card Metadata - Big & Clear */}
            <div className="flex items-center justify-between relative z-10">
              <span className="text-xs sm:text-sm font-mono font-bold tracking-widest uppercase text-[var(--text-main)] bg-[var(--badge-bg)] px-4 py-1.5 rounded-full border border-[var(--border-card)]">
                {category.tag}
              </span>
              <span className="text-sm sm:text-base font-mono font-bold text-[var(--text-muted)]">
                [ 0{i + 1} / 06 ]
              </span>
            </div>

            {/* Middle Title & Description - Enlarged & Fluid to Page Size */}
            <div className="space-y-4 my-auto relative z-10 py-3">
              <h3 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[var(--text-main)] tracking-tight leading-[1.05]"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {category.title}
              </h3>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light text-[var(--text-secondary)] leading-relaxed max-w-2xl">
                {category.desc}
              </p>
            </div>

            {/* Bottom Skill Badges - Large, Bold & Prominent */}
            <div className="pt-5 border-t border-[var(--border-card)] relative z-10">
              <div className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] mb-3">
                // CORE TECHNOLOGIES
              </div>
              <div className="flex flex-wrap gap-2.5">
                {category.skills.map((skill, sIdx) => (
                  <span 
                    key={sIdx}
                    className="text-xs sm:text-sm md:text-base font-mono font-medium text-[var(--text-main)] bg-[var(--badge-bg)] border border-[var(--border-card)] px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full hover:border-[var(--border-card-hover)] hover:scale-105 transition-all shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Subtle Corner Dot */}
            <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-[var(--accent)] opacity-50 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>

      {/* Bottom Scroll Hint */}
      <div className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 z-20 items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] opacity-60 pointer-events-none">
        <span>&darr;</span>
        <span>Scroll to rotate 3D wheel</span>
        <span>&darr;</span>
      </div>

    </section>
  );
};

export default Skills;