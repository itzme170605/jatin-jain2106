'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react' // optional: install lucide icons


export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navItems = ['Home', 'About', 'Projects', 'Contact'];

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-black bg-opacity-60 backdrop-blur-md px-6 py-4 flex items-center justify-between">
      <div className="text-white text-xl font-semibold">Jatin.dev</div>

      {/* Desktop Nav */}
      <ul className="hidden md:flex gap-8 text-white">
        {navItems.map((item) => (
        <li
            key={item}
            onClick={() => {
            const target = document.getElementById(item.toLowerCase());
            target?.scrollIntoView({ behavior: 'smooth' });
            setOpen(false);
            }}
            className="cursor-pointer hover:text-gray-400 transition"
        >
            {item}
        </li>
        ))}
      </ul>

      {/* Mobile Menu Button */}
      <button onClick={() => setOpen(!open)} className="text-white md:hidden z-50">
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Nav Panel */}
      {open && (
        <ul className="md:hidden absolute top-0 left-0 w-full h-screen bg-black text-white flex flex-col items-center justify-center gap-10 text-2xl transition-all duration-300">
          {navItems.map((item) => (
            <li
                key={item}
                onClick={() => {
                const target = document.getElementById(item.toLowerCase());
                target?.scrollIntoView({ behavior: 'smooth' });
                setOpen(false);
                }}
                className="cursor-pointer hover:text-gray-400 transition"
            >
                {item}
            </li>
            ))}
        </ul>
      )}
    </nav>
  );
  
}
