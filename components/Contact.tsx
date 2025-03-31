'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Github, Linkedin, Mail } from 'lucide-react'
import { Button } from "@/components/ui/button"

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="contact" className="py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-foreground">Let&apos;s Connect</h2>
          <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8">
            I&apos;m always open to new opportunities and collaborations. Feel free to reach out through any of these platforms:
          </p>
          <div className="flex flex-col md:flex-row justify-center md:space-x-4 space-y-3 md:space-y-0">
            <Button variant="outline" size="sm" className="w-full md:w-auto md:size-lg hover-3d text-xs md:text-sm py-5 md:py-6" asChild>
              <a href="mailto:jarog2005@gmail.com" className="flex items-center justify-center">
                <Mail className="w-4 h-4 mr-2" /> Email
              </a>
            </Button>
            <Button variant="outline" size="sm" className="w-full md:w-auto md:size-lg hover-3d text-xs md:text-sm py-5 md:py-6" asChild>
              <a href="https://github.com/rakejogers" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                <Github className="w-4 h-4 mr-2" /> GitHub
              </a>
            </Button>
            <Button variant="outline" size="sm" className="w-full md:w-auto md:size-lg hover-3d text-xs md:text-sm py-5 md:py-6" asChild>
              <a href="https://linkedin.com/in/jake-rogers-engineer" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                <Linkedin className="w-4 h-4 mr-2" /> LinkedIn
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact

