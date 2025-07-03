'use client'
import Moon3D from '@/components/Moon3D';
import ProjectNode from '@/components/ProjectNode';
import { motion } from 'framer-motion';
import { Linkedin, Mail, FileText, Github } from 'lucide-react';
import { useState } from 'react';

export default function Home() {
  const [copied, setCopied] = useState(false);
  const email = 'your.email@example.com'; // Replace with your real email

  return (
    <div className="bg-black text-white min-h-screen relative">
      <Moon3D />

      <div className="w-full sm:w-1/2 px-6 sm:px-10 py-20 space-y-48">

        {/* === ABOUT SECTION === */}
        <section id="about" className="min-h-screen flex items-center justify-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-xl text-left space-y-4"
          >
            <h2 className="text-4xl font-bold">About Me</h2>
            <p className="text-lg leading-relaxed text-gray-300">
              I'm Jatin Jain — a creative technologist with a passion for VR, embedded systems, 
              aesthetic web experiences, and anything that pushes the limits of interaction.
              This site is both a playground and portfolio — so scroll around and explore.
            </p>

            

              {/* === ICONS === */}
              <motion.div
                className="mt-10 flex gap-8 items-center text-white text-2xl flex-wrap"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.2,
                    },
                  },
                }}
              >
                {[
                  {
                    icon: <Linkedin />,
                    link: "https://www.linkedin.com/in/jatin-jain2106/",
                    label: "LinkedIn",
                  },
                  {
                    icon: <Mail />,
                    action: () => {
                      navigator.clipboard.writeText(email);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    },
                    label: "Email",
                  },
                  {
                    icon: <FileText />,
                    link: "/resume.pdf",
                    label: "Resume",
                  },
                  {
                    icon: <Github />,
                    link: "https://github.com/itzme170605",
                    label: "GitHub",
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    variants={{
                      hidden: { opacity: 0, scale: 0.8 },
                      visible: { opacity: 1, scale: 1 },
                    }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    className="relative cursor-pointer"
                  >
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-400 transition-transform"
                        aria-label={item.label}
                      >
                        {item.icon}
                      </a>
                    ) : (
                      <button
                        onClick={item.action}
                        className="hover:text-blue-400 transition-transform relative"
                        aria-label={item.label}
                      >
                        {item.icon}
                        {copied && item.label === 'Email' && (
                          <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-sm text-blue-400 bg-gray-900 px-2 py-1 rounded shadow-md whitespace-nowrap">
                            Email copied!
                          </span>
                        )}
                      </button>
                    )}
                  </motion.div>
                ))}
              </motion.div>

          </motion.div>
        </section>

        {/* === HOME SECTION === */}
        <section id="home" className="min-h-screen flex items-center">
          <h1 className="text-5xl font-bold">Welcome to My Space! XD</h1>
        </section>

        {/* === PROJECTS SECTION === */}
        <section id="projects" className="min-h-screen bg-black text-white py-20 px-4 sm:px-16">
          <h2 className="text-4xl font-bold mb-16 text-center">My Projects</h2>

          <div className="relative border-l-4 border-gray-700 pl-10 space-y-32 max-w-3xl mx-auto">
            {[1, 2, 3].map((_, i) => (
              <ProjectNode
                key={i}
                title={`Project Title ${i + 1}`}
                desc="One-line description about the project and what it does."
                img="/moon_texture.jpg"
                align={i % 2 === 0 ? 'left' : 'right'}
              />
            ))}
          </div>
        </section>

        {/* === CONTACT SECTION === */}
        <section id="contact" className="min-h-screen flex items-center justify-start">
          <h2 className="text-4xl font-bold">Get in Touch</h2>
        </section>

      </div>
    </div>
  );
}
