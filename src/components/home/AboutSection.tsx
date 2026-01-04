import React from "react";
import Image from "next/image";

export default function AboutSection() {
    return (
        <section className="text-white relative h-fit flex flex-col justify-center gap-4 sm:gap-12 items-center py-[7.5rem] z-10 w-full backdrop-blur-md bg-gradient-to-b from-[#3B81E5]/90 via-[#4C27A8] to-[#331140]/80">
            <Image
                src={"/home/border.svg"}
                className="about-border-top hidden md:block absolute top-[-5%] left-0 sm:w-full h-auto pointer-events-none"
                alt="rectorcupuc border-top"
                width={1000}
                height={1000}
            />
            <Image
                src={"/layout/mobile-border.svg"}
                className="absolute top-[-2rem] left-0 w-full h-auto pointer-events-none block  md:hidden"
                alt="rectorcupuc border-top"
                width={1000}
                height={1000}
            />
            <Image
                src={"/home/border.svg"}
                className="about-border-bottom absolute bottom-[-5%] left-0 w-full h-auto pointer-events-none hidden md:block"
                alt="rectorcupuc border-bottom"
                width={1000}
                height={1000}
            />
            <Image
                src={"/layout/mobile-border.svg"}
                className="absolute bottom-[-2rem] left-0 w-full h-auto pointer-events-none block md:hidden"
                alt="rectorcupuc border-top"
                width={1000}
                height={1000}
            />
            <h1 className="about-head text-3xl sm:text-5xl text-center font-bold">ABOUT</h1>
            <h3 className="about-text pb-12 sm:pb-0 text-md text-justify sm:text-2xl sm:text-center w-[80%] sm:w-1/2">
                The Rector Cup 2026 is an annual event held by Ciputra University Surabaya under the Student Organization Department of the Student Council. The Rector Cup 2026 event is held as a place for Ciputra University Surabaya students to discover and develop their interests and talents, especially in non-academic fields. Furthermore, the annual Rector Cup event aims to build communication and good relationships between students from various faculties and departments. The Rector Cup 2026 presents various competition branches, including sports, e-sports, learning, and art, which can train students' skill development, professionalism, and intellectual intelligence.
            </h3>
        </section>
    );
}
