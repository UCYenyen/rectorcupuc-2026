"use client";
import Image from "next/image";
export default function UnderDevelopmentPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#390D62] to-[#6226A4] flex items-center justify-center p-4">
          <div className="absolute w-full h-full bg-gradient-to-b from-[#390D62] to-[#6226A4] z-[1] overflow-hidden"></div>
          <Image
            src={"/home/background.svg"}
            width={1000}
            height={1000}
            alt="rectorcupuc background"
            className="w-full h-full object-center object-cover opacity-25 z-1 absolute"
          ></Image>
          <div className="relative z-10 border-[#AAF3D5] border-4 bg-white/10 backdrop-blur-sm p-12 rounded-2xl shadow-2xl text-center max-w-md w-full">
             <div className="relative z-10 border-[#AAF3D5] border-4 bg-white/10 backdrop-blur-sm p-12 rounded-2xl shadow-2xl text-center max-w-md w-full">
        <div className="mx-auto w-20 h-20 bg-gradient-to-r from-[#E94BFF] to-[#FF6BDB] rounded-full flex items-center justify-center mb-6">
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

        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#E94BFF] to-[#FF6BDB] bg-clip-text text-transparent mb-4">
          Under Development
        </h1>

        <p className="text-white text-lg leading-relaxed mb-6">
          We&apos;re working hard to bring you an amazing experience. The site
          is currently under development and will be available soon!
        </p>

        <div className="text-sm text-[#AAF3D5] font-bold">
          <p>Expected launch: Coming Soon</p>
        </div>
      </div>
          </div>
        </div>
  );
}
