'use client'
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function UserProfileButton() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const initials =
    session?.user?.name?.split(" ").map(s => s[0]).join("").slice(0, 2).toUpperCase() || "U";

  return (
    <div ref={ref} className="relative border-white border-3 rounded-full">
      <button
        type="button"
        aria-label="User menu"
        onClick={() => setOpen((v) => !v)}
        className="w-10 h-10 rounded-full overflow-hidden bg-zinc-200 flex items-center justify-center focus:outline-none"
      >
        {session?.user?.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={session.user.image} alt="avatar" className="w-full h-full object-cover" />
        ) : (
          <span className="text-sm font-semibold text-black">{initials}</span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md py-1 z-[9999]">
          <Link
            href="/dashboard"
            className="block px-4 py-2 text-sm text-black hover:bg-zinc-100"
            onClick={() => setOpen(false)}
          >
            Dashboard
          </Link>
          {session?.user?.role === "pdd_website" && (
            <Link
              href="/dashboard/admin/web"
              className="block px-4 py-2 text-sm text-black hover:bg-zinc-100"
              onClick={() => setOpen(false)}
            >
              PDD Website
            </Link>
          )}
          {session?.user?.role === "liason_officer" && (
            <Link
              href="/dashboard/admin/lo"
              className="block px-4 py-2 text-sm text-black hover:bg-zinc-100"
              onClick={() => setOpen(false)}
            >
              Liason Officer
            </Link>
          )}
          <button
            onClick={() => signOut()}
            className="w-full text-left px-4 py-2 text-sm text-black hover:bg-zinc-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}