"use client"
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Briefcase, ArrowRight } from "lucide-react";

function AnimatedSphereBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const width = (canvas.width = 1400);
    const height = (canvas.height = 1100);
    const centerX = width / 2;
    const centerY = height + 100; // Baja la esfera para que solo se vea la mitad superior
    const numDots = 220;
    const radius = 420;
    const perspective = 900;
    const visualPadding = 60;
    type Dot = {
      theta: number;
      phi: number;
      speed: number;
      offset: number;
      pulseFreq: number;
      pulsePhase: number;
      x?: number;
      y?: number;
      z?: number;
      screenX?: number;
      screenY?: number;
      size?: number;
      alpha?: number;
      color?: string;
    };
    const dots: Dot[] = [];
    for (let i = 0; i < numDots; i++) {
      const phi = Math.acos(1 - 2 * (i + 0.5) / numDots);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      dots.push({
        theta,
        phi,
        speed: 0.5 + Math.random(),
        offset: Math.random() * Math.PI * 2,
        pulseFreq: 0.7 + Math.random() * 1.3,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }
    let animationId: number;
    function animate(time: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      const rotY = time * 0.0004;
      const rotX = Math.sin(time * 0.0002) * 0.5;
      const globalPulse = Math.sin(time * 0.001) * 0.18;
      for (let i = 0; i < numDots; i++) {
        const d = dots[i];
        const deform =
          0.13 * Math.sin(time * 0.0008 + d.theta * 2 + d.phi * 2 + d.offset) +
          0.09 * Math.cos(time * 0.0012 + d.theta * 3 - d.phi * 2 + d.offset) +
          0.07 * Math.sin(time * 0.0017 + d.theta * 4 + d.phi * 1.5 + d.offset);
        const dynamicRadius = (radius - visualPadding) * (1 + deform);
        let x = dynamicRadius * Math.sin(d.phi) * Math.cos(d.theta + rotY + d.offset);
        let y = dynamicRadius * Math.sin(d.phi) * Math.sin(d.theta + rotY + d.offset);
        let z = dynamicRadius * Math.cos(d.phi);
        const y2 = y * Math.cos(rotX) - z * Math.sin(rotX);
        const z2 = y * Math.sin(rotX) + z * Math.cos(rotX);
        y = y2;
        z = z2;
        const scale = perspective / (perspective - z);
        d.screenX = centerX + x * scale;
        d.screenY = centerY + y * scale;
        d.z = z;
        d.size = 4.2 * scale;
        d.alpha = 0.7 + 0.3 * (z / radius);
        d.color = undefined;
      }
      ctx.save();
      ctx.globalAlpha = 0.10;
      for (let i = 0; i < numDots; i++) {
        for (let j = i + 1; j < numDots; j++) {
          const d1 = dots[i];
          const d2 = dots[j];
          const dist3d = Math.sqrt(
            Math.pow((d1.screenX ?? 0) - (d2.screenX ?? 0), 2) +
            Math.pow((d1.screenY ?? 0) - (d2.screenY ?? 0), 2) +
            Math.pow((d1.z ?? 0) - (d2.z ?? 0), 2)
          );
          if (dist3d < 300) {
            const t = (Math.sin(time * 0.001 + i + j) + 1) / 2;
            const ctrlX = (d1.screenX ?? 0) * (1 - t) + (d2.screenX ?? 0) * t + Math.sin(time * 0.002 + i * 2 - j) * 28;
            const ctrlY = (d1.screenY ?? 0) * (1 - t) + (d2.screenY ?? 0) * t + Math.cos(time * 0.002 + j * 2 - i) * 28;
            ctx.beginPath();
            ctx.moveTo(d1.screenX ?? 0, d1.screenY ?? 0);
            ctx.quadraticCurveTo(ctrlX, ctrlY, d2.screenX ?? 0, d2.screenY ?? 0);
            ctx.strokeStyle = `rgba(0,191,255,0.7)`;
            ctx.stroke();
          }
        }
      }
      ctx.restore();
      for (let i = 0; i < numDots; i++) {
        const d = dots[i];
        ctx.save();
        ctx.beginPath();
        ctx.arc(d.screenX ?? 0, d.screenY ?? 0, d.size ?? 4.2, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(0,191,255,${d.alpha ?? 1})`;
        ctx.shadowColor = 'rgba(0,191,255,0.10)';
        ctx.shadowBlur = 3 * (d.size ?? 1) * 0.5;
        ctx.fill();
        ctx.restore();
      }
      animationId = requestAnimationFrame(animate);
    }
    animate(0);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="absolute left-1/2 top-0 -translate-x-1/2 pointer-events-none z-0 overflow-hidden" style={{width:1400, height:1100, maxHeight:'100%', bottom:0}}>
      <canvas ref={canvasRef} width={1400} height={1100} style={{width:1400, height:1100, background:'transparent', display:'block', maxHeight:'100%'}} />
    </div>
  );
}

export default function ClosingCTA() {
  // Función para hacer scroll suave al formulario de contacto
  const handleContactClick = () => {
    const formSection = document.querySelector('section.bg-background');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full px-4 flex flex-col items-center text-center overflow-hidden">
      <AnimatedSphereBackground />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative max-w-2l mx-auto"
      >
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-900 px-5 py-2 rounded-full text-base font-medium shadow-lg mt-20">
            <Briefcase className="w-5 h-5" />
            Le damos vida a tu idea
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-black drop-shadow-lg">
          ¿Tienes una idea en mente? ¿Tu empresa necesita IA?
        </h2>
        <p className="text-lg md:text-xl text-blue-900 mb-10 font-medium">
          ¿Socios? Creemos juntos tu próxima idea millonaria, o una solución 100% a la medida de tu empresa.
        </p>
        
        
      </motion.div>
    </section>
  );
} 