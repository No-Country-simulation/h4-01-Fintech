import type { Metadata } from "next";
import '@/app/ui/global.css';
import { inter , lusitana} from './ui/fonts';


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${lusitana.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
