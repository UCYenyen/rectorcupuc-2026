import React from 'react'
import Image from "next/image";

export default function RectorInlineTitle() {
    return (
        <div className="absolute w-1/2 md:w-1/4 -top-[6rem]">
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
                className="absolute z-1 -top-4 -left-14 w-1/5 h-auto"
            ></Image>
            <Image
                src={"/competitions/congrats.svg"}
                width={600}
                height={600}
                alt="Rectorcupuc congrats"
                className="absolute z-1 -bottom-4 -left-16 w-1/4 h-auto"
            ></Image>
            <Image
                src={"/competitions/pixelmon.svg"}
                width={600}
                height={600}
                alt="Rectorcupuc Title"
                className="absolute z-1 -top-4 -right-14 w-1/4 h-auto"
            ></Image>
            <Image
                src={"/competitions/congrats.svg"}
                width={600}
                height={600}
                alt="Rectorcupuc congrats"
                className="absolute z-1 -bottom-4 -right-14 w-1/4 h-auto rotate-z-120"
            ></Image>
        </div>
    )
}
