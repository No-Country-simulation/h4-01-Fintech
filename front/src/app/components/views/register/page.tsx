
'use client'


import {signIn} from 'next-auth/react'
import SignIn from '../../atoms/signin'

import { useState } from 'react'
import Link from 'next/link'
import {Button } from '@/components/ui/button'
import  {Input}  from '@/components/ui/input'

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    dni: '',
    password: '',
    confirmPassword: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Section */}
      <div className="hidden lg:flex lg:w-2/5 bg-[#0052CC] text-white p-12 flex-col justify-between">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold leading-tight">
            Facilitamos Tu Ahorro E Inversión
          </h1>
          <h2 className="text-xl">
            Haz crecer tu dinero con estrategias personalizadas
          </h2>
          <p className="text-sm opacity-90">
            Define tus metas financieras y comienza a invertir hoy mismo, sin complicaciones.
          </p>
        </div>
        <div className="text-2xl font-bold">
          iUpi
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 p-8 sm:p-12 flex flex-col">
        <div className="flex justify-end mb-8">
          <div className="text-sm text-gray-600">
            Ya tienes una cuenta?{' '}
            <Link href="/login" className="text-[#0052CC] hover:underline">
              Inicia sesión
            </Link>
          </div>
        </div>

        <div className="max-w-md w-full mx-auto">
          <h2 className="text-2xl font-semibold mb-8">Registrate</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm text-gray-600">
                Mail
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Mail"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="fullName" className="text-sm text-gray-600">
                Nombre completo
              </label>
              <Input
                id="fullName"
                type="text"
                placeholder="Nombre completo"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="dni" className="text-sm text-gray-600">
                DNI o Cedula
              </label>
              <Input
                id="dni"
                type="text"
                placeholder="00.000.000"
                value={formData.dni}
                onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm text-gray-600">
                Contraseña
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm text-gray-600">
                Repetir contraseña
              </label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Repetir contraseña"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-[#0052CC] hover:bg-[#0052CC]/90 text-white"
              onClick={() => signIn()}
            >
              Registrate
            </Button>
            <div className='flex justify-center'>
            <SignIn></SignIn>
            </div>
           
          </form>
        </div>
      </div>
    </div>
  )
}
