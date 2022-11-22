import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ImageType } from "../pages";
import { cn } from "../utils/helpers";

export default function MemeThumbnail(props: ImageType) {
  const [isLoading, setLoading] = useState(true);

  return (
    <Link href={`/${props.id}`} className="group">
      <div className="aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-7 w-full overflow-hidden rounded-lg bg-gray-200">
        <Image
          src={props.imageSrc}
          alt="blank image"
          className={cn(
            "group-hover:opacity-75 object-cover",
            isLoading
              ? "grayscale blur-2xl scale-110"
              : "grayscale-0 blur-0 scale-100"
          )}
          width="100"
          height="100"
          onLoadingComplete={() => setLoading(false)}
          priority={true}
        />
      </div>
      <h3 className="font-bold mt-4 text-sm text-gray-700">{props.title}</h3>
      <p className="mt-1 text-sm text-gray-500">{props.description}</p>
    </Link>
  );
}
