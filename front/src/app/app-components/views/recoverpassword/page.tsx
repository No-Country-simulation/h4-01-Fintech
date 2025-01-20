'use client'
import {LeftSection} from "../../organisms/LeftSection"
import Link from 'next/link'
import {Button} from '@/components/ui/button';
import { useRouter } from "next/navigation";

export default function RecoverPassword() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex">
      <LeftSection/>
      <div className="w-full lg:w-1/2 p-8 sm:p-12 flex flex-col">
        <div className="flex items-center justify-end mb-8 space-x-4">
       
          <div className="text-sm text-gray-600">
            <Link href="/auth/login" className="text-[#0052CC] hover:underline">
              Inicia sesión
            </Link>
          </div>
          <Button 
            type="button"
            className="bg-[#0052CC] hover:bg-[#0052CC]/90 text-white"
            onClick={() => router.push('/auth/register')}
          >
            Registrate
          </Button>
        </div>
        <div className="max-w-md w-full mx-auto">
          <h2 className="text-2xl font-semibold mb-8">Recupera tu contraseña</h2>
          <form className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="newPassword" className="text-sm text-gray-600">
                Nueva contraseña
              </label>
              <input 
                type="password" 
                id="newPassword" 
                name="newPassword" 
                placeholder="Nueva contraseña" 
                required 
                className="w-full px-4 py-2 border border-gray-300 rounded-md" 
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm text-gray-600">
                Confirmar nueva contraseña
              </label>
              <input 
                type="password" 
                id="confirmPassword" 
                name="confirmPassword" 
                placeholder="Confirmar nueva contraseña" 
                required 
                className="w-full px-4 py-2 border border-gray-300 rounded-md" 
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-[#0052CC] hover:bg-[#0052CC]/90 text-white"
            >
              Confirmar contraseña
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}