"use client";
import React from "react";
import Link from "next/link";
import GoogleLogin from "./auth/GoogleLogin";
import UserProfileButton from "./auth/UserProfileButton";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function NavigationBar() {
  const { data: session, status } = useSession();
  return (
    <nav className="fixed z-[100] bg-[url('/layout/navbar-bg.svg')] bg-cover bg-center flex min-h-[7vh] px-[5%] justify-between items-center w-screen overflow-visible shadow-2xl border-y-2 border-[#ADDCE7]">
      <Link href={"/"} className=""><Image src={"/layout/rector-logo.svg"} className="w-14 h-auto" height={80} width={80} alt="rectorcupuc logo"></Image></Link>
      <div className="flex gap-1 sm:gap-4 text-black items-center justify-center">
        <Link href="/competitions" className="bg-zinc-300 rounded-lg px-4 py-2 hover:underline w-full">
          Competitions
        </Link>
        <Link href="/vote" className="bg-zinc-300 rounded-lg px-4 py-2 hover:underline w-full">
          Votes
        </Link>
        {(session?.user.role === "liason_officer") && (
          <Link href="/dashboard/admin/lo" className="bg-zinc-300 rounded-lg px-4 py-2 hover:underline w-full whitespace-nowrap">
           Admin
          </Link>
        )}
        {(session?.user.role === "pdd_website") && (
          <Link href="/dashboard/admin/web" className="bg-zinc-300 rounded-lg px-4 py-2 hover:underline w-full whitespace-nowrap">
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
    </nav>
  );
}
