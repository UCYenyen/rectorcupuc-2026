import React from 'react'

export default function StripeBackground() {
    return (
        <div className="absolute inset-0 z-[1] w-full h-full overflow-hidden">
            <div
                className="w-full h-full"
                style={{
                    backgroundImage: `repeating-linear-gradient(
                        45deg,
                        rgba(255, 255, 255, 0.1),
                        rgba(255, 255, 255, 0.1) 140px,
                        transparent 140px,
                        transparent 280px
                    )`
                }}
            ></div>
        </div>
    )
}
