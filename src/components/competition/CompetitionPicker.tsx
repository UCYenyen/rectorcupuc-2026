import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function CompetitionPicker({
  src,
  alt,
  link,
  title,
}: {
  src: string;
  alt: string;
  link?: string;
  title?: string;
}) {
  return (
    <Link
      href={link || "#"}
      className="relative w-full h-full flex flex-col justify-center items-center group border-2 sm:border-4 border-[#AAF3D5] rounded-lg shadow-lg overflow-hidden"
    >
      {/* Container with overflow hidden to clip the zoomed image */}
      <div className="w-full h-full overflow-hidden">
        <Image
          src={src}
          width={800}
          height={800}
          alt={alt}
          className="w-full h-full transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      
      {/* Title overlay */}
      <h1 className="absolute text-white text-2xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 px-4 py-2 rounded-lg">
        {title || "Competition"}
      </h1>
    </Link>
  );
}