'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Timeline } from '@/components/ui/timeline'

const workHistory = [
  {
    title: '2024 - Present',
    content: (
      <div className="flex flex-col space-y-4">
        <div>
          <h3 className="text-lg md:text-xl font-bold text-primary">Engineering Prototyping Guide</h3>
          <h4 className="font-semibold text-base md:text-lg">University of Kentucky Innovation Center</h4>
          <p className="text-xs md:text-sm text-muted-foreground">Aug 2024 - Present</p>
        </div>
        
        <div className="space-y-2">
          {[
            'Collaborated with 30 other peers to run the university\'s engineering makerspace',
            'Guided students in the design and prototyping of engineering projects',
            'Provided hands-on assistance with 3D printing, laser cutting, CNC machining, and other fabrication techniques',
          ].map((item, i) => (
            <div key={i} className="flex items-start">
              <span className="w-2 h-2 bg-primary rounded-full mt-1.5 md:mt-2 mr-2 md:mr-3 flex-shrink-0"></span>
              <p className="text-sm md:text-base text-foreground">{item}</p>
            </div>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-2 md:gap-3">
          <span className="px-3 md:px-4 py-1 bg-secondary text-secondary-foreground rounded-full text-xs md:text-sm">3D Printing</span>
          <span className="px-3 md:px-4 py-1 bg-secondary text-secondary-foreground rounded-full text-xs md:text-sm">CNC</span>
          <span className="px-3 md:px-4 py-1 bg-secondary text-secondary-foreground rounded-full text-xs md:text-sm">Prototyping</span>
        </div>
      </div>
    ),
  },
  {
    title: 'Summer 2024',
    content: (
      <div className="flex flex-col space-y-4">
        <div>
          <h3 className="text-lg md:text-xl font-bold text-primary">IT Technician</h3>
          <h4 className="font-semibold text-base md:text-lg">Grayson County Board of Education</h4>
          <p className="text-xs md:text-sm text-muted-foreground">May 2024 - Aug 2024</p>
        </div>
        
        <div className="space-y-2">
          {[
            'Worked alongside others to upkeep all the technology across various schools in the district',
            'Learned practices of networking, cybersecurity, and cloud system management',
            'Quickly responded to various service issues and requests from staff across the district',
          ].map((item, i) => (
            <div key={i} className="flex items-start">
              <span className="w-2 h-2 bg-primary rounded-full mt-1.5 md:mt-2 mr-2 md:mr-3 flex-shrink-0"></span>
              <p className="text-sm md:text-base text-foreground">{item}</p>
            </div>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-2 md:gap-3">
          <span className="px-3 md:px-4 py-1 bg-secondary text-secondary-foreground rounded-full text-xs md:text-sm">Networking</span>
          <span className="px-3 md:px-4 py-1 bg-secondary text-secondary-foreground rounded-full text-xs md:text-sm">Cybersecurity</span>
          <span className="px-3 md:px-4 py-1 bg-secondary text-secondary-foreground rounded-full text-xs md:text-sm">IT Support</span>
        </div>
      </div>
    ),
  },
]

const WorkHistory = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="experience" className="min-h-screen py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="w-full max-w-5xl mx-auto text-center mb-8 md:mb-12"
        >
          <h2 className="text-xl md:text-2xl font-medium text-muted-foreground mb-3 md:mb-4">Professional Journey</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-foreground">Work Experience</h3>
        </motion.div>

        {/* Timeline for desktop */}
        <div className="w-full max-w-6xl mx-auto hidden md:block">
          <Timeline data={workHistory} />
        </div>

        {/* Simple list view for mobile */}
        <div className="md:hidden space-y-10 px-4">
          {workHistory.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-card/50 backdrop-blur-sm p-5 rounded-lg border border-border/50"
            >
              <h4 className="text-lg font-bold mb-4 text-primary">{item.title}</h4>
              {item.content}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WorkHistory

