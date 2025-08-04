'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useInView, useMotionTemplate, useMotionValue, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import PocketBase from 'pocketbase';
import ProjectMedia from '@/components/MediaPlayer';

interface Project {
  title: string
  description: string
  tech: string[]
  demo?: string
  github?: string
  longDescription?: string
  image: string
}

const pb = new PocketBase('https://pocketbase.scholarseats.com');

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const projectRefs = useRef<(HTMLDivElement | null)[]>([])
  const [userCount, setUserCount] = useState<number>(0);
  const [isSafari, setIsSafari] = useState(false);
  
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

    // Safari detection
    setIsSafari(/iPad|iPhone|iPod/.test(navigator.userAgent) && /Safari/.test(navigator.userAgent) && !/(Chrome|CriOS)/.test(navigator.userAgent));
  }, []);

  const projects = [
    {
      title: 'Scholar Seats',
      description: 'A student-focused ticket exchange platform',
      longDescription: `A student-focused ticket exchange platform to facilitate communication between buyers and sellers of tickets for events at my university. Released and used by ${userCount}+ users at my university.`,
      tech: ['Next.js', 'TypeScript', 'Pocketbase', 'SQLite', 'Linux', 'Nginx', 'Vercel'],
      demo: 'https://scholarseats.com',
      github: 'https://github.com/rakejogers/student-ticket-app',
      image: '/scholar-seats-demo.mp4',
    },

    {
      title: 'Factify (First Place at CatHacks XI)',
      description: 'A Chrome extension for fact checking any claims on the web which won CatHacks XI Overall Best Hack',
      longDescription: 'Factify is a Google Chrome Extension me and a team built that won CatHacks XI Overall Best Hack. It will evaluate a highlighted statement or webpage for factual accuracy and bias by using Perplexity\'s Sonar-Reasoning-Pro API. ',
      tech: ['HTML', 'CSS', 'JavaScript', 'Perplexity API', 'Google Chrome Extension API'],
      github: 'https://github.com/ImNateBerry/Factify',
      image: '/factify.png',
    },
    {
      title: 'Snake Game Neural Network',
      description: 'AI agent learning through reinforcement',
      longDescription: 'An AI agent that learns to play Snake using deep reinforcement learning.',
      tech: ['Python', 'PyTorch'],
      github: 'https://github.com/rakejogers/snake_game_ai',
      image: '/snake-project-demo.mp4',
    },
    {
      title: 'Portfolio Website',
      description: 'Modern portfolio with Next.js',
      longDescription: 'My portfolio website you\'re on that I\'ve built with Next.js and Tailwind CSS. Features smooth scrolling, animations, and cool blobs.',
      tech: ['Next.js', 'Tailwind CSS', 'TypeScript', 'Vercel'],
      github: 'https://github.com/Rakejogers/portfolio-nextjs',
      image: '/portfolio-demo.mp4',
    },
  ]

  return (
    <div className="min-h-screen bg-white text-black">

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
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed">{project.longDescription}</p>
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
                    <Button variant="outline" size="default" className="w-full md:w-auto" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" /> 
                        View Code
                      </a>
                    </Button>
                  )}
                  {project.demo && (
                    <Button size="default" className="w-full md:w-auto" asChild>
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
                <ProjectMedia project={project} isSafari={isSafari} />
              </motion.div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default Projects

