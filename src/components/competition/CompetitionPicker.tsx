import React from "react";
import Image from "next/image";
export default function CompetitionPicker({src, alt} : {src: string, alt: string}) {
  return (
    <div className="relative w-full h-full flex flex-col justify-center items-center">
      <Image
        src={src}
        width={800}
        height={800}
        alt={alt}
        className="w-full h-full"
      ></Image>
      <h1 className="absolute"> Banana</h1>
    </div>
  );
}
