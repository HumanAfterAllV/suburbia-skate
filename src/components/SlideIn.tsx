"use client"

import { useEffect, useRef } from "react";

type SlideInProps = {
    children: React.ReactNode;
    delay?: number;
    duration?: number;
}

export default function SlideIn({children, delay = 0, duration = 0.6}: SlideInProps) {

    const elementRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const elementRefCurrent = elementRef.current;

        if(!elementRefCurrent) return

        const observer = new IntersectionObserver(([entry]) => {
            if(entry.isIntersecting){
                elementRefCurrent.style.transition = `slide-in ${duration}s ease${delay}s forwards`;
                observer.unobserve(elementRefCurrent);
            }
        },{threshold: 0, rootMargin: "-150px"});

        observer.observe(elementRefCurrent);

        return () => {
            observer.disconnect();
        }
    },[delay, duration])
    return(
        <div ref={elementRef}>{children}</div>
    )
}