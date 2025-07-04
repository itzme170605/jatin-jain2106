'use client'
import Moon3D from '@/components/Moon3D';
import ProjectNode from '@/components/ProjectNode';
import { motion } from 'framer-motion';
import { Linkedin, Mail, FileText, Github } from 'lucide-react';
import { useState } from 'react';

export default function Home() {
  const [copied, setCopied] = useState(false);
  const email = 'jatinjain2106@gmail.com'; // Replace with your real email

  return (
    <div className="bg-black text-white min-h-screen relative">
      <div className="fixed top-0 left-0 w-full h-full z-0">
        <Moon3D />
      </div>  

      <div className="w-full sm:w-1/2 px-6 sm:px-10 py-20 space-y-48">

        <section id="about" className="min-h-screen flex flex-col items-start justify-center px-6 sm:px-16 py-20">
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
