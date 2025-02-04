'use client'

import { motion } from "framer-motion"
import { ChevronDown, Terminal } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface HeroProps {
  scrollToProjects: () => void
  scrollToContact: () => void
}

const Hero = ({ scrollToProjects, scrollToContact }: HeroProps) => {
  return (
    <section className="container mx-auto px-4 py-20 min-h-screen flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl"
      >
        <Badge variant="secondary" className="mb-4 text-green-500">
          <Terminal className="w-3 h-3 mr-1" /> Available for hire
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary from-0% via-blue-600 via-50% to-primary to-100% text-transparent bg-clip-text leading-[1.2] md:leading-[1.2] animate-gradient bg-[length:200%_auto]">
          Hi, I&apos;m Jake Rogers
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8">
          A passionate developer and student at the University of Kentucky.
        </p>
        <div className="flex gap-4">
          <Button size="lg" onClick={scrollToProjects}>
            View Projects 
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              <ChevronDown className="ml-2 w-4 h-4" />
            </motion.div>
          </Button>
          <Button size="lg" variant="outline" onClick={scrollToContact}>
            Contact Me
          </Button>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero

