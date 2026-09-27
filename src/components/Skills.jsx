import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  { 
    title: 'Frontend Engineering', 
    desc: 'Crafting responsive and interactive user interfaces using React, JavaScript, HTML5, CSS3, and Tailwind CSS.', 
    tag: 'UI / INTERACTION',
    skills: ['React', 'JavaScript', 'Tailwind CSS', 'HTML5', 'CSS3'] 
  },
  { 
    title: 'Backend & Databases', 
    desc: 'Building secure REST APIs, authentication flows, server-side applications, and high-performance database architectures.', 
    tag: 'ARCHITECTURE',
    skills: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'DQL'] 
  },
  { 
    title: 'AI & Machine Learning', 
    desc: 'Developing intelligent applications leveraging NLP, generative AI workflows, computer vision, and LLM systems.', 
    tag: 'INTELLIGENCE',
    skills: ['NLP', 'Generative AI', 'Computer Vision', 'LLMs', 'AWS AI'] 
  },
  { 
    title: 'Cloud & DevOps', 
    desc: 'Deploying and scaling production-grade applications using Docker containers, GitHub Actions, and CI/CD pipelines.', 
    tag: 'INFRASTRUCTURE',
    skills: ['Docker', 'GitHub', 'CI/CD Pipelines', 'Render', 'Docker Hub'] 
  },
  { 
    title: 'Algorithmic Problem Solving', 
    desc: 'Optimizing data structures and solving complex algorithmic challenges across competitive programming platforms.', 
    tag: 'COMPETITIVE',
    skills: ['Data Structures', 'Algorithms', 'LeetCode', 'CodeChef', 'GFG'] 
  },
  { 
    title: 'Tools & Ecosystem', 
    desc: 'Equipped with industry-grade instruments for version control, productivity extensions, and workflow management.', 
    tag: 'PRODUCTIVITY',
    skills: ['Git', 'Chrome APIs', 'Adobe Express', 'Google Cloud', 'VS Code'] 
  },
];

const Skills = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const bgRefs = useRef([]);
  const textRefs = useRef([]);

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
        gsap.to(card, { scale: i === activeIdx ? 1 : 0.9, duration: 0.4, ease: "power2.out", overwrite: "auto" });
      }
    });

    bgRefs.current.forEach((bg, i) => {
      if (bg) gsap.to(bg, { opacity: i === activeIdx ? 1 : 0, duration: 0.4, overwrite: "auto" });
    });
    
    textRefs.current.forEach((txt, i) => {
      if (txt) gsap.to(txt, { opacity: i === activeIdx ? 1 : 0, duration: 0.4, overwrite: "auto" });
    });
  };

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add("(min-width: 769px)", () => {
        const updateCards = (p) => {
          cardsRef.current.forEach((card, i) => {
            if (!card) return;
            const offset = i - p;
            
            const radius = Math.min(1800, window.innerWidth * 1.15); 
            const angleSpread = 16; 
            
            const angle = offset * angleSpread;
            const rad = angle * Math.PI / 180;
            
            const x = Math.sin(rad) * radius;
            const y = radius - (Math.cos(rad) * radius); 
            const z = -Math.abs(offset) * 50; 
            
            const scale = Math.max(0.4, 1 - Math.abs(offset) * 0.15);
            const rotateZ = angle; 
            
            const opacity = Math.max(0.1, 1 - Math.abs(offset) * 0.3);
            const zIndex = Math.round(100 - Math.abs(offset) * 10);

            gsap.set(card, {
              x: x,
              y: y,
              z: z,
              scale: scale,
              rotationZ: rotateZ,
              rotationY: 0, 
              opacity: opacity,
              zIndex: zIndex,
            });
          });

          bgRefs.current.forEach((bg, i) => {
              if (!bg) return;
              const itemOpacity = Math.max(0, 1 - Math.abs(i - p));
              gsap.set(bg, { opacity: itemOpacity });
              
              if (textRefs.current[i]) {
                  gsap.set(textRefs.current[i], { opacity: itemOpacity });
              }
          });
        };

        updateCards(0);

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "+=500%", 
          pin: true,
          scrub: 1,
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
             gsap.set(card, { scale: i === 0 ? 1 : 0.9 });
           }
        });
        
        bgRefs.current.forEach((bg, i) => {
           if (bg) gsap.set(bg, { clearProps: "all", opacity: i === 0 ? 1 : 0 });
        });
        
        textRefs.current.forEach((txt, i) => {
           if (txt) gsap.set(txt, { clearProps: "all", opacity: i === 0 ? 1 : 0 });
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="skills"
      ref={sectionRef} 
      className="relative w-full h-screen bg-[var(--bg-main)] text-[var(--text-main)] overflow-hidden flex items-center justify-center md:[perspective:1000px] select-none transition-colors duration-300"
    >
      {/* Dynamic Background Vignettes */}
      {skillCategories.map((_, i) => (
        <div 
          key={i}
          ref={el => bgRefs.current[i] = el}
          className="absolute inset-0 z-0 pointer-events-none opacity-0 bg-gradient-to-tr from-[var(--bg-main)] via-[var(--bg-surface)] to-[var(--bg-main)]"
        />
      ))}

      {/* Massive Background Typography */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none overflow-hidden">
        {skillCategories.map((_, i) => (
          <h1 
            key={`text-${i}`}
            ref={el => textRefs.current[i] = el}
            className="absolute text-[20vw] md:text-[16vw] font-black uppercase text-[var(--text-main)] opacity-[0.04] leading-none tracking-tighter select-none pointer-events-none"
            style={{ 
               fontFamily: "'Bebas Neue', sans-serif",
               opacity: 0 
            }}
          >
            SKILLS
          </h1>
        ))}
      </div>

      {/* Carousel Container */}
      <div 
        className="relative w-full h-full flex md:items-center md:justify-center z-10 md:[transform-style:preserve-3d] overflow-x-auto overflow-y-hidden md:overflow-visible snap-x snap-mandatory scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] items-center px-[8vw] md:px-0 gap-4 md:gap-0 touch-pan-x"
        onScroll={handleScroll}
      >
        {skillCategories.map((category, i) => (
          <div 
            key={i}
            ref={el => cardsRef.current[i] = el}
            className="md:absolute relative shrink-0 snap-center w-[82vw] sm:w-[340px] md:w-[380px] lg:w-[400px] h-[430px] md:h-[480px] rounded-[28px] p-6 sm:p-8 bg-[var(--bg-card)] backdrop-blur-2xl border border-[var(--border-card)] flex flex-col justify-between overflow-hidden group shadow-lg hover:border-[var(--border-card-hover)] transition-all duration-300"
          >
            {/* Top Card Metadata */}
            <div className="flex items-center justify-between relative z-10">
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[var(--text-secondary)] bg-[var(--badge-bg)] px-3 py-1 rounded-full border border-[var(--border-card)]">
                {category.tag}
              </span>
              <span className="text-xs font-mono text-[var(--text-muted)]">
                [ 0{i + 1} / 06 ]
              </span>
            </div>

            {/* Middle Title & Description */}
            <div className="space-y-3.5 relative z-10 my-auto">
              <h3 className="text-2xl md:text-3xl font-black text-[var(--text-main)] tracking-tight">
                {category.title}
              </h3>
              <p className="text-sm md:text-base text-[var(--text-secondary)] font-light leading-relaxed">
                {category.desc}
              </p>
            </div>

            {/* Bottom Skill Badges */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-[var(--border-card)] relative z-10">
              {category.skills.map((skill, sIdx) => (
                <span 
                  key={sIdx}
                  className="text-xs font-mono text-[var(--text-secondary)] bg-[var(--badge-bg)] border border-[var(--border-card)] px-3 py-1 rounded-full group-hover:border-[var(--border-card-hover)] transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Bottom Dot Accent */}
            <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-[var(--accent)] opacity-50 group-hover:opacity-100 transition-all" />
          </div>
        ))}
      </div>

    </section>
  );
};

export default Skills;