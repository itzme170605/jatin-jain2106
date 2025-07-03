'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
//   const navItems = ['Home', 'About', 'Projects', 'Contact'];
  const navItems = [
  { title: 'Home' },
  { title: 'About' },
  {
    title: 'Projects',
    dropdown: [
      'Full Stack Dev',
      'VR / Unity / Blender',
      'App Dev',
      'Machine Learning',
    ],
  },
  { title: 'Contact' },
];


  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = ['home', 'about', 'projects', 'contact'];

      for (let id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActive(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-black bg-opacity-60 backdrop-blur-md px-6 py-4 flex items-center justify-between">
      <div className="text-white text-xl font-semibold">Jatin.dev</div>

      {/* Desktop Nav */}
        <ul className="hidden md:flex gap-8 text-white relative">
        {navItems.map((item) => (
            <li key={item.title} className="relative group">
            <span
                onClick={() => {
                const id = item.title.toLowerCase().replace(/ \/.*$/, '').replace(/\s+/g, '-');
                const target = document.getElementById(id);
                target?.scrollIntoView({ behavior: 'smooth' });
                setOpen(false);
                }}
                className={`relative cursor-pointer pb-1 transition 
                ${active === item.title.toLowerCase() ? 'text-blue-400' : 'text-white hover:text-gray-400'}
                after:content-[''] after:block after:h-[2px] after:bg-blue-400 
                after:scale-x-0 after:transition-transform after:origin-left 
                group-hover:after:scale-x-100 ${active === item.title.toLowerCase() ? 'after:scale-x-100' : ''}`}
            >
                {item.title}
            </span>

            {/* Dropdown */}
            {item.dropdown && (
                <ul className="absolute left-0 top-8 bg-black bg-opacity-80 text-sm w-max rounded shadow-lg p-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition">
                {item.dropdown.map((sub) => (
                    <li
                    key={sub}
                    className="whitespace-nowrap px-4 py-2 hover:bg-gray-800 rounded cursor-pointer"
                    onClick={() => {
                        const id = sub.toLowerCase().replace(/ \/.*$/, '').replace(/\s+/g, '-');
                        const target = document.getElementById(id);
                        target?.scrollIntoView({ behavior: 'smooth' });
                        setOpen(false);
                    }}
                    >
                    {sub}
                    </li>
                ))}
                </ul>
            )}
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
                <div key={item.title} className="w-full text-center">
                    <li
                    onClick={() => {
                        if (!item.dropdown) {
                        const target = document.getElementById(item.title.toLowerCase().replace(/\s+/g, '-'));
                        target?.scrollIntoView({ behavior: 'smooth' });
                        setOpen(false);
                        }
                    }}
                    className={`cursor-pointer text-2xl py-2 transition 
                        ${active === item.title.toLowerCase() ? 'text-blue-400' : 'text-white hover:text-gray-400'}`}
                    >
                    {item.title}
                    </li>

                    {item.dropdown && (
                    <ul className="text-sm text-white space-y-2 mt-2">
                        {item.dropdown.map((sub) => (
                        <li
                            key={sub}
                            onClick={() => {
                            const target = document.getElementById(sub.toLowerCase().replace(/\s+/g, '-'));
                            target?.scrollIntoView({ behavior: 'smooth' });
                            setOpen(false);
                            }}
                            className="cursor-pointer hover:text-blue-300"
                        >
                            {sub}
                        </li>
                        ))}
                    </ul>
                    )}
                </div>
                ))}

        </ul>
      )}
    </nav>
  );
}
