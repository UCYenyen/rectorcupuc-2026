"use client";
import AboutSection from "@/components/home/AboutSection";
import CountdownContainer from "@/components/home/CountdownContainer";
import TrailerSection from "@/components/home/TrailerSection";
import Image from "next/image";
import "@/styles/home.css"
import { useEffect, useRef } from "react";
import gsap from "gsap";
import StripeBackground from "@/components/StripeBackground";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLImageElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const arcadeRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial page load animations - SEMUA BERSAMAAN
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Animate title
      tl.from(titleRef.current, {
        scale: 0.5,
        opacity: 0,
        y: -100,
        duration: 1.2,
        ease: "back.out(1.7)",
      }, 0); // Start at time 0

      // Animate stars - BERSAMAAN dengan title
      tl.from(".big-yellow-star", {
        rotation: -180,
        scale: 0,
        opacity: 0,
        duration: 1,
      }, 0); // Start at time 0

      tl.from(".big-green-star", {
        rotation: 180,
        scale: 0,
        opacity: 0,
        duration: 1,
      }, 0); // Start at time 0

      // Animate arcade machines - BERSAMAAN
      tl.from(".arcade-machine-big", {
        y: 200,
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
      }, 0); // Start at time 0

      tl.from(".arcade-medium-left", {
        x: -200,
        opacity: 0,
        duration: 0.8,
      }, 0); // Start at time 0

      tl.from(".arcade-medium-right", {
        x: 200,
        opacity: 0,
        duration: 0.8,
      }, 0); // Start at time 0

      // TV left dan right - BERSAMAAN
      tl.from(".tv-left", {
        scale: 0,
        rotation: 360,
        opacity: 0,
        duration: 0.6,
      }, 0); // Start at time 0

      tl.from(".tv-right", {
        scale: 0,
        rotation: 360,
        opacity: 0,
        duration: 0.6,
      }, 0); // Start at time 0

      // Camera dan background - BERSAMAAN
      tl.from(".camera-right", {
        y: -100,
        x: 100,
        opacity: 0,
        duration: 0.6,
      }, 0); // Start at time 0

      tl.from(".camera-background-right", {
        y: -100,
        x: 100,
        opacity: 0,
        duration: 0.6,
      }, 0); // Start at time 0

      // Cards - BERSAMAAN
      tl.from(".rector-card", {
        rotationY: 90,
        opacity: 0,
        duration: 0.8,
      }, 0); // Start at time 0

      tl.from(".rector-card-2", {
        rotationY: 90,
        opacity: 0,
        duration: 0.8,
      }, 0); // Start at time 0

      // Congrats - BERSAMAAN
      tl.from(".congrats-left", {
        x: -200,
        rotation: -180,
        opacity: 0,
        duration: 0.8,
      }, 0); // Start at time 0

      // Floating animations for decorative elements
      gsap.to(".big-yellow-star", {
        y: "+=30",
        rotation: "+=10",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".big-green-star", {
        y: "-=20",
        rotation: "-=15",
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to([".tv-left", ".tv-right"], {
        y: "+=15",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.3,
      });

      gsap.to([".camera-right", ".camera-background-right"], {
        rotation: "+=5",
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.2,
      });

      // Parallax scroll effects
      gsap.to(".big-yellow-star", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        y: 150,
        rotation: 45,
      });

      gsap.to(".big-green-star", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        y: 100,
        rotation: -30,
      });

      gsap.to([".arcade-medium-left", ".arcade-medium-right"], {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        y: -80,
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="overflow-hidden">
      <div
        ref={containerRef}
        className="pt-[12vh] sm:pt-24 relative bg-[url('/home/background.svg')] bg-cover min-h-screen w-screen flex flex-col justify-center items-center overflow-hidden"
      >
        <div className="absolute w-full h-full bg-gradient-to-b from-[#390D62] to-[#6226A4] z-[1] overflow-hidden"></div>
        <StripeBackground />

        <div ref={starsRef}>
          <Image
            src={"/home/big-green-star.webp"}
            width={1000}
            height={1000}
            alt="rectorcupuc green star"
            className="big-green-star z-[3] w-[120vw] sm:w-screen h-auto absolute bottom-[-60%] opacity-50"
          />
          <Image
            src={"/home/big-yellow-star.webp"}
            width={1000}
            height={1000}
            alt="rectorcupuc yellow star"
            className="big-yellow-star z-[2] w-screen h-auto absolute bottom-[-50%] opacity-50"
          />
        </div>

        <div ref={arcadeRef} className="relative w-full flex justify-center items-end">
          <Image
            src={"/home/arcade-machine-big.webp"}
            width={1000}
            height={1000}
            alt="rectorcupuc giant arcade machine"
            className="arcade-machine-big z-[5] absolute bottom-0 opacity-50 w-[42vw] h-auto"
          />
          <Image
            src={"/home/arcade-medium-left.webp"}
            width={550}
            height={550}
            alt="rectorcupuc medium arcade machine"
            className="z-[5] arcade-medium-left absolute bottom-[-10%] left-[8rem] opacity-50"
          />
          <Image
            src={"/home/arcade-medium-right.webp"}
            width={550}
            height={550}
            alt="rectorcupuc medium arcade machine"
            className="z-[5] absolute arcade-medium-right bottom-[-10%] right-[8rem] opacity-50"
          />
        </div>

        <div ref={decorRef}>
          <Image
            src={"/home/card.svg"}
            width={1000}
            height={1000}
            alt="rectorcupuc card"
            className="rector-card z-[4] absolute left-[25%] bottom-[-5%] w-[50vw] h-auto opacity-50"
          />
          <Image
            src={"/home/card.svg"}
            width={1000}
            height={1000}
            alt="rectorcupuc card 2"
            className="rector-card-2 z-[4] absolute left-[25%] bottom-[-5%] w-[50vw] h-auto opacity-50"
          />
          <Image
            src={"/home/tv.webp"}
            width={250}
            height={250}
            alt="rectorcupuc tv right"
            className="z-[3] tv-right absolute bottom-0 right-0 opacity-50"
          />
          <Image
            src={"/home/tv.webp"}
            width={250}
            height={250}
            alt="rectorcupuc tv left"
            className="z-[3] tv-left rotate-y-180  absolute bottom-0 left-0 opacity-50"
          />
          <Image
            src={"/home/camera.webp"}
            width={250}
            height={250}
            alt="rectorcupuc camera right"
            className="camera-right z-[5] absolute top-0 right-0 opacity-50"
          />
          <Image
            src={"/home/camera-background.webp"}
            width={250}
            height={250}
            alt="rectorcupuc camera background"
            className="camera-background-right z-[4] absolute top-0 right-0 opacity-50"
          />
          <Image
            src={"/home/congrats.webp"}
            width={250}
            height={250}
            alt="rectorcupuc congrats left"
            className="congrats-left z-[5] absolute top-0 left-0 opacity-50"
          />
        </div>

        <div className="relative flex flex-col gap-4">
          <Image
            ref={titleRef}
            src={"/home/rector-title.svg"}
            width={1050}
            height={1050}
            alt="rectorcupuc title"
            className="rector-title z-[5] w-[80vw] sm:w-[50vw] h-auto"
          />
        </div>
        <CountdownContainer endDate="2026-01-01T00:00:00Z" />
      </div>
      <AboutSection />
      <TrailerSection />
    </div>
  );
}