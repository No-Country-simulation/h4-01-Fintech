import { Flex } from '@radix-ui/themes'
import React from 'react'

interface PageProps {
  params: { id: string }
}

export default function Page({ params }: PageProps) {
  return (
    <Flex className='h-[100vh]'>
      <div className='p-2 m-2 justify-center justfy-items-center'>
        Activo : {params.id}
      </div>
    </Flex>
  )
}
