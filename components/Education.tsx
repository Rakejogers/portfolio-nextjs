'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const Education = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="education" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center">Education</h2>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="bg-card text-card-foreground rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-border"
        >
          <h3 className="text-2xl font-bold mb-2 text-primary">University of Kentucky</h3>
          <p className="text-xl mb-2">Bachelor of Science in Computer Science</p>
          <p className="text-lg mb-4 text-muted-foreground">Expected Graduation: May 2027</p>
          <div className="mb-4">
            <h4 className="text-lg font-semibold mb-2">Relevant Coursework:</h4>
            <ul className="list-disc list-inside text-muted-foreground">
              <li>Discrete Math</li>
              <li>Intro to Program Design (C++)</li>
              <li>Intro to Software Engineering Techniques (Linux)</li>
            </ul>
          </div>
          <div className="mb-4">
            <h4 className="text-lg font-semibold mb-2">Achievements:</h4>
            <ul className="list-disc list-inside text-muted-foreground">
              <li>4.00 GPA</li>
              <li>Green Energy Club Member</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Technical Skills:</h4>
            <p className="text-muted-foreground">
              Proficient in C++, Python, JavaScript, HTML/CSS, MATLAB, AutoCAD; Basic understanding of React Native, Expo
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Education

