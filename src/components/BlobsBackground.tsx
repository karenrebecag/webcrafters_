'use client';

import { useEffect, ReactNode, useRef } from 'react';
import '../globals.css';

interface BlobsBackgroundProps {
  className?: string;
  children?: ReactNode;
}

export default function BlobsBackground({ className = '', children }: BlobsBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const maxInfluence = 350;
    const strength = 60;
    const scaleFactor = 0.15;
    const blobsData: any[] = [];

    let mouseX = 0, mouseY = 0;
    let smoothedX = 0, smoothedY = 0;

    const container = containerRef.current;
    if (!container) return;

    const blobEls = Array.from(container.querySelectorAll('.blob')) as HTMLElement[];

    blobEls.forEach((blob) => {
      const rect = blob.getBoundingClientRect();
      const parentRect = container.getBoundingClientRect();
      blobsData.push({
        el: blob,
        baseX: rect.left - parentRect.left,
        baseY: rect.top - parentRect.top,
        curX: 0,
        curY: 0,
        offsetX: 0,
        offsetY: 0,
        scale: 1,
      });
    });

    // Cursor Blob
    const cursorBlob = document.createElement('div');
    cursorBlob.className = 'blob cursorBlob';
    container.appendChild(cursorBlob);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    container.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      smoothedX += (mouseX - smoothedX) * 0.08;
      smoothedY += (mouseY - smoothedY) * 0.08;

      cursorBlob.style.left = `${smoothedX}px`;
      cursorBlob.style.top = `${smoothedY}px`;

      blobsData.forEach((blob) => {
        const blobCenterX = blob.baseX + 250;
        const blobCenterY = blob.baseY + 250;

        const dx = smoothedX - blobCenterX;
        const dy = smoothedY - blobCenterY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxInfluence) {
          const force = (1 - dist / maxInfluence) * strength;
          blob.offsetX = (dx / dist) * force;
          blob.offsetY = (dy / dist) * force;
          blob.scale = 1.05 + (1.03 - dist / maxInfluence) * scaleFactor;
        } else {
          blob.offsetX = 0;
          blob.offsetY = 0;
          blob.scale += (1 - blob.scale) * 0.05;
        }

        blob.curX += (blob.offsetX - blob.curX) * 0.104;
        blob.curY += (blob.offsetY - blob.curY) * 0.104;

        blob.el.style.transform = `translate(${blob.curX}px, ${blob.curY}px) scale(${blob.scale})`;
      });

      requestAnimationFrame(animate);
    };

    Object.assign(cursorBlob.style, {
      width: '300px',
      height: '300px',
      borderRadius: '50%',
      background: '#ff5f8a',
      filter: 'blur(100px)',
      position: 'absolute',
      pointerEvents: 'none',
      mixBlendMode: 'screen',
      opacity: '0.2',
      transform: 'translate(-50%, -50%)',
      zIndex: '10',
    });

    animate();

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      cursorBlob.remove();
    };
  }, []);

  return (
    <div ref={containerRef} className={`blobsBg ${className}`}>
      <div className="blob blob1" />
      <div className="blob blob2" />
      <div className="blob blob3" />
      <div className="blob blob4" />
      <div className="blob blob5" />
      <div className="blob blob6" />
      <div className="blob blob7" />
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
}