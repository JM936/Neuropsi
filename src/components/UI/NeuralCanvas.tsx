import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
}

export const NeuralCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const mouse = {
      x: null as number | null,
      y: null as number | null,
      radius: 150, // Raio de influência do mouse
    };

    // Configuração de quantidade baseado na largura da tela (Mobile-First Optimization)
    const getParticleCount = (width: number): number => {
      if (width < 640) return 30; // Mobile
      if (width < 1024) return 60; // Tablet
      return 100; // Desktop
    };

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      const width = parent ? parent.clientWidth : window.innerWidth;
      const height = parent ? parent.clientHeight : window.innerHeight;

      // Ajuste para telas Retina/High-DPI para evitar pixelamento
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      // Reinicializa partículas no novo tamanho
      initParticles(width, height);
    };

    const initParticles = (width: number, height: number) => {
      particles = [];
      const count = getParticleCount(width);

      for (let i = 0; i < count; i++) {
        // Partículas distribuídas de forma homogênea no espaço
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4, // Velocidade sutil e elegante
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 2 + 1, // Tamanho sutil
          alpha: Math.random() * 0.5 + 0.3,
        });
      }
    };

    // Atualiza e desenha partículas
    const drawAndUpdateParticles = (width: number, height: number) => {
      ctx.clearRect(0, 0, width, height);

      // 1. Desenha conexões primeiro (camada inferior)
      const maxDistance = 100;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Conexão com outras partículas
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            // Opacidade baseada na distância (mais próximo = mais opaco)
            const alpha = (1 - dist / maxDistance) * 0.12;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`; // Usando a cor primária (indigo-500)
            ctx.lineWidth = 0.8;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Conexão com o mouse se ele estiver ativo na tela
        if (mouse.x !== null && mouse.y !== null) {
          const mdx = p1.x - mouse.x;
          const mdy = p1.y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mdist < mouse.radius) {
            const malpha = (1 - mdist / mouse.radius) * 0.18;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(16, 185, 129, ${malpha})`; // Usando a cor accent (emerald-500)
            ctx.lineWidth = 1;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      // 2. Desenha e atualiza os nós das partículas (camada superior)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Desenha o nó
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(148, 163, 184, ${p.alpha})`; // Slate-400 com brilho sutil
        ctx.fill();

        // Movimentação
        p.x += p.vx;
        p.y += p.vy;

        // Rebate nas bordas
        if (p.x < 0 || p.x > width) p.vx = -p.vx;
        if (p.y < 0 || p.y > height) p.vy = -p.vy;
      }
    };

    const animate = () => {
      const parent = canvas.parentElement;
      const width = parent ? parent.clientWidth : window.innerWidth;
      const height = parent ? parent.clientHeight : window.innerHeight;

      drawAndUpdateParticles(width, height);
      animationFrameId = requestAnimationFrame(animate);
    };

    // Eventos do Mouse
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    // Inicialização
    resizeCanvas();
    animate();

    // Adiciona Listeners
    window.addEventListener('resize', resizeCanvas);
    const parentElement = canvas.parentElement || window;
    parentElement.addEventListener('mousemove', handleMouseMove as EventListener);
    parentElement.addEventListener('mouseleave', handleMouseLeave);

    // Limpeza (Cleanup) para evitar vazamento de memória
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      parentElement.removeEventListener('mousemove', handleMouseMove as EventListener);
      parentElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none block transition-opacity duration-500 mix-blend-screen"
    />
  );
};
