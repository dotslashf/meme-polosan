import Head from "next/head";
import Navbar from "./Navbar";
import { useSession } from "@supabase/auth-helpers-react";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const session = useSession();

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Supabase Meme Gallery</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar session={session} />
      <main className="flex-grow">{children}</main>
    </div>
  );
}
