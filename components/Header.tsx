'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from "next-themes"
import { Menu, X } from 'lucide-react'

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const { setTheme, theme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  useEffect(() => {
    // Ensure this code runs only on the client
    if (typeof window === 'undefined') {
      return;
    }

    const handleScroll = () => {
      // Use window.scrollY which is more standard
      setScrolled(window.scrollY > 50);
    };

    // Attach scroll event listener to window
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup: remove event listener when component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const links = ['PROJECTS', 'EXPERIENCE', 'EDUCATION', 'CONTACT']

  return (
    <>
      {/* Desktop Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`fixed w-full z-50 transition-all duration-300 hidden md:block ${
          scrolled 
            ? 'bg-background/80 backdrop-blur-md shadow-md top-0'
            : 'bg-transparent top-8'
        }`}
      >
        <div className={`container mx-auto px-6 py-4 flex ${scrolled ? 'justify-between' : 'justify-center'} items-center transition-all duration-500`}>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ 
              opacity: scrolled ? 1 : 0,
              width: scrolled ? 'auto' : 0
            }}
            transition={{ 
              duration: 0.5,
              type: "spring",
              stiffness: 50, 
              damping: 20
            }}
            className="text-xl font-bold tracking-wider cursor-pointer overflow-hidden whitespace-nowrap"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            {scrolled && "JAKE ROGERS"}
          </motion.div>
          
          <motion.nav 
            layout
            transition={{
              duration: 0.5,
              type: "spring",
              stiffness: 50,
              damping: 20
            }}
            className="flex items-center space-x-4"
          >
            <ul className="flex items-center space-x-8 text-foreground">
              {links.map((item, i) => (
                <motion.li 
                  key={item}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="relative"
                >
                  <a 
                    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-sm font-medium tracking-wider hover:text-primary transition-colors"
                  >
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        </div>
      </motion.header>

      {/* Mobile Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`fixed w-full z-50 transition-all duration-300 md:hidden ${
          scrolled 
            ? 'bg-background/80 backdrop-blur-md shadow-md'
            : 'bg-transparent'
        } top-0`}
      >
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-lg font-bold tracking-wider cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            JAKE ROGERS
          </motion.div>
          
          <button 
            className="p-2 rounded-full bg-background/50 backdrop-blur-md"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-lg md:hidden pt-20"
          >
            <nav className="container mx-auto px-4 py-8">
              <ul className="flex flex-col items-center space-y-8 text-foreground">
                {links.map((item, i) => (
                  <motion.li 
                    key={item}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="w-full"
                  >
                    <a 
                      href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-xl font-medium tracking-wider hover:text-primary transition-colors flex justify-center py-3"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header

