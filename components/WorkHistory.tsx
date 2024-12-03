'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const workHistory = [
  {
    title: 'Engineering Prototyping Guide',
    company: 'University of Kentucky Innovation Center',
    date: 'Aug 2024 - Present',
    description: [
      'Collaborated with 30 other peers to run the university\'s engineering makerspace',
      'Guided students in the design and prototyping of engineering projects',
      'Provided hands-on assistance with 3D printing, laser cutting, CNC machining, and other fabrication techniques',
    ],
  },
  {
    title: 'IT Technician',
    company: 'Grayson County Board of Education',
    date: 'May 2024 - Aug 2024',
    description: [
      'Worked alongside others to upkeep all the technology across various schools in the district',
      'Learned practices of networking, cybersecurity, and cloud system management',
      'Quickly responded to various service issues and requests from staff across the district',
    ],
  },
]

const WorkHistory = () => {
  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center">Work Experience</h2>
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-border"></div>
          {workHistory.map((job, index) => (
            <TimelineItem key={index} job={job} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

const TimelineItem = ({ job, index }: { job: any; index: number }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className={`mb-8 flex justify-between items-center w-full ${
        index % 2 === 0 ? 'flex-row-reverse' : ''
      }`}
    >
      <div className="order-1 w-5/12"></div>
      <div className="z-20 flex items-center order-1 bg-primary shadow-xl w-8 h-8 rounded-full">
        <h1 className="mx-auto font-semibold text-lg text-primary-foreground">{index + 1}</h1>
      </div>
      <motion.div
        whileHover={{ scale: 1.03 }}
        className="order-1 bg-card rounded-lg shadow-xl w-5/12 px-6 py-4 border border-border"
      >
        <h3 className="font-bold text-xl mb-1 text-primary">{job.title}</h3>
        <h4 className="font-semibold text-lg mb-1">{job.company}</h4>
        <p className="text-sm text-muted-foreground mb-2">{job.date}</p>
        <ul className="list-disc list-inside text-sm text-card-foreground">
        {job.description.map((item: string, i: number) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  )
}

export default WorkHistory

