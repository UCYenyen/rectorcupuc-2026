"use client";

import React, { useState, useRef, useCallback, useLayoutEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { gsap } from "gsap";
import { Menu, X } from "lucide-react";
import GoogleLogin from "./auth/GoogleLogin";
import UserProfileButton from "./auth/UserProfileButton";
import StripeBackground from "./StripeBackground";

export default function NavigationBar() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const preLayersRef = useRef<HTMLDivElement | null>(null);
  const preLayerElsRef = useRef<HTMLElement[]>([]);
  const busyRef = useRef(false);

  const colors = ['#6427A6', '#E979EE', '#ADDCE7'];
  const accentColor = '#E979EE';

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Competitions", href: "/competitions" },
    { label: "Votes", href: "/vote" },
  ];

  if (session?.user.role === "liason_officer") {
    menuItems.push({ label: "Admin", href: "/dashboard/admin/lo" });
  }
  if (session?.user.role === "pdd_website") {
    menuItems.push({ label: "Admin", href: "/dashboard/admin/web" });
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
    const itemLabels = Array.from(panel.querySelectorAll('.sm-anim-item')) as HTMLElement[];
    gsap.set(itemLabels, { yPercent: 100, opacity: 0 });
    const tl = gsap.timeline({ onComplete: () => { busyRef.current = false; } });
    layers.forEach((layer, i) => {
      tl.to(layer, { xPercent: 0, duration: 0.4, ease: 'power2.inOut' }, i * 0.08);
    });
    tl.to(panel, { xPercent: 0, duration: 0.5, ease: 'power4.out' }, "-=0.2");
    tl.to(itemLabels, { yPercent: 0, opacity: 1, duration: 0.3, stagger: 0.05, ease: 'back.out(1.2)' }, "-=0.5");
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
    <>
      <nav className="fixed top-0 left-0 z-[210] bg-gradient-to-r from-[#6427A6] to-[#E979EE] flex min-h-[7vh] py-2 px-[5%] justify-between items-center w-full shadow-2xl border-y-4 border-[#ADDCE7]">
        <StripeBackground />
        <Link href={"/"} className="relative z-10">
          <Image src={"/layout/rector-logo.svg"} className="w-14 h-auto" height={80} width={80} alt="logo" />
        </Link>
        <div className="relative z-10 hidden md:flex gap-4 text-white items-center justify-center uppercase">
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href} className="bg-black/30 backdrop-blur-2xl text-md border-white border-2 rounded-lg px-4 py-2 hover:bg-purple-800 transition-all">
              {item.label}
            </Link>
          ))}
          <div className="flex items-center relative z-100">
            {status === "loading" ? (
              <div className="w-10 h-10 rounded-full bg-zinc-200 animate-pulse" />
            ) : session ? (
              <UserProfileButton />
            ) : (
              <GoogleLogin />
            )}
          </div>
        </div>
        <div className="md:hidden flex items-center gap-4 relative z-10">
          {!session && status !== "loading" && <GoogleLogin />}
          <button onClick={toggleMenu} className="flex items-center justify-center bg-black/40 backdrop-blur-md border-2 border-white rounded-lg p-2 text-white transition-all active:scale-90">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>
      <div ref={preLayersRef} className="fixed inset-0 z-[190] pointer-events-none md:hidden overflow-hidden">
        {colors.map((c, i) => (
          <div key={i} className="sm-prelayer absolute inset-0 w-full h-full" style={{ background: c }} />
        ))}
      </div>
      <aside ref={panelRef} className="fixed inset-0 z-[200] bg-[#390D62] flex flex-col justify-center items-center p-10 md:hidden">
        <nav className="w-full text-center">
          <ul className="space-y-6">
            {menuItems.map((item, idx) => (
              <li key={idx} className="overflow-hidden">
                <Link href={item.href} onClick={toggleMenu} className="sm-anim-item block text-4xl font-black uppercase text-white hover:italic transition-all" style={{ color: idx % 2 === 0 ? '#FFFFFF' : accentColor }}>
                  {item.label}
                </Link>
              </li>
            ))}
            {session && (
              <>
                <li className="overflow-hidden">
                  <Link href="/dashboard" onClick={toggleMenu} className="sm-anim-item block text-4xl font-black uppercase text-white hover:italic transition-all">
                    Dashboard
                  </Link>
                </li>
                <li className="overflow-hidden pt-4">
                  <button onClick={() => signOut()} className="sm-anim-item block w-full text-2xl font-bold uppercase text-[#E979EE] border-t-2 border-white/20 pt-6">
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </aside>
    </>
  );
}