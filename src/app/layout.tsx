import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import { Toaster } from 'react-hot-toast';
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const poppins = Poppins({
  adjustFontFallback: false, // TODO: remove this when fixed in next/font
  display: "swap",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "NextCommerce",
  description: "Built by Elijah Soladoye",
  // icons: {
  //   apple: ["/apple-icon.png"],
  // },
  metadataBase: new URL("https://nextcommerce.vercel.app/"),
  openGraph: {
    description: "NextCommerce",
    // images: [
    //   {
    //     height: 1983,
    //     url: "https://nextcommerce.vercel.app/agilitas-og-image.png",
    //     width: 2500,
    //   },
    // ],
    locale: "en_US",
    siteName: "NextCommerce",
    title: "NextCommerce",
    type: "website",
    url: "https://nextcommerce.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased ${poppins.className}`}
        >
          {children}
          <Toaster position="top-right" />
        </body>
      </html>
    </ClerkProvider>
  );
}
