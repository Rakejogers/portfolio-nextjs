'use client'

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { LavaLamp } from "@/components/ui/fluid-blob"

interface HeroProps {
  scrollToProjects: () => void
  scrollToContact: () => void
}

const Hero = ({ scrollToProjects, scrollToContact }: HeroProps) => {
  return (
    <section className="relative h-screen w-full flex flex-col justify-center items-center overflow-visible bg-black text-white">
      {/* Fluid Blob Background */}
      <LavaLamp />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 md:px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight mix-blend-exclusion text-white mb-6 px-2 sm:px-0"
        >
          JAKE ROGERS
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base sm:text-lg md:text-xl text-center text-white mix-blend-exclusion max-w-2xl leading-relaxed mb-8 sm:mb-12 mx-auto px-2 sm:px-0"
        >
          Computer Science Student at the University of Kentucky.
        </motion.p>

        {/* Call to action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 relative pointer-events-auto px-2 sm:px-0"
        >
          <Button 
            onClick={scrollToProjects} 
            size="lg" 
            className="w-full max-w-xs sm:w-auto bg-white text-black hover:bg-gray-200 mix-blend-exclusion border-0"
          >
            View Projects
          </Button>
          <Button 
            onClick={scrollToContact} 
            variant="ghost"
            size="lg" 
            className="w-full max-w-xs sm:w-auto border-2 border-white text-white hover:bg-white hover:text-black mix-blend-exclusion"
          >
            Resume/Contact
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero

