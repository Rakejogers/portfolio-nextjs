"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, Mail, Linkedin, ChevronRight, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Project {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
  image: string;
}

const projects: Project[] = [
  {
    title: "Scholar Seats",
    description: "Developed a secure, user-friendly student ticket marketplace app with features like student verification, ticket listing, chat system, and a trust-based rating system, emphasizing zero-cost access.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "SQLite"],
    github: "https://github.com/rakejogers/student-ticket-app",
    demo: "https://scholarseats.com",
    image:"/images/scholarseats.png",
  },
  {
    title: "Project Two",
    description: "Real-time chat application with WebSocket integration",
    tech: ["React", "Node.js", "Socket.io", "MongoDB"],
    github: "https://github.com/yourusername/project-two",
    demo: "https://project-two.demo",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=1000",
  },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");
  const projectsRef = useRef<HTMLElement | null>(null);

  const scrollToProjects = () => {
    projectsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 min-h-screen flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <Badge variant="secondary" className="mb-4">
            <Terminal className="w-3 h-3 mr-1" /> Available for hire
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 text-transparent bg-clip-text leading-[1.2] md:leading-[1.2]">
            Hi, I'm Jake Rogers
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            A passionate full-stack developer and student at the University of Kentucky.
          </p>
          <div className="flex gap-4">
            <Button size="lg" onClick={scrollToProjects}>
              View Projects <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline">
              Contact Me
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section ref={projectsRef} className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold mb-12 text-center">Featured Projects</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="overflow-hidden group">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
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
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Let's Connect</h2>
          <p className="text-muted-foreground mb-8">
            I'm always open to new opportunities and interesting projects.
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="outline" size="lg" asChild>
              <a href="mailto:jarog2005@gmail.com">
                <Mail className="w-4 h-4 mr-2" /> Email
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="https://github.com/rakejogers" target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" /> GitHub
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="https://linkedin.com/in/jake-rogers-engineer" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-4 h-4 mr-2" /> LinkedIn
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}