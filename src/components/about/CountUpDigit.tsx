'use client';

import { useEffect, useState } from 'react';

interface Props {
  target: number;
}

export default function CountUpDigit({ target }: Props) {
  const [value, setValue] = useState(target - 10);

  useEffect(() => {
    let rafId: number;
    const duration = 1500;
    const start = performance.now();
    const from = Math.max(target - 10, 0);

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const current = Math.floor(from + (target - from) * progress);
      setValue(current);
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [target]);

  const display = value.toString().padStart(3, '0');
  const truncated = display.slice(0, 3) + (target >= 1000 ? '+' : '');

  return (
    <div className="animatedCount">
      {truncated.split('').map((char, index) => (
        <span className="digit" key={index}>
          {char}
        </span>
      ))}
    </div>
  );
}