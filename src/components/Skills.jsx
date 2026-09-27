import { useRef, useState, useEffect } from 'react';

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
  const containerRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  // Scroll to selected card cleanly without lag
  const scrollToIndex = (idx) => {
    if (!containerRef.current) return;
    const cards = containerRef.current.children;
    if (cards[idx]) {
      cards[idx].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
      setActiveIdx(idx);
    }
  };

  const handleNext = () => {
    const nextIdx = (activeIdx + 1) % skillCategories.length;
    scrollToIndex(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (activeIdx - 1 + skillCategories.length) % skillCategories.length;
    scrollToIndex(prevIdx);
  };

  // Track active slide with a passive, highly efficient scroll observer
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let timeoutId = null;
    const handleScroll = () => {
      if (timeoutId) return;
      timeoutId = setTimeout(() => {
        timeoutId = null;
        const center = container.scrollLeft + container.offsetWidth / 2;
        let closestIdx = 0;
        let minDiff = Infinity;

        Array.from(container.children).forEach((child, i) => {
          const childCenter = child.offsetLeft + child.offsetWidth / 2;
          const diff = Math.abs(childCenter - center);
          if (diff < minDiff) {
            minDiff = diff;
            closestIdx = i;
          }
        });
        setActiveIdx(closestIdx);
      }, 50);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section 
      id="skills"
      className="relative w-full min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] py-28 md:py-36 px-4 sm:px-6 md:px-12 flex flex-col justify-center select-none overflow-hidden transition-colors duration-300"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-neutral-500/5 rounded-full blur-[180px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto w-full space-y-8 md:space-y-12">
        
        {/* Section Header with Big, Prominent Typography */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--badge-bg)] backdrop-blur-xl border border-[var(--badge-border)] text-xs font-mono uppercase tracking-widest text-[var(--text-main)] shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-ping"></span>
              <span className="font-bold">EPISODE 03</span>
              <span className="opacity-40">|</span>
              <span>CORE ARSENAL</span>
            </div>
            <h2 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none text-[var(--text-main)]" 
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              TECHNICAL DOMAINS &bull; <br />
              <span className="monochrome-gradient-text tracking-wide">
                SKILL MATRIX.
              </span>
            </h2>
          </div>

          {/* Navigation Controls: Arrows & Status */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              className="p-3 rounded-full border border-[var(--border-card)] bg-[var(--bg-card)] hover:border-[var(--border-card-hover)] text-[var(--text-main)] transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
              aria-label="Previous skill domain"
            >
              <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-xs sm:text-sm font-mono text-[var(--text-secondary)] px-2">
              [ 0{activeIdx + 1} / 0{skillCategories.length} ]
            </span>
            <button
              type="button"
              onClick={handleNext}
              className="p-3 rounded-full border border-[var(--border-card)] bg-[var(--bg-card)] hover:border-[var(--border-card-hover)] text-[var(--text-main)] transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
              aria-label="Next skill domain"
            >
              <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Category Jump Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none]">
          {skillCategories.map((category, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollToIndex(idx)}
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer border ${
                activeIdx === idx
                  ? 'bg-[var(--accent)] text-[var(--accent-contrast)] border-[var(--accent)] font-bold shadow-md'
                  : 'bg-[var(--badge-bg)] text-[var(--text-secondary)] border-[var(--border-card)] hover:border-[var(--border-card-hover)] hover:text-[var(--text-main)]'
              }`}
            >
              0{idx + 1}. {category.title}
            </button>
          ))}
        </div>

        {/* Buttery Smooth Native GPU Scroll-Snap Carousel Container (Zero Lag) */}
        <div 
          ref={containerRef}
          className="relative w-full flex items-stretch gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth py-4 px-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {skillCategories.map((category, i) => (
            <div 
              key={i}
              className={`shrink-0 snap-center w-[88vw] sm:w-[540px] md:w-[640px] lg:w-[720px] rounded-[2rem] p-8 sm:p-10 md:p-12 bg-[var(--bg-card)] backdrop-blur-2xl border transition-all duration-300 flex flex-col justify-between shadow-xl relative overflow-hidden group ${
                activeIdx === i 
                  ? 'border-[var(--border-card-hover)] ring-1 ring-[var(--accent)]/30' 
                  : 'border-[var(--border-card)] opacity-85 hover:opacity-100'
              }`}
            >
              {/* Massive Watermarked Number in Background */}
              <div 
                className="absolute top-2 right-6 text-7xl sm:text-8xl md:text-9xl font-black font-mono text-[var(--text-main)] opacity-[0.05] pointer-events-none select-none"
              >
                {category.number}
              </div>

              {/* Top Meta Badge */}
              <div className="flex items-center justify-between relative z-10 mb-6">
                <span className="text-xs sm:text-sm font-mono font-bold tracking-widest uppercase text-[var(--text-main)] bg-[var(--badge-bg)] px-4 py-1.5 rounded-full border border-[var(--border-card)]">
                  {category.tag}
                </span>
                <span className="text-sm font-mono text-[var(--text-muted)]">
                  [ 0{i + 1} / 06 ]
                </span>
              </div>

              {/* Main Prominent Title & Large Fluid Description */}
              <div className="space-y-4 my-auto relative z-10 py-4">
                <h3 
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[var(--text-main)] tracking-tight leading-tight"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {category.title}
                </h3>
                <p className="text-base sm:text-lg md:text-xl font-light text-[var(--text-secondary)] leading-relaxed max-w-2xl">
                  {category.desc}
                </p>
              </div>

              {/* Bottom Skill Badges (Large, Bold & Interactive) */}
              <div className="pt-6 border-t border-[var(--border-card)] relative z-10">
                <div className="text-[11px] font-mono uppercase tracking-widest text-[var(--text-muted)] mb-3">
                  // TECHNOLOGIES &amp; INSTRUMENTS
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill, sIdx) => (
                    <span 
                      key={sIdx}
                      className="text-xs sm:text-sm md:text-base font-mono font-medium text-[var(--text-main)] bg-[var(--badge-bg)] border border-[var(--border-card)] px-4 py-2 rounded-full hover:border-[var(--border-card-hover)] hover:scale-105 transition-all shadow-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Subtle Corner Accent Dot */}
              <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-[var(--accent)] opacity-40 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        {/* Bottom Pagination Dots */}
        <div className="flex items-center justify-center gap-2 pt-2">
          {skillCategories.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollToIndex(idx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                activeIdx === idx 
                  ? 'w-8 bg-[var(--accent)]' 
                  : 'w-2 bg-[var(--border-card)] hover:bg-[var(--border-card-hover)]'
              }`}
              aria-label={`Jump to skill card ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;