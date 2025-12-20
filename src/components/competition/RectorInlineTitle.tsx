import React from 'react'
import Image from "next/image";

export default function RectorInlineTitle() {
    return (
        <div className="absolute w-[80%] md:w-1/4 -top-[4rem] md:-top-[6rem]">
            <Image
                src={"/logos/rector-title.svg"}
                width={600}
                height={600}
                alt="Rectorcupuc Title"
                className="relative z-2"
            ></Image>
            <Image
                src={"/competitions/pacman-ghost.svg"}
                width={600}
                height={600}
                alt="Rectorcupuc Title"
                className="absolute z-1 -top-2 md:-top-4 -left-8 md:-left-14 w-1/5 h-auto"
            ></Image>
            <Image
                src={"/competitions/congrats.svg"}
                width={600}
                height={600}
                alt="Rectorcupuc congrats"
                className="absolute z-1 -bottom-2 md:-bottom-4 -left-8 md:-left-16 w-1/4 h-auto"
            ></Image>
            <Image
                src={"/competitions/pixelmon.svg"}
                width={600}
                height={600}
                alt="Rectorcupuc Title"
                className="absolute z-1 -top-2 -right-8 md:-top-4 md:-right-14 w-1/4 h-auto"
            ></Image>
            <Image
                src={"/competitions/congrats.svg"}
                width={600}
                height={600}
                alt="Rectorcupuc congrats"
                className="absolute z-1 -bottom-2 -right-8 md:-bottom-4 md:-right-14 w-1/4 h-auto rotate-z-120"
            ></Image>
        </div>
    )
}
