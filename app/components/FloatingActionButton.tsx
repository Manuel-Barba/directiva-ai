"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function FloatingActionButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)

    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className="fixed bottom-8 right-8 relative w-14 h-14 rounded-full flex items-center justify-center shadow-2xl z-50 overflow-hidden"
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          style={{
            background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
          }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 opacity-0 hover:opacity-100 transition-opacity duration-300"
            style={{
              background: "linear-gradient(45deg, #3b82f6, #1d4ed8, #1e40af, #3b82f6)",
              backgroundSize: "400% 400%",
            }}
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.span
            className="relative z-10 text-white text-xl font-bold"
            whileHover={{ y: -1 }}
            transition={{ duration: 0.2 }}
          >
            ↑
          </motion.span>
          <motion.div
            className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"
          />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
