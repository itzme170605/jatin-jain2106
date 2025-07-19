'use client'
import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { Github, ExternalLink, Play } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  tech: string[];
  image: string;
  github: string;
  demo: string;
  type: string;
}

interface ProjectCategory {
  title: string;
  projects: Project[];
}

interface ProjectData {
  [key: string]: ProjectCategory;
}

const projectData: ProjectData = {
  'full-stack-dev': {
    title: 'Full Stack & Mobile Development',
    projects: [
      {
        title: 'Downtheline',
        description: 'Aesthetic collaborative watchlist app built with Flutter & Firebase',
        tech: ['Flutter', 'Firebase', 'Dart'],
        image: '/moon_texture.jpg', 
        github: 'https://github.com/itzme170605',
        demo: '#',
        type: 'Mobile App'
      },
      {
        title: 'Cyber_security Dashboard',
        description: 'Mental wellness journaling app with animation-driven UI',
        tech: ['Python', 'Flask', 'MITRE','ATT&CO','OTX'],
        image: '/moon_texture.jpg',
        github: 'https://github.com/itzme170605',
        demo: '#',
        type: 'Mobile App'
      },
      {
        title: 'Social Media Dashboard',
        description: 'Analytics dashboard for social media management',
        tech: ['React', 'Express', 'Chart.js'],
        image: '/moon_texture.jpg',
        github: 'https://github.com/itzme170605',
        demo: '#',
        type: 'Web App'
      }
    ]
  },
  'vr-unity-blender': {
    title: 'VR / Unity / Blender',
    projects: [
      {
        title: 'Lunar Lander 3D',
        description: 'Physics-based moon landing simulation in Unreal Engine',
        tech: ['Unreal Engine', 'Blueprint', 'Physics'],
        image: '/moon_texture.jpg',
        github: 'https://github.com/itzme170605',
        demo: '#',
        type: '3D Simulation'
      },
      {
        title: 'AR Furniture Placement',
        description: 'Augmented reality app for furniture visualization',
        tech: ['Unity', 'ARCore', 'ARKit'],
        image: '/moon_texture.jpg',
        github: 'https://github.com/itzme170605',
        demo: '#',
        type: 'AR App'
      }
    ]
  },
  'machine-learning': {
    title: 'Machine Learning',
    projects: [
      {
        title: 'ASL Sign Language Detector',
        description: 'ResNet-18 based hand gesture recognition with ONNX',
        tech: ['Python', 'PyTorch', 'ONNX', 'OpenCV'],
        image: '/moon_texture.jpg',
        github: 'https://github.com/itzme170605',
        demo: '#',
        type: 'Computer Vision'
      },
      {
        title: 'Diabetes-Drug Simulator',
        description: 'Simulated NEFA-glucose dynamics using ODEs with React UI',
        tech: ['Python', 'SciPy', 'React', 'D3.js'],
        image: '/moon_texture.jpg',
        github: 'https://github.com/itzme170605',
        demo: '#',
        type: 'Simulation'
      },
      {
        title: 'Amaxon Product Recomendation system',
        description: 'Real-time amazon product recomender based on your location and peers',
        tech: ['TensorFlow', 'FastAPI', 'BERT'],
        image: '/moon_texture.jpg',
        github: 'https://github.com/itzme170605',
        demo: '#',
        type: 'NLP'
      }
    ]
  }
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="min-w-[350px] bg-gray-900 bg-opacity-90 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:transform hover:scale-105"
    >
      <div className="relative mb-4 overflow-hidden rounded-lg">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs">
          {project.type}
        </div>
      </div>
      
      <h4 className="text-xl font-bold text-white mb-2">{project.title}</h4>
      <p className="text-gray-300 mb-4 text-sm leading-relaxed">{project.description}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tech.map((tech: string, i: number) => (
          <span key={i} className="bg-blue-600 bg-opacity-20 text-blue-300 px-2 py-1 rounded text-xs">
            {tech}
          </span>
        ))}
      </div>
      
      <div className="flex gap-3">
        <a 
          href={project.github} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-1 bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded text-sm transition-colors"
        >
          <Github size={16} />
          Code
        </a>
        <a 
          href={project.demo} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-1 bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded text-sm transition-colors"
        >
          <Play size={16} />
          Demo
        </a>
      </div>
    </motion.div>
  );
}

interface HorizontalTimelineProps {
  categoryKey: string;
  category: ProjectCategory;
}

function HorizontalTimeline({ categoryKey, category }: HorizontalTimelineProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    const scrollAmount = 300;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="mb-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h3 className="text-3xl font-bold text-white mb-4">{category.title}</h3>
        <div className="w-24 h-1 bg-blue-500 mx-auto rounded"></div>
      </motion.div>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 z-0"></div>
        
        {/* Navigation Buttons */}
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-gray-900 bg-opacity-80 text-white p-2 rounded-full hover:bg-opacity-100 transition-all"
          aria-label="Scroll left"
        >
          ←
        </button>
        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-gray-900 bg-opacity-80 text-white p-2 rounded-full hover:bg-opacity-100 transition-all"
          aria-label="Scroll right"
        >
          →
        </button>

        {/* Projects Container */}
        <div 
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto scrollbar-hide pb-4 px-12"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {category.projects.map((project: Project, index: number) => (
            <div key={index} className="relative flex-shrink-0">
              {/* Timeline Node */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-black z-10"></div>
              
              {/* Project Card */}
              <div className="mt-8">
                <ProjectCard project={project} index={index} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function EnhancedProjectsSection() {
  return (
    <section id="projects" className="min-h-screen py-24 px-6 sm:px-16 relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-20"
      >
        <h2 className="text-5xl font-bold text-white mb-6">My Projects</h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          A showcase of my work across different domains - from immersive VR experiences 
          to intelligent machine learning solutions.
        </p>
      </motion.div>

      {/* Individual Category Sections */}
      <div id="full-stack-dev" className="scroll-mt-24">
        <HorizontalTimeline 
          categoryKey="full-stack-dev" 
          category={projectData['full-stack-dev']} 
        />
      </div>

      <div id="vr-unity-blender" className="scroll-mt-24">
        <HorizontalTimeline 
          categoryKey="vr-unity-blender" 
          category={projectData['vr-unity-blender']} 
        />
      </div>

      <div id="machine-learning" className="scroll-mt-24">
        <HorizontalTimeline 
          categoryKey="machine-learning" 
          category={projectData['machine-learning']} 
        />
      </div>
    </section>
  );
}