'use client'

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ChevronDown, Terminal, ExternalLink, MousePointer } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GooeyText } from "@/components/ui/gooey-text-morphing"

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
    <section className="relative min-h-screen flex flex-col justify-center items-center bg-transparent text-foreground">
      {/* Animated background placeholder - will be replaced with actual GIF/animation */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full flex items-center justify-center">
          <video
            src="/hero.webm"
            autoPlay
            loop
            muted
            playsInline
            className="object-cover absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-150 md:scale-[1.2]"
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center mt-20 md:mt-0">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-bold mb-4 md:mb-8 bg-clip-text text-foreground from-fuchsia-500 to-purple-600"
        >
          JAKE ROGERS
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 md:mb-8"
        >
          <GooeyText 
            texts={["I'm a software developer.", "I'm a student.", "I'm a design engineer."]} 
            morphTime={1.5}
            cooldownTime={1.5}
            className="h-8 md:h-12"
            textClassName="text-lg sm:text-xl md:text-2xl lg:text-3xl"
          />
        </motion.div>

        {/* Call to action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8"
        >
          <Button 
            onClick={scrollToProjects} 
            size="lg" 
            className="w-full sm:w-auto text-sm md:text-base"
          >
            View Projects
          </Button>
          <Button 
            onClick={scrollToContact} 
            variant="outline" 
            size="lg" 
            className="w-full sm:w-auto text-sm md:text-base"
          >
            Contact Me
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero

