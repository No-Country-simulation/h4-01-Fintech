'use client'
import { useRouter } from 'next/router'
import { Flex } from '@radix-ui/themes'
import React from 'react'


interface PageProps {
  params: {
    id: string;
  };
}
export default function Page() {
  const router= useRouter()
  const id = router.query.id

  if(id){
  return (
    <Flex className='h-[100vh]'>
      <div className='p-2 m-2 justify-center items-center'>
        Activo: {id}
      </div>
    </Flex>
  )
}
return null
}
