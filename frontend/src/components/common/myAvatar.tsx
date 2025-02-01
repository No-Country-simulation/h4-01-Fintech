'use client'
import * as React from "react";
import { useSession } from "next-auth/react";
import { Avatar } from "@radix-ui/themes";

export const MyAvatar = () => {
  const { data: session } = useSession()

  return (
    <div className="flex gap-5">
      <Avatar className="inline-flex size-[35px] select-none items-center justify-center overflow-hidden rounded-full " fallback={""}>
        <img
          className="size-full rounded-[inherit] object-cover"
          src={session?.user.image}
          alt="Colm Tuite"
        />
        <div
          className="leading-1 flex size-full items-center justify-center bg-white text-[15px] font-medium text-violet11"
        >
          {session?.user?.name ? session.user.name[0] : null}
        </div>
      </Avatar>
    </div>
  )
}