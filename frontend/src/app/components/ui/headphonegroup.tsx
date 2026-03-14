import React from 'react';

interface HeadphoneStackProps {
    images: [string, string, string];
}

const HeadphoneStack: React.FC<HeadphoneStackProps> = ({ images }) => {
    const [center, left, right] = images;

    return (
        <div className="relative flex h-[500px] w-full items-center justify-center overflow-hidden p-10">

            {/* LEFT IMAGE: Rotated -25deg and shifted left */}
            <div className="absolute z-10 w-64 -translate-x-32 -rotate-[25deg] transition-all duration-500 ease-in-out hover:-translate-x-45">
                <img
                    src={left}
                    alt="Left Headphone"
                    className="h-full w-full object-contain brightness-90 saturate-[0.85]"
                />
            </div>

            {/* RIGHT IMAGE: Mirrored and Rotated 25deg */}
            <div
                className="absolute z-10 w-64 translate-x-32 rotate-[25deg] transition-all duration-500 ease-in-out hover:translate-x-45"
                style={{ transform: 'translateX(10px) rotate(10deg) scaleX(-1) scale(1.3)' }}
            >
                <img
                    src={right}
                    alt="Right Headphone"
                    className="h-full w-full object-contain brightness-90 saturate-[0.85]"
                />
            </div>

            {/* CENTER IMAGE: Highest Z-index and no mirroring */}
            <div className="relative z-20 w-72 drop-shadow-2xl transition-transform duration-500 hover:scale-105">
                <img
                    src={center}
                    alt="Center Headphone"
                    className="h-full w-full object-contain"
                />
            </div>

        </div>
    );
};

export default HeadphoneStack;