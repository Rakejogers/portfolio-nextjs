'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const Education = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="education" className="relative min-h-screen flex items-center justify-center py-16 md:py-20">
      {/* Background GIFs - Hidden on small screens */}
      <div className="absolute inset-0 w-full h-full hidden md:flex items-center justify-between z-10">
        {/* Left GIF */}
        <div className="h-full flex items-center -ml-[20%]">
          <video
            src="/education.webm"
            autoPlay
            loop
            muted
            playsInline
            className="h-[150vh] w-auto object-cover"
          />
        </div>
        {/* Right GIF (Mirrored) */}
        <div className="h-full flex items-center -mr-[20%]">
          <video
            src="/education.webm"
            autoPlay
            loop
            muted
            playsInline
            className="h-[150vh] w-auto object-cover transform scale-x-[-1]"
          />
        </div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="w-full max-w-5xl mx-auto text-center"
        >
          <h2 className="text-xl md:text-2xl font-medium text-muted-foreground mb-3 md:mb-4">I'm currently at</h2>
          <h3 className="text-4xl md:text-7xl font-bold text-foreground mb-6 md:mb-8">University of Kentucky</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 text-foreground">
            {/* Main Education Info */}
            <div className="space-y-6 md:space-y-8">
              <div className="space-y-3 md:space-y-4">
                <p className="text-2xl md:text-3xl font-semibold text-primary">BS in Computer Science</p>
                <p className="text-xl md:text-2xl text-muted-foreground">Expected: May 2027</p>
                <p className="text-2xl md:text-3xl font-bold text-primary">GPA: 4.00</p>
              </div>

              <div>
                <h4 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">Technical Skills</h4>
                <div className="flex flex-wrap gap-2 md:gap-4 justify-center">
                  <span className="px-4 md:px-6 py-1 md:py-2 bg-secondary backdrop-blur-sm rounded-full text-sm md:text-lg">C++</span>
                  <span className="px-4 md:px-6 py-1 md:py-2 bg-secondary backdrop-blur-sm rounded-full text-sm md:text-lg">Python</span>
                  <span className="px-4 md:px-6 py-1 md:py-2 bg-secondary backdrop-blur-sm rounded-full text-sm md:text-lg">JavaScript</span>
                  <span className="px-4 md:px-6 py-1 md:py-2 bg-secondary backdrop-blur-sm rounded-full text-sm md:text-lg">HTML/CSS</span>
                  <span className="px-4 md:px-6 py-1 md:py-2 bg-secondary backdrop-blur-sm rounded-full text-sm md:text-lg">MATLAB</span>
                  <span className="px-4 md:px-6 py-1 md:py-2 bg-secondary backdrop-blur-sm rounded-full text-sm md:text-lg">AutoCAD</span>
                  <span className="px-4 md:px-6 py-1 md:py-2 bg-secondary backdrop-blur-sm rounded-full text-sm md:text-lg">React Native</span>
                </div>
              </div>
            </div>

            {/* Coursework and Activities */}
            <div className="space-y-6 md:space-y-8">
              <div>
                <h4 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">Key Coursework</h4>
                <ul className="space-y-3 md:space-y-4 text-lg md:text-xl text-muted-foreground">
                  <li className="flex items-center justify-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    Discrete Math
                  </li>
                  <li className="flex items-center justify-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    Intro to Program Design (C++)
                  </li>
                  <li className="flex items-center justify-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    Intro to Software Engineering
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">Activities</h4>
                <ul className="space-y-3 md:space-y-4 text-lg md:text-xl text-muted-foreground">
                  <li className="flex items-center justify-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    Green Energy Club Member
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Education

