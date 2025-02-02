"use client";
import * as React from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

export const MyAvatar = () => {
  const { data: session } = useSession();

  if (!session) {
    return null;
  }

  return (
    <div className="flex gap-5">
      <div className="inline-flex size-[35px] select-none items-center justify-center overflow-hidden rounded-full">
        {session?.user?.image ? (
          <Image
            className="size-full rounded-[inherit] object-cover"
            src={session.user.image}
            alt="User Avatar"
            width={35}
            height={35}
          />
        ) : (
          <div className="leading-1 flex size-full items-center justify-center bg-white text-[15px] font-medium text-violet-11">
            {session?.user?.name ? session.user.name[0] : "?"}
          </div>
        )}
      </div>
    </div>
  );
};
