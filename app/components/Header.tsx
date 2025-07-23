"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"

export default function Header() {
  const [mounted, setMounted] = useState(false)
  const [hidden, setHidden] = useState(false)
  const { scrollY } = useScroll()
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => setMounted(true), [])

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY
    const current = latest
    
    if (current > previous && current > 100) {
      setHidden(true)
    } else {
      setHidden(false)
    }
    
    setLastScrollY(current)
  })

  return (
    <motion.header
      className="sticky top-0 z-50 backdrop-blur-md bg-white"
      initial={{ y: -100 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8 relative z-10" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="text-lg font-bold text-blue-700 hover:text-blue-800 transition-colors">
              
            </span>
          </Link>
        </div>
        <div className="flex gap-x-12 justify-center flex-1">
          <div className="relative group">
            <span className="text-sm font-semibold leading-6 text-blue-700 cursor-default">
              Mtra Sof-ia
            </span>
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-background border border-border rounded-lg px-3 py-2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50">
              Pre-Launch: 25 de agosto, 2025
            </div>
          </div>
          <div className="relative group">
            <span className="text-sm font-semibold leading-6 text-blue-700 cursor-default">
              Impulsa AI
            </span>
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-background border border-border rounded-lg px-3 py-2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50">
              Pre-Launch: 3 de diciembre, 2025
            </div>
          </div>
        </div>
        <div className="flex lg:flex-1"></div>
      </nav>
    </motion.header>
  )
}
