import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import type { Metadata } from "next";
import { Lato } from "next/font/google";
import { ToastContainer } from "react-toastify";
import Head from "next/head";
import { ThemeProvider } from "@/providers/theme-provider";
import { QueryProvider } from "@/providers/query-provider";
import { CartProvider } from "@/providers/cart-provider-v2";
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
  const isDev = process.env.NODE_ENV === "development";

  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <body className={`${lato.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          //forcedTheme="dark"
          disableTransitionOnChange
        >
          <QueryProvider>
            <UserContextProvider>
              <CartProvider>
                <main className="min-h-screen flex flex-col bg-background">
                  {children}
                </main>
                {isDev && (
                  <div className="z-50 fixed bottom-4 right-4 bg-foreground size-6 rounded-full flex items-center justify-center font-bold text-background text-xs">
                    <span className="block sm:hidden">xs</span>
                    <span className="hidden sm:block md:hidden">sm</span>
                    <span className="hidden md:block lg:hidden">md</span>
                    <span className="hidden lg:block xl:hidden">lg</span>
                    <span className="hidden xl:block">xl</span>
                  </div>
                )}
                <ToastContainer autoClose={1000} />
              </CartProvider>
            </UserContextProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
