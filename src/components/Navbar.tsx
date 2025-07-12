'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

interface NavItem {
  title: string;
  href?: string;
  dropdown?: Array<{
    title: string;
    id: string;
  }>;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const navItems: NavItem[] = [
    { title: 'Home', href: '/' },
    { title: 'About', href: '/#about' },
    {
      title: 'Projects',
      dropdown: [
        { title: 'Full Stack Dev', id: 'full-stack-dev' },
        { title: 'VR / Unity / Blender', id: 'vr-unity-blender' },
        { title: 'Machine Learning', id: 'machine-learning' },
      ],
    },
    { title: 'Contact', href: '/#contact' },
    { title: 'About This Site', href: '/about-website' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Only track scroll sections on homepage
      if (pathname !== '/') return;
      
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

    // Set active based on current pathname
    if (pathname === '/about-website') {
      setActive('about-this-site');
    } else if (pathname === '/') {
      handleScroll();
      
      // Handle hash navigation when page loads
      const hash = window.location.hash;
      const storedTarget = sessionStorage.getItem('scrollTarget');
      
      if (hash || storedTarget) {
        const targetId = storedTarget || hash.substring(1);
        
        // Clear stored target
        if (storedTarget) {
          sessionStorage.removeItem('scrollTarget');
        }
        
        // Function to scroll to target
        const scrollToTarget = () => {
          const target = document.getElementById(targetId);
          if (target) {
            // Prevent default scroll behavior
            window.scrollTo(0, 0);
            
            setTimeout(() => {
              const offsetTop = target.offsetTop - 100;
              window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
              });
            }, 50);
            
            return true;
          }
          return false;
        };

        // Try scrolling with multiple attempts
        const maxAttempts = 10;
        let attempts = 0;
        
        const tryScroll = () => {
          attempts++;
          const success = scrollToTarget();
          
          if (!success && attempts < maxAttempts) {
            setTimeout(tryScroll, 100);
          }
        };

        // Start trying to scroll
        setTimeout(tryScroll, 100);
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const scrollToSection = (sectionId: string) => {
    if (pathname !== '/') {
      // Store the target section and navigate
      sessionStorage.setItem('scrollTarget', sectionId);
      router.push(`/#${sectionId}`);
      return;
    }
    
    const target = document.getElementById(sectionId);
    if (target) {
      const offsetTop = target.offsetTop - 100; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    setOpen(false);
    setHoveredDropdown(null);
  };

  const handleNavClick = (item: NavItem) => {
    if (item.href) {
      // Handle direct navigation
      if (item.href.startsWith('/#')) {
        const sectionId = item.href.substring(2);
        scrollToSection(sectionId);
        return;
      }
      // For external pages like /about-website, Link component handles it
      setOpen(false);
    } else if (item.dropdown) {
      // For dropdown items, scroll to the main projects section
      scrollToSection('projects');
    }
  };

  const isActiveItem = (item: NavItem) => {
    if (item.href === '/about-website') {
      return pathname === '/about-website';
    }
    if (item.href === '/') {
      return pathname === '/' && active === 'home';
    }
    if (item.href?.startsWith('/#')) {
      const sectionId = item.href.substring(2);
      return pathname === '/' && active === sectionId;
    }
    if (item.title === 'Projects') {
      return pathname === '/' && active === 'projects';
    }
    return false;
  };

  return (
    <nav className="w-full fixed top-0 left-0 z-[60] bg-black/95 backdrop-blur-xl px-4 sm:px-6 py-4 flex items-center justify-between border-b-2 border-gray-500/80 shadow-2xl supports-[backdrop-filter]:bg-black/90 backdrop-saturate-150">
      <Link href="/" className="text-white text-xl font-semibold hover:text-blue-400 transition-colors relative z-[70] drop-shadow-lg">
        Jatin.dev
      </Link>

      {/* Desktop Nav */}
      <ul className="hidden md:flex gap-8 text-white relative z-[70]">
        {navItems.map((item) => (
          <li 
            key={item.title} 
            className="relative group"
            onMouseEnter={() => item.dropdown && setHoveredDropdown(item.title)}
            onMouseLeave={() => setHoveredDropdown(null)}
          >
            {item.href ? (
              // Direct link items
              item.href.startsWith('/') && !item.href.startsWith('/#') ? (
                <Link
                  href={item.href}
                  className={`relative cursor-pointer pb-1 transition 
                    ${isActiveItem(item) ? 'text-blue-400' : 'text-white hover:text-gray-400'}
                    after:content-[''] after:block after:h-[2px] after:bg-blue-400 
                    after:scale-x-0 after:transition-transform after:origin-left 
                    group-hover:after:scale-x-100 ${isActiveItem(item) ? 'after:scale-x-100' : ''}`}
                >
                  {item.title}
                </Link>
              ) : (
                <span
                  onClick={() => handleNavClick(item)}
                  className={`relative cursor-pointer pb-1 transition 
                    ${isActiveItem(item) ? 'text-blue-400' : 'text-white hover:text-gray-400'}
                    after:content-[''] after:block after:h-[2px] after:bg-blue-400 
                    after:scale-x-0 after:transition-transform after:origin-left 
                    group-hover:after:scale-x-100 ${isActiveItem(item) ? 'after:scale-x-100' : ''}`}
                >
                  {item.title}
                </span>
              )
            ) : (
              // Dropdown items
              <>
                <span
                  onClick={() => handleNavClick(item)}
                  className={`relative cursor-pointer pb-1 transition 
                    ${isActiveItem(item) ? 'text-blue-400' : 'text-white hover:text-gray-400'}
                    after:content-[''] after:block after:h-[2px] after:bg-blue-400 
                    after:scale-x-0 after:transition-transform after:origin-left 
                    group-hover:after:scale-x-100 ${isActiveItem(item) ? 'after:scale-x-100' : ''}`}
                >
                  {item.title}
                </span>

                {/* Dropdown with improved hover behavior */}
                {item.dropdown && (
                  <ul 
                    className={`absolute left-0 top-8 bg-black bg-opacity-90 backdrop-blur-md text-sm w-max rounded-lg shadow-lg p-2 border border-gray-700 transition-all duration-300 z-[80] ${
                      hoveredDropdown === item.title 
                        ? 'opacity-100 pointer-events-auto transform translate-y-0' 
                        : 'opacity-0 pointer-events-none transform -translate-y-2'
                    }`}
                    onMouseEnter={() => setHoveredDropdown(item.title)}
                    onMouseLeave={() => setHoveredDropdown(null)}
                  >
                    {item.dropdown.map((sub) => (
                      <li
                        key={sub.id}
                        className="whitespace-nowrap px-4 py-3 hover:bg-gray-800 rounded cursor-pointer transition-colors"
                        onClick={() => scrollToSection(sub.id)}
                      >
                        {sub.title}
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </li>
        ))}
      </ul>

      {/* Mobile Menu Button */}
      <button 
        onClick={() => setOpen(!open)} 
        className="text-white md:hidden z-[70] relative bg-gray-900/95 backdrop-blur-sm p-3 rounded-lg border border-gray-500/60 shadow-xl hover:bg-gray-800/95 transition-colors drop-shadow-lg mr-2"
        aria-label={open ? 'Close menu' : 'Open menu'}
      >
        {open ? <X size={24} className="drop-shadow-lg" /> : <Menu size={24} className="drop-shadow-lg" />}
      </button>

      {/* Mobile Nav Panel */}
      {open && (
        <div className="md:hidden fixed inset-0 z-[50] flex flex-col">
          {/* Enhanced Backdrop */}
          <div 
            className="absolute inset-0 bg-black/96 backdrop-blur-xl"
            onClick={() => setOpen(false)}
          />
          
          {/* Content */}
          <div className="relative z-[55] flex flex-col items-center justify-center min-h-screen gap-8 text-white text-xl px-6">
            {navItems.map((item) => (
              <div key={item.title} className="text-center">
                {item.href ? (
                  item.href.startsWith('/') && !item.href.startsWith('/#') ? (
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`cursor-pointer py-3 px-4 rounded-lg transition-all drop-shadow-lg ${
                        isActiveItem(item) ? 'text-blue-400 bg-blue-500/20' : 'text-white hover:text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      {item.title}
                    </Link>
                  ) : (
                    <div
                      onClick={() => handleNavClick(item)}
                      className={`cursor-pointer py-3 px-4 rounded-lg transition-all drop-shadow-lg ${
                        isActiveItem(item) ? 'text-blue-400 bg-blue-500/20' : 'text-white hover:text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      {item.title}
                    </div>
                  )
                ) : (
                  <>
                    <div
                      onClick={() => handleNavClick(item)}
                      className={`cursor-pointer py-3 px-4 rounded-lg transition-all drop-shadow-lg ${
                        isActiveItem(item) ? 'text-blue-400 bg-blue-500/20' : 'text-white hover:text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      {item.title}
                    </div>

                    {item.dropdown && (
                      <div className="mt-6 space-y-4">
                        {item.dropdown.map((sub) => (
                          <div
                            key={sub.id}
                            onClick={() => scrollToSection(sub.id)}
                            className="cursor-pointer text-base text-gray-300 hover:text-blue-300 transition-colors py-2 px-3 rounded hover:bg-white/5 drop-shadow"
                          >
                            {sub.title}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}