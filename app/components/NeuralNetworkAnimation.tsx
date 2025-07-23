"use client"

import { useEffect, useRef } from "react"

export default function NeuralNetworkAnimation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const width = (canvas.width = 600); // restaurado
    const height = (canvas.height = 600); // restaurado
    const centerX = width / 2;
    const centerY = height / 2;
    const numDots = 120;
    const radius = 200;
    const perspective = 350;
    const visualPadding = 20;
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
        d.size = 3.2 * scale;
        d.alpha = 0.7 + 0.3 * (z / radius);
        d.color = undefined;
      }
      ctx.save();
      ctx.globalAlpha = 0.10; // restaurado
      for (let i = 0; i < numDots; i++) {
        for (let j = i + 1; j < numDots; j++) {
          const d1 = dots[i];
          const d2 = dots[j];
          const dist3d = Math.sqrt(
            Math.pow((d1.screenX ?? 0) - (d2.screenX ?? 0), 2) +
            Math.pow((d1.screenY ?? 0) - (d2.screenY ?? 0), 2) +
            Math.pow((d1.z ?? 0) - (d2.z ?? 0), 2)
          );
          if (dist3d < 200) {
            const t = (Math.sin(time * 0.001 + i + j) + 1) / 2;
            const ctrlX = (d1.screenX ?? 0) * (1 - t) + (d2.screenX ?? 0) * t + Math.sin(time * 0.002 + i * 2 - j) * 18;
            const ctrlY = (d1.screenY ?? 0) * (1 - t) + (d2.screenY ?? 0) * t + Math.cos(time * 0.002 + j * 2 - i) * 18;
            ctx.beginPath();
            ctx.moveTo(d1.screenX ?? 0, d1.screenY ?? 0);
            ctx.quadraticCurveTo(ctrlX, ctrlY, d2.screenX ?? 0, d2.screenY ?? 0);
            ctx.strokeStyle = `rgba(0,191,255,0.18)`; // restaurado
            if (d1.color) ctx.strokeStyle = d1.color;
            ctx.stroke();
          }
        }
      }
      ctx.restore();
      for (let i = 0; i < numDots; i++) {
        const d = dots[i];
        ctx.save();
        ctx.beginPath();
        ctx.arc(d.screenX ?? 0, d.screenY ?? 0, d.size ?? 3.2, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(0,191,255,${((d.alpha ?? 1) * 0.4).toFixed(2)})`; // restaurado
        ctx.shadowColor = 'rgba(0, 191, 255, 0.03)'; // restaurado
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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 700 }}>
      <canvas
        ref={canvasRef}
        width={700}
        height={700}
        style={{ borderRadius: '50%', background: 'transparent', boxShadow: 'none', transition: 'box-shadow 0.3s' }}
      />
    </div>
  );
} 