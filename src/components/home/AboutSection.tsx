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
                Rector Cup is an annual event held by Ciputra University Surabaya under the Student Organization Department of the Student Council. This event serves as a platform for students to discover and develop their interests and talents, especially in non-academic fields. Furthermore, the Rector Cup aims to build communication and foster positive relationships between students from various faculties and departments through various competitions, including sports, e-sports, academic challenges, and arts.
             </h3>
              <h3 className="about-text pb-12 sm:pb-0 text-md text-justify sm:text-2xl sm:text-center w-[80%] sm:w-1/2">
                 To maintain the integrity of our competitions, Rector Cup web uses Google OAuth (Google Sign-In) specifically to ensure that all registered participants are active students of Ciputra University Surabaya. We use your Google profile information (name and email) solely for student identity verification and registration management. Your data is used internally and will not be shared with any third parties.
             </h3>
        </section>
    );
}
