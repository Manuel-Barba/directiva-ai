"use client"

import { motion } from "framer-motion"

export default function Marquee() {
  return (
    <div
      className="relative w-full overflow-hidden bg-background py-16"
      style={{
        backgroundImage: `url('data:image/svg+xml;utf8,<svg width="34.64" height="60" viewBox="0 0 34.64 60" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="17.32,0 34.64,10 34.64,30 17.32,40 0,30 0,10" stroke="%23d1d5db" stroke-width="0.7" fill="none"/><polygon points="17.32,20 34.64,30 34.64,50 17.32,60 0,50 0,30" stroke="%23d1d5db" stroke-width="0.7" fill="none"/></svg>')`,
        backgroundRepeat: 'repeat',
        backgroundSize: '34.64px 60px',
      }}
    >
      {/* Gradiente superpuesto */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10" />
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, ease: "linear", duration: 20 }}
      >
        {[...Array(4)].map((_, index) => (
          <div key={index} className="flex items-center mx-4">
            <span
              className="text-7xl sm:text-8xl md:text-9xl font-bold text-white px-4"
              style={{
                WebkitTextStroke: "2px rgb(156 163 175)", // tailwind gray-400
              }}
            >
              Creamos IA para tu día a día
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
