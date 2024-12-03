'use client'

import { useRef } from "react"
import { motion } from "framer-motion"
import Hero from "@/components/Hero"
import Projects from "@/components/Projects"
import WorkHistory from "@/components/WorkHistory"
import Education from "@/components/Education"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"
import Background from "@/components/Background"

export default function Home() {
  const projectsRef = useRef<HTMLDivElement | null>(null) // Change HTMLElement to HTMLDivElement
  const contactRef = useRef<HTMLDivElement | null>(null) // Change HTMLElement to HTMLDivElement

  const scrollToProjects = () => {
    projectsRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  
  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <main className="relative min-h-screen">
      <Background />
      <Hero scrollToProjects={scrollToProjects} scrollToContact={scrollToContact}/>
      <div className="section-transition" ref={projectsRef}>
        <div className="section-content">
          <Projects />
        </div>
      </div>
      <div className="section-transition">
        <div className="section-content">
          <WorkHistory />
        </div>
      </div>
      <div className="section-transition">
        <div className="section-content">
          <Education />
        </div>
      </div>
      <div className="section-transition" ref={contactRef}>
        <div className="section-content">
          <Contact />
        </div>
      </div>
      <Footer />
    </main>
  )
}

