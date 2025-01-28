"use client"

import { Heading } from "@/components/Heading";
import { ColorField, Content, ImageField, KeyTextField } from "@prismicio/client"
import { PrismicNextImage, PrismicNextImageProps } from "@prismicio/next";
import clsx from "clsx";
import { ComponentProps, ReactNode } from "react";
import { useCustomizerControls } from "./Context";


type ControlProps = Pick<Content.BoardCustomizerDocumentData,"wheels" | "decks" | "metals"> & {
    className?: string;
}

type OptionsProps = {
    title? : ReactNode;
    selectName?: KeyTextField;
    children: ReactNode;
}

type OptionProps = Omit<ComponentProps<"button">, "children"> & {
    selected: boolean;
    children: ReactNode;
    onClick: () => void;
} & (
    | {
        imageField: ImageField;
        imgixParams?: PrismicNextImageProps["imgixParams"];
        colorField?: never;
    }
    | {
        colorField: ColorField;
        imageField?: never;
        imgixParams?: never;
    }
)

export default function Control({wheels, decks, metals, className}: ControlProps): React.JSX.Element{

    const { setWheel, setDeck, setTruck, setBolt, selectedWheel, selectedTruck, selectedDeck, selectedBolt } = useCustomizerControls()
    
    return(
        <div className={clsx("flex flex-col gap-6", className)}>
            <Options title="Decks" selectName={selectedDeck?.uid}>
                {decks.map((deck) => (
                    <Option key={deck.uid} imageField={deck.texture} imgixParams={{
                            rect: [20, 1550, 1000, 1000],
                            width: 150,
                            height: 150
                        }}
                        selected={deck.uid === selectedDeck?.uid}
                        onClick={() => setDeck(deck)}
                    >
                        {deck.uid?.replace(/-/g," ")}
                    </Option>
                ))}
            </Options>
            <Options title="Wheels" selectName={selectedWheel?.uid}>
                {wheels.map((wheel) => (
                    <Option key={wheel.uid} imageField={wheel.texture} imgixParams={{
                            rect: [20, 10, 850, 850],
                            width: 150,
                            height: 150
                        }}
                        selected={wheel.uid === selectedWheel?.uid}
                        onClick={() => setWheel(wheel)}
                    >
                        {wheel.uid?.replace(/-/g, " ")}
                    </Option>
                ))}
            </Options>
            <Options title="Trucks" selectName={selectedTruck?.uid}>
                {metals.map((metal) => (
                    <Option key={metal.uid}
                        colorField={metal.color}
                        selected={metal.uid === selectedTruck?.uid}
                        onClick={() => setTruck(metal)}
                    >
                        {metal.uid?.replace(/-/g, " ")}
                    </Option>
                ))}
            </Options>
            <Options title="Bolts" selectName={selectedBolt?.uid}>
                {metals.map((metal) => (
                    <Option key={metal.uid}
                        colorField={metal.color}
                        selected={metal.uid === selectedBolt?.uid}
                        onClick={() => setBolt(metal)}
                    >
                        {metal.uid?.replace(/-/g, " ")}
                    </Option>
                ))}  
            </Options>
        </div>
    )
}


function Options({title, selectName, children}: OptionsProps) {
    const formattedName = selectName?.replace(/~/g," ")

    return (
        <div>
            <div className="flex">
                <Heading as="h2" size="xs" className="mb-2">
                    {title}
                </Heading>
                <p className="ml-3 text-zinc-200">
                    <span className="select-none text-zinc-200">| </span>
                    {formattedName}
                </p>
            </div>
            <ul className="mb-1 flex flex-wrap gap-2">
                {children}
            </ul>
        </div>
    )
}

function Option({selected, children, imageField, imgixParams, colorField, onClick}: OptionProps) {
    return(
        <button 
            className={clsx("size-10 cursor-pointer rounded-full bg-black p-0.5 outline-2 outline-white", selected && "outline")}
            onClick={onClick}
        >
            {imageField ? (
                <PrismicNextImage
                    field={imageField}
                    imgixParams={imgixParams}
                    className="pointer-events-none h-full w-full rounded-full"
                    alt=""
                />
            ): (
                <div className="h-full w-full rounded-full" style={{backgroundColor: colorField ?? undefined}} />                    
            )}
            <span className="sr-only">{children}</span>
        </button>
    )
}
