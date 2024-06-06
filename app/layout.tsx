import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { MoralisProvider, NotificationProvider } from "../constants/imports";
const inter = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-Commerce Store",
  description: "Simple store to get stuff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MoralisProvider initializeOnMount={false}>
          <NotificationProvider>{children}</NotificationProvider>
        </MoralisProvider>
      </body>
    </html>
  );
}
