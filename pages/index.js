import Head from "next/head";
import Link from "next/link";
import enableMessaging from "@/messaging/enableMessaging";
import { useAuthUser } from "next-firebase-auth";
import { useEffect } from "react";
import { useRouter } from "next/dist/client/router";

export default function Home({ data }) {
  //{data} is from getStaticProps() exported below.
  const router = useRouter()
  useEffect(() => {
    router.push("/dashboard")
  }, [])

  return (
    <div>
      <Head>
        <title>Next + Firebase</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container px-5 mx-auto py-20">
        {/* <h1 className="text-6xl font-extrabold text-center">
          <a
            href="https://nextjs.org"
            className="hover:underline text-blue-500"
          >
            Password <br />Manager
          </a>

        </h1>


        <div className="flex items-center justify-center">
          <Link href="/dashboard">
            <div className="w-28 text-center rounded-md p-2 mt-12 text-white" style={{ background: "#000" }}>
              View Vault
            </div>
          </Link>

        </div> */}



      </main>
    </div>
  );
}

// export async function getStaticProps(context) {
//   //Note: Do not use client functions here!

//   //getDoc function is from Admin SDK.
//   const data = await import("@/FS-admin-functions").then(({ getDoc }) =>
//     getDoc()
//   );

//   return {
//     props: { data }, // will be passed to the page component as props
//   };
// }
