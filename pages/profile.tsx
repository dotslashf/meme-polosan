import {
  Session,
  User,
  useSession,
  useSupabaseClient,
  useUser,
} from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import LoadingIndicator from "../components/LoadingIndicator";
import { Database, Profiles } from "../utils/types";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session.user.id)
    .single();

  return {
    props: {
      session: session,
      user: data,
    },
  };
};

export default function Profile({
  session,
  user,
}: {
  session: Session;
  user: Profiles;
}) {
  const supabase = useSupabaseClient<Database>();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState<Profiles["username"]>(user.username);

  async function updateProfile({ username }: { username: string | null }) {
    try {
      setLoading(true);
      const updates = {
        id: user!.id,
        username,
        updated_at: new Date().toISOString(),
      };

      let { error } = await supabase.from("profiles").upsert(updates);
      if (error) throw error;
      setLoading(false);
    } catch (error) {
      alert("Error updating the data!");
      console.log(error);
    }
  }

  return (
    <Layout>
      <section className="pt-4 bg-blueGray-50">
        <div className="w-full lg:w-4/12 px-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
            <div className="p-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full px-4 flex justify-center">
                  <div className="relative">
                    <img
                      className="h-32 w-32 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="text-center mt-4">
                <div className="flex flex-col space-y-4">
                  <div className="flex flex-col items-start">
                    <label className="block font-semibold">email</label>
                    <input
                      type="text"
                      placeholder="email"
                      className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-slate-800 focus:ring-1 rounded-md disabled:bg-gray-200"
                      value={session?.user.email}
                      disabled
                    />
                  </div>
                  <div className="flex flex-col items-start">
                    <label className="block font-semibold">username</label>
                    <input
                      type="text"
                      placeholder="username"
                      className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-slate-800 focus:ring-1 rounded-md"
                      value={username || ""}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="self-start">
                    <button
                      className="text-white hover:bg-gray-600 px-3 py-2 rounded-md text-sm font-medium bg-gray-700"
                      onClick={() => updateProfile({ username })}
                      disabled={loading}
                    >
                      {loading ? (
                        <div className="flex">
                          <LoadingIndicator /> Loading
                        </div>
                      ) : (
                        "Update Profile"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
