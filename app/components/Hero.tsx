"use client"

import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)
import NeuralNetworkAnimation from "./NeuralNetworkAnimation"

export default function Hero() {
  return (
    <div className="relative isolate overflow-hidden">
      {/* Fondo degradado radial solo en Hero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 w-full h-full z-0"
        style={{
          background: "radial-gradient(circle at 99% 0%, #a5b4fc 0%, #f1f5f9 30%, transparent 100%)"
        }}
      />
      {/* Partículas de fondo */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {Array.from({ length: 25 }).map((_, i) => (
          <Particle key={i} index={i} />
        ))}
      </div>
      <div className="mx-auto max-w-7xl px-6 py-8 lg:flex lg:items-center lg:gap-x-8 lg:px-8 z-20 relative">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg lg:flex-shrink-0">
          <motion.h1
            className="mt-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <AnimatedTitle />
          </motion.h1>
          <motion.p
            className="mt-4 text-base leading-7 text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Creamos IA para tu día a día. Soluciones accesibles, éticas y humanas que potencian tu vida y tu trabajo.
          </motion.p>
          <motion.div
            className="mt-6 flex items-center gap-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.a
              href="#portfolio"
              className="relative inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 opacity-0 hover:opacity-100 transition-opacity duration-500"
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
                className="relative z-10"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                Soluciones
              </motion.span>
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                }}
              />
            </motion.a>
            <motion.a
              href="#nosotros"
              className="text-sm font-semibold leading-6 text-foreground hover:text-blue-600 transition-colors duration-300"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              Conoce nuestra filosofía <span aria-hidden="true">→</span>
            </motion.a>
          </motion.div>
        </div>
        {/* Aquí irá la animación de la red neuronal */}
        <div className="flex justify-end w-full lg:w-auto lg:ml-auto">
          <NeuralNetworkAnimation />
        </div>
      </div>
    </div>
  )
}

function AnimatedTitle() {
  const text = "Directiva AI";
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, text]);

  // Cursor parpadeante
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorTimer);
  }, []);

  return (
    <div className="flex items-center">
      <span
        style={{
          background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 50%, #1e40af 100%)",
          backgroundSize: "200% 200%",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          animation: `gradientShift 4s ease-in-out infinite`,
        }}
      >
        {displayText}
      </span>
      {showCursor && (
        <motion.span
          className="ml-1 w-0.5 h-8 bg-blue-500"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      )}
    </div>
  );
}

function Particle({ index }: { index: number }) {
  const colors = ['#3b82f6', '#1d4ed8', '#1e40af', '#60a5fa', '#93c5fd'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  
  // Posiciones aleatorias para el movimiento
  const startX = Math.random() * 100;
  const startY = Math.random() * 100;
  const endX = startX + (Math.random() - 0.5) * 40; // Movimiento horizontal
  const endY = startY + (Math.random() - 0.5) * 40; // Movimiento vertical
  
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        backgroundColor: randomColor,
        width: `${1 + Math.random() * 2}px`,
        height: `${1 + Math.random() * 2}px`,
      }}
      initial={{
        opacity: 0,
        scale: 0,
        x: `${startX}%`,
        y: `${startY}%`,
      }}
      animate={{
        opacity: [0, 0.6, 0],
        scale: [0, 1, 0],
        x: [`${startX}%`, `${endX}%`],
        y: [`${startY}%`, `${endY}%`],
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        delay: index * 0.05,
        ease: "easeOut",
        repeat: Infinity,
        repeatDelay: 1,
      }}
    />
  );
}

/*
Código adaptado de https://codepen.io/jh3y/pen/MYgaaem

// HTML original:
<div class="gooey">
  <span class="dot"></span>
  <div class="dots">
    <span></span>
    <span></span>
    <span></span>
  </div>
</div>

// CSS original:
body {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #222;
}
.gooey {
  position: relative;
  width: 142px;
  height: 40px;
  filter: contrast(20);
}
.gooey .dot {
  position: absolute;
  left: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #00bfff;
  filter: blur(4px);
  animation: dot 2.8s infinite;
}
.gooey .dots {
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: absolute;
  left: 0;
}
.gooey .dots span {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #00bfff;
  filter: blur(4px);
  animation: dots 2.8s infinite;
}
.gooey .dots span:nth-child(1) {
  animation-delay: 0.2s;
}
.gooey .dots span:nth-child(2) {
  animation-delay: 0.4s;
}
.gooey .dots span:nth-child(3) {
  animation-delay: 0.6s;
}
@keyframes dot {
  50% {
    transform: translateX(102px);
  }
}
@keyframes dots {
  50% {
    transform: translateX(102px);
  }
}

// Para usarlo en React, puedes crear un componente así:

import './GooeyLoader.css'

export function GooeyLoader() {
  return (
    <div className="gooey">
      <span className="dot"></span>
      <div className="dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  )
}

// Y el CSS en GooeyLoader.css (puedes pegar el CSS original ahí)
*/
