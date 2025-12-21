import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function CompetitionPicker({
  src,
  alt,
  link,
  title,
  className
}: {
  src: string;
  alt: string;
  link?: string;
  title?: string;
  className?: string;
}) {
  return (
    <Link
      href={link || "#"}
      className={`relative w-full h-full flex flex-col justify-center items-center group border-4 border-[#AAF3D5] rounded-md overflow-hidden transition-all duration-300 hover:shadow-2xl ${className || ""}`}
    >
      <div className="z-50 absolute w-full h-full bg-purple-700/20"></div>
      {/* Image container with zoom effect */}
      <div className="w-full h-full overflow-hidden">
        <Image
          src={src}
          width={800}
          height={800}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      
      {/* Title overlay */}
      <h1 className="absolute text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 px-4 py-2 sm:px-6 sm:py-3 rounded-lg z-10 text-center">
        {title || "Competition"}
      </h1>
    </Link>
  );
}