import { Bounded } from "@/components/Bounded";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { LazyYouTubePlayer } from "./LazyYoutubePlayer";
import clsx from "clsx";
import Image from "next/image";

/**
 * Props for `VideoBlock`.
 */
export type VideoBlockProps = SliceComponentProps<Content.VideoBlockSlice>;

/**
 * Component for "VideoBlock" Slices.
 */
const VideoBlock = ({ slice }: VideoBlockProps) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-texture bg-zinc-900"
    >
      <h2 className="sr-only">Video Reel</h2>
      <div className="relative aspect-video">
      {/* Mask */}
      <div className={clsx("absolute inset-0 [mask-image:url(/video-mask.png)] [mask-mode:alpha] [mask-position:center_center] [mask-repeat:no-repeat] [mask-size:100%_auto] ~translate-x-2/3 ~translate-y-2/3", "bg-brand-lime")}/>
      <div className={clsx("absolute inset-0 [mask-image:url(/video-mask.png)] [mask-mode:alpha] [mask-position:center_center] [mask-repeat:no-repeat] [mask-size:100%_auto] ~translate-x-1/3 ~translate-y-1/2", "bg-white")}/>
      <div className={clsx("absolute inset-0 [mask-image:url(/video-mask.png)] [mask-mode:alpha] [mask-position:center_center] [mask-repeat:no-repeat] [mask-size:100%_auto] ~translate-x-1/2 ~-translate-y-1/3", "bg-white")}/>
      <div className={clsx("relative h-full inset-0 [mask-image:url(/video-mask.png)] [mask-mode:alpha] [mask-position:center_center] [mask-repeat:no-repeat] [mask-size:100%_auto] ~translate-x-1/2 ~translate-y-1/3", "bg-white")}>
        {isFilled.keyText(slice.primary.youtube_video_id) && (
          <LazyYouTubePlayer  youTubeID={slice.primary.youtube_video_id} />
        )}
        <Image src="/image-texture.png" alt="" fill className="pointer-events-none object-cover opacity-50"/>
      </div>
      </div>
    </Bounded>
  );
};

export default VideoBlock;
