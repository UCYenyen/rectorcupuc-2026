import React from "react";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="relative min-h-[50vh] flex flex-col justify-center gap-12 items-center z-10 w-screen backdrop-blur-md bg-gradient-to-b from-[#3B81E5]/90 to-[#112440]">
        <Image
            src={"/home/border.svg"}
            className="absolute top-[-5%] left-0 w-full h-auto pointer-events-none"
            alt="rectorcupuc border-top"
            width={1000}
            height={1000}
        />
        <Image
            src={"/home/border.svg"}
            className="absolute bottom-[-5%] left-0 w-full h-auto pointer-events-none"
            alt="rectorcupuc border-bottom"
            width={1000}
            height={1000}
        />
        <h1 className="text-5xl text-center font-bold">ABOUT</h1>
        <h3 className="text-2xl text-center w-1/2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae sed
            obcaecati maxime voluptatum voluptates maiores voluptatibus beatae rerum
            debitis animi asperiores reprehenderit, inventore nulla voluptatem
            magnam impedit quod, recusandae quaerat. Laudantium, hic rem placeat
            labore dolorem sint facere quos fugit itaque, quo alias natus magnam ea
            debitis vitae, harum cupiditate.
        </h3>
    </section>
  );
}
