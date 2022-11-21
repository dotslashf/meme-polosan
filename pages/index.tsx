import MemeThumbnail from "../components/MemeThumbnail";
import { createClient } from "@supabase/supabase-js";

export type ImageType = {
  id?: string;
  title: string;
  description: string;
  imageSrc: string;
};

export async function getStaticProps() {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.SUPABASE_SERVICE_ROLE_KEY || ""
  );

  const { data } = await supabaseAdmin.from("images").select("*").order("id");
  return {
    props: {
      images: data,
    },
  };
}

export default function Gallery({ images }: { images: ImageType[] }) {
  return (
    <div className="mx-auto mx-w-2xl py-16 px-4sm:py-24 sm:px-6lg:max-w-7xl lg:px-8">
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {images.map((image, key) => (
          <MemeThumbnail
            key={image.id}
            description={image.description}
            imageSrc={image.imageSrc}
            title={image.title}
            id={image.id}
          />
        ))}
      </div>
    </div>
  );
}
