"use client";

import { ImageField } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";

type ParallaxProps = {
    foregroundImage: ImageField;
    backgroundImage: ImageField;
    className?: string;
}

export default function ParallaxImage({foregroundImage, backgroundImage, className}: ParallaxProps): JSX.Element {

    const 
    return (
        <div className={clsx("grid grid-cols-1 place-items-center", className)}>
            <div className="col-start-1 row-start-1 transition-transform">
                <PrismicNextImage field={backgroundImage} alt=""/>
            </div>
            <div className="col-start-1 row-start-1 transition-transform h-full w-full place-items-center">
                <PrismicNextImage field={foregroundImage} alt="" imgixParams={{height: 600}} className="h-full max-w-[500px] w-auto"/>
            </div>
        </div>
    )
}