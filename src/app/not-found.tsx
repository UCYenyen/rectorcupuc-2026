"use client";

import Link from "next/link";

export default function NotFoundPage() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-[#390D62] to-[#6226A4] flex items-center justify-center p-4 relative overflow-hidden">

        {/* Main content card with error badge on top */}
        <div className="bg-white/90 backdrop-blur-sm p-12 rounded-2xl shadow-2xl text-center max-w-md w-full border border-white/20 transform transition-all duration-500 hover:scale-105 relative">
          {/* Error code badge positioned on top of the card */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-black text-white px-6 py-2 rounded-full text-sm font-mono shadow-lg z-10 pulse-glow">
            Error 404
          </div>

          {/* Search/Question mark icon */}
          <div className="mx-auto w-20 h-20 bg-black rounded-full flex items-center justify-center mb-6 shadow-lg mt-4">
            <svg
              className="w-10 h-10 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <h1 className="text-4xl font-bold bg-black bg-clip-text text-transparent mb-4">
            Page Not Found
          </h1>

          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            Oops! The page you&apos;re looking for doesn&apos;t exist. It might
            have been moved, deleted, or you entered the wrong URL.
          </p>

          <div className="space-y-4">
            <Link
              href="/"
              className="inline-block bg-black text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              🏠 Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
