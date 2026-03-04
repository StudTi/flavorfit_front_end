import type { Metadata } from "next";
import { Geist, Roboto } from "next/font/google";
import { Provider } from "./providers/Provider";
import "./globals.css"
import { Toaster } from "../shared/components/ui/sonner";
import { SITE_NAME } from "@/shared/constants/seo.constants";

const roboto = Roboto({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: '400'
});

export const metadata: Metadata = {
  title: { 
    absolute: SITE_NAME,
    template: `%s | ${SITE_NAME}`
  },
  description: "Веб-приложение для управления вашими повседневными задачами и делами",

  //  Отобразили иконку на вкладке страницы
  icons: [{url: "/favicon.svg", type: "image/svg+xml"}]   
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} antialiased`}
      >
        <Provider>{children}</Provider>
        <Toaster />
      </body>
    </html>
  );
}
