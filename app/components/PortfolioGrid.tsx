"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

const projects = [
  {
    id: 1,
    title: "Mtra Sof-ia",
    description: "Planeaciones escolares con IA, basadas en la Nueva Escuela Mexicana.",
    imageUrl: "/sofia.svg",
    category: "Asistentes virtuales",
    prelaunch: "Pre-Launch: 25 de agosto, 2025",
  },
  {
    id: 2,
    title: "Impulsa AI",
    description: "Coaching a emprendedores de habla hispana, con herramientas profesionales y asesoramiento real.",
    imageUrl: null, // Usaremos un ícono de cohete en vez de imagen
    category: "Plataforma",
    prelaunch: "Pre-Launch: 3 de diciembre, 2025",
    isRocket: true,
  },
  {
    id: 3,
    title: "Próximamente ...",
    description: "Más soluciones de IA humana y accesible en camino.",
    imageUrl: null,
    category: "Próximamente",
    prelaunch: null,
  },
]

const categories = ["All", ...new Set(projects.map((project) => project.category))]

export default function PortfolioGrid() {
  const [filter, setFilter] = useState("All")

  const filteredProjects = filter === "All" ? projects : projects.filter((project) => project.category === filter)

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 id="portfolio" className="text-3xl font-bold text-foreground sm:text-4xl">Nuestras soluciones</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Descubre cómo la inteligencia artificial puede transformar la vida de las personas y organizaciones.
          </p>
        </motion.div>

        <div className="flex justify-center space-x-4 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-background rounded-3xl shadow-lg overflow-hidden hover-lift transition-all duration-300 ease-in-out border-2 border-transparent hover:border-primary/10"
              >
                <div className="relative h-64 overflow-hidden flex items-center justify-center">
                  {project.imageUrl ? (
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      layout="fill"
                      objectFit="contain"
                      className="transition-transform duration-300 ease-in-out group-hover:scale-105"
                    />
                  ) : project.isRocket ? (
                    <span className="text-7xl">🚀</span>
                  ) : (
                    <span className="text-2xl text-muted-foreground">Próximamente...</span>
                  )}
                </div>
                <div className="p-6">
                  <div className="text-sm font-medium text-primary mb-1">{project.category}</div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-2">{project.description}</p>
                  {project.prelaunch && (
                    <div className="text-xs text-secondary-foreground bg-secondary rounded-full px-3 py-1 inline-block mt-2">
                      {project.prelaunch}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
