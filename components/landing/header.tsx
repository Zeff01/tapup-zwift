"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { RxHamburgerMenu } from "react-icons/rx";
import { usePathname } from "next/navigation";

import { headerItems } from "@/constants";

import TapupLogo from "../svgs/TapupLogo";
import { ThemeToggle } from "../Theme";
import { Loader2, ShoppingCart } from "lucide-react";
import { useUserContext } from "@/providers/user-provider";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

const Cart = dynamic(() => import("../cart/Cart"), {
  ssr: false,
  loading: () => <ShoppingCart className="!size-6 shrink-0" />,
});

const Header = () => {
  const { user, isLoading: isLoadingUserContext } = useUserContext();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMobileMenu = () => {
    const newMenuState = !isMenuOpen;
    setIsMenuOpen(newMenuState);
    document.body.style.overflow = newMenuState ? "hidden" : "auto";
  };

  //reset the state when navigation to make scrollable
  useEffect(() => {
    if (!isMenuOpen) {
      document.body.style.overflow = "auto";
    }
    // Clean up on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  return (
    <header className="flex sticky top-0 z-50 bg-background justify-between items-center md:px-10 shadow-xl  p-4">
      <Link href="/" rel="preload">
        <div className="aspect-[130/48] w-20 lg:w-28">
          <TapupLogo />
        </div>
      </Link>

      <div className="flex items-center gap-4  lg:gap-8">
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-6 text-xl">
          {headerItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`${
                item.href === pathname
                  ? "text-greenText border-b-2 border-greenTitle"
                  : ""
              } hover:text-hoverColor`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Activate Button */}

        {!user && !isLoadingUserContext && (
          <Link href="/login">
            <Button className="hidden lg:flex text-lg text-white  bg-buttonColor hover:bg-hoverColor">
              Sign In
            </Button>
          </Link>
        )}

        {user && !isLoadingUserContext && (
          <Link className="hidden lg:block" href={"/dashboard"}>
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={user?.profilePictureUrl || "/placeholder.svg"}
                alt={`${user?.email}-profile-picture`}
              />
              <AvatarFallback className="uppercase">
                {user?.email[0]}
              </AvatarFallback>
            </Avatar>
          </Link>
        )}

        {isLoadingUserContext && (
          <Loader2 className="shrink-0 size-12 animate-spin hidden lg:block" />
        )}

        <Cart />
        <ThemeToggle />

        {/* Mobile Menu Trigger */}
        <div className="lg:hidden cursor-pointer" onClick={handleMobileMenu}>
          <RxHamburgerMenu size={20} />
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`
          fixed 
          top-0 
          left-0 
          w-full 
          h-full 
          bg-primaryBackground 
          z-[100] 
          transform 
          transition-transform 
          duration-300 
          ease-in-out
          ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Menu Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <Link href={"/"} onClick={handleMobileMenu}>
              <div className="aspect-[130/48] w-20 lg:w-28">
                <TapupLogo />
              </div>
            </Link>
            <button onClick={handleMobileMenu} className="text-2xl font-bold">
              &times;
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex flex-col gap-6 p-6 text-xl">
            {headerItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`
                  ${
                    item.href === pathname
                      ? "text-greenText border-b-2 border-greenTitle"
                      : ""
                  } 
                  hover:text-hoverColor 
                  py-2
                `}
                onClick={handleMobileMenu}
              >
                {item.label}
              </Link>
            ))}

            {!user && !isLoadingUserContext && (
              <Link href="/login">
                <Button
                  onClick={handleMobileMenu}
                  className="flex text-lg text-white  bg-buttonColor hover:bg-hoverColor"
                >
                  Sign In
                </Button>
              </Link>
            )}

            {user && !isLoadingUserContext && (
              <Link href={"/dashboard"}>
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={user?.profilePictureUrl || "/placeholder.svg"}
                    alt={`${user?.email}-profile-picture`}
                  />
                  <AvatarFallback className="uppercase">
                    {user?.email[0]}
                  </AvatarFallback>
                </Avatar>
              </Link>
            )}

            {isLoadingUserContext && (
              <Loader2 className="shrink-0 size-12 animate-spin" />
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
