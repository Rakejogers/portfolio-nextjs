"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
}

export function NavBar({ items, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name)


  // Scroll spy functionality (improved for smoother updates)
  useEffect(() => {
    // Responsive offset - less for mobile since nav is at bottom
    const getOffset = () => (window.innerWidth < 640 ? 80 : 120)
    let OFFSET = getOffset()

    // Throttle with rAF for perf
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // If we're at the bottom, the last item is active.
          const nearBottom =
            window.innerHeight + window.scrollY >= document.body.scrollHeight - 2
          if (nearBottom) {
            setActiveTab(items[items.length - 1].name)
            ticking = false
            return
          }

          let current = items[0].name

          // iterate from last to first so the deepest section in view wins
          for (const item of [...items].reverse()) {
            const id = item.url.replace("#", "")
            const el = id ? document.getElementById(id) : null
            if (el) {
              const rect = el.getBoundingClientRect()
              // Section is considered active if its top is above the offset.
              if (rect.top <= OFFSET) {
                current = item.name
                break // first match = deepest visible section
              }
            }
          }

          setActiveTab((prev) => (prev === current ? prev : current))
          ticking = false
        })
        ticking = true
      }
    }

    const handleResize = () => {
      OFFSET = getOffset()
      handleScroll()
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleResize)
    // Also run on first mount
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, [items])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={cn(
        "fixed inset-x-0 bottom-0 sm:top-0 z-50 mb-4 sm:mb-6 sm:pt-6 flex justify-center items-end sm:items-start sm:pointer-events-none",
        className,
      )}
    >
      <div className="flex items-center gap-2 sm:gap-3 bg-white/90 border border-gray-200 backdrop-blur-lg py-1 px-1 rounded-full shadow-lg sm:pointer-events-auto mx-2 sm:mx-0">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <Link
              key={item.name}
              href={item.url}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-3 sm:px-6 py-2 rounded-full transition-colors",
                "text-gray-600 hover:text-black",
                isActive && "bg-black text-white",
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={16} strokeWidth={2.5} className="sm:w-[18px] sm:h-[18px]" />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-black rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-black rounded-t-full">
                    <div className="absolute w-12 h-6 bg-black/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-black/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-black/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </Link>
          )
        })}
      </div>
    </motion.div>
  )
}
