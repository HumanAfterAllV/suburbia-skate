import React from "react";
import { asImageSrc, Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

import { Bounded } from "@/components/Bounded";
import { Heading } from "@/components/Heading";
import { ButtonLink } from "@/components/ButtonLink";

import InteractiveSkateboard from "./InteractiveSkateboard";
import { WideLogo } from "./WideLogo";
import { TallLogo } from "./TallLogo";

const DEFAULT_DECK_TEXTURE = "/skateboard/Deck.webp";
const DEFAULT_WHEEL_TEXTURE = "/skateboard/SkateWheel1.png";
const DEFAULT_TRUCK_COLOR = "#6F6E6A";
const DEFAULT_BOLT_COLOR = "#6F6E6A";

export type HeroProps = SliceComponentProps<Content.HeroSlice>;


const Hero = ({ slice }: HeroProps): React.JSX.Element => {

  const deckTextureURL = asImageSrc(slice.primary.skateboard_deck_texture) || DEFAULT_DECK_TEXTURE;
  const wheelTextureURL = asImageSrc(slice.primary.skateboard_wheel_texture) || DEFAULT_WHEEL_TEXTURE;
  const truckColor = slice.primary.skateboard_truck_color || DEFAULT_TRUCK_COLOR;
  const boltColor = slice.primary.skateboard_bolt_color || DEFAULT_BOLT_COLOR;


  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-brand-pink h-dvh overflow-hidden text-zinc-800 bg-texture"
    >
      <div className="absolute inset-0 flex">
        <WideLogo className="w-full text-brand-purple hidden opacity-20 mix-blend-multiply lg:block"/>
        <TallLogo className="w-full text-brand-purple opacity-20 mix-blend-multiply sm:hidden"/>
      </div>
      <div className="absolute inset-0 mx-auto mt-24 max-w-6xl grid grid-rows-[1fr, auto] place-items-end px-6 ~py-10/16">
        <Heading className="relative max-w-2xl place-self-start">
          <PrismicRichText field={slice.primary.heading} />
        </Heading>
        <div className="flex relative w-full flex-col items-center justify-between ~gap-2/4 lg:flex-row">
          <div className="max-w-[45ch] font-semibold ~text-lg/xl">
            <PrismicRichText field={slice.primary.body} />
          </div>
         <ButtonLink field={slice.primary.button} color="orange" size="lg" icon="skateboard" className="z-20 mt-2 block">
            {slice.primary.button.text}
          </ButtonLink>  
        </div>
      </div> 
      <InteractiveSkateboard
        deckTextureURL={deckTextureURL}
        wheelTextureURL={wheelTextureURL}
        truckColor={truckColor}
        boltColor={boltColor} 
      />

    </Bounded>
  );
};

export default Hero;
