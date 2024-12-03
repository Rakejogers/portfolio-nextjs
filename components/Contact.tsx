'use client'

import React from 'react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Send, Github, Linkedin, Mail } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

const Contact = () => {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    fetch("https://formcarry.com/s/UY-qbKyQix", {
      method: 'POST',
      headers: { 
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(response => {
      if (response.code === 200) {
        toast({
          title: "Success!",
          description: "Thank you for your message. I'll get back to you soon!",
          variant: "default",
        })
        // Reset form after successful submission
        setFormData({ name: '', email: '', message: '' })
      }
      else if(response.code === 422){
        // Field validation failed
        toast({
          title: "Validation Error",
          description: response.message,
          variant: "destructive",
        })
      }
      else {
        // other error from formcarry
        toast({
          title: "Error",
          description: response.message,
          variant: "destructive",
        })
      }
    })
    .catch(error => {
      // request related error.
      toast({
        title: "Error",
        description: error.message ? error.message : "Something went wrong. Please try again.",
        variant: "destructive",
      })
      console.error('Error:', error);
    });
  }

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center">Let&apos;s Connect</h2>
        <div className="max-w-2xl mx-auto">
          <motion.form
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="mb-12"
          >
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-muted border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-muted border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-3 py-2 bg-muted border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              ></textarea>
            </div>
            <Button type="submit" className="w-full">
              <Send className="w-4 h-4 mr-2" /> Send Message
            </Button>
          </motion.form>
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Or reach out directly through these platforms:
            </p>
            <div className="flex justify-center space-x-4">
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
        </div>
      </div>
    </section>
  )
}

export default Contact

