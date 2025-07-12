'use client'
import Moon3D from '@/components/Moon3D';
import EnhancedProjectsSection from '@/components/EnhancedProjectsSection';
import ContactSection from '@/components/ContactSection';
import { motion } from 'framer-motion';
import { Linkedin, Mail, FileText, Github } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Home() {
  const [copied, setCopied] = useState(false);

  // Handle scroll to section when page loads with hash
  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        // Small delay to ensure components are rendered
        setTimeout(() => {
          const element = document.getElementById(hash.substring(1));
          if (element) {
            const offsetTop = element.offsetTop - 100; // Account for navbar
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth'
            });
          }
        }, 300);
      }
    };

    // Handle on mount
    handleHashScroll();

    // Handle hash changes (browser back/forward)
    window.addEventListener('hashchange', handleHashScroll);
    
    return () => {
      window.removeEventListener('hashchange', handleHashScroll);
    };
  }, []);

  return (
    <div className="bg-black text-white min-h-screen relative">
      {/* Moon Background - Hidden on mobile */}
      <div className="fixed top-0 left-0 w-full h-full z-0 hidden sm:block">
        <Moon3D />
      </div>  

      {/* Main Content Container */}
      <div className="relative z-10">
        {/* Left Column Content - Full width on mobile */}
        <div className="w-full sm:w-1/2 px-6 sm:px-10 py-20 space-y-48 relative z-20">

          {/* === HOME SECTION === */}
          <section id="home" className="min-h-screen flex items-center relative scroll-mt-24">
            {/* Mobile Moon - Only visible on mobile, behind text */}
            <div className="sm:hidden absolute inset-0 z-0 opacity-20">
              <Moon3D />
            </div>
            
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative z-10"
            >
              <h1 className="text-5xl sm:text-6xl font-bold leading-tight">
                Welcome to My Space! 
                <span className="block text-blue-400 mt-2">XD</span>
              </h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-xl text-gray-300 mt-6 max-w-lg"
              >
                Where creativity meets technology. Scroll down to explore my journey 
                through VR, web development, and machine learning.
              </motion.p>
            </motion.div>
          </section>

          {/* === ABOUT SECTION === */}
          <section id="about" className="min-h-screen flex flex-col items-start justify-center px-6 sm:px-16 py-20 relative z-20 scroll-mt-24">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-3xl text-left space-y-6"
            >
              <h2 className="text-4xl font-bold">About Me</h2>
              <p className="text-lg leading-relaxed text-gray-300">
                I'm Jatin Jain — a creative technologist with a passion for VR, embedded systems, 
                aesthetic web experiences, and anything that pushes the limits of interaction.
                This site is both a playground and portfolio — so scroll around and explore.
              </p>
              <p className="text-lg leading-relaxed text-gray-300">
                Currently pursuing my passion for immersive technologies while building 
                applications that bridge the gap between digital and physical worlds. 
                Every project is an opportunity to learn something new and create something meaningful.
              </p>
            </motion.div>

            {/* Icons Row Underneath */}
            <motion.div
              className="mt-12 flex flex-wrap gap-8"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
            >
              {[
                {
                  icon: <Linkedin size={28} />,
                  label: "LinkedIn",
                  link: "https://www.linkedin.com/in/jatin-jain2106/",
                },
                {
                  icon: <Mail size={28} />,
                  label: "Email",
                  action: () => {
                    navigator.clipboard.writeText("jatinjain2106@gmail.com");
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  },
                },
                {
                  icon: <FileText size={28} />,
                  label: "Resume",
                  link: "/resume.pdf",
                },
                {
                  icon: <Github size={28} />,
                  label: "GitHub",
                  link: "https://github.com/itzme170605",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="flex flex-col items-center gap-1 relative group text-white hover:text-blue-400 transition-all"
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { opacity: 1, scale: 1 },
                  }}
                  whileHover={{ scale: 1.1 }}
                >
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.label}
                    >
                      {item.icon}
                    </a>
                  ) : (
                    <button onClick={item.action} aria-label={item.label}>
                      {item.icon}
                      {copied && item.label === 'Email' && (
                        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm text-blue-400 bg-gray-900 px-2 py-1 rounded shadow-md whitespace-nowrap">
                          Email copied!
                        </span>
                      )}
                    </button>
                  )}
                  <span className="text-sm text-gray-400">{item.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </section>
        </div>

        {/* === PROJECTS SECTION (Full Width) === */}
        <section id="projects" className="relative z-30 scroll-mt-24">
          <EnhancedProjectsSection />
        </section>

        {/* === CONTACT SECTION (Full Width) === */}
        <section id="contact" className="relative z-30 scroll-mt-24">
          <ContactSection />
        </section>
      </div>
    </div>
  );
}