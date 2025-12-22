"use client";

import React from "react";
import Link from "next/link";
import GoogleLogin from "./auth/GoogleLogin";
import UserProfileButton from "./auth/UserProfileButton";
import { useSession } from "next-auth/react";
import Image from "next/image";
import StripeBackground from "./StripeBackground";
import StaggeredMenu from "./StaggeredMenu";

export default function NavigationBar() {
  const { data: session, status } = useSession();

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

  return (
    <nav className="fixed top-0 left-0 z-[100] bg-gradient-to-r from-[#6427A6] to-[#E979EE] flex h-[10vh] md:h-[8vh] py-2 px-[5%] justify-between items-center w-screen overflow-visible shadow-2xl border-y-4 border-[#ADDCE7]">
      <StripeBackground />
      
      <Link href={"/"} className="relative z-10">
        <Image src={"/layout/rector-logo.svg"} className="w-14 h-auto" height={80} width={80} alt="logo" />
      </Link>

      {/* DESKTOP */}
      <div className="relative z-10 hidden md:flex gap-4 text-white items-center justify-center uppercase">
        {menuItems.map((item) => (
          <Link key={item.href} href={item.href} className="bg-black/30 backdrop-blur-2xl border-white border-2 rounded-lg px-4 py-2 hover:bg-purple-800 transition-all">
            {item.label}
          </Link>
        ))}
        <div className="flex items-center">
          {status === "loading" ? (
            <div className="w-10 h-10 rounded-full bg-zinc-200 animate-pulse" />
          ) : session ? (
            <UserProfileButton />
          ) : (
            <GoogleLogin />
          )}
        </div>
      </div>

      {/* MOBILE */}
      <div className="md:hidden flex items-center gap-3 relative z-10">
        {/* Tombol Profile di Navbar (Opsional, jika mau dihapus silakan) */}
        {!session && status !== "loading" && <GoogleLogin />}
        
        {/* Menu Staggered dengan Session */}
        <StaggeredMenu items={menuItems} session={session} />
      </div>
    </nav>
  );
}