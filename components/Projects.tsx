'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Github } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const projects = [
  {
    title: 'Scholar Seats',
    description: 'A student-focused ticket exchange platform with secure authentication and ticket filtering. Build for real users at my university.',
    tech: ['Next.js', 'TypeScript', 'Pocketbase', 'SQLite', 'Linux', 'Nginx', 'Vercel'],
    demo: 'https://scholarseats.com',
    github: 'https://github.com/rakejogers/scholar-seats',
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
  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Featured Projects</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

const ProjectCard = ({ project, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="h-full flex flex-col">
        <div className="p-6 flex-grow">
          <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
          <p className="text-muted-foreground mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
        <div className="p-6 pt-0 mt-auto">
          <div className="flex gap-4">
            {project.github && (
              <Button variant="outline" size="sm" asChild>
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" /> Code
                </a>
              </Button>
            )}
            {project.demo && (
              <Button size="sm" asChild>
                <a href={project.demo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" /> Demo
                </a>
              </Button>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export default Projects

