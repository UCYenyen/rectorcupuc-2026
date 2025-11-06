"use client";

import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <>
      <style jsx>{`
        @keyframes float1 {
          0%,
          100% {
            transform: translateX(0) translateY(0) rotate(0deg);
          }
          25% {
            transform: translateX(30px) translateY(-20px) rotate(90deg);
          }
          50% {
            transform: translateX(-20px) translateY(-40px) rotate(180deg);
          }
          75% {
            transform: translateX(-40px) translateY(-10px) rotate(270deg);
          }
        }

        @keyframes float2 {
          0%,
          100% {
            transform: translateX(0) translateY(0) rotate(0deg) scale(1);
          }
          33% {
            transform: translateX(-25px) translateY(30px) rotate(120deg)
              scale(1.1);
          }
          66% {
            transform: translateX(40px) translateY(15px) rotate(240deg)
              scale(0.9);
          }
        }

        @keyframes float3 {
          0%,
          100% {
            transform: translateX(0) translateY(0) rotate(360deg);
          }
          20% {
            transform: translateX(20px) translateY(-30px) rotate(288deg);
          }
          40% {
            transform: translateX(-15px) translateY(-15px) rotate(216deg);
          }
          60% {
            transform: translateX(-35px) translateY(20px) rotate(144deg);
          }
          80% {
            transform: translateX(10px) translateY(35px) rotate(72deg);
          }
        }

        @keyframes float4 {
          0%,
          100% {
            transform: translateX(0) translateY(0) rotate(0deg) scale(1);
          }
          30% {
            transform: translateX(-30px) translateY(-25px) rotate(-120deg)
              scale(1.2);
          }
          70% {
            transform: translateX(35px) translateY(30px) rotate(-240deg)
              scale(0.8);
          }
        }

        .float1 {
          animation: float1 8s ease-in-out infinite;
        }
        .float2 {
          animation: float2 12s ease-in-out infinite;
        }
        .float3 {
          animation: float3 10s ease-in-out infinite;
        }
        .float4 {
          animation: float4 15s ease-in-out infinite;
        }

        @keyframes float5 {
          0%, 100% { 
            transform: translateX(0) translateY(0) rotate(0deg) scale(1); 
          }
          50% { 
            transform: translateX(-60px) translateY(-50px) rotate(180deg) scale(1.3); 
          }
        }

        @keyframes float6 {
          0%, 100% { 
            transform: translateX(0) translateY(0) rotate(360deg); 
          }
          33% { 
            transform: translateX(50px) translateY(-40px) rotate(240deg); 
          }
          66% { 
            transform: translateX(-30px) translateY(60px) rotate(120deg); 
          }
        }

        .float5 { animation: float5 9s ease-in-out infinite; }
        .float6 { animation: float6 11s ease-in-out infinite; }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Enhanced floating particles with better visibility */}
        <div className="absolute top-10 left-10 w-24 h-24 bg-yellow-300 rounded-full opacity-40 float1"></div>
        <div className="absolute top-32 right-20 w-20 h-20 bg-red-300 rounded-full opacity-50 float2"></div>
        <div className="absolute bottom-20 left-32 w-16 h-16 bg-orange-300 rounded-full opacity-45 float3"></div>
        <div className="absolute bottom-40 right-10 w-28 h-28 bg-yellow-400 rounded-full opacity-35 float4"></div>

        {/* More visible floating particles */}
        <div
          className="absolute top-20 left-1/3 w-12 h-12 bg-pink-300 rounded-full opacity-40 float2"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/4 w-10 h-10 bg-blue-300 rounded-full opacity-45 float1"
          style={{ animationDelay: "4s" }}
        ></div>
        <div
          className="absolute bottom-1/3 left-1/4 w-14 h-14 bg-green-300 rounded-full opacity-40 float3"
          style={{ animationDelay: "6s" }}
        ></div>
        <div
          className="absolute bottom-16 right-1/3 w-18 h-18 bg-purple-300 rounded-full opacity-35 float4"
          style={{ animationDelay: "1s" }}
        ></div>

        {/* Additional large floating particles */}
        <div
          className="absolute top-1/4 left-16 w-22 h-22 bg-indigo-300 rounded-full opacity-30 float5"
          style={{ animationDelay: "3s" }}
        ></div>
        <div
          className="absolute top-3/4 right-16 w-20 h-20 bg-rose-300 rounded-full opacity-35 float6"
          style={{ animationDelay: "5s" }}
        ></div>
        <div
          className="absolute top-1/2 left-8 w-16 h-16 bg-teal-300 rounded-full opacity-40 float1"
          style={{ animationDelay: "7s" }}
        ></div>
        <div
          className="absolute top-1/2 right-8 w-18 h-18 bg-amber-300 rounded-full opacity-35 float2"
          style={{ animationDelay: "8s" }}
        ></div>

        {/* Small scattered particles */}
        <div
          className="absolute top-40 left-1/2 w-8 h-8 bg-cyan-300 rounded-full opacity-50 float3"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute bottom-32 left-2/3 w-6 h-6 bg-lime-300 rounded-full opacity-45 float5"
          style={{ animationDelay: "2.5s" }}
        ></div>
        <div
          className="absolute top-2/3 right-1/2 w-10 h-10 bg-violet-300 rounded-full opacity-40 float6"
          style={{ animationDelay: "3.5s" }}
        ></div>

        {/* Main content card with error badge on top */}
        <div className="bg-white/90 backdrop-blur-sm p-12 rounded-2xl shadow-2xl text-center max-w-md w-full border border-white/20 transform transition-all duration-500 hover:scale-105 relative">
          {/* Error code badge positioned on top of the card */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-2 rounded-full text-sm font-mono shadow-lg z-10">
            Error 403
          </div>

          {/* Lock icon */}
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-red-400 to-yellow-500 rounded-full flex items-center justify-center mb-6 shadow-lg mt-4">
            <svg
              className="w-10 h-10 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent mb-4">
            Access Denied
          </h1>

          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            Oops! You don&apos;t have the necessary permissions to access this page.
            Please check your credentials or contact an administrator.
          </p>

          <div className="space-y-4">
            <Link
              href="/"
              className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              🏠 Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
