'use client'
import Moon from '@/components/Moon';
import Moon3D from '@/components/Moon3D';
import { motion } from 'framer-motion';



export default function Home() {
  return (
    
    <div className="bg-black text-white min-h-screen relative">
      
      <div className="w-full sm:w-1/2 px-6 sm:px-10 py-20 space-y-48">
        <Moon3D />
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
          </motion.div>
        </section> 
        <section id="home" className="min-h-screen flex items-center">
          <h1 className="text-5xl font-bold">Welcome to My Moon Base</h1>
        </section>

        <section id="section-3" className="min-h-screen flex items-center justify-start">
          {/* About Me content here */}
        </section>

        <section id="projects" className="min-h-screen flex items-center justify-start">
          <h2 className="text-4xl font-bold">Projects</h2>
        </section>

        <section id="contact" className="min-h-screen flex items-center justify-start">
          <h2 className="text-4xl font-bold">Get in Touch</h2>
        </section>
      </div>


    </div>
  );
}
