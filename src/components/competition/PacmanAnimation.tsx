"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function PacmanAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pacmanRef = useRef<SVGSVGElement>(null);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current || !pacmanRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    
    // Set posisi awal Pacman di kiri (sebelum dots pertama)
    gsap.set(pacmanRef.current, { x: -80 });

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

    // Animasi Pacman bergerak dari kiri ke kanan
    tl.to(pacmanRef.current, {
      x: containerWidth,
      duration: 5,
      ease: "none",
    }, 0);

    // Animasi mulut Pacman membuka tutup
    tl.to(pacmanRef.current, {
      duration: 0.15,
      repeat: 33,
      yoyo: true,
      ease: "none",
    }, 0);

    // Hitung posisi dots dan timing yang tepat
    dotsRef.current.forEach((dot, i) => {
      if (dot) {
        // Hitung posisi dot relatif terhadap container
        const dotPosition = dot.getBoundingClientRect().left - containerRef.current!.getBoundingClientRect().left;
        
        // Hitung waktu ketika Pacman mencapai dot ini
        const timing = (dotPosition / containerWidth) * 5; // 5 adalah durasi animasi Pacman
        
        tl.to(dot, {
          scale: 0,
          opacity: 0,
          duration: 0.1,
        }, timing);

        // Auto-generate dots kembali setelah 1 detik
        tl.to(dot, {
          scale: 1,
          opacity: 1,
          duration: 0.2,
        }, timing + 1);
      }
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full min-h-[100px] flex items-center justify-center overflow-hidden bg-transparent"
    >
      {/* Track/Path untuk dots */}
      <div className="absolute left-0 right-0 h-1 bg-[#AAF3D5]/20 top-1/2 transform -translate-y-1/2"></div>

      {/* Dots */}
      <div className="absolute left-[10%] right-[10%] flex justify-between top-1/2 transform -translate-y-1/2">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            ref={(el) => { dotsRef.current[i] = el; }}
            className="w-4 h-4 bg-[#FFD700] shadow-lg"
          />
        ))}
      </div>

      {/* Pacman SVG */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
        <svg
          ref={pacmanRef}
          width="64"
          height="64"
          viewBox="0 0 83 87"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ 
            transformOrigin: 'center center',
            transform: 'scaleX(-1)'
          }}
        >
          <path
            d="M39.6303 43.0869L4.68394 68.2378C13.7738 80.8996 29.0441 87.6734 44.5201 85.9075C67.979 83.2225 85.0738 61.6869 82.3925 38.2015C79.7112 14.7106 58.2049 -2.40763 34.7516 0.277367C19.3478 2.03765 6.04134 12.0033 0 26.3029L39.6358 43.098L39.6303 43.0869Z"
            fill="url(#paint0_linear_565_7631)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_565_7631"
              x1="82.41"
              y1="38.4075"
              x2="2.31623"
              y2="47.5488"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FBC101" />
              <stop offset="1" stopColor="#FDE699" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}