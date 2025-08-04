'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Timeline } from '@/components/ui/timeline'

const workHistory = [
  {
    title: 'Summer 2025',
    content: (
      <div className="flex flex-col space-y-4">
        <div>
          <h3 className="text-lg md:text-xl font-bold text-black">Software Engineering Intern</h3>
          <h4 className="font-semibold text-base md:text-lg">SOIDEM DATA TECHNOLOGIES</h4>
          <p className="text-xs md:text-sm text-gray-600">June 2025 - August 2025</p>
        </div>
        
        <div className="space-y-2">
          {[
            'Engineered a full-stack version control system to manage and track changes across 500+ client Splunk dashboard pages, improving data integrity.',
            'Developed an 11-page dashboard using Next.js/React, which was adopted as the primary interface for the company\'s version control product used by 5+ enterprise clients.',
            'Worked in a highly collaborative, international team environment, maintaining a legacy Splunk codebase while actively contributing to its migration to a modern tech stack.',
          ].map((item, i) => (
            <div key={i} className="flex items-start">
              <span className="w-2 h-2 bg-black rounded-full mt-1.5 md:mt-2 mr-2 md:mr-3 flex-shrink-0"></span>
              <p className="text-sm md:text-base text-black">{item}</p>
            </div>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-2 md:gap-3">
          <span className="px-3 md:px-4 py-1 bg-gray-100 text-black rounded-full text-xs md:text-sm border border-gray-200">Next.js</span>
          <span className="px-3 md:px-4 py-1 bg-gray-100 text-black rounded-full text-xs md:text-sm border border-gray-200">React</span>
          <span className="px-3 md:px-4 py-1 bg-gray-100 text-black rounded-full text-xs md:text-sm border border-gray-200">Splunk</span>
          <span className="px-3 md:px-4 py-1 bg-gray-100 text-black rounded-full text-xs md:text-sm border border-gray-200">Git</span>
          <span className="px-3 md:px-4 py-1 bg-gray-100 text-black rounded-full text-xs md:text-sm border border-gray-200">SQL</span>
          <span className="px-3 md:px-4 py-1 bg-gray-100 text-black rounded-full text-xs md:text-sm border border-gray-200">CI/CD</span>
        </div>
      </div>
    ),
  },
  {
    title: '2024 - Present',
    content: (
      <div className="flex flex-col space-y-4">
        <div>
          <h3 className="text-lg md:text-xl font-bold text-black">Engineering Prototyping Guide</h3>
          <h4 className="font-semibold text-base md:text-lg">University of Kentucky Innovation Center</h4>
          <p className="text-xs md:text-sm text-gray-600">Aug 2024 - Present</p>
        </div>
        
        <div className="space-y-2">
          {[
            'Collaborated with 30 other peers to run the university\'s engineering makerspace',
            'Guided students in the design and prototyping of engineering projects',
            'Provided hands-on assistance with 3D printing, laser cutting, CNC machining, and other fabrication techniques',
          ].map((item, i) => (
            <div key={i} className="flex items-start">
              <span className="w-2 h-2 bg-black rounded-full mt-1.5 md:mt-2 mr-2 md:mr-3 flex-shrink-0"></span>
              <p className="text-sm md:text-base text-black">{item}</p>
            </div>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-2 md:gap-3">
          <span className="px-3 md:px-4 py-1 bg-gray-100 text-black rounded-full text-xs md:text-sm border border-gray-200">3D Printing</span>
          <span className="px-3 md:px-4 py-1 bg-gray-100 text-black rounded-full text-xs md:text-sm border border-gray-200">CNC</span>
          <span className="px-3 md:px-4 py-1 bg-gray-100 text-black rounded-full text-xs md:text-sm border border-gray-200">Prototyping</span>
        </div>
      </div>
    ),
  },
  {
    title: 'Summer 2024',
    content: (
      <div className="flex flex-col space-y-4">
        <div>
          <h3 className="text-lg md:text-xl font-bold text-black">IT Technician</h3>
          <h4 className="font-semibold text-base md:text-lg">Grayson County Board of Education</h4>
          <p className="text-xs md:text-sm text-gray-600">May 2024 - Aug 2024</p>
        </div>
        
        <div className="space-y-2">
          {[
            'Worked alongside others to upkeep all the technology across various schools in the district',
            'Learned practices of networking, cybersecurity, and cloud system management',
            'Quickly responded to various service issues and requests from staff across the district',
          ].map((item, i) => (
            <div key={i} className="flex items-start">
              <span className="w-2 h-2 bg-black rounded-full mt-1.5 md:mt-2 mr-2 md:mr-3 flex-shrink-0"></span>
              <p className="text-sm md:text-base text-black">{item}</p>
            </div>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-2 md:gap-3">
          <span className="px-3 md:px-4 py-1 bg-gray-100 text-black rounded-full text-xs md:text-sm border border-gray-200">Networking</span>
          <span className="px-3 md:px-4 py-1 bg-gray-100 text-black rounded-full text-xs md:text-sm border border-gray-200">Cybersecurity</span>
          <span className="px-3 md:px-4 py-1 bg-gray-100 text-black rounded-full text-xs md:text-sm border border-gray-200">IT Support</span>
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
    <section id="experience" className="py-12 sm:py-16 md:py-20 bg-white text-black">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="w-full max-w-5xl mx-auto text-center mb-8 md:mb-12"
        >
          <h2 className="text-xl md:text-2xl font-medium text-gray-600 mb-3 md:mb-4">Professional Journey</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-black">Work Experience</h3>
        </motion.div>

        {/* Timeline for desktop */}
        <div className="w-full max-w-6xl mx-auto hidden md:block">
          <Timeline data={workHistory} />
        </div>

        {/* Simple list view for mobile */}
        <div className="md:hidden space-y-6 sm:space-y-8">
          {workHistory.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-gray-50 p-4 sm:p-5 rounded-lg border border-gray-200"
            >
              <h4 className="text-lg font-bold mb-4 text-black">{item.title}</h4>
              {item.content}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WorkHistory

