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
                Rector Cup 2026 adalah acara tahunan Universitas Ciputra Surabaya di bawah Department of Student Organization dari Student Council. Acara Rector Cup 2026 diadakan sebagai tempat untuk mahasiswa Universitas Ciputra Surabaya dalam menemukan serta mengembangkan minat dan bakat, terutama di bidang non-akademik. Selain itu, acara Rector Cup yang diadakan setiap tahun bertujuan untuk membangun komunikasi serta relasi yang baik antar mahasiswa dari berbagai fakultas dan jurusan.
                Rector Cup 2026 hadir dengan berbagai cabang lomba, termasuk sport, e-sport, learning, dan art, yang dapat melatih pengembangan skill mahasiswa, profesionalisme, serta kecerdasan intelektual.
            </h3>
        </section>
    );
}
