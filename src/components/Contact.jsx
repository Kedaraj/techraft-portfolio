import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Contact = () => {
  const ref = useRef(null);
  
  // React Form State tracking
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    permission: false
  });

  const [statusMessage, setStatusMessage] = useState(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Parallax translation for the big background text
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "20%"]);

  // Handle input changes dynamically
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle form submission logic
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.permission) {
      setStatusMessage({ type: 'error', text: 'Please accept the contact permission checkbox.' });
      return;
    }

    setStatusMessage({ type: 'success', text: `Transmission received, ${formData.firstName}! We will be in touch shortly.` });
    setFormData({ firstName: '', lastName: '', email: '', message: '', permission: false });

    setTimeout(() => {
      setStatusMessage(null);
    }, 6000);
  };

  return (
    <section ref={ref} id="contact" className="bg-[var(--bg-main)] text-[var(--text-main)] w-full min-h-screen relative overflow-hidden flex items-end pt-32 pb-0 border-t border-[var(--border-card)] select-none transition-colors duration-300">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neutral-500/5 rounded-full blur-[160px] pointer-events-none z-0"></div>

      {/* Huge Background Parallax Watermark Text */}
      <motion.div 
        style={{ y }}
        className="absolute top-0 left-0 w-full h-full flex flex-col justify-start items-center overflow-hidden pointer-events-none z-0 pt-16 md:pt-12 opacity-[0.04] max-w-full"
      >
        <h1 
          className="text-[18vw] sm:text-[15vw] md:text-[13vw] leading-none font-black text-[var(--text-main)] uppercase tracking-tight select-none origin-top pointer-events-none"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          CONTACT
        </h1>
      </motion.div>

      {/* Form Card Overlay */}
      <div className="relative z-10 w-full flex justify-end items-end">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-[var(--bg-card)] backdrop-blur-2xl border-t border-l border-[var(--border-card)] w-full md:w-[90%] lg:w-[82%] p-6 sm:p-8 md:p-12 lg:p-14 text-[var(--text-main)] flex flex-col justify-between rounded-tl-[2.5rem] md:rounded-tl-[3rem] shadow-2xl relative overflow-hidden"
        >
          {/* Subtle top highlight glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-40"></div>

          <div className="flex items-center justify-between mb-10 md:mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--badge-bg)] border border-[var(--badge-border)] text-xs font-mono uppercase tracking-widest text-[var(--text-main)] shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-ping"></span>
              <span>EPISODE 04 // GET IN TOUCH</span>
            </div>
            <span className="text-xs font-mono text-[var(--text-muted)] tracking-wider hidden md:block">
              // LET'S BUILD SOMETHING CINEMATIC
            </span>
          </div>

          {statusMessage && (
            <div className={`p-4 rounded-xl mb-6 text-xs font-mono uppercase tracking-widest flex items-center gap-3 transition-all ${
              statusMessage.type === 'error' 
                ? 'bg-[var(--badge-bg)] border border-[var(--border-card-hover)] text-[var(--text-main)]' 
                : 'bg-[var(--badge-bg)] border border-[var(--border-card-hover)] text-[var(--text-main)]'
            }`}>
              <span className={`w-2 h-2 rounded-full bg-[var(--accent)] ${statusMessage.type === 'error' ? 'animate-ping' : ''}`}></span>
              <span>{statusMessage.text}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-10 md:gap-14 w-full">
            <div className="flex flex-col md:flex-row gap-10 md:gap-16 w-full">
              
              {/* Left Column */}
              <div className="flex-1 flex flex-col gap-8">
                <div className="relative">
                  <input 
                    type="text" 
                    id="firstName" 
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name" 
                    required
                    className="w-full bg-transparent border-b border-[var(--border-card)] pb-3 text-lg focus:outline-none focus:border-[var(--accent)] transition-colors placeholder-[var(--text-muted)] font-medium rounded-none text-[var(--text-main)]"
                  />
                </div>
                <div className="relative">
                  <input 
                    type="text" 
                    id="lastName" 
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name" 
                    required
                    className="w-full bg-transparent border-b border-[var(--border-card)] pb-3 text-lg focus:outline-none focus:border-[var(--accent)] transition-colors placeholder-[var(--text-muted)] font-medium rounded-none text-[var(--text-main)]"
                  />
                </div>
                <div className="relative">
                  <input 
                    type="email" 
                    id="email" 
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address" 
                    required
                    className="w-full bg-transparent border-b border-[var(--border-card)] pb-3 text-lg focus:outline-none focus:border-[var(--accent)] transition-colors placeholder-[var(--text-muted)] font-medium rounded-none text-[var(--text-main)]"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="flex-1 flex flex-col">
                <div className="relative h-full flex flex-col">
                  <textarea 
                    id="message" 
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Type your message here..." 
                    required
                    className="w-full h-full min-h-[140px] bg-transparent border-b border-[var(--border-card)] pb-3 text-lg focus:outline-none focus:border-[var(--accent)] transition-colors placeholder-[var(--text-muted)] font-medium resize-none rounded-none text-[var(--text-main)]"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col md:flex-row gap-8 mt-2 pt-6 border-t border-[var(--border-card)]">
              {/* Left text */}
              <div className="flex-1 flex items-start gap-3.5 text-sm font-light text-[var(--text-secondary)]">
                <input 
                  type="checkbox" 
                  id="permission" 
                  checked={formData.permission}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 rounded-sm border-[var(--border-card)] bg-transparent focus:ring-0 focus:ring-offset-0 cursor-pointer" 
                  style={{ accentColor: "currentColor" }}
                />
                <label htmlFor="permission" className="cursor-pointer max-w-[280px] leading-snug">
                  I give permission to contact me at this email address.
                </label>
              </div>

              {/* Right text & button */}
              <div className="flex-1 flex flex-col gap-6 text-xs text-[var(--text-muted)] font-light">
                <p className="leading-relaxed max-w-[400px]">
                  This site is protected by security protocols and industry-standard privacy guidelines.
                </p>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-5">
                  <p className="max-w-[250px] leading-relaxed">
                    Ready to start a project or collaboration? Send a direct signal.
                  </p>
                  
                  <button 
                    type="submit" 
                    className="px-8 py-3.5 rounded-full bg-[var(--accent)] text-[var(--accent-contrast)] font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:opacity-90 transition-all duration-300 group whitespace-nowrap shadow-md hover:scale-105 cursor-pointer"
                  >
                    Send Message
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </form>

        </motion.div>
      </div>
    </section>
  );
};

export default Contact;