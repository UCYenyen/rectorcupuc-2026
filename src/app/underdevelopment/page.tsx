"use client";

export default function UnderDevelopmentPage() {
  return (
    <div className="min-h-screen bg-zinc-300 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-sm p-12 rounded-2xl shadow-2xl text-center max-w-md w-full">
        <div className="mx-auto w-20 h-20 bg-gradient-to-br from-zinc-400 to-zinc-600 rounded-full flex items-center justify-center mb-6">
          <svg
            className="w-10 h-10 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <h1 className="text-4xl font-bold bg-gradient-to-r from-zinc-700 via-zinc-800 to-black bg-clip-text text-transparent mb-4">
          Under Development
        </h1>

        <p className="text-zinc-600 text-lg leading-relaxed mb-6">
          We&apos;re working hard to bring you an amazing experience. The site
          is currently under development and will be available soon!
        </p>

        <div className="text-sm text-zinc-500">
          <p>Expected launch: Coming Soon</p>
        </div>
      </div>
    </div>
  );
}
