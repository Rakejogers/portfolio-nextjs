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
    <main className="relative min-h-screen bg-background p-2 md:p-4 lg:p-8">
      <motion.div
        key="content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative mx-auto max-w h-screen"
      >
        <div className="relative space-y-6 md:space-y-8">
          {/* Hero Card */}
          <div className="relative mb-12 md:mb-24">
            <div className="rounded-2xl md:rounded-3xl bg-card p-4 md:p-6 shadow-2xl pointer-events-auto">
              <Hero 
                scrollToProjects={scrollToProjects} 
                scrollToContact={scrollToContact}
              />
            </div>
          </div>

          {/* Projects Card */}
          <motion.div
            id="projects"
            className="relative"
            ref={projectsRef}
          >
            <div className="rounded-2xl md:rounded-3xl bg-card/80 backdrop-blur-md p-4 md:p-6 shadow-2xl border border-border/30">
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
            <div className="rounded-2xl md:rounded-3xl bg-card/80 backdrop-blur-md p-4 md:p-6 shadow-2xl border border-border/30">
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
            <div className="rounded-2xl md:rounded-3xl bg-card backdrop-blur-md p-4 md:p-6 shadow-2xl border border-border/30">
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
            <div className="rounded-2xl md:rounded-3xl bg-card/80 backdrop-blur-md p-4 md:p-6 shadow-2xl border border-border/30">
              <div className="section-content">
                <Contact />
              </div>
            </div>
          </motion.div>

          {/* Footer Card */}
          <div className="relative">
              <Footer />
          </div>
        </div>
      </motion.div>
    </main>
  )
}

