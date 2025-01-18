import LeftSection from "@/app/components/organisms/LeftSection"
import Link from 'next/link' 
import {Button} from '@/components/ui/button'

export default function Login () {


    return (
       
        <div className="min-h-screen flex">
        
        {/* Left Section */}
<LeftSection></LeftSection>

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



            <h2 className="text-2xl font-semibold mb-8">Inicia Sesión</h2>
                    <form className="space-y-6">




                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm text-gray-600">
                        Mail
                        </label>
                    <input type="email" id="email" name="email" placeholder="Correo" required className="w-full px-4 py-2 border border-gray-300 rounded-md" />


                    </div>

                    <div className="space-y-2">
                    <label htmlFor="email" className="text-sm text-gray-600">
                        Contraseña
                        </label>
                    <input type="password" id="Contraseña" name="Contraseña" placeholder="Contraseña" required className="w-full px-4 py-2 border border-gray-300 rounded-md" />
                    

                    </div>
                    <Button 
              type="submit" 
              className="w-full bg-[#0052CC] hover:bg-[#0052CC]/90 text-white"
             
            >
              Login
            </Button>

                    <div className="space-y-2 text-sm text-gray-600  ">
                    

                    <div className="group relative">
                    <Link
                    href='/forgot-password'>
                    Olvide mi contraseña
                    </Link>
  <div className="absolute left-0 bottom-0 h-0.5 w-0 bg-slate-600 transition-all duration-300 group-hover:w-full"></div>
</div>
                        </div>

                    </form>
            </div>



        </div>

        
        </div>
 


        
       )
           
            
}