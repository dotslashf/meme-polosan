import MemeThumbnail from "../components/MemeThumbnail";
import client from "../lib/supabase";

export type ImageType = {
  id?: string;
  title: string;
  description: string;
  imageSrc: string;
};

export async function getStaticProps() {
  const supabaseAdmin = client;

  const { data } = await supabaseAdmin.from("images").select("*").order("id");
  return {
    props: {
      images: data,
    },
  };
}

export default function Gallery({ images }: { images: ImageType[] }) {
  return (
    <div className="mx-auto mx-w-2xl py-10 px-4 sm:py-16 sm:px-6 lg:max-w-7xl lg:px-8">
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
