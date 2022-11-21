import { ImageType } from ".";
import MemeSingle from "../components/MemeSingle";
import client from "../lib/supabase";

export async function getServerSideProps(context: { query: { id: string } }) {
  const { id } = context.query;
  const supabaseAdmin = client;
  const { data } = await supabaseAdmin
    .from("images")
    .select("*")
    .filter("id", "eq", id)
    .limit(1)
    .single();

  return {
    props: data || {},
  };
}

export default function MemePage(props: ImageType) {
  if (Object.keys(props).length === 0) {
    return <div>404</div>;
  }

  return (
    <MemeSingle
      description={props.description}
      title={props.title}
      imageSrc={props.imageSrc}
    />
  );
}
