import DialogWelcome from '@/features/notification/dialogWelcome'
import React from 'react'

export default function page() {
  return (
    <div>
      <div className='fixed top-0 right-0'>
              <DialogWelcome />
            </div>
            <div className='justify-center justify-items-center'>
              <p>Dashboard</p>
            </div>
    </div>
  )
}
