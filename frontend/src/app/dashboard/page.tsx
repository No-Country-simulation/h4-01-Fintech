// app/layout.tsx o components/Layout.tsx
"use client";
import InvestmentProfileHandler from "@/features/questios/investment";


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <InvestmentProfileHandler />
      {children}
    </>
  );
}