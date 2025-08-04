'use client'

import { useRef } from "react"
import { motion } from "framer-motion"
import Hero from "@/components/Hero"
import Projects from "@/components/Projects"
import WorkHistory from "@/components/WorkHistory"
import Education from "@/components/Education"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"

export default function Home() {
  const projectsRef = useRef<HTMLDivElement | null>(null)
  const workRef = useRef<HTMLDivElement | null>(null)
  const educationRef = useRef<HTMLDivElement | null>(null)
  const contactRef = useRef<HTMLDivElement | null>(null)

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


  return (
    <main className="relative min-h-screen bg-background">
      <motion.div
        key="content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div className="relative">
          {/* Hero Section - Full Screen */}
          <Hero 
            scrollToProjects={scrollToProjects} 
            scrollToContact={scrollToContact}
          />
          
          {/* Content Cards with minimal spacing */}
          <div className="space-y-4 sm:space-y-6 md:space-y-8 bg-card/80 backdrop-blur-md p-1 sm:p-2 md:p-4 lg:p-8 pb-20 sm:pb-2 md:pb-4 lg:pb-8">

          {/* Projects Card */}
          <motion.div
            id="projects"
            className="relative"
            ref={projectsRef}
          >
            <div className="rounded-xl sm:rounded-2xl md:rounded-3xl bg-card/80 backdrop-blur-md p-3 sm:p-4 md:p-6 shadow-2xl border border-border">
              <div className="section-content">
                <Projects />
              </div>
            </div>
          </motion.div>

          {/* Work History Card */}
          <motion.div
            id="experience"
            className="relative"
            ref={workRef}
          >
            <div className="rounded-xl sm:rounded-2xl md:rounded-3xl bg-white p-3 sm:p-4 md:p-6 shadow-2xl border border-gray-200">
              <div className="section-content">
                <WorkHistory />
              </div>
            </div>
          </motion.div>

          {/* Education Card */}
          <motion.div
            id="education"
            className="relative"
            ref={educationRef}
          >
            <div className="rounded-xl sm:rounded-2xl md:rounded-3xl bg-white p-3 sm:p-4 md:p-6 shadow-2xl border border-gray-200">
              <div className="section-content">
                <Education />
              </div>
            </div>
          </motion.div>

          {/* Contact Card */}
          <motion.div
            id="contact"
            className="relative"
            ref={contactRef}
          >
            <div className="rounded-xl sm:rounded-2xl md:rounded-3xl bg-white p-3 sm:p-4 md:p-6 shadow-2xl border border-gray-200">
              <div className="section-content">
                <Contact />
              </div>
            </div>
          </motion.div>

          {/* Footer Card */}
          <div className="relative">
              <Footer />
          </div>
          
          </div> {/* Close content cards div */}
        </div>
      </motion.div>
    </main>
  )
}

