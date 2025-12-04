'use client'
import React, { useEffect, useRef, useState } from 'react'
import CountdownCard from './CountdownCard'
import { CountdownValues } from '@/types/countdown.md';

export default function CountdownContainer({ endDate }: { endDate?: string | Date }) {
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [cardWidth, setCardWidth] = useState<string>("");
  const [remaining, setRemaining] = useState<CountdownValues>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // parse endDate or default (example)
  const target = useRef<Date>(endDate ? new Date(endDate) : new Date(Date.now() + 10 * 24 * 3600 * 1000)); // default 10 days

  // ukuran maksimum antar kartu
  useEffect(() => {
    function measure() {
      const widths = cardRefs.current.map((el) => el?.getBoundingClientRect().width || 0);
      const max = Math.max(...widths, 0);
      if (max > 0) setCardWidth(`${Math.ceil(max)}px`);
    }

    // measure setelah render (delay kecil untuk memastikan children terpasang)
    setTimeout(measure, 50);
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // interval countdown setiap 1 detik
  useEffect(() => {
    function calc() {
      const now = Date.now();
      const diff = Math.max(0, target.current.getTime() - now); // ms
      const totalSeconds = Math.floor(diff / 1000);
      const days = Math.floor(totalSeconds / (24 * 3600));
      const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      setRemaining({ days, hours, minutes, seconds });
    }

    calc(); // hitung segera
    const id = window.setInterval(calc, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <div className='relative z-[5] grid grid-cols-2 sm:grid-cols-4 gap-4 place-items-center justify-items-center mt-16 mb-16 sm:mb-0'>
        <CountdownCard innerRef={(el) => (cardRefs.current[0] = el)} cardWidth={cardWidth} properties={{label: "Days", countdown: remaining.days}}/>
        <CountdownCard innerRef={(el) => (cardRefs.current[1] = el)} cardWidth={cardWidth} properties={{label: "Hours", countdown: remaining.hours}}/>
        <CountdownCard innerRef={(el) => (cardRefs.current[2] = el)} cardWidth={cardWidth} properties={{label: "Minutes", countdown: remaining.minutes}}/>
        <CountdownCard innerRef={(el) => (cardRefs.current[3] = el)} cardWidth={cardWidth} properties={{label: "Seconds", countdown: remaining.seconds}}/>
      </div>
    </>
  )
}
