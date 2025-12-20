"use client";
import React from "react";
import Link from "next/link";
import GoogleLogin from "./auth/GoogleLogin";
import UserProfileButton from "./auth/UserProfileButton";
import { useSession } from "next-auth/react";
import Image from "next/image";
import StripeBackground from "./StripeBackground";
import { MenuIcon } from "lucide-react";

export default function NavigationBar() {
  const { data: session, status } = useSession();
  // bg-[url('/layout/navbar-bg.svg')]
  return (
    <nav className="fixed z-[100] bg-gradient-to-r from-[#6427A6] to-[#E979EE] flex min-h-[7vh] py-2 px-[5%] justify-between items-center w-screen overflow-visible shadow-2xl border-y-4 border-[#ADDCE7]">
      <StripeBackground />
      <Link href={"/"} className=""><Image src={"/layout/rector-logo.svg"} className="relative z-10 w-14 h-auto" height={80} width={80} alt="rectorcupuc logo"></Image></Link>
      <div className="relative z-10 hidden md:flex gap-1 sm:gap-4 text-white items-center justify-center uppercase">
        <Link href="/competitions" className="bg-black/30 backdrop-blur-2xl border-white border-3 rounded-lg px-4 py-2 hover:underline w-full">
          Competitions
        </Link>
        <Link href="/vote" className="bg-black/30 backdrop-blur-2xl border-white border-3 rounded-lg px-4 py-2 hover:underline w-full">
          Votes
        </Link>
        {(session?.user.role === "liason_officer") && (
          <Link href="/dashboard/admin/lo" className="bg-black/30 backdrop-blur-2xl border-white border-3 rounded-lg px-4 py-2 hover:underline w-full whitespace-nowrap">
            Admin
          </Link>
        )}
        {(session?.user.role === "pdd_website") && (
          <Link href="/dashboard/admin/web" className="bg-black/30 backdrop-blur-2xl border-white border-3 rounded-lg px-4 py-2 hover:underline w-full whitespace-nowrap">
            Admin
          </Link>
        )}
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
      <div className="flex md:hidden items-center bg-black/30 backdrop-blur-2xl border-white border-3 rounded-lg p-1 justify-center">
        <MenuIcon className="text-white w-8 h-8"/>
        </div>
    </nav>
  );
}
