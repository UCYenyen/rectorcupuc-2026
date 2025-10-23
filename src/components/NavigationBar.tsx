"use client";
import React from "react";
import Link from "next/link";
import GoogleLogin from "./auth/GoogleLogin";
import UserProfileButton from "./auth/UserProfileButton";
import { useSession } from "next-auth/react";

export default function NavigationBar() {
  const { data: session, status } = useSession();
  return (
    <nav className="flex min-h-[7vh] px-[5%] bg-zinc-100 justify-between items-center w-screen overflow-visible shadow-2xl">
      <Link href={"/"} className="text-2xl font-bold text-black">RC</Link>
      <div className="flex gap-1 sm:gap-4 text-black items-center justify-center">
        <Link href="/competitions" className="hover:underline w-full">
          Competitions
        </Link>
        <Link href="/votes" className="hover:underline w-full">
          Votes
        </Link>
        <div className="flex items-center">
          {status === "loading" ? (
            // placeholder ukuran sama dengan avatar agar layout tidak bergeser
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
