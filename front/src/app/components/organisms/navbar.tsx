'use client'
import Link from "next/link";
import { Menu } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  // SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import UserAvatar from "../atoms/useravatar";

export default function Navbar() {
  const { data: session } = useSession()
  
  if (!session?.user) {
    return (
      <nav className="w-full h-auto md:h-20 px-4 md:px-8 lg:px-12 py-4 md:py-[18px] bg-white flex-col justify-start items-start gap-2.5 inline-flex">
        <div className="w-full max-w-7xl mx-auto justify-between items-center flex">
          {/* Logo del sitio */}
          <Link
            href="/"
            className="flex items-center gap-8 transition-transform duration-200 hover:scale-105"
          >
            <span className="text-[#0049b0] text-4xl md:text-5xl lg:text-6xl font-bold font-['Inter']">iUpi</span>
          </Link>

          {/* Menú de navegación para desktop */}
          <div className="hidden md:flex flex-1 items-center justify-between ml-12">
            <ul className="flex justify-start items-center gap-11">
              <li>
                <Link
                  href="#invertir"
                  className="text-[#002a4d] text-base font-medium font-['Inter'] transition-all duration-200 hover:text-[#0049b0] relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#0049b0] after:left-0 after:-bottom-1 after:transition-all after:duration-200 hover:after:w-full"
                >
                  Comenzar a invertir
                </Link>
              </li>
              <li>
                <Link
                  href="#quienes-somos"
                  className="text-[#002a4d] text-base font-medium font-['Inter'] transition-all duration-200 hover:text-[#0049b0] relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#0049b0] after:left-0 after:-bottom-1 after:transition-all after:duration-200 hover:after:w-full"
                >
                  Quienes somos
                </Link>
              </li>
              <li>
                <Link
                  href="#planes-ahorro"
                  className="text-[#002a4d] text-base font-medium font-['Inter'] transition-all duration-200 hover:text-[#0049b0] relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#0049b0] after:left-0 after:-bottom-1 after:transition-all after:duration-200 hover:after:w-full"
                >
                  Planes de ahorro
                </Link>
              </li>
              <li>
                <Link
                  href="#educacion-financiera"
                  className="text-[#002a4d] text-base font-medium font-['Inter'] transition-all duration-200 hover:text-[#0049b0] relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#0049b0] after:left-0 after:-bottom-1 after:transition-all after:duration-200 hover:after:w-full"
                >
                  Educación financiera
                </Link>
              </li>
            </ul>

            <div className="flex items-center gap-3">
              <Link
                href="/auth/login"
                className="px-5 py-3 bg-white rounded-lg flex justify-center items-center gap-2.5 overflow-hidden transition-all duration-200 hover:bg-gray-50 hover:shadow-md"
              >
                <span className="text-[#0049b0] text-base font-semibold font-['Inter']">Inicia sesión</span>
              </Link>
              <Link
                href="/auth/register"
                className="px-5 py-3 bg-[#0049b0] rounded-lg flex justify-center items-center gap-2.5 overflow-hidden transition-all duration-200 hover:bg-[#003d8f] hover:shadow-md"
              >
                <span className="text-slate-50 text-base font-semibold font-['Inter']">Regístrate</span>
              </Link>
            </div>
          </div>

          {/* Menú hamburguesa para mobile */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Abrir menú</span>
                </Button>
              </SheetTrigger>
              
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  {/* este componente debe tener titulo si o si */}
                  <SheetTitle></SheetTitle>
                <nav className="flex flex-col gap-8">
                  <ul className="flex flex-col gap-6">
                    <li>
                      <Link
                        href="#invertir"
                        className="text-[#002a4d] text-lg font-medium font-['Inter'] transition-all duration-200 hover:text-[#0049b0]"
                      >
                        Comenzar a invertir
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#quienes-somos"
                        className="text-[#002a4d] text-lg font-medium font-['Inter'] transition-all duration-200 hover:text-[#0049b0]"
                      >
                        Quienes somos
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#planes-ahorro"
                        className="text-[#002a4d] text-lg font-medium font-['Inter'] transition-all duration-200 hover:text-[#0049b0]"
                      >
                        Planes de ahorro
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#educacion-financiera"
                        className="text-[#002a4d] text-lg font-medium font-['Inter'] transition-all duration-200 hover:text-[#0049b0]"
                      >
                        Educación financiera
                      </Link>
                    </li>
                  </ul>

                  <div className="flex flex-col gap-4">
                    <Link
                      href="/auth/login"
                      className="w-full px-5 py-3 bg-white border border-[#0049b0] rounded-lg flex justify-center items-center gap-2.5 overflow-hidden transition-all duration-200 hover:bg-gray-50"
                    >
                      <span className="text-[#0049b0] text-base font-semibold font-['Inter']">Inicia sesión</span>
                    </Link>
                    <Link
                      href="/auth/register"
                      className="w-full px-5 py-3 bg-[#0049b0] rounded-lg flex justify-center items-center gap-2.5 overflow-hidden transition-all duration-200 hover:bg-[#003d8f]"
                    >
                      <span className="text-slate-50 text-base font-semibold font-['Inter']">Regístrate</span>
                    </Link>
                  </div>
                </nav>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    )
  }
  return (
    <nav className="w-full h-auto md:h-20 px-4 md:px-8 lg:px-12 py-4 md:py-[18px] bg-white flex-col justify-start items-start gap-2.5 inline-flex">
      <div className="w-full max-w-7xl mx-auto justify-between items-center flex">
        {/* Logo del sitio */}
        <Link
          href="/"
          className="flex items-center gap-8 transition-transform duration-200 hover:scale-105"
        >
          <span className="text-[#0049b0] text-4xl md:text-5xl lg:text-6xl font-bold font-['Inter']">iUpi</span>
        </Link>

        {/* Menú de navegación para desktop */}
        <div className="hidden md:flex flex-1 items-center justify-between ml-12">
          <ul className="flex justify-start items-center gap-11">
            <li>
              <Link
                href="#invertir"
                className="text-[#002a4d] text-base font-medium font-['Inter'] transition-all duration-200 hover:text-[#0049b0] relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#0049b0] after:left-0 after:-bottom-1 after:transition-all after:duration-200 hover:after:w-full"
              >
                Comenzar a invertir
              </Link>
            </li>
            <li>
              <Link
                href="#quienes-somos"
                className="text-[#002a4d] text-base font-medium font-['Inter'] transition-all duration-200 hover:text-[#0049b0] relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#0049b0] after:left-0 after:-bottom-1 after:transition-all after:duration-200 hover:after:w-full"
              >
                Quienes somos
              </Link>
            </li>
            <li>
              <Link
                href="#planes-ahorro"
                className="text-[#002a4d] text-base font-medium font-['Inter'] transition-all duration-200 hover:text-[#0049b0] relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#0049b0] after:left-0 after:-bottom-1 after:transition-all after:duration-200 hover:after:w-full"
              >
                Planes de ahorro
              </Link>
            </li>
            <li>
              <Link
                href="#educacion-financiera"
                className="text-[#002a4d] text-base font-medium font-['Inter'] transition-all duration-200 hover:text-[#0049b0] relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#0049b0] after:left-0 after:-bottom-1 after:transition-all after:duration-200 hover:after:w-full"
              >
                Educación financiera
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-3">
            <UserAvatar/>
            <button onClick={() => signOut()}>Salir</button>
          </div>
        </div>

        {/* Menú hamburguesa para mobile */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                {/* este componente debe tener titulo si o si */}
                <SheetTitle></SheetTitle>
              <nav className="flex flex-col gap-8">
                <ul className="flex flex-col gap-6">
                  <li>
                    <Link
                      href="#invertir"
                      className="text-[#002a4d] text-lg font-medium font-['Inter'] transition-all duration-200 hover:text-[#0049b0]"
                    >
                      Comenzar a invertir
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#quienes-somos"
                      className="text-[#002a4d] text-lg font-medium font-['Inter'] transition-all duration-200 hover:text-[#0049b0]"
                    >
                      Quienes somos
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#planes-ahorro"
                      className="text-[#002a4d] text-lg font-medium font-['Inter'] transition-all duration-200 hover:text-[#0049b0]"
                    >
                      Planes de ahorro
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#educacion-financiera"
                      className="text-[#002a4d] text-lg font-medium font-['Inter'] transition-all duration-200 hover:text-[#0049b0]"
                    >
                      Educación financiera
                    </Link>
                  </li>
                </ul>

                <div className="flex flex-col gap-4">
                    <UserAvatar/>
                  <button onClick={() => signOut()}>Salir</button>
                </div>
              </nav>
                </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

