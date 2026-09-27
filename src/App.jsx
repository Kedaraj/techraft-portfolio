import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import NetflixPreloader from './components/NetflixPreloader';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import About from './components/About';
import Expertise from './components/Expertise';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <ThemeProvider>
      <main className="bg-[var(--bg-main)] min-h-screen text-[var(--text-main)] relative overflow-x-hidden transition-colors duration-300">
        {/* Cinematic Preloader */}
        {loading && <NetflixPreloader onComplete={() => setLoading(false)} />}

        {/* Global Mouse Hover Effects & Spotlight across ALL sections */}
        <CustomCursor />

        {/* Portfolio Sections */}
        <Hero />
        <About />
        <Expertise />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </main>
    </ThemeProvider>
  );
}

export default App;