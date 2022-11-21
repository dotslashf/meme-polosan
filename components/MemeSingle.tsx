import { ImageType } from "../pages";
import { cn } from "../utils/helpers";
import Image from "next/image";
import { useState } from "react";
import Head from "next/head";

export default function MemeSingle(props: ImageType) {
  const [isLoading, setLoading] = useState(true);

  return (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>
      <div className="flex h-screen justify-center items-center px-16 py-24">
        <div className="flex space-x-8">
          <div className="relative self-start">
            <Image
              src={props.imageSrc}
              alt="blank image"
              className={cn(
                "w-full h-auto group-hover:opacity-75 object-cover",
                isLoading
                  ? "grayscale blur-2xl scale-110"
                  : "grayscale-0 blur-0 scale-100"
              )}
              width="0"
              height="0"
              sizes="100vw"
              onLoadingComplete={() => setLoading(false)}
            />
          </div>
          <div className="flex flex-col self-start">
            <h1 className="font-bold text-3xl text-gray-800">{props.title}</h1>
            <p className="mt-6 text-lg text-gray-600">{props.description}</p>
          </div>
        </div>
      </div>
    </>
  );
}
