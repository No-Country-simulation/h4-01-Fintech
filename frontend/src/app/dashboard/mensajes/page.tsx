'use client'
import Loading from '@/app/loanding';
import { Mailbox } from '@/components/message/mailbox';
import { useSession } from 'next-auth/react';
import React from 'react'

export default function page() {
  const { data: session, status } = useSession();
  const userId = session?.user.id as string;
  //
  if (status === 'loading') {
    <>
      <Loading/>
    </>
  }
  return (
    <div className="min-h-screen bg-gray-50 flex items-center 
    justify-center">
      <Mailbox userId={userId} />
    </div>
  )
}
