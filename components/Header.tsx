'use client'

import { useState } from 'react'
import { useTheme } from "next-themes"
import { Briefcase, GraduationCap, Mail, FolderKanban, Home } from 'lucide-react'
import { NavBar } from '@/components/ui/tubelight-navbar'
import { motion } from 'framer-motion'

const Header = () => {
  const { theme } = useTheme()

  const navItems = [
    {
      name: 'HOME',
      url: '#',
      icon: Home
    },
    {
      name: 'PROJECTS',
      url: '#projects',
      icon: FolderKanban
    },
    {
      name: 'EXPERIENCE',
      url: '#experience',
      icon: Briefcase
    },
    {
      name: 'EDUCATION',
      url: '#education',
      icon: GraduationCap
    },
    {
      name: 'CONTACT',
      url: '#contact',
      icon: Mail
    }
  ]

  return (
    <>
      <NavBar 
        items={navItems} 
        className="z-50"
      />
    </>
  )
}

export default Header

