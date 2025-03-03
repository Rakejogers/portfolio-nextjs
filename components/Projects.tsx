'use client'

import { useState, useRef } from 'react'
import { motion, useInView, useMotionTemplate, useMotionValue } from 'framer-motion'
import { ExternalLink, Github, ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Project {
  title: string
  description: string
  tech: string[]
  demo?: string
  github?: string
}

const projects = [
  {
    title: 'Scholar Seats',
    description: 'A student-focused ticket exchange platform to facilitate communication between buyers and sellers of tickets for events at my university. Released and used by 75+ users at my university.',
    tech: ['Next.js', 'TypeScript', 'Pocketbase', 'SQLite', 'Linux', 'Nginx', 'Vercel'],
    demo: 'https://scholarseats.com',
    github: 'https://github.com/rakejogers/student-ticket-app',
  },
  {
    title: 'Snake Game Neural Network',
    description: 'An AI agent that learns to play Snake using deep reinforcement learning.',
    tech: ['Python', 'PyTorch'],
    github: 'https://github.com/rakejogers/snake_game_ai',
  },
  {
    title: 'Video Sharing Mobile App (AORA)',
    description: 'A mobile application for sharing AI-generated videos using React Native and Appwrite Database.',
    tech: ['React Native', 'Expo', 'JavaScript'],
    github: 'https://github.com/rakejogers/jsMastery-Aora',
  },
  {
    title: 'Portfolio Website',
    description: 'My portfolio website built with Next.js and Tailwind CSS. Features a dark mode toggle and smooth scrolling.',
    tech: ['Next.js', 'Tailwind CSS', 'TypeScript', 'Vercel'],
    github: 'https://github.com/Rakejogers/portfolio-nextjs',
  },
]

const Projects = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  return (
    <section ref={ref} id="projects" className="py-24">
      <motion.div 
        className="container mx-auto px-4"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Badge variant="outline" className="mb-4 px-4 py-1 text-sm border-primary/30 text-primary">
              My Work
            </Badge>
          </motion.div>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Featured Projects
          </motion.h2>
          <motion.p 
            className="text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            A showcase of my recent work, featuring web applications, machine learning models, and mobile development
          </motion.p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <Button variant="outline" asChild>
            <a href="https://github.com/Rakejogers" target="_blank" rel="noopener noreferrer" className="group">
              View More Projects on GitHub
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [isHovered, setIsHovered] = useState(false);
  
  // Mouse position for lighting effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    mouseX.set(x);
    mouseY.set(y);
  };
  
  const backgroundGlow = useMotionTemplate`
    radial-gradient(
      350px circle at ${mouseX}px ${mouseY}px,
      var(--spotlight-color) 0%,
      transparent 80%
    )
  `;
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative h-full rounded-xl p-px"
      style={{
        '--spotlight-color': 'rgba(var(--primary-rgb), 0.08)'
      } as any}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          backgroundImage: backgroundGlow as any,
        }}
      />
      
      <div className="relative h-full rounded-xl border border-border bg-card/30 backdrop-blur-sm transition-all duration-300 group-hover:shadow-md">
        <div className="p-6 flex flex-col h-full">
          <motion.h3 
            className="text-2xl font-semibold mb-3 tracking-tight flex items-center"
            animate={isHovered ? { x: 8 } : { x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {project.title}
            <motion.div 
              initial={{ width: 0 }}
              animate={isHovered ? { width: 'auto' } : { width: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden ml-2"
            >
              <ArrowRight className="h-4 w-4 text-primary" />
            </motion.div>
          </motion.h3>
          
          <p className="text-muted-foreground mb-6 flex-grow">
            {project.description}
          </p>
          
          <div className="mt-auto space-y-4">
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <Badge key={tech} variant="secondary" className="text-xs px-2 py-0.5">
                  {tech}
                </Badge>
              ))}
            </div>
            
            <div className="flex gap-3">
              {project.github && (
                <Button variant="outline" size="sm" asChild className="group/btn">
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2 transition-transform group-hover/btn:scale-110" /> 
                    Code
                  </a>
                </Button>
              )}
              {project.demo && (
                <Button size="sm" asChild className="group/btn">
                  <a href={project.demo} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2 transition-transform group-hover/btn:scale-110" /> 
                    Demo
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Projects

