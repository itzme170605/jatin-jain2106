// app/about-website/page.tsx
'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Palette, Database, Zap, Globe, Rocket, Heart, Coffee, Star, ArrowRight, Expand, X } from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function AboutWebsitePage() {
  const [showBackendImage, setShowBackendImage] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  interface TechBadgeProps {
    icon: React.ComponentType<{ size?: number }>;
    title: string;
    description: string;
    color?: string;
  }

  const TechBadge: React.FC<TechBadgeProps> = ({ icon: Icon, title, description, color = "blue" }) => (
    <motion.div 
      className={`bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:shadow-lg hover:border-${color}-500 transition-all duration-300 hover:scale-105`}
      whileHover={{ y: -5 }}
    >
      <div className={`flex items-center gap-3 mb-3 text-${color}-400`}>
        <Icon size={24} />
        <h3 className="font-semibold text-lg text-white">{title}</h3>
      </div>
      <p className="text-gray-300 leading-relaxed">{description}</p>
    </motion.div>
  );

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative max-w-4xl mx-auto px-6 py-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              The Story Behind This Website
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Welcome to the about page of an about me website – yeah, I know, we're going meta here! 
              But stick with me, because I'm genuinely excited to share the journey of building this digital space.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-16 space-y-20">
        
        {/* Personal Introduction */}
        <motion.section {...fadeInUp} className="prose prose-lg prose-invert max-w-none">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <Heart className="text-red-400" size={28} />
              <h2 className="text-3xl font-bold text-white m-0">Why This Page Exists</h2>
            </div>
            <div className="text-gray-300 leading-relaxed space-y-4 text-lg">
              <p>
                Okay, I'll be honest – this page is stretching it a bit, but it's for the people out there like me 
                who want to know the <em>why</em> behind things, not just see the outputs. You know those developers 
                who spend hours reading documentation just for fun? Yeah, this is for us.
              </p>
              <p>
                When I started building this portfolio, I could have gone with a simple template. But where's the 
                fun in that? Instead, I decided to experiment with some cutting-edge web technologies and push 
                myself to create something that truly represents who I am as a developer.
              </p>
              <p>
                So grab a coffee <Coffee className="inline text-amber-400" size={20} />, and let me walk you through 
                every design decision, every late-night debugging session, and every "wait, that actually worked?" 
                moment that went into creating this digital space.
              </p>
            </div>
          </div>
        </motion.section>

        {/* The 3D Moon Animation */}
        <motion.section {...fadeInUp}>
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Globe className="text-blue-400" size={32} />
              <h2 className="text-4xl font-bold">The Centerpiece: 3D Moon Animation</h2>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
              <h3 className="text-2xl font-semibold mb-4 text-blue-400">The Technical Challenge</h3>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p>
                  The rotating moon you see isn't just a video or GIF – it's a real-time 3D rendered object using 
                  <strong className="text-white"> Three.js</strong> and <strong className="text-white">React Three Fiber</strong>. 
                  I wanted something that would immediately catch attention while being subtle enough not to distract.
                </p>
                <p>
                  The moon uses actual NASA texture maps – both the color map and normal map for realistic surface details. 
                  The rotation speed is carefully tuned to be mesmerizing without being distracting, and it responds 
                  to scroll position for that extra layer of interactivity.
                </p>
              </div>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
              <h3 className="text-2xl font-semibold mb-4 text-purple-400">The Design Philosophy</h3>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p>
                  Why a moon? It represents exploration, curiosity, and the unknown – qualities I bring to every 
                  project. Plus, it perfectly complements the space theme without being too on-the-nose about the 
                  "reaching for the stars" metaphor.
                </p>
                <p>
                  The gradient overlay ensures the text remains readable while the 3D element adds depth. It's positioned 
                  on the right half of the screen on desktop, creating a natural reading flow from left to right.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Technology Stack */}
        <motion.section {...fadeInUp}>
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Code className="text-green-400" size={32} />
              <h2 className="text-4xl font-bold">Technology Stack & Decisions</h2>
            </div>
            <p className="text-gray-300 text-lg">
              Every technology choice was deliberate. Here's the full stack and why each piece matters:
            </p>
          </div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerChildren}
            initial="initial"
            animate="animate"
          >
            <TechBadge
              icon={Rocket}
              title="Next.js 14"
              description="App Router for modern routing, built-in optimization, and seamless TypeScript integration. The performance gains are incredible."
              color="blue"
            />
            <TechBadge
              icon={Zap}
              title="TypeScript"
              description="Because debugging is way more fun when you catch errors at compile time. Plus, the autocomplete makes development lightning-fast."
              color="blue"
            />
            <TechBadge
              icon={Palette}
              title="Framer Motion"
              description="For those buttery-smooth animations. Every scroll, hover, and transition is carefully choreographed to feel natural."
              color="purple"
            />
            <TechBadge
              icon={Globe}
              title="Three.js"
              description="The 3D moon rendering engine. It's like having a game engine in your browser – the possibilities are endless."
              color="green"
            />
            <TechBadge
              icon={Star}
              title="Tailwind CSS"
              description="Utility-first CSS that keeps the styling consistent and the bundle size small. No more wrestling with CSS specificity!"
              color="cyan"
            />
            <TechBadge
              icon={Database}
              title="MongoDB"
              description="For storing contact form submissions. NoSQL flexibility meets modern web app needs perfectly."
              color="green"
            />
          </motion.div>
        </motion.section>

        {/* Design Principles */}
        <motion.section {...fadeInUp}>
          <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-2xl p-8 border border-purple-500/30">
            <div className="flex items-center gap-3 mb-6">
              <Palette className="text-purple-400" size={32} />
              <h2 className="text-4xl font-bold">Design Philosophy</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-purple-400">Dark Theme First</h3>
                <p className="text-gray-300 leading-relaxed">
                  I'm a night owl developer, and dark themes just feel right. But it's more than aesthetics – 
                  dark backgrounds make the 3D elements pop and create better contrast for the colorful accents. 
                  Plus, it's easier on the eyes during those late coding sessions.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-blue-400">Progressive Disclosure</h3>
                <p className="text-gray-300 leading-relaxed">
                  Information is revealed as you scroll, creating a narrative flow. The homepage introduces me, 
                  the about section dives deeper, projects showcase my work, and the contact form invites collaboration. 
                  It's storytelling through UX design.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-green-400">Mobile-First Responsive</h3>
                <p className="text-gray-300 leading-relaxed">
                  Every component was designed mobile-first, then enhanced for larger screens. The 3D moon gracefully 
                  adapts, the navigation transforms into a mobile-friendly overlay, and touch interactions feel natural.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-yellow-400">Performance Obsessed</h3>
                <p className="text-gray-300 leading-relaxed">
                  Every animation is GPU-accelerated, images are optimized, and the 3D rendering is optimized for 
                  60fps. Because a beautiful website that loads slowly isn't really beautiful at all.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Project Timeline Feature */}
        <motion.section {...fadeInUp}>
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <ArrowRight className="text-cyan-400" size={32} />
              <h2 className="text-4xl font-bold">The Horizontal Project Timelines</h2>
            </div>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
            <div className="text-gray-300 leading-relaxed space-y-4 text-lg">
              <p>
                One of my favorite features is the horizontal scrolling project timelines. Instead of a boring 
                vertical list, each project category gets its own timeline that you can scroll through horizontally. 
                It's like flipping through a digital portfolio book.
              </p>
              <p>
                Each project card shows up with a staggered animation, and the timeline nodes light up as you hover. 
                The navigation arrows provide clear affordance for interaction, and the smooth scrolling makes 
                browsing feel effortless.
              </p>
              <p>
                But here's the cool part – the navbar dropdown actually jumps to specific timeline sections. 
                So if you're only interested in my VR projects, you can jump straight there. It's all about 
                respecting the user's time and attention.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Contact Form Innovation */}
        <motion.section {...fadeInUp}>
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Database className="text-amber-400" size={32} />
              <h2 className="text-4xl font-bold">Full-Stack Contact System</h2>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
              <h3 className="text-2xl font-semibold mb-4 text-amber-400">Frontend Magic</h3>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p>
                  The contact form isn't just a pretty face – it's got real-time validation, loading states, 
                  success/error feedback, and even copies my email to your clipboard with a satisfying animation.
                </p>
                <p>
                  The form categorizes different types of projects, so I know immediately if someone wants 
                  a VR experience or a web app. It's like having a smart assistant filter my inquiries.
                </p>
              </div>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-semibold text-blue-400">Backend Power</h3>
                <motion.button
                  onClick={() => setShowBackendImage(true)}
                  className="flex items-center gap-2 bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 px-3 py-2 rounded-lg transition-colors border border-blue-500/30 hover:border-blue-500/60"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Expand size={16} />
                  <span className="text-sm">View Dashboard</span>
                </motion.button>
              </div>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p>
                  Behind the scenes, there's a full admin dashboard where I can view, categorize, and respond 
                  to submissions. It's got search, filtering, status tracking, and direct email integration.
                </p>
                <p>
                  Every submission gets stored in MongoDB with timestamps, IP tracking (for security), and 
                  status management. It's like having a mini-CRM built right into my portfolio.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Development Challenges */}
        <motion.section {...fadeInUp}>
          <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-2xl p-8 border border-red-500/30">
            <div className="flex items-center gap-3 mb-6">
              <Coffee className="text-orange-400" size={32} />
              <h2 className="text-4xl font-bold">The Fun Challenges</h2>
            </div>
            
            <div className="text-gray-300 leading-relaxed space-y-6 text-lg">
              <p>
                <strong className="text-white">The Scroll-Zoom Camera:</strong> Getting the 3D moon to respond 
                to scroll position took way more math than I care to admit. But when it finally worked, watching 
                the moon zoom in and out as you scroll felt like magic.
              </p>
              <p>
                <strong className="text-white">Performance Optimization:</strong> Rendering a 3D scene while 
                maintaining smooth animations and 60fps scroll performance required some creative solutions. 
                Turns out, requestAnimationFrame and GPU optimization are your best friends.
              </p>
              <p>
                <strong className="text-white">Mobile Responsiveness:</strong> Making a 3D scene look good 
                on a phone screen is... interesting. The moon had to gracefully adapt while maintaining its 
                visual impact across all device sizes.
              </p>
              <p>
                <strong className="text-white">TypeScript Integration:</strong> Adding types to Three.js 
                components while keeping React happy was like solving a puzzle. But the resulting developer 
                experience is so much better.
              </p>
            </div>
          </div>
        </motion.section>

        {/* What I Learned */}
        <motion.section {...fadeInUp}>
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Star className="text-yellow-400" size={32} />
              <h2 className="text-4xl font-bold">What I Learned (And What You Can Too)</h2>
            </div>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
            <div className="text-gray-300 leading-relaxed space-y-4 text-lg">
              <p>
                This project pushed me to learn <strong className="text-white">WebGL fundamentals</strong>, 
                dive deeper into <strong className="text-white">React's concurrent features</strong>, and 
                master <strong className="text-white">advanced CSS animations</strong>. But more importantly, 
                it taught me that the best portfolios aren't just showcases – they're experiences.
              </p>
              <p>
                I experimented with <strong className="text-white">component composition patterns</strong>, 
                learned about <strong className="text-white">3D coordinate systems</strong>, and discovered 
                that performance optimization is an art form. Every optimization felt like solving a fascinating puzzle.
              </p>
              <p>
                The database integration taught me about <strong className="text-white">full-stack architecture</strong>, 
                API design, and the importance of proper error handling. There's something deeply satisfying 
                about building the entire stack from frontend to database.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section {...fadeInUp} className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12">
            <h2 className="text-4xl font-bold mb-6">Want Something Similar?</h2>
            <p className="text-xl mb-8 text-blue-100 leading-relaxed max-w-3xl mx-auto">
              If you're excited about creating something unique for your own portfolio or business, 
              I'd love to collaborate! Every project is a chance to push boundaries and create 
              something that perfectly represents your vision.
            </p>
            <motion.a
              href="/#contact"
              className="inline-flex items-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Rocket size={24} />
              Let's Build Something Amazing Together
            </motion.a>
            <p className="text-blue-200 mt-4">
              Use the contact form on the main page – I actually read every message!
            </p>
          </div>
        </motion.section>

      </div>

      {/* Backend Image Modal */}
      <AnimatePresence>
        {showBackendImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowBackendImage(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative bg-gray-900 rounded-2xl p-6 border border-gray-700 max-w-6xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                onClick={() => {
                setShowBackendImage(false);
                // Reset image states when modal closes
                setImageLoaded(false);
                setImageError(false);
              }}
                className="absolute top-4 right-4 z-10 bg-red-600/20 hover:bg-red-600/40 text-red-400 p-2 rounded-lg transition-colors border border-red-500/30 hover:border-red-500/60"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={20} />
              </motion.button>

              {/* Header */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Admin Dashboard</h3>
                <p className="text-gray-400">Complete contact management system with real-time updates</p>
              </div>

              {/* Image Container */}
              <div className="relative bg-gray-800 rounded-xl overflow-hidden border border-gray-600">
                {!imageError ? (
                  <>
                    <img
                      src="/admin-dashboard-screenshot.png"
                      alt="Admin Dashboard Screenshot"
                      className={`w-full h-auto object-contain transition-opacity duration-300 ${
                        imageLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                      style={{ maxHeight: 'calc(90vh - 200px)' }}
                      onLoad={() => {
                        console.log('Image loaded successfully');
                        setImageLoaded(true);
                      }}
                      onError={(e) => {
                        console.error('Image failed to load:', e);
                        setImageError(true);
                      }}
                    />
                    
                    {/* Loading placeholder */}
                    {!imageLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-gray-400">
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
                          <p>Loading dashboard image...</p>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  /* Fallback when image fails to load */
                  <div className="flex items-center justify-center bg-gray-800 text-gray-400 min-h-[400px]">
                    <div className="text-center p-8">
                      <Database size={48} className="mx-auto mb-4 text-blue-400" />
                      <h4 className="text-xl font-semibold mb-2">Admin Dashboard Preview</h4>
                      <p className="text-gray-500 max-w-md mb-4">
                        The admin dashboard features submission management, 
                        filtering, search, and status tracking capabilities.
                      </p>
                      <p className="text-sm text-gray-600">
                        Image not found: <code>/public/admin-dashboard-screenshot.png</code>
                      </p>
                      <button
                        onClick={() => {
                          setImageError(false);
                          setImageLoaded(false);
                        }}
                        className="mt-4 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                      >
                        Retry Loading Image
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Features List */}
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="bg-gray-800 rounded-lg p-3 text-center">
                  <div className="text-green-400 font-medium">Real-time Updates</div>
                  <div className="text-gray-400">Live submission tracking</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-3 text-center">
                  <div className="text-blue-400 font-medium">Search & Filter</div>
                  <div className="text-gray-400">Advanced querying</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-3 text-center">
                  <div className="text-purple-400 font-medium">Status Management</div>
                  <div className="text-gray-400">Track progress</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-3 text-center">
                  <div className="text-yellow-400 font-medium">Email Integration</div>
                  <div className="text-gray-400">Direct responses</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}