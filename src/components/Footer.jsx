const Footer = () => {
  return (
    <footer className="bg-[var(--bg-main)] text-[var(--text-main)] py-16 px-6 md:px-12 border-t border-[var(--border-card)] select-none relative z-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col space-y-12">
        
        {/* Top Section: Brand & Quick Links */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-12 border-b border-[var(--border-card)]">
          <div className="space-y-2">
            <div className="text-2xl font-black tracking-wider flex items-center gap-1.5 text-[var(--text-main)]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              TECHRAFT<span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] inline-block"></span>
            </div>
            <p className="text-xs font-mono text-[var(--text-muted)] tracking-widest uppercase">
              // DEVELOPER PORTFOLIO SERIES &bull; SEASON 2026
            </p>
          </div>

          {/* Quick Navigation Links */}
          <nav className="flex flex-wrap gap-6 md:gap-8 text-xs font-mono uppercase tracking-widest text-[var(--text-secondary)]">
            <a href="#home" className="hover:text-[var(--text-main)] transition-colors">Home</a>
            <a href="#about" className="hover:text-[var(--text-main)] transition-colors">About</a>
            <a href="#expertise" className="hover:text-[var(--text-main)] transition-colors">Expertise</a>
            <a href="#skills" className="hover:text-[var(--text-main)] transition-colors">Skills</a>
            <a href="#projects" className="hover:text-[var(--text-main)] transition-colors">Projects</a>
            <a href="#contact" className="hover:text-[var(--text-main)] transition-colors">Contact</a>
          </nav>
        </div>

        {/* Middle Section: Socials & External Profiles */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-xs font-mono text-[var(--text-secondary)]">
          <div className="flex items-center gap-6">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-[var(--text-main)] transition-colors uppercase tracking-wider"
            >
              GitHub //
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-[var(--text-main)] transition-colors uppercase tracking-wider"
            >
              LinkedIn //
            </a>
            <a 
              href="https://leetcode.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-[var(--text-main)] transition-colors uppercase tracking-wider"
            >
              LeetCode //
            </a>
          </div>

          <div className="text-[var(--text-muted)] tracking-widest uppercase">
            LOCATION: ANDHRA PRADESH, IN
          </div>
        </div>

        {/* Bottom Copyright & Tagline */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-[var(--border-card)] text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} TECHRAFT. All Rights Reserved.</p>
          <p className="opacity-80">ENGINEERED WORLDWIDE &bull; BUILT WITH REACT &amp; GSAP</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;