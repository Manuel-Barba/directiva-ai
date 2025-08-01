"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

const products = [
  {
    id: 1,
    name: "Asistentes Inteligentes",
    description: "Automatización ética y personalizada para tu empresa o proyecto.",
    image: "/placeholder.svg?height=600&width=600",
  },
  {
    id: 2,
    name: "Análisis Predictivo Humano",
    description: "IA que entiende y se adapta a las necesidades reales de las personas.",
    image: "/placeholder.svg?height=600&width=600",
  },
  {
    id: 3,
    name: "Soluciones de Inclusión Digital",
    description: "Tecnología accesible para reducir la brecha y empoderar a todos.",
    image: "/placeholder.svg?height=600&width=600",
  },
]

export default function ProductShowcase() {
  const [currentProduct, setCurrentProduct] = useState(0)

  const nextProduct = () => {
    setCurrentProduct((prev) => (prev + 1) % products.length)
  }

  const prevProduct = () => {
    setCurrentProduct((prev) => (prev - 1 + products.length) % products.length)
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 overflow-hidden">
      <div className="container mx-auto">
        <h2 className="section-title">Nuestras soluciones de IA</h2>
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProduct}
              className="flex flex-col md:flex-row items-center justify-between"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h3 className="text-3xl font-bold mb-4">{products[currentProduct].name}</h3>
                <p className="text-xl text-gray-600 mb-8">{products[currentProduct].description}</p>
                <button className="apple-button">Saber más</button>
              </div>
              <div className="md:w-1/2">
                <Image
                  src={products[currentProduct].image || "/placeholder.svg"}
                  alt={products[currentProduct].name}
                  width={600}
                  height={600}
                  className="rounded-2xl shadow-lg"
                />
              </div>
            </motion.div>
          </AnimatePresence>
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
            onClick={prevProduct}
          >
            ←
          </button>
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
            onClick={nextProduct}
          >
            →
          </button>
        </div>
      </div>
    </section>
  )
}
