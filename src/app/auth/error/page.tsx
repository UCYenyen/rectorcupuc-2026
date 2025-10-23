"use client";

import Link from "next/link";
import { MailIcon } from "lucide-react";

export default function AuthErrorPage() {
    return (
        <div className="min-h-screen bg-zinc-300 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Main content card */}
            <div className="backdrop-blur-sm max-w-md w-full relative border border-white/20 hover:scale-105 transition-all duration-500 shadow-2xl bg-white/90 rounded-lg">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-6 py-2 text-sm font-mono bg-zinc-800 text-white rounded-md shadow-md">
                    Auth Error
                </div>

                <div className="pt-10 text-center">
                    <div className="mx-auto w-20 h-20 bg-gradient-to-br from-zinc-400 to-zinc-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
                        <MailIcon className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-zinc-700 via-zinc-800 to-black bg-clip-text text-transparent">
                        Access Denied
                    </h1>
                </div>
                
                <div className="text-center px-6 py-4">
                    <p className="text-zinc-600 text-lg leading-relaxed">
                        Authentication failed! You must use a valid 
                        <span className="font-semibold text-zinc-800"> @ciputra.ac.id </span>
                        email account to access this application.
                    </p>
                </div>
                
                <div className="flex justify-center pb-8">
                    <Link href="/">
                        <button className="px-6 py-3 bg-zinc-800 hover:bg-black text-white text-lg font-medium rounded-lg shadow-md">
                            🔄 Try Again
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
