'use client'
import * as React from "react";
import { Avatar } from "radix-ui";
import { useSession } from "next-auth/react";

export const MyAvatar = () => {
  const { data: session } = useSession()

  return (
    <div className="flex gap-5">
      <Avatar.Root className="inline-flex size-[35px] select-none items-center justify-center overflow-hidden rounded-full ">
        <Avatar.Image
          className="size-full rounded-[inherit] object-cover"
          src={session?.user.image}
          alt="Colm Tuite"
        />
        <Avatar.Fallback
          className="leading-1 flex size-full items-center justify-center bg-white text-[15px] font-medium text-violet11"
          delayMs={600}
        >
          {session?.user?.name ? session.user.name[0] : null}
        </Avatar.Fallback>
      </Avatar.Root>
    </div>
  )
}