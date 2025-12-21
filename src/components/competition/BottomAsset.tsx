import React from 'react'
import Image from "next/image";

export default function BottomAsset() {
  return (
    <>
      <Image
        src={"/competitions/brick.svg"}
        width={1000}
        height={1000}
        alt="rectorcupuc brick"
        className="w-full h-auto absolute hidden md:block bottom-0 z-4"
        draggable={false}
      ></Image>
      <Image
        src={"/layout/mobile-border.svg"}
        width={1000}
        height={1000}
        alt="rectorcupuc brick"
        className="w-full h-auto absolute block md:hidden bottom-0 z-6"
        draggable={false}
      ></Image>
      <Image
        src={"/competitions/pacman-dropshadow.svg"}
        width={1000}
        height={1000}
        alt="rectorcupuc pacman"
        className="w-auto h-32 absolute bottom-6 right-0 z-3"
        draggable={false}
      ></Image>
      <Image
        src={"/competitions/pacman-ghost.svg"}
        width={1000}
        height={1000}
        alt="rectorcupuc pacman ghost"
        className="w-auto h-32 absolute bottom-24 z-3"
        draggable={false}
      ></Image>
      <Image
        src={"/competitions/pacman-portal.webp"}
        width={1000}
        height={1000}
        alt="rectorcupuc pacman portal"
        className="w-auto h-58 absolute bottom-0 right-0 z-1"
        draggable={false}
      ></Image>
      <Image
        src={"/competitions/rector-book.webp"}
        width={1000}
        height={1000}
        alt="rectorcupuc book"
        className="w-auto h-58 absolute bottom-14 left-0 z-5"
        draggable={false}
      ></Image>
    </>
  )
}
