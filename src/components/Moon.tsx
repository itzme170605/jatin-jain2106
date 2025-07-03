'use client';

import { useEffect, useRef } from 'react';

export default function Moon() {
  const moonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const rotateDeg = scrollY * 0.1;
      if (moonRef.current) {
        moonRef.current.style.transform = `rotate(${rotateDeg}deg)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 h-screen w-1/2 flex items-center justify-center z-0">
      <div
        ref={moonRef}
        className="h-96 w-96 rounded-full bg-gradient-to-br from-gray-100 to-gray-3000 shadow-2xl"
      />
    </div>
  );
}
