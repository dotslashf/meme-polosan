import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import {
  Session,
  useSession,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { GetServerSidePropsContext } from "next";
import router from "next/router";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  return {
    props: {
      session: session,
    },
  };
};

export default function Login() {
  const supabase = useSupabaseClient();
  const session = useSession();

  if (session) {
    router.push("/");
  }

  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-200">
      {!session && (
        <div className="container max-w-sm px-8 bg-white rounded-md py-8">
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            theme="white"
          />
        </div>
      )}
    </div>
  );
}
