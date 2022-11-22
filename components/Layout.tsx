import Head from "next/head";
import Navbar from "./Navbar";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Supabase Meme Gallery</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="flex-grow">{children}</main>
    </div>
  );
}
