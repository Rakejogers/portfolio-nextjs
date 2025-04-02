'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useInView, useMotionTemplate, useMotionValue, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import PocketBase from 'pocketbase';

interface Project {
  title: string
  description: string
  tech: string[]
  demo?: string
  github?: string
  longDescription?: string
}

const pb = new PocketBase('https://pocketbase.scholarseats.com');

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const projectRefs = useRef<(HTMLDivElement | null)[]>([])
  const [userCount, setUserCount] = useState<number>(0);
  
  const scrollToProject = (index: number) => {
    projectRefs.current[index]?.scrollIntoView({ behavior: "smooth" })
    setSelectedProject(index)
  }

  // Fetch scholar seats user count from Pocketbase
  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const record = await pb.collection('num_users').getOne('1');
        setUserCount(Math.round(record.totalUsers / 5) * 5);
      } catch (error) {
        console.error('Error fetching user count:', error);
      }
    };
    fetchUserCount();
  }, []);

  const projects = [
    {
      title: 'Scholar Seats',
      description: 'A student-focused ticket exchange platform',
      longDescription: `A student-focused ticket exchange platform to facilitate communication between buyers and sellers of tickets for events at my university. Released and used by ${userCount}+ users at my university.`,
      tech: ['Next.js', 'TypeScript', 'Pocketbase', 'SQLite', 'Linux', 'Nginx', 'Vercel'],
      demo: 'https://scholarseats.com',
      github: 'https://github.com/rakejogers/student-ticket-app',
      image: '/project1.webm',
    },
    {
      title: 'Snake Game Neural Network',
      description: 'AI agent learning through reinforcement',
      longDescription: 'An AI agent that learns to play Snake using deep reinforcement learning.',
      tech: ['Python', 'PyTorch'],
      github: 'https://github.com/rakejogers/snake_game_ai',
      image: '/project2.webm',
    },
    {
      title: 'Video Sharing Mobile App',
      description: 'Mobile app for AI-generated videos',
      longDescription: 'A mobile application for sharing AI-generated videos using React Native and Appwrite Database.',
      tech: ['React Native', 'Expo', 'JavaScript'],
      github: 'https://github.com/rakejogers/jsMastery-Aora',
      image: '/project3.webm',
    },
    {
      title: 'Portfolio Website',
      description: 'Modern portfolio with Next.js',
      longDescription: 'My portfolio website you\'re on that I\'ve built with Next.js and Tailwind CSS. Features smooth scrolling, animations, and cool blobs.',
      tech: ['Next.js', 'Tailwind CSS', 'TypeScript', 'Vercel'],
      github: 'https://github.com/Rakejogers/portfolio-nextjs',
      image: '/project4.webm',
    },
  ]

  return (
    <div className="min-h-screen bg-transparent text-foreground">
      {/* Projects List View */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="min-h-screen relative overflow-hidden bg-transparent"
      >
        {/* Mobile Projects Header */}
        <div className="md:hidden text-center py-8">
          <motion.h1 
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            My Projects
          </motion.h1>
        </div>

        <motion.div 
          className="absolute right-0 top-0 bottom-0 w-full md:w-[55%] flex items-center justify-end"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <video 
              src="/projects-list.webm" 
              autoPlay
              loop
              muted
              playsInline
              className="w-auto h-[50vh] md:h-[90vh] object-contain hidden md:block" 
            />
          </div>
        </motion.div>
        
        <div className="absolute left-0 top-0 bottom-0 w-full md:w-[45%] flex items-center">
          <div className="px-4 md:px-12 w-full">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-8 md:mb-16 hidden md:block"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              My Projects
            </motion.h1>
            <div className="space-y-4 md:space-y-8 w-full">
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  className="cursor-pointer group w-full"
                  onClick={() => scrollToProject(index)}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  whileHover={{ x: 20 }}
                >
                  <h2 className="text-2xl md:text-4xl font-light mb-1 md:mb-2">{project.title}</h2>
                  <p className="text-sm md:text-base text-muted-foreground">{project.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Individual Project Sections */}
      {projects.map((project, index) => (
        <motion.div
          key={project.title}
          ref={el => projectRefs.current[index] = el}
          className="min-h-screen flex items-center justify-center relative overflow-hidden py-8 md:py-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20%" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
          }}
          transition={{ duration: 0.8 }}
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 items-center">
              <motion.div 
                className="space-y-6 md:space-y-8 order-2 md:order-1"
                variants={{
                  hidden: { opacity: 0, x: -50 },
                  visible: { opacity: 1, x: 0 }
                }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-4xl md:text-6xl font-bold">{project.title}</h2>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">{project.longDescription}</p>
                <motion.div 
                  className="flex flex-wrap gap-2 md:gap-3"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  {project.tech.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs md:text-sm px-2 md:px-3 py-1">
                      {tech}
                    </Badge>
                  ))}
                </motion.div>
                <motion.div 
                  className="flex flex-wrap gap-4"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  {project.github && (
                    <Button variant="outline" size="sm" className="w-full md:w-auto md:text-base md:h-10" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" /> 
                        View Code
                      </a>
                    </Button>
                  )}
                  {project.demo && (
                    <Button size="sm" className="w-full md:w-auto md:text-base md:h-10" asChild>
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" /> 
                        {project.title === 'Scholar Seats' ? 'Visit' : 'Live Demo'}
                      </a>
                    </Button>
                  )}
                </motion.div>
              </motion.div>
              <motion.div 
                className="relative flex items-center justify-center mb-6 md:mb-0 order-1 md:order-2"
                variants={{
                  hidden: { opacity: 0, x: 50 },
                  visible: { opacity: 1, x: 0 }
                }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <video 
                  src={project.image} 
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full md:w-auto h-auto max-w-full md:max-w-none object-contain rounded-lg shadow-lg" 
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default Projects

