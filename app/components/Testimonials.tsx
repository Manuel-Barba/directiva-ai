"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const testimonials = [
  {
    quote:
      "Gracias a Directiva AI, logramos automatizar procesos complejos de manera sencilla y ética. Su equipo nos acompañó en cada paso, siempre priorizando nuestras necesidades.",
    author: "María González",
    position: "Directora de Innovación, Soluciones Humanas",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    quote:
      "La inteligencia artificial de Directiva AI nos permitió acercar la tecnología a todo nuestro equipo, sin perder el enfoque humano. Una experiencia realmente transformadora.",
    author: "Carlos Ramírez",
    position: "Gerente General, Grupo Avance",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    quote:
      "El compromiso ético y la transparencia de Directiva AI nos dieron la confianza para implementar soluciones innovadoras en nuestra organización. Altamente recomendados.",
    author: "Lucía Fernández",
    position: "Responsable de Proyectos, Fundación Futuro",
    image: "/placeholder.svg?height=100&width=100",
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="container mx-auto">
        <motion.h2
          className="text-5xl font-black mb-16 text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Lo que opinan nuestros clientes
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              className="bg-gray-800 p-6 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <p className="text-gray-300 mb-4">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <Image
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.author}
                  width={50}
                  height={50}
                  className="rounded-full mr-4"
                />
                <div>
                  <p className="font-bold text-white">{testimonial.author}</p>
                  <p className="text-gray-400">{testimonial.position}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
