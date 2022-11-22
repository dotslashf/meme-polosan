import { ImageType } from "../pages";
import { cn } from "../utils/helpers";
import Image from "next/image";
import { useState } from "react";
import Head from "next/head";
import Layout from "./Layout";

export default function MemeSingle(props: ImageType) {
  const [isLoading, setLoading] = useState(true);

  return (
    <Layout>
      <div className="mx-auto py-8 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex space-x-4">
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
              priority
            />
          </div>
          <div className="flex flex-col self-start w-1/4">
            <h1 className="font-bold text-2xl text-gray-800">{props.title}</h1>
            <div className="mt-4">
              <p className="text-md text-gray-600">{props.description}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
