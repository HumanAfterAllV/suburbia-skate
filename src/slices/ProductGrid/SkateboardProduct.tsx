import { createClient } from "@/prismicio"
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";
import { FaStar } from "react-icons/fa6";

import { Scribble } from "./Scribble";
import { ButtonLink } from "@/components/ButtonLink";
import { HorizontalLine, VerticalLine } from "@/components/Line";

type SkateboardProductProps = {
    id: string
}

async function getDominantColor(url: string): Promise<string> {
    try{
        const paletteURL = new URL(url);
        paletteURL.searchParams.set("palette", "json");
    
        const response = await fetch(paletteURL);
        const json = await response.json();
    
        return(json.dominant_colors.vibrant?.hex || json.dominant_colors.vibrant_light?.hex)

    }
    catch(error){
        console.error(error);
        return "currentColor";
    }
}

export default async function SkateboardProduct({id}: SkateboardProductProps): Promise<React.JSX.Element> {
    
    const VERTICAL_LINE_CLASS = "absolute top-0 h-full stroke-2 text-stone-300 transition-colors group-hover:text-stone-400";
    const HORIZONTAL_LINE_CLASS = "~mx-8 stroke-2 text-stone-300 transition-colors group-hover:text-stone-400";

    const client = createClient();
    const product = await client.getByID<Content.SkateboardDocument>(id);

    const price = isFilled.number(product.data.price) ? `$${product.data.price}` : "Price not available";

    const dominantColors = isFilled.image(product.data.image) ? await getDominantColor(product.data.image.url) : "currentColor";


    return(
        <div className="group relative mx-auto w-full max-w-72 px-8 pt-4">
            <VerticalLine className={clsx(VERTICAL_LINE_CLASS, "left-4")}/>
            <VerticalLine className={clsx(VERTICAL_LINE_CLASS, "right-4")}/>
            <HorizontalLine className={HORIZONTAL_LINE_CLASS}/>

            <div className="flex justify-between items-center ~text-sm/2xl ">
                <span>{price}</span>
                <span className="inline-flex items-center gap-1">
                    <FaStar className="text-yellow-400"/>
                </span>
            </div>
            <div className="~mb-1 overflow-hidden py-4">
                <Scribble className="absolute inset-0" color={dominantColors}/>
                <PrismicNextImage alt="" field={product.data.image} width={150} className="mx-auto w-[58%] origin-top transform-gpu transition-transform duration-500 ease-in-out group-hover:scale-150"/>
            </div>
            <HorizontalLine className={HORIZONTAL_LINE_CLASS}/>
            <h3 className="my-2 text-center font-sans leading-tight ~text-lg/xl">
                {product.data.name}
            </h3>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <ButtonLink field={product.data.customizer_link[0]} color="orange" size="sm" icon="skateboard">
                    Customize
                </ButtonLink>
            </div>
        </div>
    )
}