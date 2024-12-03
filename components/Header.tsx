'use client'

import { motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from "@/components/ui/button"

const Header = () => {
  const { theme, setTheme } = useTheme()

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed w-full bg-background/80 backdrop-blur-sm z-50 border-b border-border"
    >
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="text-2xl font-bold"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          JR
        </motion.div>
        <ul className="flex items-center space-x-6">
          {['Projects', 'Experience', 'Education', 'Contact'].map((item) => (
            <motion.li key={item} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="flex items-center">
              <a href={`#${item.toLowerCase()}`} className="hover:text-primary transition-colors">
                {item}
              </a>
            </motion.li>
          ))}
          <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-full"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
          </motion.li>
        </ul>
      </nav>
    </motion.header>
  )
}

export default Header

