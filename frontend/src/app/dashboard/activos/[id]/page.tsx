import { Flex } from '@radix-ui/themes'
import React from 'react'

export default function Page({ params }: { params: { id: string } }) {
  if (!params || typeof params.id !== 'string') {
    return <div>Error: Parámetro no válido</div>
  }

  return (
    <Flex className='h-[100vh]'>
      <div className='p-2 m-2 justify-center items-center'>
        Activo: {params.id}
      </div>
    </Flex>
  )
}
