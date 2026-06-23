"use client";
import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export default function PopUp() {
    const [showClosingModal, setShowClosingModal] = useState(false);

    const modalRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    // AUTO POPUP
    useEffect(() => {
        setShowClosingModal(true);
    }, []);

    // GSAP ANIMATION
    useEffect(() => {
        if (showClosingModal) {
            gsap.fromTo(
                overlayRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.3 }
            );

            gsap.fromTo(
                modalRef.current,
                { y: 100, opacity: 0, scale: 0.95 },
                { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power4.out" }
            );
        }
    }, [showClosingModal]);

    const closeClosingModal = () => {
        gsap.to(modalRef.current, {
            y: 50,
            opacity: 0,
            scale: 0.95,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => setShowClosingModal(false)
        });

        gsap.to(overlayRef.current, { opacity: 0, duration: 0.3 });
    };

    if (!showClosingModal) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                ref={overlayRef}
                className="absolute inset-0 bg-[#5D239F]/60 backdrop-blur-sm"
                onClick={closeClosingModal}
            />

            <div
                ref={modalRef}
                className="relative z-10 border-[#DFE5E1] bg-gradient-to-r from-[#FFE694] via-white/80 to-white/60 border-4 backdrop-blur-2xl rounded-2xl shadow-2xl text-center max-w-md w-full overflow-hidden"
            >
                <div className="bg-gradient-to-r from-[#DD7CDF] via-[#FAE39F] py-3 border-b-4 border-[#DFE5E1]">
                    <h3 className="text-2xl text-[#1E0843] font-bold uppercase">
                        Closing RECTOR CUP 2026
                    </h3>
                </div>

                <div className="flex flex-col gap-4 px-8 py-6 text-[#1E0843]">
                    <p>
                        We warmly invite all participants to attend the
                        <b> Closing of Rector Cup 2026!</b>
                    </p>

                    <div className="bg-white/60 border-2 rounded-xl p-4 text-left">
                        <p>📅 <b>Date & Time:</b></p>
                        <p>Monday, 30 March 2026</p>
                        <p>16:00 WIB - 21:00 WIB</p>

                        <p className="mt-3">📍 <b>Location:</b></p>
                        <p>UC Plaza</p>
                    </div>

                    <p>
                        Let's come together to celebrate all the incredible moments from
                        Rector Cup 2026.
                    </p>

                    <button
                        onClick={closeClosingModal}
                        className="px-4 py-2 text-white bg-[#1E0843]/70 rounded-lg hover:bg-purple-800"
                    >
                        See You There 👋
                    </button>
                </div>
            </div>
        </div>
    );
}
