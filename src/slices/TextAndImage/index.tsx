import clsx from "clsx";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

import { Content } from "@prismicio/client";
import { Bounded } from "@/components/Bounded";
import { Heading } from "@/components/Heading";
import { ButtonLink } from "@/components/ButtonLink";
import ParallaxImage from "@/components/ParallaxImage";
import SlideIn from "@/components/SlideIn";

declare module "react" {
  interface CSSProperties {
    "--index"?: number;
  }
}

export type TextAndImageProps = SliceComponentProps<Content.TextAndImageSlice>;

const TextAndImage = ({ slice, index }: TextAndImageProps) => {

  const theme = slice.primary.theme
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={clsx(
        "sticky top-[calc(var(--index)*2rem)]",
        theme === "Blue" && "bg-texture bg-brand-blue text-white",
        theme === "Orange" && "bg-texture bg-brand-orange text-white",
        theme === "Navy" && "bg-texture bg-brand-navy text-white",
        theme === "Lime" && "bg-texture bg-brand-lime text-white",
      )}
      style={{"--index": index}}
    >
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-24">
        <div className={clsx("flex flex-col items-center gap-8 text-center md:items-start md:text-left", slice.variation === "imageOnLeft" && "md:order-2")}>
          <SlideIn>
            <Heading size="lg" as="h2">
              <PrismicRichText field={slice.primary.heading} />
            </Heading>
          </SlideIn> 
          <SlideIn>
            <div className="max-w-md text-lg leading-relaxed">
              <PrismicRichText field={slice.primary.body} />
            </div>
          </SlideIn>
          <SlideIn>
            <ButtonLink field={slice.primary.button} color={theme === "Lime" ? "orange" : "lime"}>
              {slice.primary.button.text}
            </ButtonLink>
          </SlideIn> 
        </div>
        <ParallaxImage foregroundImage={slice.primary.foreground_image} backgroundImage={slice.primary.background_texture}/>
      </div>
    </Bounded>
  );
};

export default TextAndImage;
