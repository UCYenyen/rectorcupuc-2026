"use client";

import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';
import Image from 'next/image';
import { signOut } from "next-auth/react";
import { Menu, X } from "lucide-react"; // Import Lucide Icons

export interface StaggeredMenuItem {
  label: string;
  href: string;
}

export interface StaggeredMenuProps {
  items: StaggeredMenuItem[];
  session: any;
  colors?: string[];
  accentColor?: string;
  logoUrl?: string;
}

export const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
  items = [],
  session,
  colors = ['#6427A6', '#E979EE', '#ADDCE7'],
  accentColor = '#E979EE',
  logoUrl = "/layout/rector-logo.svg"
}) => {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const preLayersRef = useRef<HTMLDivElement | null>(null);
  const preLayerElsRef = useRef<HTMLElement[]>([]);
  const openTlRef = useRef<gsap.core.Timeline | null>(null);
  const busyRef = useRef(false);

  const allItems = [...items];
  if (session) {
    allItems.push({ label: "Dashboard", href: "/dashboard" });
  }

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (preLayersRef.current && panelRef.current) {
        const layers = Array.from(preLayersRef.current.querySelectorAll('.sm-prelayer')) as HTMLElement[];
        preLayerElsRef.current = layers;
        gsap.set([panelRef.current, ...layers], { xPercent: 100 });
      }
    });
    return () => ctx.revert();
  }, []);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;

    openTlRef.current?.kill();
    const itemLabels = Array.from(panel.querySelectorAll('.sm-anim-item')) as HTMLElement[];
    gsap.set(itemLabels, { yPercent: 100, opacity: 0 });

    const tl = gsap.timeline({ onComplete: () => { busyRef.current = false; } });
    layers.forEach((layer, i) => {
      tl.to(layer, { xPercent: 0, duration: 0.4, ease: 'power2.inOut' }, i * 0.08);
    });
    tl.to(panel, { xPercent: 0, duration: 0.5, ease: 'power4.out' }, "-=0.2");
    tl.to(itemLabels, { yPercent: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.2)' }, "-=0.3");
    openTlRef.current = tl;
  }, []);

  const playClose = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;

    gsap.to([...layers, panel], {
      xPercent: 100,
      duration: 0.4,
      ease: 'power2.in',
      stagger: -0.05,
      onComplete: () => { busyRef.current = false; }
    });
  }, []);

  const toggleMenu = () => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);
    if (target) playOpen(); else playClose();
  };

  return (
    <div className="sm-scope">
      {/* FIXED HEADER: LOGO & ICON */}
      <div className="fixed top-0 left-0 w-full h-[10vh] px-[5%] flex items-center justify-between z-[210] pointer-events-none">
        <Link href="/" className="pointer-events-auto">
          <Image src={logoUrl} width={56} height={56} alt="logo" className="w-14 h-auto" />
        </Link>
        
        <button 
          onClick={toggleMenu}
          className="pointer-events-auto flex items-center justify-center bg-black/40 backdrop-blur-md border-2 border-white rounded-lg p-2 text-white transition-all active:scale-90"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* BACKGROUND LAYERS */}
      <div ref={preLayersRef} className="fixed inset-0 z-[190] pointer-events-none">
        {colors.map((c, i) => (
          <div key={i} className="sm-prelayer absolute inset-0 w-full h-full" style={{ background: c }} />
        ))}
      </div>

      {/* MENU PANEL */}
      <aside ref={panelRef} className="fixed inset-0 z-[200] bg-[#390D62] flex flex-col justify-center items-center p-10">
        <nav className="w-full text-center">
          <ul className="space-y-6">
            {allItems.map((item, idx) => (
              <li key={idx} className="overflow-hidden">
                <Link 
                  href={item.href} 
                  onClick={toggleMenu}
                  className="sm-anim-item block text-4xl font-black uppercase text-white hover:italic transition-all"
                  style={{ color: idx % 2 === 0 ? '#FFFFFF' : accentColor }}
                >
                  {item.label}
                </Link>
              </li>
            ))}

            {session && (
              <li className="overflow-hidden pt-4">
                <button
                  onClick={() => signOut()}
                  className="sm-anim-item block w-full text-2xl font-bold uppercase text-[#E979EE] border-t-2 border-white/20 pt-6"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default StaggeredMenu;