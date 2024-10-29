import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import Header from "@/components/landing/header";
import { UserContextProvider } from "@/providers/user-provider";

const lato = Lato({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TapUp",
  description:
    "Transform your business interactions with TapUp Cards. Our app allows you to create, share, and manage digital business cards effortlessly. With customizable designs, instant updates, and seamless integration across devices, you can leave a lasting impression. Elevate your professional networking to the next level with TapUp Cards.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <body className={`${lato.className} overflow-hidden h-screen`}>
        <UserContextProvider>
          <main className="h-full flex flex-col">
            <Header />
            {children}
          </main>
          <ToastContainer />
        </UserContextProvider>
      </body>
    </html>
  );
}
