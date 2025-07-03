'use client';

import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

interface ProjectNodeProps {
  title: string;
  desc: string;
  img: string;
  align?: 'left' | 'right';
}

export default function ProjectNode({ title, desc, img, align = 'left' }: ProjectNodeProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <div ref={ref} className="relative flex flex-col sm:flex-row items-center gap-6">
      {/* Glow Dot */}
      <div className={`w-6 h-6 rounded-full z-10 border-4 ${inView ? 'bg-blue-400 border-blue-300' : 'bg-gray-800 border-gray-700'}`}></div>

      {/* Content */}
      <div className={`transition-all duration-700 ease-in-out transform ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} bg-gray-900 shadow-xl rounded-xl p-6 w-full sm:w-2/3`}>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-300 mb-4">{desc}</p>
        <Image src={img} alt="project preview" width={600} height={400} className="rounded-lg mb-4" />
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
          Know More →
        </button>
      </div>
    </div>
  );
}
