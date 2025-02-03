import { Flex } from '@radix-ui/themes'
import React from 'react'

interface Params {
    params: {
        id: string
    }
}

export default function page({ params }: Params) {
  return (
    <Flex className='h-[100vh]'><div className='p-2 m-2 justify-center justfy-items-center'>Activo : {params.id}</div></Flex>
  )
}
