'use client'

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ChevronDown, Terminal, ExternalLink, MousePointer } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface HeroProps {
  scrollToProjects: () => void
  scrollToContact: () => void
}

const Hero = ({ scrollToProjects, scrollToContact }: HeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  
  const headingOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const headingY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  
  // Track mouse movement for different effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // For parallax effects (relative positioning)
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5
      });
      
      // For cursor follower (absolute positioning)
      setCursorPosition({
        x: e.clientX,
        y: e.clientY
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Calculate parallax styles based on mouse position
  const getParallaxStyle = (strength: number) => ({
    transform: `translate(${mousePosition.x * strength}px, ${mousePosition.y * strength}px)`
  });

  return (
    <section ref={containerRef} className="relative container mx-auto px-4 py-0 min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Interactive cursor follower - using absolute positioning */}
      <motion.div 
        className="fixed w-8 h-8 rounded-full border border-primary/50 pointer-events-none z-50 hidden md:flex items-center justify-center"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          x: cursorPosition.x,
          y: cursorPosition.y
        }}
        transition={{
          type: "spring",
          damping: 28,
          stiffness: 500,
          mass: 0.2
        }}
      >
        <motion.div 
          className="w-2 h-2 bg-primary rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>

      {/* Main content */}
      <motion.div
        className="relative z-10 max-w-3xl mx-auto"
        style={{ 
          opacity: headingOpacity,
          y: headingY
        }}
      >
        <motion.div 
          className="flex items-center mb-6 space-x-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="outline" className="py-2 text-primary border-primary/50">
            <Terminal className="w-3 h-3 mr-1" /> Available for hire
          </Badge>
          <motion.div 
            className="h-px flex-grow bg-gradient-to-r from-primary/10 via-primary/50 to-primary/10"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 leading-[1.1] tracking-tight"
          >
            <div className="flex flex-col">
              <motion.span 
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="block"
              >
                Hi, I&apos;m
              </motion.span>
              <motion.span 
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="block bg-gradient-to-r from-blue-600 via-primary to-purple-600 text-transparent bg-clip-text"
              >
                Jake Rogers
              </motion.span>
            </div>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            A passionate developer and student at the University of Kentucky building innovative solutions for real-world problems.
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <Button 
            size="lg" 
            onClick={scrollToProjects}
            className="group relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center">
              View Projects
              <motion.span
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="ml-2"
              >
                <ChevronDown className="w-4 h-4" />
              </motion.span>
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Button>
          
          <Button 
            size="lg" 
            variant="outline" 
            onClick={scrollToContact}
            className="group relative overflow-hidden"
          >
            <span className="relative z-10">Contact Me</span>
            <span className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Button>
        </motion.div>
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <MousePointer className="w-4 h-4 mb-2 animate-bounce" />
        <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
      </motion.div>
    </section>
  )
}

export default Hero

