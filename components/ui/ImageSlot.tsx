import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { getSlotSrc, imageSlots, type ImageSlotId } from "@/data/images";

type ImageSlotProps = {
  slot: ImageSlotId;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  showLabel?: boolean;
};

export default function ImageSlot({
  slot,
  alt,
  fill,
  width,
  height,
  className = "",
  sizes,
  priority,
  showLabel = true,
}: ImageSlotProps) {
  const src = getSlotSrc(slot);
  const { label } = imageSlots[slot];

  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        className={className}
        sizes={sizes}
        priority={priority}
      />
    );
  }

  const placeholder = (
    <div
      className={`flex flex-col items-center justify-center bg-osu-gray-light-60 border-2 border-dashed border-osu-gray-light-40 text-center p-4 ${className} ${
        fill ? "absolute inset-0 w-full h-full" : ""
      }`}
      style={!fill && width && height ? { width, height } : undefined}
    >
      <ImageIcon className="w-8 h-8 text-osu-gray mb-2 flex-shrink-0" />
      {showLabel && (
        <>
          <p className="text-xs font-bold text-osu-scarlet uppercase tracking-wider">
            Placeholder
          </p>
          <p className="text-sm font-semibold text-osu-gray-dark-60 mt-1">
            {label}
          </p>
        </>
      )}
    </div>
  );

  return placeholder;
}
