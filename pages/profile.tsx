import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import Navbar from "../components/Navbar";

export default function Profile() {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center w-full h-screen bg-gray-200">
        <div className="container max-w-sm px-8 bg-white rounded-md py-8">
          {!session ? (
            <Auth
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              theme="white"
            />
          ) : (
            <p>Account page will go here.</p>
          )}
        </div>
      </div>
    </>
  );
}
