'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  
  const navItems = [
    { title: 'Home' },
    { title: 'About' },
    {
      title: 'Projects',
      dropdown: [
        { title: 'Full Stack Dev', id: 'full-stack-dev' },
        { title: 'VR / Unity / Blender', id: 'vr-unity-blender' },
        { title: 'Machine Learning', id: 'machine-learning' },
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

  const scrollToSection = (sectionId) => {
    const target = document.getElementById(sectionId);
    if (target) {
      const offsetTop = target.offsetTop - 80; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    setOpen(false);
  };

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-black bg-opacity-60 backdrop-blur-md px-6 py-4 flex items-center justify-between">
      <div className="text-white text-xl font-semibold">Jatin.dev</div>

      {/* Desktop Nav */}
      <ul className="hidden md:flex gap-8 text-white relative">
        {navItems.map((item) => (
          <li key={item.title} className="relative group">
            <span
              onClick={() => {
                if (!item.dropdown) {
                  const id = item.title.toLowerCase().replace(/\s+/g, '-');
                  scrollToSection(id);
                }
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
              <ul className="absolute left-0 top-8 bg-black bg-opacity-90 backdrop-blur-md text-sm w-max rounded-lg shadow-lg p-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-200 border border-gray-700">
                {item.dropdown.map((sub) => (
                  <li
                    key={sub.id}
                    className="whitespace-nowrap px-4 py-2 hover:bg-gray-800 rounded cursor-pointer transition-colors"
                    onClick={() => scrollToSection(sub.id)}
                  >
                    {sub.title}
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
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-95 backdrop-blur-md flex flex-col items-center justify-center gap-8 text-white text-xl transition-all duration-300">
          {navItems.map((item) => (
            <div key={item.title} className="text-center">
              <div
                onClick={() => {
                  if (!item.dropdown) {
                    const id = item.title.toLowerCase().replace(/\s+/g, '-');
                    scrollToSection(id);
                  }
                }}
                className={`cursor-pointer py-2 transition-colors ${
                  active === item.title.toLowerCase() ? 'text-blue-400' : 'text-white hover:text-gray-400'
                }`}
              >
                {item.title}
              </div>

              {item.dropdown && (
                <div className="mt-4 space-y-3">
                  {item.dropdown.map((sub) => (
                    <div
                      key={sub.id}
                      onClick={() => scrollToSection(sub.id)}
                      className="cursor-pointer text-sm text-gray-300 hover:text-blue-300 transition-colors py-1"
                    >
                      {sub.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}