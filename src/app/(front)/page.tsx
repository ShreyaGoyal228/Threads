import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import { ModeToggle } from "./shared/toggle-mode";
import Image from "next/image";
import AddThread from "~/components/threads/addThread";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    // <HydrateClient>
    //   <main className="">
    //    hlooo
    //    <ModeToggle/>
    //   </main>
    // </HydrateClient>
    <div>
    <div className="flex justify-center items-center">
      <Image
        src="/images/logo.svg"
        width={50}
        height={50}
        alt="Logo"
        className="hidden md:block"
      />
    </div>
    <AddThread />
      <div className="mt-10">
        {/* {posts.map((item) => (
          <PostCard post={item} key={item.id} />
        ))} */}
      </div>
   
  </div>
  );
}
