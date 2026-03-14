import { useEffect, useRef, useState } from "react";

interface RandomizeOnViewProps {
    text: string;
}

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

export default function RandomizeOnView({ text }: RandomizeOnViewProps) {
    // 1. Properly type the ref for an HTML Heading element
    const ref = useRef<HTMLHeadingElement | null>(null);
    const [display, setDisplay] = useState<string>(text);
    const [hasAnimated, setHasAnimated] = useState<boolean>(false);

    useEffect(() => {
        const element = ref.current;
        if (!element || hasAnimated) return;

        // 2. IntersectionObserver is built into the global TS types
        const observer = new IntersectionObserver(
            ([entry]: IntersectionObserverEntry[]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    runEffect();
                    setHasAnimated(true);
                    observer.disconnect();
                }
            },
            {
                root: null,
                threshold: 0,
                rootMargin: "-50% 0px -50% 0px",
            }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [hasAnimated, text]); // Added text as a dependency for safety

    const runEffect = (): void => {
        let iteration = 0;

        const interval: ReturnType<typeof setInterval> = setInterval(() => {
            setDisplay(
                text
                    .split("")
                    .map((char, index) => {
                        if (char === " ") return " ";
                        if (index < iteration) return char;
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("")
            );

            iteration += 1 / 3;

            if (iteration >= text.length) {
                clearInterval(interval);
                setDisplay(text);
            }
        }, 30);
    };

    return (
        <p
            ref={ref}
            className={`font-pixels overflow-hidden  ${hasAnimated ? "animate-fade-in" : "opacity-0"
                }`} 
        >
            {display}
        </p>
    );
}