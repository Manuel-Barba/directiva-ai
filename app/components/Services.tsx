"use client"

import { motion } from "framer-motion"
import { Code, Paintbrush, Megaphone, Smartphone } from "lucide-react"

const services = [
  {
    icon: <Paintbrush className="w-12 h-12 mb-4 text-blue-500" />,
    title: "Soluciones Personalizadas de IA",
    description: "Desarrollamos inteligencia artificial adaptada a tus necesidades y valores.",
  },
  {
    icon: <Code className="w-12 h-12 mb-4 text-green-500" />,
    title: "Automatización Ética",
    description: "Optimizamos procesos respetando la dignidad y el bienestar de las personas.",
  },
  {
    icon: <Megaphone className="w-12 h-12 mb-4 text-yellow-500" />,
    title: "Inclusión Digital",
    description: "Reducimos la brecha tecnológica con soluciones accesibles para todos.",
  },
  {
    icon: <Smartphone className="w-12 h-12 mb-4 text-purple-500" />,
    title: "Acompañamiento Humano",
    description: "Te guiamos en la integración de la IA, priorizando el desarrollo humano.",
  },
]

export default function Services() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800">
      <div className="container mx-auto">
        <motion.h2
          className="text-5xl font-black mb-16 text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Nuestros servicios
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="bg-gray-700 p-6 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              {service.icon}
              <h3 className="text-xl font-bold mb-2 text-white">{service.title}</h3>
              <p className="text-gray-300">{service.description}</p>
            </motion.div>
          ))}
        </div>
        
        {/* Botón de llamada a la acción */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.a
            href="#contacto"
            className="relative inline-flex items-center justify-center px-10 py-4 text-xl font-bold text-white rounded-full overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 50%, #1e40af 100%)",
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 opacity-0 hover:opacity-100 transition-opacity duration-500"
              style={{
                background: "linear-gradient(45deg, #3b82f6, #1d4ed8, #1e40af, #1e3a8a, #3b82f6)",
                backgroundSize: "400% 400%",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.span
              className="relative z-10"
              whileHover={{ y: -1 }}
              transition={{ duration: 0.2 }}
            >
              ¡Comienza tu proyecto con IA!
            </motion.span>
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"
            />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
