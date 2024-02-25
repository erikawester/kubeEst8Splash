'use client'
import React, { useEffect, useRef } from 'react';
interface Circle {
  x: number;
  y: number;
  radius: number;
  color: string;
  velocityX: number;
  velocityY: number;
}

const SplashCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const circles: Circle[] = [];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 0.6;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const createCircle = (x: number, y: number, radius: number, color: string): Circle => {
      return {
        x,
        y,
        radius,
        color,
        velocityX: Math.random() * 4 - 2,
        velocityY: Math.random() * 4 - 2,
      };
    };

    const drawCircle = (circle: Circle): void => {
      ctx.beginPath();
      ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
      ctx.fillStyle = circle.color;
      ctx.fill();
    };

    const updateCircles = (): void => {
      for (const circle of circles) {
        circle.x += circle.velocityX;
        circle.y += circle.velocityY;

        if (circle.x - circle.radius < 0 || circle.x + circle.radius > canvas.width) {
          circle.velocityX *= -1;
        }

        if (circle.y - circle.radius < 0 || circle.y + circle.radius > canvas.height) {
          circle.velocityY *= -1;
        }
      }
    };

    const animate = (): void => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      updateCircles();

      for (const circle of circles) {
        drawCircle(circle);
      }

      requestAnimationFrame(animate);
    };

    // Create random circles
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = Math.random() * 20 + 10;
      const color = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;

      circles.push(createCircle(x, y, radius, color));
    }

    // Start the animation
    animate();

    // Resize canvas when the window is resized
    const handleResize = (): void => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array to run the effect only once

  return <canvas ref={canvasRef} />;
};

export default SplashCanvas;
