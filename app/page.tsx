'use client'

import { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Header from "@/components/Header"
import Hero from "@/components/Hero"
import Projects from "@/components/Projects"
import WorkHistory from "@/components/WorkHistory"
import Education from "@/components/Education"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"
import Background from "@/components/Background"
import IntroAnimation from "@/components/IntroAnimation"

export default function Home() {
  const projectsRef = useRef<HTMLDivElement | null>(null)
  const workRef = useRef<HTMLDivElement | null>(null)
  const educationRef = useRef<HTMLDivElement | null>(null)
  const contactRef = useRef<HTMLDivElement | null>(null)
  const [showIntro, setShowIntro] = useState(false)
  const [showContent, setShowContent] = useState(false)

  const scrollToProjects = () => {
    projectsRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  
  const scrollToWork = () => {
    workRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  
  const scrollToEducation = () => {
    educationRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  
  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleIntroComplete = () => {
    // Preload content immediately
    setShowContent(true)
    
    // Use requestAnimationFrame to ensure the content is rendered
    // before starting the transition
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // Remove intro in the next frame after content is ready
        setShowIntro(false)
        // Enable scrolling
        document.body.style.overflow = 'auto'
      })
    })
  }

  // Lock scrolling during intro animation
  useEffect(() => {
    // Disable scrolling during intro
    if (showIntro) {
      document.body.style.overflow = 'hidden'
    }
    
    // If the user has visited before, we could skip the intro
    // Uncomment this to enable that feature:
    /*
    const hasVisitedBefore = localStorage.getItem('hasVisitedBefore')
    if (hasVisitedBefore) {
      handleIntroComplete()
    } else {
      localStorage.setItem('hasVisitedBefore', 'true')
    }
    */
    
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [showIntro])

  return (
    <main className="relative min-h-screen">
      <AnimatePresence mode="wait">
        {showIntro ? (
          <motion.div
            key="intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <IntroAnimation onComplete={handleIntroComplete} />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Background />
            <Header />
            <Hero 
              scrollToProjects={scrollToProjects} 
              scrollToContact={scrollToContact}
            />
            <motion.div
              id="projects"
              className="section-transition"
              ref={projectsRef}
            >
              <div className="section-content">
                <Projects />
              </div>
            </motion.div>
            <motion.div
              id="experience"
              className="section-transition" 
              ref={workRef}
            >
              <div className="section-content">
                <WorkHistory />
              </div>
            </motion.div>
            <motion.div
              id="education"
              className="section-transition" 
              ref={educationRef}
            >
              <div className="section-content">
                <Education />
              </div>
            </motion.div>
            <motion.div
              id="contact"
              className="section-transition" 
              ref={contactRef}
            >
              <div className="section-content">
                <Contact />
              </div>
            </motion.div>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

